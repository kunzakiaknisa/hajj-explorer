import React, { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink, Maximize2, Minimize2, RotateCcw, Sparkles, 
  AlertCircle, Info, ShieldCheck, Box, Camera, Layers, CheckCircle2
} from 'lucide-react';
import { ASSEMBLR_CONFIG, AssemblrScene } from '../config/assemblr';

interface ARViewerProps {
  activeScene: AssemblrScene;
  onSelectScene?: (scene: AssemblrScene) => void;
  onOpenScanner?: () => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({ activeScene, onOpenScanner }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setLoadError(false);
    if (iframeRef.current) {
      iframeRef.current.src = ASSEMBLR_CONFIG.embedUrl;
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. 3D WebGL Viewer Container */}
      <div 
        ref={containerRef}
        className={isFullscreen 
          ? "fixed inset-0 z-50 w-screen h-screen bg-slate-950 flex flex-col"
          : "relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[380px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-slate-900 border border-hajj-border shadow-card group"
        }
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-hajj-primary border-t-hajj-gold animate-spin" />
            <div>
              <p className="font-bold text-base text-white">Memuat 3D Viewer Assemblr EDU...</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Mengunduh aset model 3D dari server resmi Assemblr World
              </p>
            </div>
          </div>
        )}

        {/* Load Error State */}
        {loadError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/95 text-white p-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-400" />
            <div className="space-y-1">
              <p className="font-bold text-base">Gagal Memuat 3D Viewer Assemblr</p>
              <p className="text-xs text-slate-400 max-w-md">
                Periksa koneksi internetmu atau langsung buka WebAR Assemblr di peramban.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReload}
                className="px-4 py-2 rounded-xl bg-hajj-primary text-white text-xs font-semibold cursor-pointer"
              >
                Coba Lagi
              </button>
              <a
                href={ASSEMBLR_CONFIG.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold"
              >
                Buka di Tab Baru
              </a>
            </div>
          </div>
        )}

        {/* The Assemblr Embed Iframe */}
        <iframe
          ref={iframeRef}
          src={ASSEMBLR_CONFIG.embedUrl}
          title={`Assemblr 3D Viewer - ${activeScene.title}`}
          allow="camera; microphone; xr-spatial-tracking; fullscreen; accelerometer; gyroscope"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setLoadError(true);
          }}
          className="w-full h-full border-0 relative z-0"
        />

        {/* Top Control Overlay */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20">
            <Box className="w-3.5 h-3.5 text-hajj-gold" />
            <span className="font-semibold text-xs">Mode 3D Viewer</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-300 font-bold">{activeScene.title}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReload}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors cursor-pointer"
              title="Muat Ulang Viewer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                isFullscreen 
                  ? 'bg-amber-400 hover:bg-amber-500 border-amber-300 text-slate-950 font-bold shadow-lg' 
                  : 'bg-black/60 hover:bg-black/80 border-white/20 text-white'
              }`}
              title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (Fullscreen)"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Keluar Layar Penuh</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span>Layar Penuh</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Floating Hint inside Viewer */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex justify-center">
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] flex items-center gap-2 border border-white/20">
            <Info className="w-3.5 h-3.5 text-hajj-gold shrink-0" />
            <span>Klik & geser untuk memutar model 3D. Scroll atau cubit untuk zoom.</span>
          </div>
        </div>
      </div>

      {/* 2. Clear Distinction: 3D Viewer vs Marker-based WebAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-amber-100/40 border border-amber-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-hajj-gold text-hajj-navy flex items-center justify-center font-bold shrink-0 shadow-md">
            <Camera className="w-6 h-6 text-hajj-navy" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md">
                Fitur Augmented Reality
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                WebAR Resmi Tanpa Aplikasi
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-hajj-navy leading-snug">
              Ingin Menampilkan Objek 3D di Dunia Nyata (AR Marker Tracking)?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              Iframe di atas adalah mode <strong>3D Viewer</strong>. Untuk mengaktifkan kamera smartphone dan melacak marker AR di mejamu, buka WebAR Assemblr langsung melalui browser.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <a
            href={ASSEMBLR_CONFIG.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-hajj-gold to-amber-500 hover:from-amber-500 hover:to-amber-600 text-hajj-navy text-xs font-black shadow-md shadow-amber-400/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Buka WebAR Assemblr</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 3. Detail Scene & Objek 3D Terpilih */}
      <div className="p-4 rounded-2xl bg-white border border-hajj-border shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-hajj-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-hajj-navy">
              Informasi Scene Edukasi: {activeScene.title}
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            ID: {activeScene.alias}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {activeScene.description}
        </p>

        {activeScene.objects && activeScene.objects.length > 0 && (
          <div className="pt-1">
            <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Objek 3D Utama:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeScene.objects.map((obj, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                >
                  {obj}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Transparansi Teknis Integrasi Assemblr */}
      <div className="p-4 rounded-2xl bg-hajj-light/60 border border-hajj-border text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 font-bold text-hajj-primary">
          <ShieldCheck className="w-4 h-4" />
          <span>Transparansi Teknis Sistem AR</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Website Hajj Explorer menggunakan <strong>Assemblr WebAR</strong> sebagai mesin visualisasi 3D dan Augmented Reality. Mode 3D di halaman ini dijalankan melalui WebGL iframe embed resmi. Pelacakan marker kamera AR (Marker-based WebAR) memerlukan izin akses kamera native browser yang dijalankan langsung di halaman WebAR Assemblr (tanpa mengunduh aplikasi tambahan).
        </p>
      </div>
    </div>
  );
};
