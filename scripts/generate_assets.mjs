import fs from 'fs';
import path from 'path';

const locations = [
  { id: 'kabah', name: "Masjidil Haram (Ka'bah)", num: 1, color: '#176B9B', accent: '#F4B942', icon: "Ka'bah & Tawaf" },
  { id: 'safa', name: "Safa & Marwah", num: 2, color: '#258FBA', accent: '#48BB78', icon: "Bukit Safa - Marwah (Sa'i)" },
  { id: 'arafah', name: "Padang Arafah", num: 3, color: '#D97706', accent: '#F59E0B', icon: "Jabal Rahmah & Wukuf" },
  { id: 'muzdalifah', name: "Muzdalifah", num: 4, color: '#1E293B', accent: '#94A3B8', icon: "Mabit & Kerikil Jumrah" },
  { id: 'mina', name: "Lembah Mina", num: 5, color: '#0D9488', accent: '#2DD4BF', icon: "Kota Tenda & Mabit" },
  { id: 'jamarat', name: "Jamarat", num: 6, color: '#DC2626', accent: '#F87171', icon: "Tugu Lontar Tiga Jumrah" },
];

const outDir = path.resolve('public/assets/images/locations');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

locations.forEach(loc => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${loc.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#123B56"/>
      <stop offset="60%" stop-color="${loc.color}"/>
      <stop offset="100%" stop-color="#0A1E2B"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg_${loc.id})"/>
  <circle cx="400" cy="220" r="140" fill="none" stroke="${loc.accent}" stroke-width="2" opacity="0.25"/>
  <circle cx="400" cy="220" r="100" fill="${loc.accent}" opacity="0.15"/>
  
  <rect x="340" y="50" width="120" height="34" rx="17" fill="${loc.accent}" opacity="0.9"/>
  <text x="400" y="73" fill="#123B56" font-family="'Poppins', sans-serif" font-size="16" font-weight="700" text-anchor="middle">
    LOKASI 0${loc.num}
  </text>
  
  <text x="400" y="215" fill="#FFFFFF" font-family="'Poppins', sans-serif" font-size="32" font-weight="700" text-anchor="middle">
    ${loc.name}
  </text>
  <text x="400" y="260" fill="#E8F5FA" font-family="'Poppins', sans-serif" font-size="18" font-weight="500" text-anchor="middle" opacity="0.9">
    ${loc.icon}
  </text>
  
  <rect x="250" y="420" width="300" height="40" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)"/>
  <text x="400" y="446" fill="#F4B942" font-family="'Poppins', sans-serif" font-size="14" text-anchor="middle">
    Peta Edukasi Perjalanan Haji
  </text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${loc.id}.svg`), svg);
  fs.writeFileSync(path.join(outDir, `${loc.id}.jpg`), svg);
});

// Also create video-poster.jpg from video-poster.svg
const videoPosterSvg = fs.readFileSync(path.resolve('public/assets/images/hero/video-poster.svg'));
fs.writeFileSync(path.resolve('public/assets/images/hero/video-poster.jpg'), videoPosterSvg);

console.log('Location and hero assets generated successfully.');
