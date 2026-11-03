import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Compass, Award, Play } from 'lucide-react';
import { mediaAssets } from '../config/assets';

export const HeroSection: React.FC<{ onScrollToVideo?: () => void }> = ({ onScrollToVideo }) => {
  return (
    <section className="relative overflow-hidden pt-3 pb-6 md:pt-6 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Card Container with Ka'bah Background */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-blue-900/20 bg-slate-900">
          
          {/* Background Ka'bah Image with Parallax / Cover */}
          <div 
            className="absolute inset-0 bg-cover bg-center md:bg-right scale-105 transition-transform duration-700 pointer-events-none"
            style={{ backgroundImage: `url('${mediaAssets.heroKaabaBg}')` }}
          />

          {/* Deep Navy/Islamic Blue Gradient Overlay for High Contrast & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B2B] via-[#0A253A]/90 to-[#0A253A]/60 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B2B] via-transparent to-transparent md:hidden" />

          {/* Subtle gold decorative glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Title, Subtitle & CTAs */}
              <div className="lg:col-span-8 space-y-4 text-left">
                
                {/* Top pill badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-semibold tracking-wide text-amber-200">
                    Pembelajaran Berbasis Web Augmented Reality
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                  Jelajahi Manasik Haji dengan{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                    Augmented Reality
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed font-normal">
                  Pelajari 6 Rukun Haji secara mendalam melalui objek 3D interaktif, peta perjalanan 3D, video manasik, dan evaluasi kuis.
                </p>

                {/* Call To Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/materi"
                    className="px-5 py-3 rounded-xl bg-hajj-gold hover:bg-amber-500 text-hajj-navy font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Pelajari Rukun Haji</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/ar"
                    className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 animate-camera-glow"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Buka Ruang AR</span>
                  </Link>

                  {onScrollToVideo && (
                    <button
                      type="button"
                      onClick={onScrollToVideo}
                      className="px-4 py-3 rounded-xl bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-slate-100 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Video Manasik</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column: Mini Interactive Ka'bah Card on Desktop */}
              <div className="hidden lg:flex lg:col-span-4 justify-end">
                <div className="w-full max-w-xs rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-2xl text-center space-y-3">
                  <div className="aspect-square rounded-xl bg-gradient-to-b from-[#123B56]/80 to-[#10344D]/90 p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                    <img
                      src={mediaAssets.kaabaIcon}
                      alt="Ka'bah 3D"
                      className="w-28 h-28 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 animate-float-slow"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                        6 Scene 3D & AR
                      </span>
                      <p className="text-[10px] text-slate-300">
                        Assemblr WebAR Interaktif
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/ar"
                    className="block w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-hajj-navy text-xs font-bold transition-colors shadow"
                  >
                    Mulai Eksplorasi AR
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 4 Shortcut Cards (Menu Utama) */}
        <div className="mt-8 pt-5 border-t border-hajj-border/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            
            <Link
              to="/materi"
              className="p-3.5 rounded-2xl bg-white hover:bg-hajj-light/50 border border-hajj-border shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-hajj-light text-hajj-primary group-hover:bg-hajj-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-hajj-navy group-hover:text-hajj-primary transition-colors truncate">
                  Materi Haji
                </p>
                <p className="text-[10px] text-slate-500 truncate">6 Rukun Pokok</p>
              </div>
            </Link>

            <Link
              to="/ar"
              className="p-3.5 rounded-2xl bg-white hover:bg-amber-50/50 border border-hajj-border shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 group-hover:bg-hajj-gold group-hover:text-hajj-navy transition-colors flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-hajj-navy group-hover:text-amber-700 transition-colors truncate">
                  Ruang AR
                </p>
                <p className="text-[10px] text-slate-500 truncate">Kamera & 3D Viewer</p>
              </div>
            </Link>

            <Link
              to="/peta"
              className="p-3.5 rounded-2xl bg-white hover:bg-sky-50/50 border border-hajj-border shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-hajj-secondary group-hover:bg-hajj-secondary group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-hajj-navy group-hover:text-hajj-secondary transition-colors truncate">
                  Peta Perjalanan
                </p>
                <p className="text-[10px] text-slate-500 truncate">Peta 3D Isometrik</p>
              </div>
            </Link>

            <Link
              to="/kuis"
              className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-hajj-border shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-hajj-navy group-hover:text-emerald-700 transition-colors truncate">
                  Kuis Haji
                </p>
                <p className="text-[10px] text-slate-500 truncate">10 Soal Interaktif</p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
};
