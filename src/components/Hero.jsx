import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl space-y-8">
          
          {/* Main Headline */}
          <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ink-light dark:text-ink-dark leading-[0.98] uppercase">
            {t('hero.headline')}
          </h1>

          {/* Subhead in plain-spoken, woman's voice */}
          <p className="font-sans text-xl sm:text-2xl md:text-2xl text-ink-muted dark:text-ink-darkMuted font-normal leading-relaxed max-w-2xl">
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

      </div>
    </section>
  );
}