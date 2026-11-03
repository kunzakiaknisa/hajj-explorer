import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, Camera, ExternalLink, ArrowLeft, Download, 
  ChevronDown, ChevronUp, Check, Layers, Box, QrCode, CheckCircle2, Info
} from 'lucide-react';
import { ASSEMBLR_CONFIG, AssemblrScene } from '../config/assemblr';
import { mediaAssets } from '../config/assets';
import { ARViewer } from '../components/ARViewer';
import { QRScannerModal } from '../components/QRScannerModal';

export const ARPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'viewer' | 'marker'>('viewer');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Baca indeks scene awal dari query param ?scene=0..5
  const sceneParam = searchParams.get('scene');
  const initialIndex = sceneParam !== null && !isNaN(Number(sceneParam))
    ? Math.max(0, Math.min(ASSEMBLR_CONFIG.scenes.length - 1, Number(sceneParam)))
    : 0;

  const [activeScene, setActiveScene] = useState<AssemblrScene>(ASSEMBLR_CONFIG.scenes[initialIndex]);

  useEffect(() => {
    if (sceneParam !== null && !isNaN(Number(sceneParam))) {
      const idx = Math.max(0, Math.min(ASSEMBLR_CONFIG.scenes.length - 1, Number(sceneParam)));
      setActiveScene(ASSEMBLR_CONFIG.scenes[idx]);
    }
  }, [sceneParam]);

  const handleSelectScene = (scene: AssemblrScene) => {
    setActiveScene(scene);
    setSearchParams({ scene: (scene.id - 1).toString() });
    setIsSelectorOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6 pb-24">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 mb-1">
            <Sparkles className="w-3 h-3 text-hajj-gold" />
            <span>Assemblr WebAR & 3D Viewer</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-hajj-navy tracking-tight">
            Ruang Augmented Reality (WebAR)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xl hidden sm:block">
            Jelajahi visualisasi 3D ibadah haji secara interaktif dan rasakan pengalaman Augmented Reality berbasis marker melalui Assemblr WebAR.
          </p>
        </div>

        <Link
          to="/materi"
          className="py-2 px-3 sm:px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Materi</span>
        </Link>
      </div>

      {/* 2. HERO FEATURE: Tombol Utama Mulai Pengalaman AR (Membuka WebAR Resmi Assemblr) */}
      <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-r from-hajj-primary via-hajj-secondary to-hajj-navy text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 p-5 sm:p-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 text-hajj-gold shadow-inner">
              <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-hajj-gold bg-black/40 px-2.5 py-0.5 rounded-md border border-hajj-gold/30">
                  Alur Resmi WebAR
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                Mulai Pengalaman WebAR Assemblr
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Buka WebAR di browser smartphone, pilih <strong>Scan Marker</strong> atau <strong>View in 3D</strong>, izinkan akses kamera, lalu arahkan ke marker untuk melihat objek 3D di ruanganmu.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
            {/* Tombol Utama: Membuka URL Assemblr Langsung */}
            <a
              href={ASSEMBLR_CONFIG.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-hajj-gold to-amber-500 hover:from-amber-500 hover:to-amber-600 text-hajj-navy font-black text-xs sm:text-sm shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>Buka WebAR Assemblr</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Tombol Alternatif: Pemindai QR Layar Penuh */}
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              title="Gunakan kamera perangkat untuk memindai QR Code Assemblr"
            >
              <QrCode className="w-4 h-4 text-hajj-gold" />
              <span>Pindai QR Proyek</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Pilihan 6 Rukun Haji (Selector Compact & Edukatif) */}
      <div className="relative">
        <div className="bg-white rounded-2xl border border-hajj-border shadow-soft overflow-hidden transition-all">
          
          {/* Main Selector Button (Displays current active Rukun) */}
          <button
            type="button"
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-xl bg-hajj-primary text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                {activeScene.id}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-hajj-primary">
                    Rukun Haji Terpilih:
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({activeScene.alias})
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-hajj-navy truncate leading-snug">
                  Rukun {activeScene.id}: {activeScene.title.split('. ')[1] || activeScene.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-hajj-light text-hajj-primary text-xs font-semibold">
                Ganti Rukun
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                {isSelectorOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>

          {/* Collapsible Dropdown Options (The 6 Rukun Scenes) */}
          {isSelectorOpen && (
            <div className="p-3 sm:p-4 border-t border-hajj-border bg-slate-50/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 animate-slide-down">
              {ASSEMBLR_CONFIG.scenes.map((scene) => {
                const isSelected = activeScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectScene(scene)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'border-hajj-primary bg-hajj-light text-hajj-primary shadow-sm font-bold ring-1 ring-hajj-primary/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-hajj-primary text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {scene.id}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">
                          {scene.title.split('. ')[1] || scene.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {scene.alias}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-hajj-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* 4. Area AR (Tab 1: 3D WebGL Viewer, Tab 2: Panduan & Marker WebAR) */}
      <div className="space-y-3">
        
        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-hajj-border pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('viewer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'viewer'
                ? 'bg-hajj-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D WebGL Viewer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('marker')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'marker'
                ? 'bg-hajj-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Petunjuk & Marker WebAR</span>
          </button>
        </div>

        {/* Tab 1: Embedded 3D Viewer */}
        {activeTab === 'viewer' && (
          <ARViewer 
            activeScene={activeScene} 
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {/* Tab 2: Marker Preview & Official Usage Instructions */}
        {activeTab === 'marker' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-hajj-border shadow-soft space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Marker Image Display */}
              <div className="md:col-span-5 flex flex-col items-center space-y-3">
                <div className="w-full max-w-xs aspect-square rounded-2xl bg-slate-50 p-3 border-2 border-dashed border-hajj-secondary/40 shadow-inner flex items-center justify-center">
                  <img
                    src={mediaAssets.assemblrMarker}
                    alt="Assemblr Marker QR Resmi"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                  <a
                    href={mediaAssets.assemblrMarker}
                    download="assemblr-marker-hajj.png"
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Marker</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="flex-1 py-2 px-3 rounded-xl bg-hajj-light hover:bg-hajj-primary/15 text-hajj-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Pindai QR</span>
                  </button>
                </div>
              </div>

              {/* Official 5-Step Instructions */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Alur Resmi Assemblr WebAR</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-hajj-navy">
                    Petunjuk Penggunaan Augmented Reality (Scan Marker)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ikuti 5 langkah mudah berikut untuk memunculkan model 3D di atas marker fisik:
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Buka Proyek Assemblr:</strong> Tekan tombol <em>"Mulai Pengalaman WebAR Assemblr"</em> untuk membuka tautan resmi di browser smartphone.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Pilih Scan Marker:</strong> Di halaman Assemblr WebAR, pilih tombol <strong>Scan Marker</strong> (atau pilih <strong>View in 3D</strong> jika ingin melihat model 3D tanpa marker fisik).
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Izinkan Akses Kamera:</strong> Berikan izin saat browser smartphone meminta izin akses kamera native.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Arahkan Kamera ke Marker:</strong> Arahkan kamera ponselmu ke gambar marker QR Assemblr yang telah dicetak di kertas atau ditampilkan di layar lain.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-hajj-light/60 border border-hajj-border">
                    <span className="w-5 h-5 rounded-full bg-hajj-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Tunggu Objek 3D Muncul:</strong> Model 3D ibadah haji akan muncul melayang di atas marker dan dapat kamu kelilingi dari berbagai sudut.
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={ASSEMBLR_CONFIG.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-hajj-gold to-amber-500 hover:from-amber-500 hover:to-amber-600 text-hajj-navy text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Mulai Pengalaman WebAR Sekarang</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="py-3 px-4 rounded-xl border border-hajj-primary text-hajj-primary hover:bg-hajj-light text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Buka Pemindai QR Layar Penuh</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* 5. Fullscreen QR Scanner Modal with connected target project handler */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onDetectedTargetProject={(detectedUrl) => {
          console.log("Proyek Assemblr Terdeteksi:", detectedUrl);
        }}
      />

    </div>
  );
};
