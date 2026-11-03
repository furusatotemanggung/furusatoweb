const crypto = require('crypto');
const { verifyFirebaseToken } = require('./_auth');

// POST /api/cloudinary-delete — menghapus satu gambar Cloudinary dari URL-nya.
// Hanya admin login, dan hanya aset di folder furusato/ yang boleh dihapus.

function publicIdFromUrl(imageUrl) {
  try {
    const parsed = new URL(imageUrl);
    if (!parsed.hostname.includes('res.cloudinary.com')) {
      return '';
    }

    const marker = '/upload/';
    const index = parsed.pathname.indexOf(marker);
    if (index === -1) {
      return '';
    }

    let rest = parsed.pathname.slice(index + marker.length);
    rest = rest.replace(/^v\d+\//, '');
    rest = rest.replace(/\.[a-zA-Z0-9]+$/, '');
    return decodeURIComponent(rest);
  } catch (_error) {
    return '';
  }
}

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

  const publicId = publicIdFromUrl(req.body?.imageUrl || '');
  if (!publicId || !publicId.startsWith('furusato/')) {
    res.status(400).json({ message: 'URL gambar tidak valid untuk dihapus.' });
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');

  const form = new URLSearchParams({
    public_id: publicId,
    api_key: apiKey,
    timestamp: String(timestamp),
    signature,
  });

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      { method: 'POST', body: form },
    );
    const payload = await response.json().catch(() => ({}));
    res.status(200).json({ result: payload.result || 'unknown' });
  } catch (_error) {
    res.status(502).json({ message: 'Gagal menghubungi Cloudinary.' });
  }
};
