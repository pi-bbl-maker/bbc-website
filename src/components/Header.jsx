import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';

export default function Header() {
  const { locale, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-50 bg-canvas-light/95 dark:bg-canvas-dark/95 backdrop-blur-md border-b border-hairline-light dark:border-hairline-dark transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section: ONLY the full SVG logo, never clipped or duplicated with text */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center py-2"
            aria-label="Buffalo Back Labs"
          >
            {theme === 'dark' ? (
              <img 
                src="/brand/Logo Color White.svg" 
                alt="Buffalo Back Labs" 
                className="h-7 sm:h-8 md:h-9 w-auto object-contain block"
              />
            ) : (
              <img 
                src="/brand/Logo Color Blue.svg" 
                alt="Buffalo Back Labs" 
                className="h-7 sm:h-8 md:h-9 w-auto object-contain block"
              />
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-tight text-ink-light/80 hover:text-ink-light dark:text-ink-dark/80 dark:hover:text-ink-dark transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="h-4 w-[1px] bg-hairline-light dark:bg-hairline-dark" />

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-ink-light/70 hover:text-ink-light dark:text-ink-dark/70 dark:hover:text-ink-dark hover:bg-black/5 dark:hover:bg-white/5 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-brand-gold" />
              ) : (
                <Moon className="w-4 h-4 text-brand-indigo" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-medium tracking-tight rounded text-ink-light/80 hover:text-ink-light dark:text-ink-dark/80 dark:hover:text-ink-dark border border-hairline-light dark:border-hairline-dark hover:border-ink-light/40 dark:hover:border-ink-dark/40 transition-all min-h-[32px]"
              aria-label="Toggle language between English and Kannada"
            >
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-ink-light/80 dark:text-ink-dark/80 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-brand-gold" />
              ) : (
                <Moon className="w-5 h-5 text-brand-indigo" />
              )}
            </button>

            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 text-xs font-medium rounded border border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark min-h-[44px]"
              aria-label="Toggle language"
            >
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink-light dark:text-ink-dark min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline-light dark:border-hairline-dark bg-canvas-light/98 dark:bg-canvas-dark/98 backdrop-blur-xl animate-fadeIn">
          <div className="px-5 pt-4 pb-8 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-base font-medium text-ink-light dark:text-ink-dark hover:text-brand-gold transition-colors min-h-[48px] flex items-center border-b border-hairline-light/50 dark:border-hairline-dark/50"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="https://app.kaithota.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-medium text-brand-blue dark:text-brand-teal"
              >
                <span>Launch Kai Thota OS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}