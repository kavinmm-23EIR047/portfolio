import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateLeadScore, classifyWebsiteStatus, csvCell } from '../utils/leadFinder.js';

test('unavailable ratings do not add rating points', () => {
  assert.deepEqual(calculateLeadScore({ websiteStatus: 'no_website_listed', rating: null, ratingVerified: false, phone: '', reviewCount: null }), { leadScore: 40, leadPriority: 'Low' });
});

test('verified rating, public phone, reviews and missing website contribute once', () => {
  assert.deepEqual(calculateLeadScore({ websiteStatus: 'no_website_listed', rating: 4.6, ratingVerified: true, phone: '+91 12345', reviewCount: 25 }), { leadScore: 80, leadPriority: 'High' });
});

test('transient HTTP limitations are not classified as broken websites', () => {
  assert.equal(classifyWebsiteStatus(429), 'needs_manual_review');
  assert.equal(classifyWebsiteStatus(403), 'needs_manual_review');
  assert.equal(classifyWebsiteStatus(503), 'server_error');
  assert.equal(classifyWebsiteStatus(404), 'page_not_found');
});

test('CSV fields escape quotes and neutralize spreadsheet formulas', () => {
  assert.equal(csvCell('=HYPERLINK("x")'), '"\'=HYPERLINK(""x"")"');
  assert.equal(csvCell('Dentist\nShop'), '"Dentist Shop"');
});
