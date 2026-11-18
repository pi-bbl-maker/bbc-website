import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function Ecosystem() {
  const { t } = useLanguage();

  return (
    <section id="ecosystem" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          <div className="md:col-span-4">
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
              {t('ecosystem.title')}
            </h2>
          </div>

          <div className="md:col-span-8 space-y-8">
            <p className="font-sans text-xl sm:text-2xl text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('ecosystem.desc')}
            </p>

            <div>
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 text-sm font-medium tracking-wide text-brand-blue dark:text-brand-gold border-b border-current pb-1 hover:opacity-80 transition-opacity"
              >
                <span>{t('ecosystem.cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}