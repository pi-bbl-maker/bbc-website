import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Research() {
  const { t } = useLanguage();

  return (
    <section id="research" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-14">
          <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
            {t('research.title')}
          </h2>
        </div>

        {/* 3-Row Clean Structure with Hairline Borders */}
        <div className="divide-y divide-hairline-light dark:divide-hairline-dark border-t border-b border-hairline-light dark:border-hairline-dark">
          
          {/* Vernacular ASR */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl font-medium text-ink-light dark:text-ink-dark">
                {t('research.asr.name')}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
                {t('research.asr.desc')}
              </p>
            </div>
          </div>

          {/* Living Lab */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl font-medium text-ink-light dark:text-ink-dark">
                {t('research.livingLab.name')}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
                {t('research.livingLab.desc')}
              </p>
            </div>
          </div>

          {/* Open Source */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl font-medium text-ink-light dark:text-ink-dark">
                {t('research.openSource.name')}
              </h3>
            </div>
            <div className="md:col-span-8 space-y-2">
              <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
                {t('research.openSource.desc')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
