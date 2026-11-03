import React, { useState } from 'react';
import { Compass, Info, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { InteractiveMap3D } from '../components/InteractiveMap3D';
import { LOCATIONS_DATA, LocationData } from '../data/locations';
import { LocationBottomSheet } from '../components/LocationBottomSheet';

export const MapPage: React.FC = () => {
  const [activeModalLocation, setActiveModalLocation] = useState<LocationData | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-hajj-primary text-xs font-bold border border-sky-200 mb-2">
            <Compass className="w-3.5 h-3.5 text-hajj-secondary" />
            <span>Visualisasi 3D Isometrik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-hajj-navy tracking-tight">
            Peta Perjalanan Haji Interaktif
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Jelajahi alur geografis stasiun manasik haji dari Ka'bah di Masjidil Haram, Bukit Safa-Marwah, Padang Arafah, Muzdalifah, Lembah Mina, hingga Kompleks Jamarat.
          </p>
        </div>

        {/* Fiqih Note Badge */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 max-w-xs text-left shrink-0">
          <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Penting untuk Dipahami:</span>
          </p>
          <p className="text-[10px] text-amber-800 mt-0.5 leading-relaxed">
            Muzdalifah, Mina, dan Jamarat adalah stasiun <strong>Wajib Haji</strong> dan perjalanan manasik, bukan pengganti 6 Rukun Haji pokok.
          </p>
        </div>
      </div>

      {/* 3D Interactive Map Canvas */}
      <section>
        <InteractiveMap3D />
      </section>

      {/* 6 Location Station Cards Grid */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-hajj-navy">
            6 Stasiun & Titik Bersejarah Perjalanan Haji
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Ketuk salah satu lokasi untuk melihat panduan amalan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOCATIONS_DATA.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setActiveModalLocation(loc)}
              className="p-5 rounded-2xl bg-white border border-hajj-border hover:border-hajj-primary shadow-soft hover:shadow-card transition-all text-left flex flex-col justify-between group space-y-3"
            >
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-xl text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: loc.badgeColor }}
                  >
                    {loc.order}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-hajj-navy group-hover:text-hajj-primary transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-[10px] text-amber-700 font-arabic">
                      {loc.arabicName}
                    </p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white shrink-0 ${
                  loc.ritualCategory === 'Rukun Haji' ? 'bg-emerald-600' : 'bg-hajj-primary'
                }`}>
                  {loc.ritualCategory}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {loc.shortDesc}
              </p>

              <div className="pt-1 flex items-center justify-between text-xs font-semibold text-hajj-primary border-t border-slate-100">
                <span>Rincian Amalan & Lokasi</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Location Details Sheet / Modal */}
      <LocationBottomSheet
        location={activeModalLocation}
        onClose={() => setActiveModalLocation(null)}
      />

    </div>
  );
};
