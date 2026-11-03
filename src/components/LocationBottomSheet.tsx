import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, CheckCircle, Sparkles, MapPin, Compass } from 'lucide-react';
import { LocationData } from '../data/locations';
import { getLocationFallback } from '../config/assets';

interface LocationBottomSheetProps {
  location: LocationData | null;
  onClose: () => void;
}

export const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({ location, onClose }) => {
  if (!location) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet / Modal Container - DOMINAN WARNA BIRU */}
      <div className="relative w-full sm:max-w-xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#123B56] via-[#10344D] to-[#0A2233] text-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 border border-[#258FBA]/40 flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile drag handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#258FBA]/50" />
        </div>

        {/* Header Image (DIPERBESAR LEBIH DARI 25%: dari h-44 menjadi h-64 sm:h-80) */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={location.image}
            alt={location.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = getLocationFallback(location.name, location.order);
            }}
            className="w-full h-full object-cover opacity-95 transition-transform duration-500 hover:scale-105"
          />
          {/* Rich Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#123B56] via-black/40 to-black/25" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-10 border border-white/20 active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Number & Category Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-hajj-gold text-hajj-navy text-xs font-black flex items-center justify-center shadow-lg">
              {location.order}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white/20 ${
              location.ritualCategory === 'Rukun Haji' ? 'bg-emerald-600' : 'bg-hajj-primary'
            }`}>
              {location.ritualCategory}
            </span>
          </div>

          {/* Title on bottom of image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow-md">
              {location.name}
            </h3>
            <p className="text-xs sm:text-sm text-hajj-gold font-arabic tracking-wide mt-0.5">
              {location.arabicName}
            </p>
          </div>
        </div>

        {/* Sheet Content Body - Dominan Biru & Teks Bersih */}
        <div className="p-5 sm:p-6 space-y-4 flex-1">
          
          {/* Deskripsi */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-hajj-gold mb-1">
              Deskripsi Stasiun Perjalanan
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {location.fullDesc}
            </p>
          </div>

          {/* Aktivitas Ibadah Terkait (Blue Glass Card) */}
          <div className="p-4 rounded-2xl bg-[#176B9B]/25 border border-[#258FBA]/30 space-y-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-hajj-gold font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Aktivitas Ibadah di Lokasi Ini:</span>
            </div>
            <ul className="space-y-2">
              {location.activities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-100 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Edukasi Pembeda Rukun vs Stasiun */}
          {location.ritualCategory === 'Wajib Haji' && (
            <div className="p-3.5 rounded-xl bg-[#0D2E45] border border-amber-400/40 text-[11px] text-amber-200 leading-relaxed">
              <strong>Catatan Fiqih:</strong> {location.name} adalah stasiun pelaksanaan <em>Wajib Haji</em>. Jika tertinggal, jemaah wajib membayar Dam (denda), berbeda dengan 6 Rukun Haji yang menentukan keabsahan ibadah.
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            {location.relatedStageId ? (
              <Link
                to={`/materi/${location.relatedStageId}`}
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-hajj-gold hover:from-amber-500 hover:to-amber-600 text-hajj-navy text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <span>Pelajari Materi Terkait</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/materi"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-[#176B9B]/40 hover:bg-[#176B9B]/70 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-[#258FBA]/40 transition-all active:scale-95"
              >
                <span>Lihat Seluruh Rukun</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium border border-white/20 transition-colors"
            >
              Tutup
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
