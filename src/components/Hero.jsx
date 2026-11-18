import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, ExternalLink, Sparkles, ShieldCheck, WifiOff, Smartphone } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#FAF6F0] border-b border-[#4A6B82]/20 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      
      {/* Background Subtle Graphic Grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1B2A4A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1B2A4A]/10 border border-[#1B2A4A]/20 text-[#1B2A4A] text-xs font-semibold tracking-wide">
            <img src="/brand/Icon Color Blue.svg" alt="BBL Icon" className="w-4 h-4 object-contain" />
            <span>{t('badge.tagline')}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1E4D2B]/10 border border-[#1E4D2B]/20 text-[#1E4D2B] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>{t('badge.aiTransparency')}</span>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B2A4A] leading-[1.1]">
              {t('hero.headline')}
            </h1>

            <p className="text-lg sm:text-xl text-[#222222]/85 font-light leading-relaxed max-w-2xl font-sans">
              {t('hero.subheadline')}
            </p>

            {/* Honest AI-Built Tagline Callout */}
            <div className="p-4 rounded-xl bg-white/70 border border-[#4A6B82]/20 shadow-sm max-w-2xl">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-lg bg-[#4A6B82]/10 text-[#1B2A4A] mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#1B2A4A]" />
                </div>
                <div className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed font-sans">
                  <strong className="text-[#1B2A4A] block font-semibold mb-0.5">
                    Honest AI Acceleration:
                  </strong>
                  {t('hero.aiTagline')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#1B2A4A] text-white hover:bg-[#2E3E61] font-semibold text-sm transition-all shadow-sm min-h-[48px]"
              >
                <span>{t('hero.ctaProducts')}</span>
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>

              <a
                href="https://app.kaithota.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#1E4D2B] text-white hover:bg-[#1E4D2B]/90 font-semibold text-sm transition-all shadow-sm min-h-[48px]"
              >
                <span>{t('hero.ctaLiveApp')}</span>
              </a>

              <a
                href="#research"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg border border-[#4A6B82]/30 text-[#1B2A4A] hover:bg-[#1B2A4A]/5 font-semibold text-sm transition-all min-h-[48px]"
              >
                <span>{t('hero.ctaResearch')}</span>
              </a>
            </div>

            {/* Feature Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#4A6B82]">
              <span className="inline-flex items-center">
                <WifiOff className="w-3.5 h-3.5 mr-1.5 text-[#1E4D2B]" />
                100% Offline-Resilient
              </span>
              <span className="inline-flex items-center">
                <Smartphone className="w-3.5 h-3.5 mr-1.5 text-[#1B2A4A]" />
                Kannada & Bilingual
              </span>
              <span className="inline-flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#FAB818]" />
                Open Agrarian Commons
              </span>
            </div>

          </div>

          {/* Right Column: Live App Screenshot Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Desktop Browser Mockup Frame */}
              <div className="rounded-2xl overflow-hidden bg-white border border-[#4A6B82]/25 shadow-xl transition-all duration-300 hover:shadow-2xl">
                {/* Browser Title Bar */}
                <div className="bg-[#FAF6F0] px-4 py-2.5 border-b border-[#4A6B82]/20 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-white border border-[#4A6B82]/20 text-[11px] font-mono text-[#4A6B82] flex items-center space-x-1">
                    <span className="text-green-600">●</span>
                    <span>app.kaithota.in</span>
                  </div>
                  <a 
                    href="https://app.kaithota.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4A6B82] hover:text-[#1B2A4A]"
                    title="Open live app"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Screenshot Image Container */}
                <div className="relative aspect-[16/10] bg-[#FAF6F0] overflow-hidden group">
                  <img 
                    src="/screenshots/kaithota-desktop.png" 
                    alt="Kai Thota Live Application Dashboard" 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-[#1B2A4A]/90 text-white text-[10px] font-mono backdrop-blur-sm">
                    Live PWA • Ragihalli
                  </div>
                </div>
              </div>

              {/* Mobile Phone Mockup Overlay */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-36 sm:w-44 rounded-2xl overflow-hidden bg-black p-1.5 shadow-2xl border-2 border-white/80 hidden sm:block">
                <div className="rounded-xl overflow-hidden bg-white aspect-[9/19] relative">
                  <img 
                    src="/screenshots/kaithota-mobile.png" 
                    alt="Kai Thota Mobile Field PWA" 
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-b-md"></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Coordinate Stamp */}
        <div className="mt-12 pt-6 border-t border-[#4A6B82]/15 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#4A6B82] gap-2">
          <span>{t('hero.stamp')}</span>
          <span className="text-[#1E4D2B] font-semibold">SOVEREIGN TECH FOR SOIL • ZERO EXTRACTIVE VENDOR LOCK-IN</span>
        </div>

      </div>

    </section>
  );
}