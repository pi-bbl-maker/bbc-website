import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function Ecosystem() {
  const { t } = useLanguage();

  const ecosystemPartners = [
    { name: 'Buffalo Back', logo: '/ecosystem/logo-buffaloback.png' },
    { name: 'Kai Thota', logo: '/ecosystem/logo-kaithota.png' },
    { name: '16 Doddi Trust', logo: '/ecosystem/logo-16doddi.png' },
    { name: 'The Ragihalli Collective', logo: '/ecosystem/logo-ragihalli.png' },
  ];

  return (
    <section id="ecosystem" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          <div className="md:col-span-4">
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
              {t('ecosystem.title')}
            </h2>
          </div>

          <div className="md:col-span-8 space-y-10">
            <p className="font-sans text-xl sm:text-2xl text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('ecosystem.desc')}
            </p>

            {/* Ecosystem Partner Logos from bbcf.store */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2">
              {ecosystemPartners.map((partner) => (
                <div 
                  key={partner.name}
                  className="bg-white rounded-xl p-3 sm:p-4 h-20 sm:h-24 flex items-center justify-center border border-hairline-light dark:border-white/10 shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-h-12 sm:max-h-14 w-auto max-w-[130px] object-contain block select-none"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2">
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
