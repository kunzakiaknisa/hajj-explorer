import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Camera } from 'lucide-react';
import { mediaAssets } from '../config/assets';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/materi', label: 'Materi Haji' },
    { path: '/ar', label: 'Ruang AR', highlight: true },
    { path: '/peta', label: 'Peta Perjalanan' },
    { path: '/kuis', label: 'Kuis Haji' },
    { path: '/panduan', label: 'Panduan' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-hajj-border shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hajj-primary to-hajj-secondary p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <img 
                src={mediaAssets.kaabaIcon} 
                alt="Hajj Explorer" 
                className="w-full h-full rounded-[10px] object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-hajj-navy leading-tight flex items-center gap-1.5">
                HAJJ EXPLORER
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-hajj-light text-hajj-primary border border-hajj-primary/20">
                  AR Edu
                </span>
              </span>
              <span className="text-[11px] text-hajj-muted hidden sm:inline">
                Jelajahi Manasik Haji dengan Augmented Reality
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-hajj-primary text-white shadow-sm'
                      : link.highlight
                      ? 'text-hajj-primary bg-hajj-light hover:bg-hajj-light/80 font-semibold'
                      : 'text-hajj-navy hover:text-hajj-primary hover:bg-slate-100'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-hajj-gold animate-pulse" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Quick AR Launch & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Link
              to="/ar"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-hajj-gold hover:from-amber-500 hover:to-amber-600 text-hajj-navy font-bold text-xs shadow-sm hover:shadow transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Buka Kamera AR</span>
            </Link>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-hajj-navy hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-hajj-border px-4 pt-2 pb-4 space-y-1 shadow-lg animate-slide-down">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-hajj-primary text-white font-semibold'
                    : link.highlight
                    ? 'text-hajj-primary bg-hajj-light font-bold flex items-center justify-between'
                    : 'text-hajj-navy hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.highlight && <Sparkles className="w-4 h-4 text-hajj-gold" />}
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
