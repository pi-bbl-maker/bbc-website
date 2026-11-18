import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, ExternalLink, Sparkles } from 'lucide-react';

export default function Header() {
  const { locale, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('nav.products'), href: '#products' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.research'), href: '#research' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.ecosystem'), href: '#ecosystem' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#4A6B82]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section with Official BBL Logo SVG */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group py-2"
            aria-label="Buffalo Back Labs Home"
          >
            <img 
              src="/brand/Logo Color Blue.svg" 
              alt="Buffalo Back Labs Logo" 
              className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="hidden lg:flex flex-col pl-2 border-l border-[#4A6B82]/20">
              <span className="text-[11px] font-semibold text-[#1B2A4A] tracking-tight leading-tight">
                Buffalo Back Labs
              </span>
              <span className="text-[10px] text-[#4D5D3B] font-medium tracking-wide">
                Technology for Agroecology
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#222222]/85 hover:text-[#1B2A4A] transition-colors duration-200 border-b-2 border-transparent hover:border-[#1B2A4A] py-1"
              >
                {item.label}
              </a>
            ))}

            {/* Launch App Button */}
            <a
              href="https://app.kaithota.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1B2A4A] text-white hover:bg-[#2E3E61] transition-all shadow-sm"
            >
              <span>Kai Thota</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1B2A4A]/5 hover:bg-[#1B2A4A]/10 text-[#1B2A4A] border border-[#1B2A4A]/20 transition-all min-h-[36px]"
              aria-label="Toggle language between English and Kannada"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold bg-[#1B2A4A]/5 text-[#1B2A4A] border border-[#1B2A4A]/20 min-h-[44px]"
              aria-label="Toggle language"
            >
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1B2A4A] hover:text-[#4D5D3B] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg border border-[#4A6B82]/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#4A6B82]/20 bg-[#FAF6F0]/98 backdrop-blur-xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#222222] hover:bg-[#1B2A4A]/5 hover:text-[#1B2A4A] transition-colors min-h-[48px] flex items-center"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#4A6B82]/15">
              <a
                href="https://app.kaithota.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-semibold bg-[#1B2A4A] text-white hover:bg-[#2E3E61] transition-all min-h-[48px]"
              >
                <span>Launch Kai Thota (app.kaithota.in)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}