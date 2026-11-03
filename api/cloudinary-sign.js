const crypto = require('crypto');
const { verifyFirebaseToken } = require('./_auth');

// POST /api/cloudinary-sign — membuat signature upload Cloudinary.
// Hanya untuk admin yang sudah login (Firebase ID token wajib valid).
// API secret tidak pernah keluar dari server.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method tidak diizinkan.' });
    return;
  }

  const user = await verifyFirebaseToken(req);
  if (!user) {
    res.status(401).json({ message: 'Akses admin diperlukan.' });
    return;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({ message: 'Konfigurasi Cloudinary belum lengkap di server.' });
    return;
  }

  const requestedFolder = typeof req.body?.folder === 'string' ? req.body.folder : 'furusato';
  const folder = requestedFolder.startsWith('furusato') ? requestedFolder : 'furusato';
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');

  res.status(200).json({ cloudName, apiKey, timestamp, signature, folder });
};
