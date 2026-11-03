import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { readCollectionFresh, readDocumentFresh } from '../lib/api';

// Rework: lapisan admin kini bicara langsung ke Firestore + Firebase Auth
// (dulu via Express /api/admin/*). Semua nama fungsi lama dipertahankan agar
// AdminDashboardPage tidak perlu diubah perilakunya.

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

// ---------------------------------------------------------------------------
// Auth (Firebase Authentication)
// ---------------------------------------------------------------------------

let currentUser = null;
let authReadyPromise = null;

function ensureAuthListener() {
  if (!authReadyPromise) {
    authReadyPromise = new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        currentUser = user;
        resolve(user);
      });
    });
  }
  return authReadyPromise;
}

export async function waitForAdminUser() {
  await ensureAuthListener();
  return currentUser;
}

export function isAdminLoggedIn() {
  return Boolean(auth.currentUser || currentUser);
}

export function setAdminToken(_token) {
  // Dipertahankan untuk kompatibilitas — sesi kini dikelola Firebase Auth.
}

export function getAdminToken() {
  return currentUser ? currentUser.getIdToken() : Promise.resolve('');
}

export function clearAdminToken() {
  currentUser = null;
  return signOut(auth).catch(() => {});
}

export function refreshAdminSession() {
  // Dipertahankan untuk kompatibilitas — Firebase Auth menyegarkan sesi otomatis.
}

function mapAuthError(error) {
  switch (error?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return new Error('Email atau password salah.');
    case 'auth/invalid-email':
      return new Error('Format email tidak valid.');
    case 'auth/too-many-requests':
      return new Error('Terlalu banyak percobaan login. Coba lagi nanti.');
    case 'auth/requires-recent-login':
      return new Error('Demi keamanan, silakan logout lalu login lagi sebelum mengubah email/password.');
    case 'auth/email-already-in-use':
      return new Error('Email itu sudah dipakai akun lain.');
    case 'auth/weak-password':
      return new Error('Password terlalu lemah (minimal 6 karakter).');
    default:
      return new Error(error?.message || 'Terjadi kesalahan. Coba lagi.');
  }
}

export async function loginAdmin(credentials) {
  const email = (credentials.email || credentials.username || '').trim();
  const password = credentials.password || '';

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    currentUser = result.user;
    return { token: await result.user.getIdToken(), user: result.user };
  } catch (error) {
    throw mapAuthError(error);
  }
}

export async function getAdminAccount() {
  const user = await waitForAdminUser();
  if (!user) {
    throw new Error('Akses admin diperlukan.');
  }
  return { username: user.email || '' };
}

export async function updateAdminAccount(payload) {
  const user = await waitForAdminUser();
  if (!user) {
    throw new Error('Akses admin diperlukan.');
  }

  const nextEmail = (payload.username || '').trim();
  const nextPassword = (payload.password || '').trim();

  try {
    if (nextEmail && nextEmail !== user.email) {
      await updateEmail(user, nextEmail);
    }
    if (nextPassword) {
      await updatePassword(user, nextPassword);
    }
  } catch (error) {
    throw mapAuthError(error);
  }

  return { username: nextEmail || user.email };
}

// ---------------------------------------------------------------------------
// Util CRUD generik — satu implementasi untuk semua resource.
// Field disaring dengan whitelist: field liar dari client (mis. "action")
// tidak akan pernah tersimpan lagi.
// ---------------------------------------------------------------------------

const RESOURCE_FIELDS = {
  news: ['date', 'title', 'description', 'content', 'imageUrl', 'source'],
  gallery: ['title', 'description', 'imageUrl'],
  lulusJobs: ['name', 'origin', 'quote', 'imageUrl'],
};

function pickFields(resource, payload) {
  const allowed = RESOURCE_FIELDS[resource] || [];
  const picked = {};
  allowed.forEach((field) => {
    if (payload[field] !== undefined) {
      picked[field] = payload[field];
    }
  });
  return picked;
}

async function getSortOrderFloor(resource) {
  const items = await readCollectionFresh(resource);
  if (!items.length) {
    return 0;
  }
  return Math.min(...items.map((item) => (typeof item.sortOrder === 'number' ? item.sortOrder : 0)));
}

async function createItem(resource, payload) {
  const data = pickFields(resource, payload);
  const floor = await getSortOrderFloor(resource);
  const ref = await addDoc(collection(db, resource), {
    ...data,
    sortOrder: floor - 1,
    createdAt: Date.now(),
  });
  return { id: ref.id, ...data };
}

async function updateItem(resource, id, payload) {
  const data = pickFields(resource, payload);
  const ref = doc(db, resource, id);
  const before = await getDoc(ref);

  if (!before.exists()) {
    throw new Error('Data tidak ditemukan.');
  }

  const previous = before.data();
  await updateDoc(ref, data);

  if (previous.imageUrl && data.imageUrl !== undefined && data.imageUrl !== previous.imageUrl) {
    await destroyCloudinaryImageIfUnused(previous.imageUrl);
  }

  return { id, ...previous, ...data };
}

async function deleteItem(resource, id) {
  const ref = doc(db, resource, id);
  const before = await getDoc(ref);
  const previous = before.exists() ? before.data() : null;

  await deleteDoc(ref);

  if (previous?.imageUrl) {
    await destroyCloudinaryImageIfUnused(previous.imageUrl);
  }

  return null;
}

// ---------------------------------------------------------------------------
// Cloudinary — hapus gambar hanya bila TIDAK ada referensi lain yang memakai
// URL yang sama (bug lama: gambar bersama ikut terhapus).
// ---------------------------------------------------------------------------

async function isImageStillReferenced(imageUrl) {
  const resources = Object.keys(RESOURCE_FIELDS);

  for (const resource of resources) {
    const snap = await getDocs(query(collection(db, resource), where('imageUrl', '==', imageUrl)));
    if (!snap.empty) {
      return true;
    }
  }

  const site = await readDocumentFresh('site', 'main');
  if (site && JSON.stringify(site).includes(imageUrl)) {
    return true;
  }

  const home = await readDocumentFresh('content', 'home');
  if (home && JSON.stringify(home).includes(imageUrl)) {
    return true;
  }

  const about = await readDocumentFresh('content', 'about');
  if (about && JSON.stringify(about).includes(imageUrl)) {
    return true;
  }

  return false;
}

async function destroyCloudinaryImageIfUnused(imageUrl) {
  try {
    if (!imageUrl || !imageUrl.includes('res.cloudinary.com')) {
      return;
    }

    if (await isImageStillReferenced(imageUrl)) {
      return;
    }

    const user = await waitForAdminUser();
    if (!user) {
      return;
    }

    const idToken = await user.getIdToken();
    await fetch('/api/cloudinary-delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ imageUrl }),
    });
  } catch (_error) {
    // Gagal menghapus file di Cloudinary tidak boleh menggagalkan operasi CRUD.
  }
}

export async function uploadImage(file) {
  if (!file) {
    throw new Error('File gambar belum dipilih.');
  }

  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar.');
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Ukuran gambar terlalu besar. Maksimal 8 MB.');
  }

  const user = await waitForAdminUser();
  if (!user) {
    throw new Error('Akses admin diperlukan.');
  }

  const idToken = await user.getIdToken();
  const signResponse = await fetch('/api/cloudinary-sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ folder: 'furusato' }),
  });

  if (!signResponse.ok) {
    throw new Error('Gagal menyiapkan upload. Coba lagi.');
  }

  const sign = await signResponse.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', sign.apiKey);
  formData.append('timestamp', sign.timestamp);
  formData.append('signature', sign.signature);
  formData.append('folder', sign.folder);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
    { method: 'POST', body: formData },
  );

  if (!uploadResponse.ok) {
    throw new Error('Upload ke Cloudinary gagal. Coba lagi.');
  }

  const result = await uploadResponse.json();
  return {
    filename: result.public_id,
    imageUrl: result.secure_url,
  };
}

// ---------------------------------------------------------------------------
// Berita
// ---------------------------------------------------------------------------

export async function getNews() {
  return readCollectionFresh('news');
}

export async function createNews(payload) {
  return createItem('news', payload);
}

export async function updateNews(id, payload) {
  return updateItem('news', id, payload);
}

export async function deleteNews(id) {
  return deleteItem('news', id);
}

// ---------------------------------------------------------------------------
// Galeri
// ---------------------------------------------------------------------------

export async function getGallery() {
  return readCollectionFresh('gallery');
}

export async function createGallery(payload) {
  return createItem('gallery', payload);
}

export async function updateGallery(id, payload) {
  return updateItem('gallery', id, payload);
}

export async function deleteGallery(id) {
  return deleteItem('gallery', id);
}

// ---------------------------------------------------------------------------
// Lulus Job
// ---------------------------------------------------------------------------

export async function getLulusJobs() {
  return readCollectionFresh('lulusJobs');
}

export async function createLulusJob(payload) {
  return createItem('lulusJobs', payload);
}

export async function updateLulusJob(id, payload) {
  return updateItem('lulusJobs', id, payload);
}

export async function deleteLulusJob(id) {
  return deleteItem('lulusJobs', id);
}

// ---------------------------------------------------------------------------
// Dokumen tunggal: site, home content, about content
// ---------------------------------------------------------------------------

export async function getSiteSettings() {
  return (await readDocumentFresh('site', 'main')) || {};
}

export async function updateSiteSettings(payload) {
  const current = (await readDocumentFresh('site', 'main')) || {};
  const next = {
    ...current,
    ...payload,
    backgrounds: { ...(current.backgrounds || {}), ...(payload.backgrounds || {}) },
    socials: { ...(current.socials || {}), ...(payload.socials || {}) },
  };
  await setDoc(doc(db, 'site', 'main'), next);
  return next;
}

export async function getHomeContent() {
  const data = (await readDocumentFresh('content', 'home')) || {};
  return {
    heroBackgroundUrl: data.heroBackgroundUrl || '',
    jobInfo: data.jobInfo || {},
    jobBanner: data.jobBanner || {},
    partners: data.partners || [],
  };
}

export async function updateHomeContent(payload) {
  const current = (await readDocumentFresh('content', 'home')) || {};
  const next = { ...current };

  if (Object.prototype.hasOwnProperty.call(payload, 'heroBackgroundUrl')) {
    next.heroBackgroundUrl = payload.heroBackgroundUrl || '';
  }

  next.jobInfo = { ...(current.jobInfo || {}), ...(payload.jobInfo || {}) };
  next.jobBanner = { ...(current.jobBanner || {}), ...(payload.jobBanner || {}) };
  next.partners = payload.partners || current.partners || [];

  await setDoc(doc(db, 'content', 'home'), next);
  return {
    heroBackgroundUrl: next.heroBackgroundUrl,
    jobInfo: next.jobInfo,
    jobBanner: next.jobBanner,
    partners: next.partners,
  };
}

export async function updateJobBanner(payload) {
  const current = (await readDocumentFresh('content', 'home')) || {};
  const next = {
    ...current,
    jobInfo: { ...(current.jobInfo || {}), ...(payload.jobInfo || {}) },
    jobBanner: { ...(current.jobBanner || {}), ...(payload.jobBanner || {}) },
  };
  await setDoc(doc(db, 'content', 'home'), next);
  return {
    heroBackgroundUrl: next.heroBackgroundUrl || '',
    jobInfo: next.jobInfo || {},
    jobBanner: next.jobBanner || {},
    partners: next.partners || [],
  };
}

export async function publishJobNews(payload) {
  const home = (await readDocumentFresh('content', 'home')) || {};

  // Publish ulang membersihkan berita hasil publish sebelumnya (tidak menumpuk).
  const previousNewsId = home.jobBanner?.newsId || home.jobInfo?.newsId;
  if (previousNewsId) {
    await deleteDoc(doc(db, 'news', previousNewsId)).catch(() => {});
  }

  const created = await createItem('news', {
    date: payload?.date || new Date().toISOString().slice(0, 10),
    title: payload?.title || 'Info Job Baru',
    description: payload?.description || '',
    content: payload?.content || '',
    imageUrl: payload?.imageUrl || home.jobBanner?.imageUrl || '',
    source: 'job-banner',
  });

  const next = {
    ...home,
    jobInfo: { ...(home.jobInfo || {}), ...(payload?.jobInfo || {}), linkUrl: '/berita', newsId: created.id },
    jobBanner: { ...(home.jobBanner || {}), ...(payload?.jobBanner || {}), linkUrl: '/berita', newsId: created.id },
  };
  await setDoc(doc(db, 'content', 'home'), next);

  return {
    newsItem: created,
    homeContent: {
      heroBackgroundUrl: next.heroBackgroundUrl || '',
      jobInfo: next.jobInfo,
      jobBanner: next.jobBanner,
      partners: next.partners || [],
    },
  };
}

export async function getAboutContent() {
  const data = (await readDocumentFresh('content', 'about')) || {};
  return data.aboutContent || {};
}

export async function updateAboutContent(payload) {
  const current = (await readDocumentFresh('content', 'about')) || {};
  const nextAbout = {
    ...(current.aboutContent || {}),
    ...payload,
    profile: { ...(current.aboutContent?.profile || {}), ...(payload.profile || {}) },
    chairman: { ...(current.aboutContent?.chairman || {}), ...(payload.chairman || {}) },
    visionMission: { ...(current.aboutContent?.visionMission || {}), ...(payload.visionMission || {}) },
    programs: payload.programs || current.aboutContent?.programs || [],
    slogan: { ...(current.aboutContent?.slogan || {}), ...(payload.slogan || {}) },
  };
  await setDoc(doc(db, 'content', 'about'), { aboutContent: nextAbout });
  return nextAbout;
}

// ---------------------------------------------------------------------------
// Impor data awal (sekali jalan, dari dashboard saat koleksi masih kosong)
// ---------------------------------------------------------------------------

export async function seedInitialData(seed) {
  const existing = await readCollectionFresh('gallery');
  if (existing.length) {
    return { seeded: false, reason: 'Data sudah ada.' };
  }

  const jobs = [];
  const refFor = (name, id) => (id ? doc(db, name, id) : doc(collection(db, name)));

  (seed.collections?.news || []).forEach((item, index) => {
    const { id, ...data } = item;
    jobs.push(setDoc(refFor('news', id), { ...data, sortOrder: index }));
  });
  (seed.collections?.gallery || []).forEach((item, index) => {
    const { id, ...data } = item;
    jobs.push(setDoc(refFor('gallery', id), { ...data, sortOrder: index }));
  });
  (seed.collections?.lulusJobs || []).forEach((item, index) => {
    const { id, ...data } = item;
    jobs.push(setDoc(refFor('lulusJobs', id), { ...data, sortOrder: index }));
  });

  if (seed.docs?.['site/main']) {
    jobs.push(setDoc(doc(db, 'site', 'main'), seed.docs['site/main']));
  }
  if (seed.docs?.['content/home']) {
    jobs.push(setDoc(doc(db, 'content', 'home'), seed.docs['content/home']));
  }
  if (seed.docs?.['content/about']) {
    jobs.push(setDoc(doc(db, 'content', 'about'), seed.docs['content/about']));
  }

  await Promise.all(jobs);
  return { seeded: true };
}
