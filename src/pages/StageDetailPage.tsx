import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Sparkles, BookOpen, Heart, CheckCircle, 
  AlertTriangle, Play, Pause 
} from 'lucide-react';
import { STAGES_DATA } from '../data/stages';
import { getStageFallback } from '../config/assets';

export const StageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [imageError, setImageError] = useState(false);

  // Find current stage
  const stageIndex = STAGES_DATA.findIndex(s => s.id === id);
  const stage = STAGES_DATA[stageIndex] || STAGES_DATA[0];

  const prevStage = stageIndex > 0 ? STAGES_DATA[stageIndex - 1] : null;
  const nextStage = stageIndex < STAGES_DATA.length - 1 ? STAGES_DATA[stageIndex + 1] : null;

  useEffect(() => {
    setIsPlayingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [stage.id]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => console.warn(err));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-7 pb-24">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/materi"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-hajj-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Materi</span>
        </Link>

        {/* Quick jump to AR */}
        <Link
          to={`/ar?scene=${stage.sceneIndex}`}
          className="px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
          <span>Scene AR {stage.stepNumber}</span>
        </Link>
      </div>

      {/* Hero Visual Card for Stage */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-hajj-border shadow-card aspect-[16/9] max-h-80 sm:max-h-96 w-full">
        <img
          src={imageError ? getStageFallback(stage.name, stage.stepNumber) : stage.image}
          alt={stage.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-hajj-navy/90 backdrop-blur-md text-white text-xs font-bold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-hajj-gold" />
            <span>Rukun {stage.stepNumber} dari 6</span>
          </span>

          <Link
            to={`/ar?scene=${stage.sceneIndex}`}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-hajj-gold text-hajj-navy text-xs font-bold shadow-md flex items-center gap-1 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-hajj-navy" />
            <span>Buka AR</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
          <h1 className="text-xl sm:text-3xl font-extrabold leading-tight">
            {stage.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-0.5 max-w-2xl line-clamp-2">
            {stage.shortDesc}
          </p>
        </div>
      </div>

      {/* Audio Lafaz / Doa Bar (if available) */}
      {stage.audioUrl && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-hajj-navy to-hajj-primary text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-soft">
          <audio
            ref={audioRef}
            src={stage.audioUrl}
            onEnded={() => setIsPlayingAudio(false)}
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAudio}
              className="w-10 h-10 rounded-full bg-hajj-gold text-hajj-navy hover:scale-105 active:scale-95 transition-transform flex items-center justify-center font-bold shadow-md shrink-0"
              aria-label={isPlayingAudio ? "Jeda Audio" : "Dengarkan Audio"}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <div>
              <p className="text-[10px] font-bold text-hajj-gold uppercase tracking-wider">
                Audio Lafaz Bacaan
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                Dengarkan bacaan doa rukun {stage.name}
              </p>
            </div>
          </div>

          <span className="text-[11px] text-slate-300 font-mono">
            {isPlayingAudio ? 'Sedang Memutar Audio...' : 'Klik untuk Memutar'}
          </span>
        </div>
      )}

      {/* Content Section 1: Pengertian & Dalil */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-hajj-border shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-hajj-primary font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Pengertian Menurut Syariat</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {stage.definition}
        </p>

        {/* Arabic Lafaz & Translation Box */}
        {stage.arabicText && (
          <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-hajj-light/70 border border-hajj-border/80 space-y-2.5">
            <span className="text-[11px] font-bold text-hajj-primary uppercase tracking-wide block">
              Lafaz Niat / Doa Pokok:
            </span>
            <p className="arabic-text text-lg sm:text-2xl text-hajj-navy font-bold leading-loose text-right">
              {stage.arabicText}
            </p>
            {stage.latinText && (
              <p className="text-xs text-slate-600 italic">
                "{stage.latinText}"
              </p>
            )}
            {stage.translation && (
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <strong>Artinya:</strong> {stage.translation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Content Section 2: Makna & Nilai Spiritual (Refleksi) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-hajj-border shadow-soft space-y-2.5">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
          <Heart className="w-4 h-4 text-hajj-gold" />
          <span>Tujuan & Makna Spiritual</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {stage.purpose}
        </p>
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
          <strong>Refleksi:</strong> {stage.reflection}
        </div>
      </div>

      {/* Content Section 3: Tata Cara Pelaksanaan (Procedures) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-hajj-border shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-hajj-navy font-bold text-xs uppercase tracking-wider">
          <CheckCircle className="w-4 h-4 text-hajj-primary" />
          <span>Tata Cara Pelaksanaan</span>
        </div>
        <ol className="space-y-2.5">
          {stage.procedures.map((proc, index) => (
            <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-hajj-light text-hajj-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span>{proc}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Content Section 4: Poin Penting & Larangan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Poin Penting */}
        <div className="bg-white rounded-3xl p-5 border border-hajj-border shadow-soft space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>Poin Penting Syariat</span>
          </h4>
          <ul className="space-y-1.5">
            {stage.keyPoints.map((point, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-500 font-bold shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Larangan (if applicable) */}
        {stage.prohibitions && (
          <div className="bg-white rounded-3xl p-5 border border-hajj-border shadow-soft space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Larangan Ihram Terkait</span>
            </h4>
            <ul className="space-y-1.5">
              {stage.prohibitions.map((proh, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{proh}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Bottom CTA to AR Room */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-sky-50 border border-hajj-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="space-y-0.5 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-bold text-hajj-navy">
            Ingin melihat objek 3D rukun ini?
          </p>
          <p className="text-[11px] text-slate-600">
            Jelajahi visualisasi 3D Augmented Reality {stage.name} di Ruang AR.
          </p>
        </div>

        <Link
          to={`/ar?scene=${stage.sceneIndex}`}
          className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
          <span>Lihat Visualisasi AR</span>
        </Link>
      </div>

      {/* Prev / Next Stage Navigation */}
      <div className="pt-3 border-t border-hajj-border flex items-center justify-between gap-3">
        {prevStage ? (
          <button
            type="button"
            onClick={() => {
              navigate(`/materi/${prevStage.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sebelumnya:</span>
            <span>Rukun {prevStage.stepNumber}</span>
          </button>
        ) : <div />}

        {nextStage ? (
          <button
            type="button"
            onClick={() => {
              navigate(`/materi/${nextStage.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span className="hidden sm:inline">Selanjutnya:</span>
            <span>Rukun {nextStage.stepNumber}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            to="/kuis"
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-hajj-gold text-hajj-navy text-xs font-bold shadow-md transition-all"
          >
            <span>Lanjut ke Kuis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

    </div>
  );
};
