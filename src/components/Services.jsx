import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-14">
          <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
            {t('services.title')}
          </h2>
        </div>

        {/* 3-Column Editorial Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Service 1 */}
          <div className="space-y-4 pt-6 border-t border-hairline-light dark:border-hairline-dark">
            <h3 className="font-heading text-xl font-medium text-ink-light dark:text-ink-dark">
              {t('services.s1.name')}
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('services.s1.desc')}
            </p>
          </div>

          {/* Service 2 */}
          <div className="space-y-4 pt-6 border-t border-hairline-light dark:border-hairline-dark">
            <h3 className="font-heading text-xl font-medium text-ink-light dark:text-ink-dark">
              {t('services.s2.name')}
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('services.s2.desc')}
            </p>
          </div>

          {/* Service 3 */}
          <div className="space-y-4 pt-6 border-t border-hairline-light dark:border-hairline-dark">
            <h3 className="font-heading text-xl font-medium text-ink-light dark:text-ink-dark">
              {t('services.s3.name')}
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('services.s3.desc')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}