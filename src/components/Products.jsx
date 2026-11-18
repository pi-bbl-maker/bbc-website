import React from 'react';
import { useLanguage } from '../context/LanguageContext';

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

        {/* Clean Studio Mobile + Web Layered Frame */}
        <div id="proof" className="mt-16 md:mt-20">
          <div className="relative rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-hairline-light dark:border-hairline-dark p-4 sm:p-8 md:p-12 overflow-hidden">
            
            {/* Ambient subtle glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-blue/5 dark:bg-brand-gold/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto">
              
              {/* Web Dashboard Frame */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-hairline-light dark:border-white/10 bg-white dark:bg-[#0B1F22]">
                {/* Minimal Browser Header */}
                <div className="px-4 py-2.5 bg-canvas-light dark:bg-[#081719] border-b border-hairline-light dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono text-ink-muted/80 dark:text-ink-darkMuted/80 tracking-tight">
                    Kai Thota OS — Farm & Harvest Planning
                  </span>
                  <div className="w-12" />
                </div>
                
                <img 
                  src="/screenshots/kaithota-web.png" 
                  alt="Kai Thota OS Web Dashboard" 
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Layered Mobile Device Frame (Farmer View) */}
              <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-2 md:right-8 w-full sm:w-56 md:w-64 rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-[#0F2A2E] bg-white dark:bg-[#081719] transition-transform duration-300 hover:scale-105">
                {/* Mobile Top Indicator */}
                <div className="bg-[#1E4D2B] px-3.5 py-1.5 flex items-center justify-between text-[11px] font-medium text-white">
                  <span>ಕೈ ತೋಟ • Field View</span>
                  <span className="text-[10px] opacity-80">Offline</span>
                </div>
                
                <img 
                  src="/screenshots/kaithota-mobile.png" 
                  alt="Kai Thota Farmer Mobile Interface" 
                  className="w-full h-auto object-cover block"
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
