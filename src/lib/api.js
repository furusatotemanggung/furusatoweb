import {
  collection,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  getDocsFromServer,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './firebase';

// Rework: data publik kini dibaca langsung dari Firestore (dulu via Express /api/*).
// Nama & tanda tangan fungsi dipertahankan agar komponen tidak berubah.

export const API_BASE_URL = '';

const translationCache = new Map();

// Sisipkan transformasi Cloudinary (format otomatis + kualitas otomatis + batas lebar)
// agar gambar yang ditayangkan selalu versi ringannya.
// Varian 'portrait' untuk foto potret orang (kartu lulus job): crop 4/5 yang
// sadar wajah (g_face) dari Cloudinary, jadi kepala tidak terpotong.
export function optimizeCloudinaryUrl(url, variant) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  const marker = '/upload/';
  const idx = url.indexOf(marker);
  const rest = url.slice(idx + marker.length);
  const firstSegment = rest.split('/')[0];

  // Jika segmen pertama adalah versi (v123) atau nama file, berarti belum ada transformasi.
  if (/^v\d+$/.test(firstSegment) || firstSegment.includes('.')) {
    const transform = variant === 'portrait'
      ? 'f_auto,q_auto,c_fill,g_face,w_800,h_1000'
      : 'f_auto,q_auto,c_limit,w_1600';
    return `${url.slice(0, idx + marker.length)}${transform}/${rest}`;
  }

  return url;
}

export function resolveMediaUrl(url, variant) {
  if (!url) {
    return '';
  }

  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) {
    return optimizeCloudinaryUrl(url, variant);
  }

  return url;
}

async function readCollection(name, fallback, fresh = false) {
  try {
    const q = query(collection(db, name), orderBy('sortOrder', 'asc'));
    const snap = fresh ? await getDocsFromServer(q) : await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (_error) {
    return fallback;
  }
}

async function readDocument(collectionName, docId, fallback, fresh = false) {
  try {
    const ref = doc(db, collectionName, docId);
    const snap = fresh ? await getDocFromServer(ref) : await getDoc(ref);
    return snap.exists() ? snap.data() : fallback;
  } catch (_error) {
    return fallback;
  }
}

// fetchJson dipertahankan untuk kompatibilitas pemanggil lama:
// path /api/* lama dipetakan ke koleksi/dokumen Firestore.
export async function fetchJson(path, fallback, options = {}) {
  const fresh = Boolean(options.fresh);

  switch (path) {
    case '/api/news':
      return readCollection('news', fallback, fresh);
    case '/api/gallery':
      return readCollection('gallery', fallback, fresh);
    case '/api/lulus-job':
      return readCollection('lulusJobs', fallback, fresh);
    case '/api/home-content': {
      const data = await readDocument('content', 'home', null, fresh);
      return data || fallback;
    }
    case '/api/about-content': {
      const data = await readDocument('content', 'about', null, fresh);
      if (!data) {
        return fallback;
      }
      return data.aboutContent || fallback;
    }
    default:
      return fallback;
  }
}

export async function fetchSite(fallback, options = {}) {
  const data = await readDocument('site', 'main', null, Boolean(options.fresh));
  return data || fallback;
}

// Dipakai lapisan admin untuk bacaan yang tidak boleh kena cache.
export async function readCollectionFresh(name) {
  const q = query(collection(db, name), orderBy('sortOrder', 'asc'));
  const snap = await getDocsFromServer(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function readDocumentFresh(collectionName, docId) {
  const snap = await getDocFromServer(doc(db, collectionName, docId));
  return snap.exists() ? snap.data() : null;
}

function getTranslationCacheKey(source, target, text) {
  return `${source}::${target}::${text}`;
}

export async function translateTexts(texts, options = {}) {
  const source = options.source || 'id';
  const target = options.target || 'ja';
  const normalizedTexts = Array.isArray(texts) ? texts.map((text) => (typeof text === 'string' ? text : '')) : [];

  if (!normalizedTexts.length || source === target) {
    return normalizedTexts;
  }

  const results = new Array(normalizedTexts.length);
  const missingTexts = [];
  const missingIndices = [];

  normalizedTexts.forEach((text, index) => {
    if (!text) {
      results[index] = text;
      return;
    }

    const cacheKey = getTranslationCacheKey(source, target, text);
    if (translationCache.has(cacheKey)) {
      results[index] = translationCache.get(cacheKey);
      return;
    }

    missingTexts.push(text);
    missingIndices.push(index);
  });

  if (missingTexts.length) {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texts: missingTexts, source, target }),
      });

      if (!response.ok) {
        throw new Error(`Translate request failed: ${response.status}`);
      }

      const payload = await response.json();
      const translatedTexts = Array.isArray(payload.translations) ? payload.translations : [];

      translatedTexts.forEach((translatedText, index) => {
        const originalText = missingTexts[index];
        const cacheKey = getTranslationCacheKey(source, target, originalText);
        const finalText = typeof translatedText === 'string' && translatedText ? translatedText : originalText;
        translationCache.set(cacheKey, finalText);
      });

      missingIndices.forEach((resultIndex, translatedIndex) => {
        const originalText = missingTexts[translatedIndex];
        const cacheKey = getTranslationCacheKey(source, target, originalText);
        results[resultIndex] = translationCache.get(cacheKey) || originalText;
      });
    } catch (_error) {
      return normalizedTexts.map((text, index) => results[index] || translationCache.get(getTranslationCacheKey(source, target, text)) || text);
    }
  }

  return normalizedTexts.map((text, index) => results[index] || translationCache.get(getTranslationCacheKey(source, target, text)) || text);
}
