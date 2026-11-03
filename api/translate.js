// POST /api/translate — proxy Google Translate (endpoint gtx gratis) dengan
// cache di memori. Kontrak sama seperti server lama:
// body { texts?: string[], text?: string, source = 'id', target = 'ja' }
// -> { translations: string[] }

const translationCache = new Map();

function extractGoogleTranslation(payload) {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    return '';
  }

  return payload[0]
    .map((segment) => (Array.isArray(segment) ? segment[0] || '' : ''))
    .join('');
}

async function translateText(text, source = 'id', target = 'ja') {
  if (!text || source === target) {
    return text;
  }

  const cacheKey = `${source}::${target}::${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
  endpoint.searchParams.set('client', 'gtx');
  endpoint.searchParams.set('sl', source);
  endpoint.searchParams.set('tl', target);
  endpoint.searchParams.set('dt', 't');
  endpoint.searchParams.set('q', text);

  const response = await fetch(endpoint.toString(), {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });

  if (!response.ok) {
    throw new Error(`Failed to translate text: ${response.status}`);
  }

  const payload = await response.json();
  const translatedText = extractGoogleTranslation(payload) || text;
  translationCache.set(cacheKey, translatedText);

  return translatedText;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method tidak diizinkan.' });
    return;
  }

  const body = req.body || {};
  const texts = Array.isArray(body.texts)
    ? body.texts
    : (typeof body.text === 'string' ? [body.text] : []);
  const source = typeof body.source === 'string' ? body.source : 'id';
  const target = typeof body.target === 'string' ? body.target : 'ja';

  if (!texts.length) {
    res.status(200).json({ translations: [] });
    return;
  }

  if (texts.length > 50) {
    res.status(400).json({ message: 'Maksimal 50 teks per permintaan terjemahan.' });
    return;
  }

  try {
    const translations = await Promise.all(
      texts.map((text) => translateText(String(text), source, target)),
    );
    res.status(200).json({ translations });
  } catch (_error) {
    res.status(502).json({ message: 'Layanan terjemahan sedang bermasalah.' });
  }
};
