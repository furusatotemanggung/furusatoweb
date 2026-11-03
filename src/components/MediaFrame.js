import { resolveMediaUrl } from '../lib/api';

// Bingkai foto utuh: foto ditampilkan penuh (contain) di tengah, sisa ruang
// bingkai diisi versi blur dari foto yang sama — tidak ada bagian yang
// terpotong, tapi kartu tetap seragam.
function MediaFrame({ src, alt, className = '' }) {
  const url = resolveMediaUrl(src);

  if (!url) {
    return null;
  }

  return (
    <span className={`media-frame ${className}`}>
      <img className="mf-bg" src={url} alt="" aria-hidden="true" />
      <img className="mf-fg" src={url} alt={alt} />
    </span>
  );
}

export default MediaFrame;
