import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, Github, Sparkles, Volume2, BookOpen, ExternalLink, Code2 } from 'lucide-react';

export default function Research() {
  const { t } = useLanguage();

  return (
    <section id="research" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#4A6B82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#4D5D3B] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1E4D2B]"></span>
            <span>{t('research.sectionTag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            {t('research.heading')}
          </h2>

          <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed font-light">
            {t('research.subheading')}
          </p>
        </div>

        {/* Featured Deep Dive: Vernacular Voice AI (Iruliga & Lambani) */}
        <div className="rounded-3xl bg-white border border-[#4A6B82]/25 shadow-sm p-6 sm:p-8 lg:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1B2A4A]/10 text-[#1B2A4A] text-xs font-semibold">
                <Mic className="w-3.5 h-3.5" />
                <span>Vernacular Voice DPI Initiative</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2A4A] leading-snug">
                {t('research.asrTitle')}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#222222]/80 leading-relaxed font-light">
                <p>{t('research.asrCopy1')}</p>
                <p>{t('research.asrCopy2')}</p>
              </div>

              {/* Research Pillars */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[
                  t('research.asrPill1'),
                  t('research.asrPill2'),
                  t('research.asrPill3')
                ].map((pill, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6F0] border border-[#4A6B82]/20 text-xs font-medium text-[#1B2A4A]"
                  >
                    <Volume2 className="w-3 h-3 text-[#1E4D2B]" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Interactive Diagram Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#FAF6F0] p-6 border border-[#4A6B82]/20 shadow-inner space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#4A6B82]/15">
                  <span className="font-mono text-xs font-bold text-[#1B2A4A]">
                    ASR PIPELINE // DIALECT-TO-STRUCTURED LOG
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FAB818]" />
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Step 1 */}
                  <div className="p-3 rounded-lg bg-white border border-[#4A6B82]/15">
                    <span className="text-[#4A6B82] block text-[10px]">01 // Acoustic Input</span>
                    <span className="font-sans font-medium text-[#1B2A4A]">
                      Spoken Iruliga / Lambani colloquial field observation
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 rounded-lg bg-white border border-[#4A6B82]/15">
                    <span className="text-[#4A6B82] block text-[10px]">02 // Localized Agrarian Whisper/ASR</span>
                    <span className="font-sans font-medium text-[#1E4D2B]">
                      Acoustically fine-tuned edge model on local flora/seed taxonomy
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3 rounded-lg bg-white border border-[#4A6B82]/15">
                    <span className="text-[#4A6B82] block text-[10px]">03 // Normalized Field Record</span>
                    <span className="font-sans font-medium text-[#8B5A2B]">
                      Auto-populated crop plot entry in Kai Thota PWA
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-[#4A6B82] flex items-center justify-between">
                  <span>Target: Zero Literacy Exclusion</span>
                  <span className="text-[#1E4D2B] font-semibold">100% On-Device Ready</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Open Agrarian Commons Box */}
        <div className="rounded-2xl bg-white p-8 border border-[#4A6B82]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#1B2A4A]">
              <Code2 className="w-4 h-4 text-[#1B2A4A]" />
              <span>{t('research.openCommonsTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#222222]/80 font-light leading-relaxed">
              {t('research.openCommonsDesc')}
            </p>
          </div>

          <a
            href="https://github.com/pi-bbl-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#1B2A4A] text-white hover:bg-[#2E3E61] font-semibold text-xs transition-all shadow-sm shrink-0 min-h-[44px]"
          >
            <Github className="w-4 h-4" />
            <span>{t('research.githubCta')}</span>
          </a>
        </div>

      </div>
    </section>
  );
}