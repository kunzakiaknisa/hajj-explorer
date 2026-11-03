/**
 * HAJJ EXPLORER - Asset Configuration
 * File konfigurasi terpusat untuk seluruh aset visual, audio, dan video.
 * Pengguna dapat dengan mudah mengganti jalur aset di sini tanpa merubah struktur komponen.
 */

/**
 * Helper fungsi untuk menyelesaikan URL aset publik dengan base path Vite (misal: '/hajj-explorer/').
 * Bekerja mulus baik di lingkungan lokal ('/' atau '/hajj-explorer/') maupun di GitHub Pages.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const stageAssets = {
  ihram: getAssetUrl('assets/images/stages/ihram.png'),
  arafah: getAssetUrl('assets/images/stages/arafah.png'),
  tawaf: getAssetUrl('assets/images/stages/tawaf.png'),
  sai: getAssetUrl('assets/images/stages/sai.png'),
  tahallul: getAssetUrl('assets/images/stages/tahallul.png'),
  tertib: getAssetUrl('assets/images/stages/tertib.png'),
};

export const locationAssets = {
  kabah: getAssetUrl('assets/images/locations/kabah.jpg'),
  safa: getAssetUrl('assets/images/locations/safa.jpg'),
  arafah: getAssetUrl('assets/images/locations/arafah.jpg'),
  muzdalifah: getAssetUrl('assets/images/locations/muzdalifah.jpg'),
  mina: getAssetUrl('assets/images/locations/mina.jpg'),
  jamarat: getAssetUrl('assets/images/locations/jamarat.jpg'),
};

export const mediaAssets = {
  videoPembelajaran: getAssetUrl('assets/videos/video-pembelajaran.mp4'),
  videoThumbnail: getAssetUrl('assets/images/hero/video-poster.jpg'),
  assemblrMarker: getAssetUrl('assets/markers/assemblr-marker.png'),
  uiConcept: getAssetUrl('references/ui-concept.jpg'),
  kaabaIcon: getAssetUrl('assets/images/logo/kaaba-icon.svg'),
  logoText: getAssetUrl('assets/images/logo/logo-text.svg'),
  heroKaabaBg: getAssetUrl('assets/images/hero-kaaba-bg.jpg')
};

/**
 * Fallback image generator / placeholder jika gambar eksternal gagal dimuat
 */
export const getStageFallback = (stageName: string, stageNumber: number): string => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23176B9B" width="600" height="400"/><rect fill="%23258FBA" x="20" y="20" width="560" height="360" rx="16"/><circle cx="300" cy="180" r="70" fill="%23E8F5FA" opacity="0.2"/><text x="300" y="170" fill="%23F4B942" font-size="36" font-family="sans-serif" font-weight="bold" text-anchor="middle">Rukun ${stageNumber}</text><text x="300" y="215" fill="%23FFFFFF" font-size="24" font-family="sans-serif" text-anchor="middle">${encodeURIComponent(stageName)}</text><text x="300" y="260" fill="%23E8F5FA" font-size="14" font-family="sans-serif" opacity="0.8" text-anchor="middle">Hajj Explorer AR Education</text></svg>`;
};

export const getLocationFallback = (locationName: string, locationNumber: number): string => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23123B56" width="600" height="400"/><rect fill="%23176B9B" x="20" y="20" width="560" height="360" rx="16"/><circle cx="300" cy="180" r="70" fill="%23F4B942" opacity="0.2"/><text x="300" y="170" fill="%23F4B942" font-size="34" font-family="sans-serif" font-weight="bold" text-anchor="middle">Lokasi ${locationNumber}</text><text x="300" y="215" fill="%23FFFFFF" font-size="22" font-family="sans-serif" text-anchor="middle">${encodeURIComponent(locationName)}</text><text x="300" y="260" fill="%23E8F5FA" font-size="14" font-family="sans-serif" opacity="0.8" text-anchor="middle">Peta Perjalanan Haji</text></svg>`;
};
