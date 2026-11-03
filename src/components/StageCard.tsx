import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { StageData } from '../data/stages';
import { getStageFallback } from '../config/assets';

interface StageCardProps {
  stage: StageData;
}

export const StageCard: React.FC<StageCardProps> = ({ stage }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-white rounded-2xl border border-hajj-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full">
      
      {/* Thumbnail Banner with fallback */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={imageError ? getStageFallback(stage.name, stage.stepNumber) : stage.image}
          alt={stage.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

        {/* Rukun Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-hajj-navy/90 backdrop-blur-sm text-white text-xs font-bold tracking-wider shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-hajj-gold" />
          <span>Rukun {stage.stepNumber}</span>
        </div>

        {/* Audio badge if available */}
        {stage.audioUrl && (
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium flex items-center gap-1 backdrop-blur-sm">
            <Volume2 className="w-3 h-3 text-hajj-gold" />
            <span>Audio Doa</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-hajj-navy group-hover:text-hajj-primary transition-colors leading-snug">
            {stage.name}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {stage.shortDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/materi/${stage.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95"
          >
            <span>Pelajari</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to={`/ar?scene=${stage.sceneIndex}`}
            title="Lihat Visualisasi 3D/AR"
            className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Scene AR</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
