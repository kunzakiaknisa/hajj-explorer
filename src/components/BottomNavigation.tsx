import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, MapPin, Award, Sparkles } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Beranda',
      icon: Home
    },
    {
      path: '/materi',
      label: 'Materi',
      icon: BookOpen
    },
    {
      path: '/ar',
      label: 'Ruang AR',
      icon: Sparkles,
      highlight: true
    },
    {
      path: '/peta',
      label: 'Peta',
      icon: MapPin
    },
    {
      path: '/kuis',
      label: 'Kuis',
      icon: Award
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-hajj-border shadow-[0_-4px_20px_rgba(18,59,86,0.08)] px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          if (item.highlight) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-5 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-active:scale-95 ${
                  isActive 
                    ? 'bg-gradient-to-tr from-hajj-primary to-hajj-secondary text-white ring-4 ring-hajj-light shadow-hajj-primary/30' 
                    : 'bg-gradient-to-tr from-hajj-navy to-hajj-primary text-hajj-gold ring-4 ring-white'
                }`}>
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
                <span className={`text-[10px] mt-1 font-bold ${
                  isActive ? 'text-hajj-primary' : 'text-hajj-navy'
                }`}>
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-hajj-primary font-bold'
                  : 'text-slate-500 hover:text-hajj-navy font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${
                isActive ? 'bg-hajj-light' : 'bg-transparent'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
