/**
 * Konfigurasi Integrasi Assemblr EDU untuk HAJJ EXPLORER
 * 
 * Pusat konfigurasi seluruh tautan WebAR, Embed 3D Viewer, dan metadata scene Assemblr.
 * 
 * Alur Kerja WebAR Resmi Assemblr:
 * 1. Pengguna membuka project URL Assemblr (https://asblr.com/tuM8nge).
 * 2. Pada halaman Assemblr WebAR, pengguna dapat memilih "View in 3D" atau "Scan Marker".
 * 3. Jika memilih "Scan Marker", peramban akan meminta izin kamera native.
 * 4. Pengguna mengarahkan kamera ke QR Marker Assemblr fisik/cetak.
 * 5. Mesin WebAR Assemblr melacak marker dan memunculkan model 3D di atas marker.
 * 
 * Catatan Teknis:
 * - Iframe Embed (v2.editor.assemblrworld.com) berfungsi sebagai 3D WebGL Viewer di dalam website.
 * - Marker tracking AR kamera sesungguhnya dijalankan oleh WebAR Assemblr melalui browser.
 */

export interface AssemblrScene {
  id: number;
  slug: string;
  title: string;
  alias: string;
  fileId: string;
  description: string;
  objects: string[];
}

import { getAssetUrl } from './assets';

export const ASSEMBLR_CONFIG = {
  // ID Proyek Hajj Explorer di Assemblr World
  projectId: "-i2faHfog82cn3rXJP5g",

  // URL Tautan Proyek Utama (Membuka WebAR Resmi di Browser)
  projectUrl: "https://asblr.com/tuM8nge",

  // URL Embed 3D Viewer (Digunakan pada iframe ARViewer di dalam website)
  embedUrl: "https://v2.editor.assemblrworld.com/Embed/-i2faHfog82cn3rXJP5g",

  // URL Cadangan Edu Viewer
  eduViewerUrl: "https://viewer-edu.assemblrworld.com/Embed/-i2faHfog82cn3rXJP5g",

  // Aset Marker QR Resmi Assemblr untuk diunduh / ditampilkan
  markerAsset: getAssetUrl("assets/markers/assemblr-marker.png"),

  // Domain resmi Assemblr yang diizinkan untuk validasi QR Code
  validDomains: [
    "asblr.com",
    "asblr.link",
    "asblr.app",
    "assemblrworld.com",
    "edu.assemblrworld.com",
    "v2.editor.assemblrworld.com",
    "viewer-edu.assemblrworld.com"
  ],

  // 6 Rukun Haji dan representasi scene edukatifnya
  scenes: [
    {
      id: 1,
      slug: "ihram",
      title: "1. Niat & Ihram",
      alias: "scene-1",
      fileId: "68v2bgn3zn2jczjb23xwxxvlchisgo24",
      description: "Visualisasi 3D jamaah berihram di Miqat dan niat memulai ibadah haji.",
      objects: ["Kaabah", "Islam (Male)", "Islam (Female)"]
    },
    {
      id: 2,
      slug: "arafah",
      title: "2. Wukuf di Arafah",
      alias: "scene-2",
      fileId: "9nddjcdp-zd0a-qnlf-n3pk-j5t9qqg6qqx7",
      description: "Visualisasi Padang Arafah, tenda jamaah, dan doa wukuf tanggal 9 Zulhijah.",
      objects: ["Padang Pasir", "Tenda Arafah", "Jamaah Berdoa"]
    },
    {
      id: 3,
      slug: "tawaf",
      title: "3. Thawaf Ifadah",
      alias: "scene-3",
      fileId: "p1bny6js-87ld-hwn8-ihwf-023v9ypxnjpb",
      description: "Visualisasi 3D Ka'bah, Clock Tower, dan putaran thawaf 7 kali berlawanan arah jarum jam.",
      objects: ["Kaabah", "Clock Tower", "Jamaah Thawaf", "Audio Talbiyah"]
    },
    {
      id: 4,
      slug: "sai",
      title: "4. Sa'i",
      alias: "scene-4",
      fileId: "p7ybax8g-afho-8ykg-epkj-s5pomwelqvsy",
      description: "Visualisasi Bukit Safa dan Bukit Marwah, jalur 7 kali perjalanan napak tilas Siti Hajar.",
      objects: ["Bukit Safa", "Bukit Marwah", "Unta", "Jamaah Sa'i"]
    },
    {
      id: 5,
      slug: "tahallul",
      title: "5. Tahallul (Bercukur)",
      alias: "scene-5",
      fileId: "0vgqexh1-yteg-ihjg-m0u7-robgm5zjx3zf",
      description: "Visualisasi memotong minimal 3 helai rambut atau mencukur habis sebagai pelepasan larangan ihram.",
      objects: ["BarberShop", "Anotasi 3 Helai Rambut", "Jamaah"]
    },
    {
      id: 6,
      slug: "tertib",
      title: "6. Tertib",
      alias: "scene-6",
      fileId: "od7ckpdp-mfd3-4xlt-qgkj-x2eshk1lzkys",
      description: "Visualisasi urutan rukun haji yang wajib dilaksanakan secara berurutan dan teratur.",
      objects: ["To do list 3D Checklist", "Alur Rukun"]
    }
  ] as AssemblrScene[]
};

/**
 * Validasi apakah URL yang discan adalah proyek Assemblr yang valid
 */
export function validateAssemblrUrl(scannedUrl: string): {
  isValid: boolean;
  isTargetProject: boolean;
  message: string;
  cleanedUrl?: string;
} {
  try {
    let urlToTest = scannedUrl.trim();
    if (!urlToTest.startsWith('http://') && !urlToTest.startsWith('https://')) {
      urlToTest = 'https://' + urlToTest;
    }
    const parsed = new URL(urlToTest);
    const hostname = parsed.hostname.toLowerCase();

    const isAssemblrDomain = ASSEMBLR_CONFIG.validDomains.some(d => 
      hostname === d || hostname.endsWith('.' + d)
    );

    if (!isAssemblrDomain) {
      return {
        isValid: false,
        isTargetProject: false,
        message: "QR Code ini bukan tautan proyek resmi Assemblr EDU."
      };
    }

    // Periksa apakah cocok dengan proyek Hajj Explorer ini (slug tuM8nge atau projectId)
    const isTarget = 
      urlToTest.includes("tuM8nge") || 
      urlToTest.includes(ASSEMBLR_CONFIG.projectId) ||
      parsed.pathname.includes(ASSEMBLR_CONFIG.projectId);

    return {
      isValid: true,
      isTargetProject: isTarget,
      message: isTarget 
        ? "Proyek Hajj Explorer (Assemblr WebAR) Terverifikasi!" 
        : "Tautan Assemblr Terdeteksi (Domain Resmi Terverifikasi).",
      cleanedUrl: urlToTest
    };
  } catch (e) {
    return {
      isValid: false,
      isTargetProject: false,
      message: "Format QR Code tidak valid sebagai URL web."
    };
  }
}
