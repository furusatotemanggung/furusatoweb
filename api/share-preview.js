const { readFirestoreDocument } = require('./_auth');

// GET /api/share-preview — gambar Open Graph untuk pratinjau tautan.
// Mem-proxy logo situs dari Firestore (site/main.logoUrl); bila tidak ada,
// mengembalikan SVG bawaan seperti perilaku server lama.

const FALLBACK_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="LPK FURUSATO TEMANGGUNG">
  <rect width="1200" height="630" fill="#111827"/>
  <rect x="64" y="64" width="1072" height="502" rx="32" fill="#1f2937" stroke="#374151" stroke-width="2"/>
  <text x="116" y="170" fill="#f3f4f6" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700">LPK FURUSATO TEMANGGUNG</text>
  <text x="116" y="236" fill="#60a5fa" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700">LPK FURUSATO TEMANGGUNG</text>
  <text x="116" y="288" fill="#93c5fd" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700">Lembaga Pelatihan Kerja Bahasa Jepang</text>
  <text x="116" y="354" fill="#e5e7eb" font-family="Arial, Helvetica, sans-serif" font-size="28">Furusato Temanggung adalah lembaga pelatihan kerja bahasa Jepang</text>
  <text x="116" y="398" fill="#e5e7eb" font-family="Arial, Helvetica, sans-serif" font-size="28">yang membekali peserta dengan kemampuan bahasa, disiplin, dan kesiapan</text>
  <text x="116" y="442" fill="#e5e7eb" font-family="Arial, Helvetica, sans-serif" font-size="28">kerja untuk Jepang.</text>
</svg>`;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const site = await readFirestoreDocument('site', 'main');
  const logoUrl = site?.logoUrl || '';

  if (/^https?:\/\//i.test(logoUrl)) {
    try {
      const response = await fetch(logoUrl);
      if (response.ok) {
        const contentType = response.headers.get('content-type') || 'image/png';
        const buffer = Buffer.from(await response.arrayBuffer());
        res.setHeader('Content-Type', contentType);
        res.status(200).send(buffer);
        return;
      }
    } catch (_error) {
      // Jatuh ke SVG bawaan di bawah.
    }
  }

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(FALLBACK_SVG);
};
