import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { 
  X, Camera, AlertCircle, CheckCircle2, ExternalLink, 
  RefreshCw, ArrowLeft, FlipHorizontal, Sparkles, QrCode, ShieldCheck
} from 'lucide-react';
import { validateAssemblrUrl, ASSEMBLR_CONFIG } from '../config/assemblr';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDetectedTargetProject?: (url: string) => void;
}

type ScanStatus = 
  | 'idle'
  | 'requesting'
  | 'waiting'
  | 'found'
  | 'unrecognized'
  | 'denied'
  | 'unavailable';

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onDetectedTargetProject
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const [status, setStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [scannedResult, setScannedResult] = useState<{
    rawText: string;
    cleanedUrl?: string;
    isValidAssemblr: boolean;
    isTargetProject: boolean;
    message: string;
  } | null>(null);

  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  const stopScanner = useCallback(() => {
    if (controlsRef.current) {
      try {
        controlsRef.current.stop();
      } catch (err) {
        console.warn('Error stopping ZXing controls:', err);
      }
      controlsRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping track:', e);
        }
      });
      videoRef.current.srcObject = null;
    }

    setStatus('idle');
  }, []);

  const handleScanSuccess = useCallback((text: string) => {
    const validation = validateAssemblrUrl(text);

    if (validation.isValid) {
      setStatus('found');
      const targetUrl = validation.cleanedUrl || text;
      setScannedResult({
        rawText: text,
        cleanedUrl: targetUrl,
        isValidAssemblr: true,
        isTargetProject: validation.isTargetProject,
        message: validation.message
      });

      if (validation.isTargetProject && onDetectedTargetProject) {
        onDetectedTargetProject(targetUrl);
      }
    } else {
      setStatus('unrecognized');
      setScannedResult({
        rawText: text,
        isValidAssemblr: false,
        isTargetProject: false,
        message: "QR Code terbaca, namun bukan tautan proyek resmi Assemblr Hajj Explorer."
      });
    }
  }, [onDetectedTargetProject]);

  const startScanner = useCallback(async () => {
    stopScanner();
    setStatus('requesting');
    setScannedResult(null);
    setErrorMessage('');

    try {
      const codeReader = new BrowserQRCodeReader();

      // Dapatkan daftar perangkat video yang tersedia
      let videoInputDevices: MediaDeviceInfo[] = [];
      try {
        videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
        setAvailableDevices(videoInputDevices);
      } catch (deviceErr) {
        console.warn('Tidak dapat mendaftar perangkat kamera:', deviceErr);
      }

      let targetDeviceId = selectedDeviceId;
      if (!targetDeviceId && videoInputDevices.length > 0) {
        // Prioritaskan kamera belakang (environment)
        const backCamera = videoInputDevices.find(device => {
          const lbl = device.label.toLowerCase();
          return lbl.includes('back') || lbl.includes('belakang') || lbl.includes('environment') || lbl.includes('rear');
        });
        targetDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId;
        setSelectedDeviceId(targetDeviceId);
      }

      if (!videoRef.current) return;

      setStatus('waiting');

      const controls = await codeReader.decodeFromVideoDevice(
        targetDeviceId || undefined,
        videoRef.current,
        (result) => {
          if (result) {
            const text = result.getText();
            handleScanSuccess(text);
          }
        }
      );

      controlsRef.current = controls;
    } catch (err: any) {
      console.warn("Kesalahan inisialisasi pemindai kamera:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setStatus('denied');
        setErrorMessage("Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan peramban untuk menggunakan pemindai QR.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setStatus('unavailable');
        setErrorMessage("Tidak ditemukan perangkat kamera yang dapat digunakan pada perangkat ini.");
      } else {
        setStatus('unavailable');
        setErrorMessage(err.message || "Gagal mengaktifkan kamera.");
      }
    }
  }, [selectedDeviceId, stopScanner, handleScanSuccess]);

  // Handle escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Start or stop scanner depending on isOpen
  useEffect(() => {
    if (isOpen) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen, selectedDeviceId, startScanner, stopScanner]);

  const handleSwitchCamera = () => {
    if (availableDevices.length <= 1) return;
    const currentIndex = availableDevices.findIndex(d => d.deviceId === selectedDeviceId);
    const nextIndex = (currentIndex + 1) % availableDevices.length;
    setSelectedDeviceId(availableDevices[nextIndex].deviceId);
  };

  const handleRetry = () => {
    setScannedResult(null);
    setStatus('waiting');
    startScanner();
  };

  const handleOpenAssemblrWebAR = (targetUrl?: string) => {
    const url = targetUrl || ASSEMBLR_CONFIG.projectUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 w-screen h-screen bg-black overflow-hidden flex flex-col select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Pemindai QR Code Assemblr Layar Penuh"
    >
      {/* 1. Fullscreen Live Camera Video Stream */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Top Floating Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md flex items-center justify-center border border-white/25 transition-all shadow-md cursor-pointer"
            aria-label="Tutup Pemindai"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-hajj-gold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md border border-hajj-gold/30">
                Kamera Layar Penuh
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white leading-tight mt-0.5">
              Pemindai QR Proyek Assemblr
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {availableDevices.length > 1 && (
            <button
              type="button"
              onClick={handleSwitchCamera}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md border border-white/25 transition-all shadow-md cursor-pointer"
              title="Ganti Kamera (Depan / Belakang)"
              aria-label="Ganti Kamera"
            >
              <FlipHorizontal className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md flex items-center justify-center border border-white/25 transition-all shadow-md cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 3. Center Viewfinder Reticle (Active when waiting) */}
      {status === 'waiting' && (
        <main className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4 z-20">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl border-2 border-white/40 overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] flex items-center justify-center">
            {/* 4 Gold Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-hajj-gold rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-hajj-gold rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-hajj-gold rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-hajj-gold rounded-br-2xl" />

            {/* Animated Laser Scanning Line */}
            <div className="scan-line w-full" />
          </div>

          <div className="mt-5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-lg">
            <QrCode className="w-4 h-4 text-hajj-gold animate-pulse shrink-0" />
            <span>Posisikan QR Code Assemblr di dalam kotak</span>
          </div>
        </main>
      )}

      {/* 4. Requesting Camera State */}
      {status === 'requesting' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white p-6 text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-hajj-gold animate-spin" />
          <div>
            <h3 className="text-base font-bold">Mengaktifkan Kamera...</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              Menghubungkan ke sensor kamera perangkatmu
            </p>
          </div>
        </div>
      )}

      {/* 5. Camera Error / Denied Overlays */}
      {(status === 'denied' || status === 'unavailable') && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-white text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-lg font-bold text-white">
              {status === 'denied' ? 'Akses Kamera Tidak Diizinkan' : 'Kamera Tidak Tersedia'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errorMessage}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-sm">
            <button
              type="button"
              onClick={handleRetry}
              className="flex-1 py-3 px-4 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-bold transition-all shadow-md"
            >
              Coba Lagi
            </button>
            <button
              type="button"
              onClick={() => handleOpenAssemblrWebAR()}
              className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-hajj-navy text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Buka WebAR Langsung</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white underline pt-2"
          >
            Tutup Pemindai
          </button>
        </div>
      )}

      {/* 6. Bottom Floating Drawer / Result Card */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-auto">
        <div className="max-w-xl mx-auto">

          {/* Result Card when QR is detected */}
          {scannedResult ? (
            <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl space-y-3.5 animate-in slide-in-from-bottom duration-300">
              
              {scannedResult.isValidAssemblr ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {scannedResult.isTargetProject ? 'Proyek Hajj Explorer' : 'Assemblr Valid'}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-hajj-navy mt-0.5 leading-snug">
                        {scannedResult.message}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-mono break-all mt-1">
                        {scannedResult.cleanedUrl || scannedResult.rawText}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                    Tautan proyek Assemblr terverifikasi. Tekan tombol di bawah untuk meluncurkan WebAR di browser ponselmu. Di sana kamu dapat memilih <strong>Scan Marker</strong> atau <strong>View in 3D</strong>.
                  </p>

                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleOpenAssemblrWebAR(scannedResult.cleanedUrl || scannedResult.rawText)}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-hajj-gold to-amber-500 hover:from-amber-500 hover:to-amber-600 text-hajj-navy text-xs font-extrabold shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Buka di WebAR Assemblr</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleRetry}
                      className="py-3 px-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Pindai Ulang
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-hajj-navy">
                        QR Code Tidak Dikenali
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {scannedResult.message}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono break-all mt-1 bg-slate-100 p-1.5 rounded">
                        {scannedResult.rawText}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Pindai Ulang
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenAssemblrWebAR()}
                      className="py-2.5 px-4 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Buka Proyek Resmi Hajj Explorer</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Bottom Information Banner when Waiting */
            status === 'waiting' && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-2.5 text-center sm:text-left">
                  <ShieldCheck className="w-5 h-5 text-hajj-gold shrink-0 hidden sm:block" />
                  <p className="text-xs text-slate-200 leading-snug">
                    Pemindai ini membaca QR code untuk membuka proyek Assemblr. Pelacakan marker AR sesungguhnya dijalankan oleh mesin <strong>Assemblr WebAR</strong>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenAssemblrWebAR()}
                  className="w-full sm:w-auto py-2 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/30 transition-all shrink-0 cursor-pointer active:scale-95"
                >
                  <span>Buka WebAR Langsung</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          )}

        </div>
      </footer>
    </div>
  );
};
