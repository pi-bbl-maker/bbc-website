import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative pt-16 pb-20 md:pt-28 md:pb-28 border-b border-hairline-light dark:border-hairline-dark transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Typography, Narrative & Actions */}
          <div className="md:col-span-7 space-y-8">
            
            {/* Mobile Mark: only shown on small mobile screens (< md) */}
            <div className="block md:hidden">
              {theme === 'dark' ? (
                <img 
                  src="/brand/Icon Color White.svg" 
                  alt="Buffalo Back Labs Mark" 
                  className="w-16 sm:w-20 h-auto object-contain block"
                />
              ) : (
                <img 
                  src="/brand/Icon Color Blue.svg" 
                  alt="Buffalo Back Labs Mark" 
                  className="w-16 sm:w-20 h-auto object-contain block"
                />
              )}
            </div>

            {/* Main Headline */}
            <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ink-light dark:text-ink-dark leading-[0.98] uppercase">
              {t('hero.headline')}
            </h1>

            {/* Subhead in plain-spoken, woman's voice */}
            <p className="font-sans text-xl sm:text-2xl text-ink-muted dark:text-ink-darkMuted font-normal leading-relaxed max-w-2xl">
              {t('hero.subhead')}
            </p>

            {/* Two clean links/buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-6">
              <a
                href="#products"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded text-sm font-medium tracking-wide bg-brand-blue text-white dark:bg-ink-dark dark:text-canvas-dark hover:opacity-90 transition-opacity min-h-[44px]"
              >
                <span>{t('hero.ctaWork')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center text-sm font-medium tracking-wide text-ink-light hover:text-brand-blue dark:text-ink-dark dark:hover:text-brand-gold transition-colors border-b border-current pb-0.5"
              >
                <span>{t('hero.ctaContact')}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Large Crisp Editorial BBL Mark on Tablet/Desktop (md:w-64 lg:w-80) */}
          <div className="hidden md:flex md:col-span-5 justify-center items-center py-6">
            <div className="w-full md:w-64 lg:w-80 max-w-[340px] flex justify-center items-center select-none">
              {theme === 'dark' ? (
                <img 
                  src="/brand/Icon Color White.svg" 
                  alt="Buffalo Back Labs Mark" 
                  className="w-full h-auto object-contain max-h-[360px] drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]"
                />
              ) : (
                <img 
                  src="/brand/Icon Color Blue.svg" 
                  alt="Buffalo Back Labs Mark" 
                  className="w-full h-auto object-contain max-h-[360px] drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]"
                />
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}