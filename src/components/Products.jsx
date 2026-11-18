import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function Products() {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-14">
          <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
            {t('products.title')}
          </h2>
        </div>

        {/* Clean 3-Item Editorial List with Hairline Dividers */}
        <div className="divide-y divide-hairline-light dark:divide-hairline-dark border-t border-b border-hairline-light dark:border-hairline-dark">
          
          {/* Kai Thota OS */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl font-medium text-ink-light dark:text-ink-dark">
                {t('products.kaithota.name')}
              </h3>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
                {t('products.kaithota.desc')}
              </p>
              <div>
                <a
                  href="https://app.kaithota.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-sm font-medium text-brand-blue hover:underline dark:text-brand-gold"
                >
                  <span>{t('products.kaithota.linkText')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* PGS Tools */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl font-medium text-ink-light dark:text-ink-dark">
                {t('products.pgsoc.name')}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
                {t('products.pgsoc.desc')}
              </p>
            </div>
          </div>

          {/* Open Agroecology Commons */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl font-medium text-ink-light dark:text-ink-dark">
                {t('products.commons.name')}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
                {t('products.commons.desc')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}