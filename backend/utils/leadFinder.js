export const classifyWebsiteStatus = (status) => (
  status >= 200 && status < 400 ? 'working'
    : status === 404 || status === 410 ? 'page_not_found'
      : status >= 500 ? 'server_error'
        : status === 403 || status === 429 ? 'needs_manual_review'
          : status >= 400 ? 'http_error' : 'needs_manual_review'
);

export const calculateLeadScore = (lead) => {
  const noSite = lead.websiteStatus === 'no_website_listed' ? 40 : 0;
  const siteError = ['page_not_found', 'server_error', 'dns_error', 'connection_error', 'ssl_error'].includes(lead.websiteStatus) ? 30 : 0;
  const rating = lead.ratingVerified && Number(lead.rating) >= 4 ? 20 : 0;
  const phone = lead.phone ? 10 : 0;
  const reviews = Number(lead.reviewCount) >= 10 ? 10 : 0;
  const score = noSite + siteError + rating + phone + reviews;
  return { leadScore: score, leadPriority: score >= 80 ? 'High' : score >= 50 ? 'Medium' : 'Low' };
};

export const csvCell = (value) => {
  let text = String(value ?? '').replace(/[\r\n]+/g, ' ');
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};
