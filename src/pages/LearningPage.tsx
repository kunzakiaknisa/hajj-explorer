import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { STAGES_DATA } from '../data/stages';
import { StageCard } from '../components/StageCard';

export const LearningPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-20">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-hajj-navy via-hajj-primary to-hajj-secondary rounded-3xl p-5 sm:p-8 text-white space-y-3 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-hajj-gold border border-white/10">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Modul Pembelajaran Manasik</span>
        </div>

        <div className="max-w-2xl space-y-1.5">
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Materi 6 Rukun Ibadah Haji
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
            Pelajari setiap rukun haji pokok secara sistematis: niat di miqat, wukuf di Arafah, thawaf ifadah, sa'i Safa-Marwah, tahallul bercukur, dan tertib pelaksanaannya.
          </p>
        </div>
      </div>

      {/* 6 Rukun Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-hajj-navy">
            Daftar 6 Rukun Haji
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Ketuk rukun untuk membaca rincian lengkap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAGES_DATA.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
            />
          ))}
        </div>
      </div>

      {/* Next Step Encouragement Card */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-hajj-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-hajj-navy">
            Ingin Menguji Pemahaman Manasikmu?
          </h3>
          <p className="text-xs text-slate-600 max-w-lg">
            Kerjakan 10 soal kuis interaktif untuk mengevaluasi pemahaman ketentuan dan tata cara ibadah haji.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link
            to="/ar"
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-hajj-light text-hajj-primary hover:bg-hajj-primary hover:text-white border border-hajj-border text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
            <span>Lihat AR</span>
          </Link>

          <Link
            to="/kuis"
            className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Mulai Kuis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
