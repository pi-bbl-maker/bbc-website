import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Problem() {
  const { t } = useLanguage();

  return (
    <section id="manifesto" className="bg-linen py-20 md:py-32 border-b border-earth/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-8 md:space-y-12">
          
          {/* Section Indicator */}
          <div className="flex items-center space-x-2 text-olive font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
            <span>The Manifesto</span>
          </div>

          {/* Main Statement */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-earth leading-tight">
            {t('manifesto.heading')}
          </h2>

          {/* Editorial Content Block */}
          <div className="border-l-2 border-earth/20 pl-6 md:pl-10 py-2">
            <p className="text-xl sm:text-2xl text-charcoal/80 leading-relaxed font-sans font-light">
              {t('manifesto.copy')}
            </p>
          </div>

          {/* Footer of Manifesto */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-earth/10 text-xs font-mono text-earth/60 gap-4">
            <div>TARGET FOCUS: CLIMATE RESILIENCY & COMMUNITY AGROECOLOGY</div>
            <div>DEVELOPMENT SCOPE: OPEN DIGITAL COMMONS</div>
          </div>

        </div>

      </div>
    </section>
  );
}
