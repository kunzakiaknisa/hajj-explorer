import React from 'react';
import { Award, Sparkles, BookOpen } from 'lucide-react';
import { QuizComponent } from '../components/QuizComponent';
import { Link } from 'react-router-dom';

export const QuizPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-24">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-hajj-primary rounded-3xl p-6 sm:p-10 text-white space-y-3 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/10">
          <Award className="w-3.5 h-3.5 text-hajj-gold" />
          <span>Evaluasi Pemahaman Manasik Haji</span>
        </div>

        <div className="space-y-1.5 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Kuis Interaktif Rukun Haji
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
            Uji pemahamanmu tentang 6 rukun haji, perbedaan rukun dan wajib haji, tata cara wukuf, thawaf, sa'i, tahallul, hingga urutan pelaksanaannya secara bertahap.
          </p>
        </div>
      </div>

      {/* Quiz Interactive Component */}
      <QuizComponent />

    </div>
  );
};
