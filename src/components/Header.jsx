import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';

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
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-canvas-light/95 dark:bg-canvas-dark/95 backdrop-blur-md border-b border-hairline-light dark:border-hairline-dark transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Left: Full Unclipped BBL Logo at generous 44-48px height */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center py-2 shrink-0"
            aria-label="Buffalo Back Labs"
          >
            {theme === 'dark' ? (
              <img 
                src="/brand/Logo Color White.svg" 
                alt="Buffalo Back Labs" 
                className="h-10 sm:h-11 md:h-12 w-auto object-contain max-w-none block"
              />
            ) : (
              <img 
                src="/brand/Logo Color Blue.svg" 
                alt="Buffalo Back Labs" 
                className="h-10 sm:h-11 md:h-12 w-auto object-contain max-w-none block"
              />
            )}
          </a>

          {/* Right: Clean Single-Line Nav Links + Primary Pill CTA + Theme Toggle + Kannada Toggle */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-7" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-tight text-ink-light/80 hover:text-ink-light dark:text-ink-dark/80 dark:hover:text-ink-dark transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Crisp Primary Pill CTA Button ("Get in Touch" -> #contact) */}
            <a
              href="#contact"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-brand-blue text-white dark:bg-brand-gold dark:text-canvas-dark hover:opacity-90 transition-opacity min-h-[36px]"
            >
              <span>{t('hero.ctaContact')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <div className="h-4 w-[1px] bg-hairline-light dark:bg-hairline-dark" />

            {/* Minimal Light / Dark Mode Toggle */}
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

            {/* Minimal Language Toggle */}
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

            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 text-xs font-medium rounded border border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark min-h-[44px]"
              aria-label="Toggle language"
            >
              <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>

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
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full text-sm font-semibold bg-brand-blue text-white dark:bg-brand-gold dark:text-canvas-dark min-h-[48px]"
              >
                <span>{t('hero.ctaContact')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}