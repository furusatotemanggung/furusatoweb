const { readFirestoreDocument } = require('./_auth');

// GET /api/share-image — redirect ke logo situs saat ini (dari Firestore).

module.exports = async function handler(req, res) {
  const site = await readFirestoreDocument('site', 'main');
  const logoUrl = site?.logoUrl || '/api/share-preview';

  res.writeHead(302, { Location: logoUrl });
  res.end();
};
