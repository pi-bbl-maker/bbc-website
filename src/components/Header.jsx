import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const { locale, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('nav.platform'), href: '#platform' },
    { label: t('nav.subscriptionEngine'), href: '#ecosystem' },
    { label: t('nav.forCollectives'), href: '#pitch' },
    { label: t('nav.demo'), href: '#demo' },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-linen/90 backdrop-blur-md border-b border-linen-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group"
          >
            {/* Woven Matrix SVG Icon */}
            <div className="relative flex items-center justify-center w-10 h-10 bg-olive/10 rounded border border-olive/20 group-hover:bg-olive/20 transition-all duration-300">
              <svg 
                className="w-6 h-6 text-olive" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.75"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Woven vertical/horizontal elements with organic curves */}
                <path d="M5 9c6-1 7 1 14 0" />
                <path d="M5 15c6 1 7-1 14 0" />
                <path d="M9 5c-1 6 1 7 0 14" />
                <path d="M15 5c1 6-1 7 0 14" />
                {/* Connecting matrix weave */}
                <path d="M2 12h20M12 2v20" strokeDasharray="2 2" className="opacity-50" />
              </svg>
              {/* Corner brackets simulating data grids */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-earth/30"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-earth/30"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-earth">
                Buffalo Back Labs
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-olive -mt-1">
                Agroecological Stack
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-charcoal/85 hover:text-earth transition-colors duration-250 border-b border-transparent hover:border-earth/40 pb-1"
              >
                {item.label}
              </a>
            ))}

            {/* Language Selection Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-earth/5 hover:bg-earth/10 text-earth border border-earth/15 transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-earth/5 text-earth border border-earth/15"
            >
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-earth hover:text-olive transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-linen-dark/50 bg-linen/95 backdrop-blur-lg animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-charcoal/85 hover:bg-olive/10 hover:text-earth transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
