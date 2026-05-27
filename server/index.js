'use strict';
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const sgMail     = require('@sendgrid/mail');
const twilio     = require('twilio');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '25mb' }));

// ── Service config ─────────────────────────────────────────
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Helpers ────────────────────────────────────────────────
async function uploadToCloudinary(dataUrl) {
  const publicId = `jpeg-gen-${Date.now()}`;
  const result   = await cloudinary.uploader.upload(dataUrl, {
    public_id:   publicId,
    overwrite:   true,
    resource_type: 'image',
  });
  // Delete after 5 minutes — just needs to be accessible long enough for Twilio to fetch it
  setTimeout(() => cloudinary.uploader.destroy(publicId).catch(() => {}), 5 * 60 * 1000);
  return result.secure_url;
}

// ── POST /api/send ─────────────────────────────────────────
app.post('/api/send', async (req, res) => {
  const {
    channel,
    recipient,
    imageBase64,
    filename = 'image.jpg',
    message  = '',
  } = req.body;

  if (!channel || !recipient || !imageBase64) {
    return res.status(400).json({ error: 'channel, recipient, and imageBase64 are required.' });
  }

  try {
    // ── Email ───────────────────────────────────────────────
    if (channel === 'email') {
      const base64Content = imageBase64.split(',')[1];
      await sgMail.send({
        to:      recipient,
        from:    process.env.FROM_EMAIL,
        subject: message || 'Your image',
        text:    message || 'Here is your image.',
        attachments: [{
          content:     base64Content,
          filename,
          type:        'image/jpeg',
          disposition: 'attachment',
        }],
      });
      return res.json({ success: true });
    }

    // ── SMS / WhatsApp ──────────────────────────────────────
    if (channel === 'sms' || channel === 'whatsapp') {
      const imageUrl = await uploadToCloudinary(imageBase64);

      const from = channel === 'whatsapp'
        ? `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
        : process.env.TWILIO_PHONE;

      const to = channel === 'whatsapp'
        ? `whatsapp:${recipient}`
        : recipient;

      await twilioClient.messages.create({
        from,
        to,
        body:     message || 'Here is your image.',
        mediaUrl: [imageUrl],
      });

      return res.json({ success: true });
    }

    return res.status(400).json({ error: `Unknown channel: ${channel}` });

  } catch (err) {
    console.error('[send error]', err?.response?.body || err.message);
    const detail = err?.response?.body?.errors?.[0]?.message || err.message || 'Send failed.';
    return res.status(500).json({ error: detail });
  }
});

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Send server → http://localhost:${PORT}`));
