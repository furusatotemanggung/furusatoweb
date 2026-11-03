// Helper bersama untuk function di folder api/ (bukan route — diawali "_").
// Memverifikasi Firebase ID token lewat Identity Toolkit REST memakai
// API key web Firebase. Mengembalikan data user bila token valid.

async function verifyFirebaseToken(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';

  if (!token) {
    return null;
  }

  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    const user = payload.users && payload.users[0];
    return user || null;
  } catch (_error) {
    return null;
  }
}

// Membaca dokumen Firestore lewat REST (aturan keamanan mengizinkan baca publik).
async function readFirestoreDocument(collectionName, docId) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) {
    return null;
  }

  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${docId}`,
    );

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    const fields = payload.fields || {};
    const result = {};

    Object.entries(fields).forEach(([key, value]) => {
      if (typeof value.stringValue === 'string') {
        result[key] = value.stringValue;
      }
    });

    return result;
  } catch (_error) {
    return null;
  }
}

module.exports = { verifyFirebaseToken, readFirestoreDocument };
