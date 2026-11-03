import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';
import { mediaAssets } from '../config/assets';

export const VideoPlayer: React.FC<{ title?: string }> = ({ title = "Belajar Manasik Haji" }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(err => {
        console.warn("Playback error:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.warn(err));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => console.warn(err));
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-hajj-light text-hajj-primary flex items-center justify-center font-bold">
            <Play className="w-4 h-4 fill-hajj-primary text-hajj-primary" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-hajj-navy tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Panduan audio visual pelaksanaan rukun ibadah haji
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hajj-light text-hajj-primary text-xs font-semibold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
          <span>Media Edukasi Resmi</span>
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-card group select-none border border-slate-800"
      >
        <video
          ref={videoRef}
          src={mediaAssets.videoPembelajaran}
          poster={mediaAssets.videoThumbnail}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          playsInline
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Big Center Play Button Overlay (when paused or not started) */}
        {(!isPlaying || !hasStarted) && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity duration-300 z-10"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-hajj-primary to-hajj-secondary p-0.5 shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-white ring-4 ring-white/30">
              <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Custom Video Controls Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 transition-opacity duration-300 z-20 ${
            showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress / Scrub Bar */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 sm:h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-hajj-gold focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            {/* Left Controls: Play, Restart, Time */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1 rounded-lg hover:text-hajj-gold transition-colors focus:outline-none"
                aria-label={isPlaying ? "Jeda" : "Putar"}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="p-1 rounded-lg hover:text-hajj-gold transition-colors focus:outline-none"
                title="Mulai Ulang"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls: Volume & Fullscreen */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Volume */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 rounded-lg hover:text-hajj-gold transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-20 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-hajj-gold hidden sm:inline-block"
                />
              </div>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1 rounded-lg hover:text-hajj-gold transition-colors"
                title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-hajj-light/70 border border-hajj-border text-xs text-hajj-navy flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-hajj-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Tips Belajar:</strong> Tonton video ringkasan di atas untuk memahami alur besar manasik, lalu lanjutkan ke bagian <strong>Materi Haji</strong> untuk mendalami doa dan rincian setiap rukun.
        </p>
      </div>
    </div>
  );
};
