import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { StageCard } from '../components/StageCard';
import { VideoPlayer } from '../components/VideoPlayer';
import { STAGES_DATA } from '../data/stages';
import { 
  BookOpen, Sparkles, Compass, ArrowRight, Camera,
  ChevronLeft, ChevronRight, MoveHorizontal
} from 'lucide-react';
import { mediaAssets } from '../config/assets';

export const HomePage: React.FC = () => {
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Mouse drag state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const scrollToVideo = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Calculate active slide index
    const firstChild = sliderRef.current.firstElementChild as HTMLElement;
    if (firstChild) {
      const cardWidth = firstChild.getBoundingClientRect().width;
      const gap = 20;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveSlideIndex(Math.max(0, Math.min(STAGES_DATA.length - 1, index)));
    }
  };

  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const firstChild = sliderRef.current.firstElementChild as HTMLElement;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 340;
    const scrollAmount = cardWidth + 24;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const firstChild = sliderRef.current.firstElementChild as HTMLElement;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 340;
    const scrollAmount = (cardWidth + 24) * index;

    sliderRef.current.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    setActiveSlideIndex(index);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    sliderRef.current.scrollLeft = scrollLeftPos - walk;
  };

  useEffect(() => {
    handleSliderScroll();
    window.addEventListener('resize', handleSliderScroll);
    return () => window.removeEventListener('resize', handleSliderScroll);
  }, []);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      
      {/* Hero Section */}
      <HeroSection onScrollToVideo={scrollToVideo} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">

        {/* Section D: 6 Rukun Haji Slide Carousel */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-hajj-primary font-bold text-xs uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Rukun Haji Pokok</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-hajj-navy tracking-tight">
                6 Rukun Ibadah Haji
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-xl">
                Amalan pokok yang wajib dilaksanakan secara berurutan dan menentukan keabsahan ibadah haji. Geser untuk melihat seluruh rukun.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              {/* Previous / Next Arrow Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => handleScrollStep('left')}
                  disabled={!canScrollLeft}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    canScrollLeft 
                      ? 'bg-white text-hajj-navy shadow-sm hover:bg-hajj-primary hover:text-white cursor-pointer active:scale-95' 
                      : 'text-slate-300 cursor-not-allowed opacity-50'
                  }`}
                  aria-label="Geser ke kiri"
                  title="Rukun Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleScrollStep('right')}
                  disabled={!canScrollRight}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    canScrollRight 
                      ? 'bg-white text-hajj-navy shadow-sm hover:bg-hajj-primary hover:text-white cursor-pointer active:scale-95' 
                      : 'text-slate-300 cursor-not-allowed opacity-50'
                  }`}
                  aria-label="Geser ke kanan"
                  title="Rukun Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                to="/materi"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-hajj-primary hover:text-hajj-navy transition-colors group"
              >
                <span>Buka Seluruh Materi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 6 Stage Cards Horizontal Slide Container */}
          <div className="relative group">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 no-scrollbar select-none ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {STAGES_DATA.map((stage) => (
                <div
                  key={stage.id}
                  className="w-[82vw] sm:w-[320px] md:w-[360px] lg:w-[380px] shrink-0 snap-start flex flex-col"
                >
                  <StageCard stage={stage} />
                </div>
              ))}
            </div>
          </div>

          {/* Slide Navigation Dots & Gesture Hint */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MoveHorizontal className="w-4 h-4 text-hajj-primary/70 animate-pulse" />
              <span className="hidden xs:inline">Geser ke samping untuk menjelajahi rukun 1 s.d 6</span>
              <span className="xs:hidden">Geser untuk rukun 1-6</span>
            </div>

            {/* 6 Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {STAGES_DATA.map((stage, idx) => {
                const isActive = activeSlideIndex === idx;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive 
                        ? 'w-7 h-2 bg-hajj-primary shadow-sm' 
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Lihat slide Rukun ${stage.stepNumber}: ${stage.name}`}
                    title={`Rukun ${stage.stepNumber}: ${stage.name}`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Section E: Video Pembelajaran */}
        <section ref={videoSectionRef} className="pt-2 scroll-mt-20">
          <div className="bg-white rounded-3xl p-4 sm:p-7 border border-hajj-border shadow-soft">
            <VideoPlayer title="Belajar Manasik Haji" />
          </div>
        </section>

        {/* Dynamic Interactive Features Showcase: Peta 3D & Marker AR */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* Peta 3D Feature Card */}
          <div className="bg-gradient-to-br from-hajj-navy via-hajj-primary to-hajj-secondary rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between space-y-5 shadow-card hover:shadow-elevated transition-shadow">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-hajj-gold text-xs font-bold border border-white/10">
                <Compass className="w-3.5 h-3.5" />
                <span>Eksplorasi 3D Isometrik</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
                Peta Perjalanan Haji 3D
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                Jelajahi pemandangan isometrik 6 stasiun perjalanan: Masjidil Haram, Bukit Safa-Marwah, Padang Arafah, Muzdalifah, Lembah Mina, hingga Jamarat.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/peta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-hajj-gold hover:bg-amber-400 text-hajj-navy font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Buka Peta Perjalanan 3D</span>
              </Link>
            </div>
          </div>

          {/* Marker AR Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-hajj-border shadow-soft flex flex-col sm:flex-row items-center gap-5 hover:shadow-card transition-shadow">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-slate-50 p-2 border border-slate-200 shrink-0 shadow-inner flex items-center justify-center">
              <img
                src={mediaAssets.assemblrMarker}
                alt="Assemblr QR Marker"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2.5 flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-hajj-gold" />
                <span>Assemblr WebAR Resmi</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-hajj-navy leading-snug">
                Augmented Reality & Model 3D
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eksplorasi model 3D manasik haji di website atau aktifkan mode Augmented Reality di smartphone dengan memindai marker resmi Assemblr.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                <Link
                  to="/ar"
                  className="py-2.5 px-4 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5 text-hajj-gold" />
                  <span>Buka Ruang AR</span>
                </Link>
                <a
                  href={mediaAssets.assemblrMarker}
                  download="assemblr-marker.png"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Unduh Marker
                </a>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
