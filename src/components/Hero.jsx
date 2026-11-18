import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="relative pt-16 pb-20 md:pt-28 md:pb-28 border-b border-hairline-light dark:border-hairline-dark transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Narrative & Actions */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Mobile Mark: Cleanly scaled above headline on mobile */}
            <div className="block lg:hidden">
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

            {/* Honest AI-built line: clean, understated note—not a badge */}
            <div className="pt-2">
              <p className="text-sm text-ink-muted/80 dark:text-ink-darkMuted/80 font-sans italic border-l border-brand-gold/60 pl-4 py-1">
                {t('hero.aiLine')}
              </p>
            </div>

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

          {/* Right Column: Large Crisp Editorial BBL Mark on Desktop */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center py-6">
            <div className="w-full max-w-[340px] flex justify-center items-center select-none">
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