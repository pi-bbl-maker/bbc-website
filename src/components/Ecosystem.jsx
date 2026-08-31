import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Ecosystem() {
  const { t } = useLanguage();

  return (
    <section id="architecture" className="bg-[#FAF9F5] py-20 md:py-32 border-b border-earth/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-4 mb-16 md:mb-24">
          <div className="flex items-center space-x-2 text-olive font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
            <span>Platform Topology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-earth">
            {t('architecture.heading')}
          </h2>
          <p className="text-base sm:text-lg text-charcoal/70 max-w-2xl font-light">
            {t('architecture.tagline')}
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          
          {/* Column 1: The Field Layer */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            
            {/* Visual Placeholder 2 */}
            <div className="aspect-[4/3] w-full bg-[#EFE9E0] border border-earth/15 rounded flex items-center justify-center p-6 select-none">
              <div className="max-w-xs text-center border border-dashed border-earth/20 p-4 rounded bg-linen/50">
                <span className="font-mono text-[10px] uppercase text-earth/50 block mb-1">Visual Log // Field Layer</span>
                <p className="font-mono text-xs text-earth/65 italic leading-relaxed">
                  {t('architecture.fieldPlaceholder')}
                </p>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-olive font-semibold block">01 // Input Layer</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-earth">
                {t('architecture.fieldSub')}
              </h3>
              <p className="text-charcoal/85 leading-relaxed text-sm sm:text-base font-light">
                {t('architecture.fieldCopy')}
              </p>
            </div>

          </div>

          {/* Column 2: The Market Layer */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            
            {/* Visual Placeholder 3 */}
            <div className="aspect-[4/3] w-full bg-[#EFE9E0] border border-earth/15 rounded flex items-center justify-center p-6 select-none">
              <div className="max-w-xs text-center border border-dashed border-earth/20 p-4 rounded bg-linen/50">
                <span className="font-mono text-[10px] uppercase text-earth/50 block mb-1">Visual Log // Market Layer</span>
                <p className="font-mono text-xs text-earth/65 italic leading-relaxed">
                  {t('architecture.marketPlaceholder')}
                </p>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-bblindigo font-semibold block">02 // Commerce Layer</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-earth">
                {t('architecture.marketSub')}
              </h3>
              <p className="text-charcoal/85 leading-relaxed text-sm sm:text-base font-light">
                {t('architecture.marketCopy')}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
