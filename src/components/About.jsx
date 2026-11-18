import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          <div className="md:col-span-4">
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
              {t('about.title')}
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="font-sans text-xl sm:text-2xl text-ink-light dark:text-ink-dark font-normal leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('about.p2')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}