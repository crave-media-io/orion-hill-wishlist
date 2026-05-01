const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'wishlist@orionhillevents.com';
const FROM_NAME = process.env.FROM_NAME || 'Orion Hill Events';
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';

const submissions = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = submissions.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    submissions.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function sendBrevoEmail({ to, toName, subject, htmlContent }) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: to, name: toName || to }],
      subject,
      htmlContent
    })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo API error ${res.status}: ${body}`);
  }
  return res.json();
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.some(o => origin.includes(o))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  const { clientId, firstName, lastName, email, phone, message, dates, scheduleTour, honeypot } = req.body || {};

  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  if (!clientId || !firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!dates || !Array.isArray(dates) || dates.length === 0 || dates.length > 5) {
    return res.status(400).json({ error: 'Please select between 1 and 5 dates' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (!NOTIFICATION_EMAIL) {
    console.error('[Wishlist API] NOTIFICATION_EMAIL env var not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  if (!BREVO_API_KEY) {
    console.error('[Wishlist API] BREVO_API_KEY env var not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const fullName = firstName.trim() + ' ' + lastName.trim();

  const formattedDates = dates.map(ds => {
    const [y, m, d] = ds.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  });

  const datesHtml = formattedDates.map(d =>
    `<tr><td style="padding:8px 16px;border-bottom:1px solid #f0ebe3;font-size:14px;color:#2A2420">${escapeHtml(d)}</td></tr>`
  ).join('');

  const tourBadge = scheduleTour
    ? '<span style="background:#B08B4A;color:white;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:500">Tour Requested</span>'
    : '';

  try {
    await sendBrevoEmail({
      to: NOTIFICATION_EMAIL,
      toName: FROM_NAME,
      subject: `New Date Wishlist from ${fullName}${scheduleTour ? ' (Tour Requested)' : ''}`,
      htmlContent: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f2ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:560px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)">

<div style="background:#1F2A1F;padding:28px 32px;text-align:center">
  <div style="color:#B08B4A;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px">New Wishlist Submission</div>
  <div style="color:#FAF6EE;font-size:22px;font-weight:500">${escapeHtml(fullName)}</div>
</div>

<div style="padding:28px 32px">
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
    <tr><td style="padding:6px 0;font-size:12px;color:#6B6860;text-transform:uppercase;letter-spacing:1px;font-weight:500">Email</td><td style="padding:6px 0;font-size:14px;color:#2A2420"><a href="mailto:${escapeHtml(email.trim())}" style="color:#B08B4A">${escapeHtml(email.trim())}</a></td></tr>
    <tr><td style="padding:6px 0;font-size:12px;color:#6B6860;text-transform:uppercase;letter-spacing:1px;font-weight:500">Phone</td><td style="padding:6px 0;font-size:14px;color:#2A2420"><a href="tel:${escapeHtml(phone.trim())}" style="color:#B08B4A">${escapeHtml(phone.trim())}</a></td></tr>
    ${scheduleTour ? '<tr><td style="padding:6px 0;font-size:12px;color:#6B6860;text-transform:uppercase;letter-spacing:1px;font-weight:500">Tour</td><td style="padding:6px 0">' + tourBadge + '</td></tr>' : ''}
  </table>

  ${message?.trim() ? '<div style="background:#FAF6EE;border-radius:8px;padding:16px;margin-bottom:20px"><div style="font-size:11px;color:#6B6860;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;font-weight:500">Message</div><div style="font-size:14px;color:#2A2420;line-height:1.6">' + escapeHtml(message.trim()) + '</div></div>' : ''}

  <div style="font-size:11px;color:#6B6860;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;font-weight:500">Preferred Dates (${dates.length})</div>
  <table style="width:100%;border-collapse:collapse;background:#FFFDF8;border-radius:8px;overflow:hidden;border:1px solid #f0ebe3">
    ${datesHtml}
  </table>
</div>

<div style="padding:16px 32px 20px;border-top:1px solid #f0ebe3;text-align:center;font-size:11px;color:#6B6860">
  Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })} ET
</div>

</div>
</body></html>`
    });

    await sendBrevoEmail({
      to: email.trim(),
      toName: fullName,
      subject: 'We received your date wishlist!',
      htmlContent: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f2ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:560px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)">

<div style="background:#1F2A1F;padding:32px;text-align:center">
  <div style="color:#B08B4A;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-bottom:8px">Orion Hill Events</div>
  <div style="color:#FAF6EE;font-size:24px;font-weight:500;line-height:1.3">Thank you, ${escapeHtml(firstName.trim())}!</div>
</div>

<div style="padding:28px 32px">
  <p style="font-size:15px;color:#2A2420;line-height:1.7;margin:0 0 20px">We've received your date wishlist and our hospitality team will follow up within one business day to discuss availability and next steps.</p>

  <div style="font-size:11px;color:#6B6860;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;font-weight:500">Your Preferred Dates</div>
  <table style="width:100%;border-collapse:collapse;background:#FFFDF8;border-radius:8px;overflow:hidden;border:1px solid #f0ebe3;margin-bottom:20px">
    ${datesHtml}
  </table>

  ${scheduleTour ? '<p style="font-size:14px;color:#2A2420;background:rgba(176,139,74,0.08);padding:14px 16px;border-radius:8px;border-left:3px solid #B08B4A;margin:0 0 20px">We noted your interest in an in-person tour. We\'ll include scheduling details in our follow-up.</p>' : ''}

  <p style="font-size:13px;color:#6B6860;line-height:1.6;margin:0">Dates are offered on a first-come, first-served basis. If you have any questions in the meantime, don't hesitate to reach out.</p>
</div>

<div style="padding:16px 32px 20px;border-top:1px solid #f0ebe3;text-align:center;font-size:11px;color:#6B6860">
  Orion Hill Events &middot; First-come, first-served
</div>

</div>
</body></html>`
    });

    console.log('[Wishlist API] Submission processed:', { clientId, firstName: firstName.trim(), lastName: lastName.trim(), dates, scheduleTour });
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('[Wishlist API] Email send error:', err);
    return res.status(500).json({ error: 'Failed to process your submission. Please try again.' });
  }
};
