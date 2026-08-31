import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="platform" className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-between bg-linen-dark border-b border-earth/15 overflow-hidden">
      
      {/* Visual Placeholder Background Shell */}
      <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#EFE9E0] select-none pointer-events-none">
        {/* Placeholder text printed in clean monospace font, simulating the photo placeholder */}
        <div className="max-w-xl text-center px-6 py-8 border border-dashed border-earth/20 rounded bg-linen/50">
          <p className="font-mono text-xs md:text-sm text-earth/50 tracking-wide uppercase mb-1">
            Visual Layer // Canvas Overlay
          </p>
          <p className="font-mono text-sm md:text-base text-earth/65 italic leading-relaxed">
            {t('hero.placeholder')}
          </p>
        </div>
      </div>

      {/* Structured Color Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-linen/95 via-linen/80 to-transparent lg:from-linen/95 lg:via-linen/90 lg:to-linen/10 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-12 md:py-20">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          
          {/* Section Marker */}
          <div className="inline-flex items-center space-x-2 text-olive font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span>BBL // Platform Manifesto</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-earth leading-[1.05]">
            {t('hero.headline')}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl md:text-2xl text-charcoal/80 leading-relaxed font-sans max-w-2xl font-light">
            {t('hero.subheadline')}
          </p>

          {/* Scroll Indicator or CTA */}
          <div className="pt-4 flex items-center space-x-4">
            <a
              href="#manifesto"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-earth text-linen hover:bg-earth-dark font-semibold text-sm transition-all duration-200 shadow-sm"
            >
              Read the Manifesto
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center text-earth hover:text-olive font-semibold text-sm transition-all space-x-2"
            >
              <span>Explore Architecture</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>

        </div>
      </div>

      {/* Coordinate Stamp */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex justify-between items-center text-[10px] font-mono text-earth/50">
        <span>BUFFALO BACK LABS © 2026</span>
        <span>LAT: 12.7562° N // LON: 77.5891° E</span>
      </div>

    </section>
  );
}
