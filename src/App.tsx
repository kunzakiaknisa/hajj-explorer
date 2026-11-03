import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';
import { HomePage } from './pages/HomePage';
import { LearningPage } from './pages/LearningPage';
import { StageDetailPage } from './pages/StageDetailPage';
import { ARPage } from './pages/ARPage';
import { MapPage } from './pages/MapPage';
import { QuizPage } from './pages/QuizPage';
import { GuidePage } from './pages/GuidePage';
import { mediaAssets } from './config/assets';

// Scroll to top helper component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-hajj-bg text-hajj-navy selection:bg-hajj-light selection:text-hajj-primary">
        
        {/* Global Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/materi" element={<LearningPage />} />
            <Route path="/materi/:id" element={<StageDetailPage />} />
            <Route path="/ar" element={<ARPage />} />
            <Route path="/peta" element={<MapPage />} />
            <Route path="/kuis" element={<QuizPage />} />
            <Route path="/panduan" element={<GuidePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Desktop Footer */}
        <footer className="hidden md:block bg-white border-t border-hajj-border py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-hajj-primary p-1 flex items-center justify-center">
                <img src={mediaAssets.kaabaIcon} alt="Hajj Explorer" className="w-full h-full" />
              </div>
              <span className="font-bold text-hajj-navy">HAJJ EXPLORER</span>
              <span>— Platform Pembelajaran Ibadah Haji Berbasis Augmented Reality</span>
            </div>

            <div className="flex items-center space-x-4">
              <span>Integrasi Assemblr EDU & Three.js</span>
              <span>•</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation Bar */}
        <BottomNavigation />

      </div>
    </HashRouter>
  );
};

export default App;
