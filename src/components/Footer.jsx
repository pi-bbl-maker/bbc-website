import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-dark text-linen/70 py-12 border-t border-earth/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Attribution & Tagline */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-olive/20 rounded border border-olive/30 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 9c6-1 7 1 14 0" />
                  <path d="M9 5c-1 6 1 7 0 14" />
                </svg>
              </div>
              <span className="font-serif text-base font-bold text-linen tracking-wide">
                Buffalo Back Labs
              </span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links Column A */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-linen/40 font-bold block">Documentation</span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#platform" className="hover:text-linen hover:underline transition-all">Platform Architecture</a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-linen hover:underline transition-all">Ecosystem Specifications</a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-linen hover:underline transition-all">GitHub Repository</a>
              </li>
            </ul>
          </div>

          {/* Links Column B */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-linen/40 font-bold block">Legal & Scope</span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#demo" className="hover:text-linen hover:underline transition-all">Sandbox Terms</a>
              </li>
              <li>
                <a href="#pitch" className="hover:text-linen hover:underline transition-all">Partner Guidelines</a>
              </li>
              <li>
                <span className="text-linen/50">Version v1.0.0 (SemVer)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dynamic Copyright Section */}
        <div className="mt-12 pt-6 border-t border-linen/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-linen/45 space-y-2 sm:space-y-0">
          <span>
            {t('footer.copyright').replace('{year}', currentYear)}
          </span>
          <div className="flex space-x-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-olive/60">SOIL // DATA // COOPERATIVE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
