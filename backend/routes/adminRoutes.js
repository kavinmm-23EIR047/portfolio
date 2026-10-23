import express from 'express';
import { randomBytes } from 'crypto';
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns/promises';
import net from 'net';
import http from 'http';
import https from 'https';
import BusinessProspect from '../models/BusinessProspect.js';
import { calculateLeadScore, classifyWebsiteStatus, csvCell } from '../utils/leadFinder.js';

const router = express.Router();

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const adminSessions = new Map();
const lgdApiBase = 'https://india-lgd-index-api.vercel.app/v1';
const lgdCache = new Map();
const discoveryJobs = new Map();
const discoveryWorkers = new Map();
const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localPython = path.join(backendDir, '.venv', process.platform === 'win32' ? 'Scripts' : 'bin', process.platform === 'win32' ? 'python.exe' : 'python');
const pythonExecutable = process.env.PYTHON_EXECUTABLE || (existsSync(localPython) ? localPython : 'python');
const FINDER_SOURCE_FILTER = { source: 'Overture Maps Places' };
const JOB_TERMINAL_STATES = new Set(['completed', 'completed_with_errors', 'failed', 'cancelled']);
const INDIA_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cleanText = (value, maxLength = 100) => (
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
);

async function queryLgd(path, cacheKey, cacheTtlMs = 6 * 60 * 60 * 1000) {
  const cached = lgdCache.get(cacheKey);
  if (cached?.expiresAt > Date.now()) return cached.payload;
  if (cached) lgdCache.delete(cacheKey);

  const response = await fetch(`${lgdApiBase}${path}`, {
    headers: { 'User-Agent': 'AKWebFlairBusinessFinder/1.0' },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`India district data service returned ${response.status}.`);
  const payload = await response.json();
  if (!payload.success || !Array.isArray(payload.data)) throw new Error('India district data service returned an unexpected response.');
  if (lgdCache.size >= 100) lgdCache.clear();
  lgdCache.set(cacheKey, { payload, expiresAt: Date.now() + cacheTtlMs });
  return payload;
}

async function getLgdStates() {
  const payload = await queryLgd('/states', 'states');
  return payload.data;
}

const requireAdmin = (req, res, next) => {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');
  const expiresAt = token ? adminSessions.get(token) : undefined;

  if (!expiresAt || expiresAt <= Date.now()) {
    if (token) adminSessions.delete(token);
    return res.status(401).json({ success: false, message: 'Admin session expired. Please log in again.' });
  }

  next();
};

router.get('/billdesk/overview', requireAdmin, async (_req, res) => {
  const apiUrl = process.env.BILLDESK_API_URL?.trim().replace(/\/$/, '');
  const serviceKey = process.env.BILLDESK_AK_ADMIN_KEY;
  if (!apiUrl || !serviceKey) return res.status(503).json({ success: false, message: 'Billdesk admin bridge is not configured on the server.' });
  try {
    const response = await fetch(`${apiUrl}/api/v1/admin-bridge/overview`, {
      headers: { 'x-ak-admin-key': serviceKey, accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return res.status(response.status === 401 ? 503 : response.status).json({ success: false, message: payload.message || 'Billdesk admin bridge request failed.' });
    return res.json({ success: true, ...payload });
  } catch {
    return res.status(503).json({ success: false, message: 'Billdesk API is not reachable.' });
  }
});

const isPublicIp = (address) => {
  if (net.isIP(address) === 4) {
    const [a, b] = address.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127));
  }
  if (net.isIP(address) === 6) {
    const normalized = address.toLowerCase();
    if (normalized.startsWith('::ffff:')) return isPublicIp(normalized.slice(7));
    return normalized.startsWith('2') || normalized.startsWith('3');
  }
  return false;
};

async function validatePublicHttpUrl(value) {
  let url;
  try { url = new URL(/^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`); } catch { throw new Error('Invalid website URL.'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Only public HTTP or HTTPS websites can be checked.');
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host === 'metadata.google.internal') throw new Error('Private and local destinations are blocked.');
  const addresses = net.isIP(host) ? [{ address: host }] : await dns.lookup(host, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => !isPublicIp(address))) throw new Error('Private and local destinations are blocked.');
  return { url, addresses };
}

function requestPublicWebsite(url, addresses) {
  return new Promise((resolve, reject) => {
    const client = url.protocol === 'https:' ? https : http;
    const request = client.request(url, {
      method: 'GET',
      headers: { 'User-Agent': 'AKWebFlairWebsiteCheck/1.0' },
      timeout: 8000,
      lookup: (_hostname, _options, callback) => {
        const address = addresses[0].address;
        callback(null, address, net.isIP(address));
      },
    }, (response) => {
      const result = { status: response.statusCode || 0, headers: response.headers };
      response.destroy();
      resolve(result);
    });
    request.on('timeout', () => request.destroy(Object.assign(new Error('Website request timed out.'), { name: 'TimeoutError' })));
    request.on('error', reject);
    request.end();
  });
}

async function checkWebsite(urlValue) {
  if (!urlValue) return { websiteStatus: 'no_website_listed', websiteHttpStatus: null, websiteFinalUrl: '', websiteCheckedAt: new Date() };
  let { url, addresses } = await validatePublicHttpUrl(urlValue);
  let response;
  for (let hop = 0; hop < 4; hop += 1) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        response = await requestPublicWebsite(url, addresses);
        if ((response.status < 500 && response.status !== 404 && response.status !== 410) || attempt === 1) break;
      } catch (err) {
        if (attempt === 1) throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
    if (![301, 302, 303, 307, 308].includes(response.status)) break;
    const location = response.headers.location;
    if (!location || hop === 3) return { websiteStatus: 'redirect_issue', websiteHttpStatus: response.status, websiteFinalUrl: url.href, websiteCheckedAt: new Date() };
    ({ url, addresses } = await validatePublicHttpUrl(new URL(location, url).href));
  }
  const status = response.status;
  return {
    websiteStatus: classifyWebsiteStatus(status),
    websiteHttpStatus: status,
    websiteFinalUrl: url.href,
    websiteCheckedAt: new Date(),
  };
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(503).json({
      success: false,
      message: 'Admin login is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD on the backend.',
    });
  }

  if (email === adminEmail && password === adminPassword) {
    const now = Date.now();
    for (const [sessionToken, expiresAt] of adminSessions) {
      if (expiresAt <= now) adminSessions.delete(sessionToken);
    }

    const token = randomBytes(32).toString('hex');
    adminSessions.set(token, now + SESSION_TTL_MS);
    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: { email: adminEmail, name: 'Admin', role: 'SUPER_ADMIN' },
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid email or password' });
});

router.get('/lead-discovery/states', requireAdmin, (req, res) => {
  res.json({ success: true, states: INDIA_STATES });
});

router.get('/lead-discovery/districts', requireAdmin, async (req, res) => {
  const state = cleanText(req.query.state);
  if (!INDIA_STATES.includes(state)) {
    return res.status(400).json({ success: false, message: 'Choose a valid Indian state or union territory.' });
  }

  try {
    const states = await getLgdStates();
    const matchedState = states.find((item) => item.name.toLowerCase() === state.toLowerCase());
    if (!matchedState) {
      return res.status(404).json({ success: false, message: 'That state is missing from the administrative district list.' });
    }
    const payload = await queryLgd(`/districts?state=${encodeURIComponent(matchedState.code)}`, `districts:${matchedState.code}`);
    const names = [...new Set(payload.data.map((item) => item.name).filter(Boolean))]
      .sort((left, right) => left.localeCompare(right));
    res.json({ success: true, districts: names });
  } catch (err) {
    console.error('India district list lookup failed:', err.message);
    res.status(502).json({ success: false, message: 'Could not load the district list right now. Please retry.' });
  }
});

// Background discovery is delegated to the Python public-data worker.
router.post('/lead-discovery/jobs', requireAdmin, async (req, res) => {
  const keyword = cleanText(req.body.keyword, 100);
  const district = cleanText(req.body.district, 100);
  const state = cleanText(req.body.state, 100);
  const maxLeads = Math.min(100, Math.max(1, Number.parseInt(req.body.maxLeads, 10) || 100));
  const minRating = Number(req.body.minRating ?? 0);
  const minReviewCount = Number.parseInt(req.body.minReviewCount ?? 0, 10);
  const allowedWebsiteStatuses = new Set(['no_website_listed', 'page_not_found', 'server_error', 'dns_error', 'connection_error', 'timeout', 'redirect_issue', 'ssl_error', 'needs_manual_review', 'working', 'http_error', 'not_checked']);
  const websiteStatuses = Array.isArray(req.body.websiteStatuses) ? [...new Set(req.body.websiteStatuses.filter((status) => allowedWebsiteStatuses.has(status)))].slice(0, allowedWebsiteStatuses.size) : [];
  if (keyword.length < 2 || !district || !INDIA_STATES.includes(state) || !Number.isFinite(minRating) || minRating < 0 || minRating > 5 || !Number.isInteger(minReviewCount) || minReviewCount < 0) {
    return res.status(400).json({ success: false, message: 'Enter a category, valid state and district, rating from 0 to 5, and non-negative review count.' });
  }
  if (BusinessProspect.db?.readyState !== 1) return res.status(503).json({ success: false, message: 'MongoDB is not connected. Search results cannot be saved.' });
  if ([...discoveryJobs.values()].some((job) => ['pending', 'running'].includes(job.status))) {
    return res.status(409).json({ success: false, message: 'A lead discovery search is already running.' });
  }
  const job = { id: randomBytes(12).toString('hex'), configuration: { keyword, district, state, maxLeads, minRating, minReviewCount, websiteStatuses }, status: 'pending', stage: 'Queued', discovered: 0, processed: 0, saved: 0, duplicates: 0, failures: 0, errors: [], createdAt: new Date().toISOString(), completedAt: null, cancelRequested: false };
  discoveryJobs.set(job.id, job);
  while (discoveryJobs.size > 50) discoveryJobs.delete(discoveryJobs.keys().next().value);
  res.status(202).json({ success: true, job: { ...job } });

  setImmediate(async () => {
    job.status = 'running';
    job.stage = 'Python worker: querying configured permitted public sources';
    let stderr = '';
    try {
      const workerResult = await new Promise((resolve, reject) => {
        const worker = spawn(pythonExecutable, ['lead_discovery_agent.py'], {
          cwd: backendDir,
          windowsHide: true,
          env: process.env,
          stdio: ['pipe', 'pipe', 'pipe'],
        });
        discoveryWorkers.set(job.id, worker);
        let stdout = '';
        const killTimer = setTimeout(() => worker.kill(), 180000);
        worker.stdout.on('data', (chunk) => { stdout += chunk.toString(); if (stdout.length > 8_000_000) worker.kill(); });
        worker.stderr.on('data', (chunk) => { stderr = (stderr + chunk.toString()).slice(-3000); });
        worker.on('error', () => reject(new Error('Could not start the Python lead discovery worker. Check Python installation.')));
        worker.on('close', (code) => {
          clearTimeout(killTimer);
          discoveryWorkers.delete(job.id);
          if (job.cancelRequested) return resolve({ cancelled: true });
          if (code !== 0) return reject(new Error('Python discovery worker exited unexpectedly.'));
          try { resolve(JSON.parse(stdout.trim())); }
          catch { reject(new Error('Python discovery worker returned invalid output.')); }
        });
        worker.stdin.end(JSON.stringify({ keyword, district, state, maxLeads, minRating, minReviewCount }));
      });
      if (workerResult.cancelled || job.cancelRequested) { job.status = 'cancelled'; job.stage = 'Cancelled'; return; }
      if (!workerResult.success) throw new Error(workerResult.message || 'The public source could not complete this search.');
      job.source = workerResult.source || 'Overture Maps Places';
      job.limitation = workerResult.limitation || '';
      const candidates = Array.isArray(workerResult.businesses) ? workerResult.businesses.slice(0, maxLeads) : [];
      job.discovered = candidates.length;
      job.stage = 'Checking listed websites';
      const operations = [];
      for (const business of candidates) {
        if (job.cancelRequested) break;
        const lead = {
          ...business,
          ...calculateLeadScore({ websiteStatus: business.websiteStatus, phone: business.phone, rating: business.rating, ratingVerified: business.ratingVerified, reviewCount: business.reviewCount }),
        };
        operations.push({ updateOne: { filter: { sourceType: lead.sourceType, sourceId: lead.sourceId }, update: { $set: { ...lead, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } }, upsert: true } });
        job.processed += 1;
      }
      for (let offset = 0; offset < operations.length; offset += 4) {
        if (job.cancelRequested) break;
        await Promise.all(operations.slice(offset, offset + 4).map(async (operation) => {
          const fields = operation.updateOne.update.$set;
          if (!fields.websiteUrl) return;
          try { Object.assign(fields, await checkWebsite(fields.websiteUrl)); }
          catch (err) {
            const message = err.message || '';
            fields.websiteStatus = /ENOTFOUND|ENODATA/.test(message) ? 'dns_error' : err.name === 'TimeoutError' || err.name === 'AbortError' || /timeout/i.test(message) ? 'timeout' : /SSL|certificate/i.test(message) ? 'ssl_error' : /Private|Invalid|Only public/.test(message) ? 'needs_manual_review' : 'connection_error';
            fields.websiteHttpStatus = null;
            fields.websiteFinalUrl = '';
            fields.websiteCheckedAt = new Date();
          }
          Object.assign(fields, calculateLeadScore({ websiteStatus: fields.websiteStatus, phone: fields.phone, rating: fields.rating, ratingVerified: fields.ratingVerified, reviewCount: fields.reviewCount }));
        }));
      }
      const qualifiedOperations = operations.filter(({ updateOne }) => (
        !websiteStatuses.length || websiteStatuses.includes(updateOne.update.$set.websiteStatus)
      ));
      job.filtered = operations.length - qualifiedOperations.length;
      job.discovered = qualifiedOperations.length;
      if (qualifiedOperations.length && !job.cancelRequested) {
        const result = await BusinessProspect.bulkWrite(qualifiedOperations, { ordered: false });
        job.saved = result.upsertedCount + result.modifiedCount;
        job.duplicates = Math.max(0, qualifiedOperations.length - result.upsertedCount);
      }
      job.status = job.cancelRequested ? 'cancelled' : 'completed';
      job.stage = job.cancelRequested ? 'Cancelled' : (job.discovered ? 'Complete' : 'No matching records');
    } catch (err) {
      job.failures += 1;
      job.errors.push(err.message.slice(0, 300));
      if (stderr && process.env.NODE_ENV !== 'production') console.error(`Python discovery worker ${job.id}:`, stderr);
      job.status = 'failed';
      job.stage = 'Failed';
      console.error('Python public-data search failed:', err.message);
    } finally {
      job.completedAt = new Date().toISOString();
    }
  });
});

router.get('/lead-discovery/jobs', requireAdmin, (req, res) => {
  res.json({ success: true, jobs: [...discoveryJobs.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

router.get('/lead-discovery/jobs/:jobId', requireAdmin, (req, res) => {
  const job = discoveryJobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Search job not found.' });
  res.json({ success: true, job });
});

router.post('/lead-discovery/jobs/:jobId/cancel', requireAdmin, (req, res) => {
  const job = discoveryJobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Search job not found.' });
  if (!JOB_TERMINAL_STATES.has(job.status)) {
    job.cancelRequested = true;
    discoveryWorkers.get(job.id)?.kill();
  }
  res.json({ success: true, job });
});

router.get('/lead-discovery/leads', requireAdmin, async (req, res) => {
  if (BusinessProspect.db?.readyState !== 1) return res.status(503).json({ success: false, message: 'MongoDB is not connected.' });
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 25));
  const filter = { ...FINDER_SOURCE_FILTER };
  if (req.query.q) filter.name = { $regex: escapeRegex(cleanText(req.query.q, 100)), $options: 'i' };
  for (const field of ['state', 'district', 'leadStatus', 'category']) if (req.query[field]) filter[field] = cleanText(req.query[field], 100);
  if (req.query.websiteStatus) filter.websiteStatus = Array.isArray(req.query.websiteStatus) ? { $in: req.query.websiteStatus.map((value) => cleanText(value, 40)) } : cleanText(req.query.websiteStatus, 40);
  if (req.query.minScore) filter.leadScore = { $gte: Math.max(0, Number(req.query.minScore) || 0) };
  if (req.query.minRating) filter.rating = { $gte: Math.min(5, Math.max(0, Number(req.query.minRating) || 0)) };
  if (req.query.minReviews) filter.reviewCount = { $gte: Math.max(0, Number(req.query.minReviews) || 0) };
  if (req.query.minRating) filter.ratingVerified = true;
  const [leads, total] = await Promise.all([BusinessProspect.find(filter).sort({ updatedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), BusinessProspect.countDocuments(filter)]);
  res.json({ success: true, leads, total, page, pages: Math.ceil(total / limit) });
});

router.get('/lead-discovery/stats', requireAdmin, async (req, res) => {
  if (BusinessProspect.db?.readyState !== 1) return res.status(503).json({ success: false, message: 'MongoDB is not connected.' });
  const [total, highPriority, noWebsite, confirmedWebsiteErrors, verifiedRatings, publicPhones] = await Promise.all([
    BusinessProspect.countDocuments(FINDER_SOURCE_FILTER),
    BusinessProspect.countDocuments({ ...FINDER_SOURCE_FILTER, leadPriority: 'High' }),
    BusinessProspect.countDocuments({ ...FINDER_SOURCE_FILTER, websiteStatus: 'no_website_listed' }),
    BusinessProspect.countDocuments({ ...FINDER_SOURCE_FILTER, websiteStatus: { $in: ['page_not_found', 'server_error', 'dns_error', 'connection_error', 'ssl_error'] } }),
    BusinessProspect.countDocuments({ ...FINDER_SOURCE_FILTER, ratingVerified: true, rating: { $ne: null } }),
    BusinessProspect.countDocuments({ ...FINDER_SOURCE_FILTER, phone: { $nin: ['', null] } }),
  ]);
  res.json({ success: true, stats: { total, highPriority, noWebsite, confirmedWebsiteErrors, verifiedRatings, publicPhones } });
});

router.patch('/lead-discovery/leads/:id', requireAdmin, async (req, res) => {
  const allowed = ['name', 'category', 'phone', 'email', 'websiteUrl', 'leadStatus', 'notes'];
  const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowed.includes(key)));
  if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: 'No editable fields supplied.' });
  if (updates.leadStatus && !['New', 'Reviewed', 'Contacted', 'Interested', 'Follow-up required', 'Converted', 'Not interested', 'Invalid lead'].includes(updates.leadStatus)) return res.status(400).json({ success: false, message: 'Invalid lead status.' });
  if (updates.websiteUrl) { try { const url = new URL(updates.websiteUrl); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); } catch { return res.status(400).json({ success: false, message: 'Website URL must use HTTP or HTTPS.' }); } }
  if (updates.phone) updates.normalizedPhone = updates.phone.replace(/[^+\d]/g, '');
  const lead = await BusinessProspect.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
  res.json({ success: true, lead });
});

router.delete('/lead-discovery/leads/:id', requireAdmin, async (req, res) => {
  const lead = await BusinessProspect.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
  res.json({ success: true });
});

router.post('/lead-discovery/leads/:id/check-website', requireAdmin, async (req, res) => {
  const lead = await BusinessProspect.findById(req.params.id);
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
  try {
    let diagnostic;
    try { diagnostic = await checkWebsite(lead.websiteUrl); }
    catch (err) {
      const message = err.message || '';
      diagnostic = { websiteStatus: /ENOTFOUND|ENODATA/.test(message) ? 'dns_error' : err.name === 'TimeoutError' || err.name === 'AbortError' || /timeout/i.test(message) ? 'timeout' : /SSL|certificate/i.test(message) ? 'ssl_error' : /Private|Invalid|Only public/.test(message) ? 'needs_manual_review' : 'connection_error', websiteHttpStatus: null, websiteFinalUrl: '', websiteCheckedAt: new Date() };
    }
    Object.assign(lead, diagnostic, calculateLeadScore({ websiteStatus: diagnostic.websiteStatus, phone: lead.phone, rating: lead.rating, ratingVerified: lead.ratingVerified, reviewCount: lead.reviewCount }));
    await lead.save();
    res.json({ success: true, lead });
  } catch (err) { res.status(502).json({ success: false, message: 'Website check could not be completed.', details: err.message }); }
});

router.get('/lead-discovery/export', requireAdmin, async (req, res) => {
  if (BusinessProspect.db?.readyState !== 1) return res.status(503).json({ success: false, message: 'MongoDB is not connected.' });
  const filter = { ...FINDER_SOURCE_FILTER };
  for (const field of ['state', 'district', 'leadStatus', 'websiteStatus', 'category']) if (req.query[field]) filter[field] = cleanText(req.query[field], 100);
  if (req.query.minRating) { filter.rating = { $gte: Math.min(5, Math.max(0, Number(req.query.minRating) || 0)) }; filter.ratingVerified = true; }
  if (req.query.minReviews) filter.reviewCount = { $gte: Math.max(0, Number(req.query.minReviews) || 0) };
  if (req.query.q) filter.name = { $regex: escapeRegex(cleanText(req.query.q, 100)), $options: 'i' };
  const leads = await BusinessProspect.find(filter).sort({ updatedAt: -1 }).limit(5000).lean();
  const columns = ['name', 'category', 'district', 'state', 'rating', 'reviewCount', 'phone', 'email', 'websiteUrl', 'websiteStatus', 'leadScore', 'leadPriority', 'sourceUrl', 'leadStatus', 'createdAt'];
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="lead-finder-export.csv"');
  res.send([columns.map(csvCell).join(','), ...leads.map((lead) => columns.map((key) => csvCell(lead[key])).join(','))].join('\r\n'));
});

router.post('/lead-discovery/leads/bulk-update', requireAdmin, async (req, res) => {
  const { ids, leadStatus } = req.body || {};
  if (!Array.isArray(ids) || ids.length > 100 || !['New', 'Reviewed', 'Contacted', 'Interested', 'Follow-up required', 'Converted', 'Not interested', 'Invalid lead'].includes(leadStatus)) return res.status(400).json({ success: false, message: 'Provide up to 100 lead IDs and a valid status.' });
  const result = await BusinessProspect.updateMany({ _id: { $in: ids } }, { $set: { leadStatus } });
  res.json({ success: true, updated: result.modifiedCount });
});

export default router;
