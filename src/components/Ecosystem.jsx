import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Database, TrendingUp, MessageSquareCode, Users, ArrowRightLeft, ArrowRight } from 'lucide-react';

export default function Ecosystem() {
  const { t } = useLanguage();

  return (
    <section id="ecosystem" className="bg-linen-light py-16 md:py-24 border-b border-linen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-olive font-semibold">Dual-Engine Architecture</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth">
            The Two-Part Ecosystem
          </h2>
          <p className="text-sm md:text-base text-charcoal/70">
            A cohesive stack that aggregates field data from remote plots and routes cash margins back to rural collectives.
          </p>
        </div>

        {/* Side-by-Side Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative">
          
          {/* Connector Graphic for Desktop */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
            <div className="w-12 h-12 bg-linen rounded-full border border-earth/20 flex items-center justify-center shadow-sm">
              <ArrowRightLeft className="w-5 h-5 text-earth" />
            </div>
          </div>

          {/* Column A: The Field Layer (Data In) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 rounded-lg border border-earth/10 bg-[#FAF9F5] shadow-sm relative overflow-hidden group hover:border-olive/35 transition-all duration-300">
            {/* Background Data Wave Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-olive/5 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-olive/10 text-olive">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-olive uppercase">
                    {t('ecosystem.fieldTitle')}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-olive/60 uppercase">Stream 01 // Input</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-earth">
                {t('ecosystem.fieldSub')}
              </h3>

              <p className="text-charcoal/80 leading-relaxed text-sm md:text-base">
                {t('ecosystem.fieldCopy')}
              </p>

              {/* Data In Flow Process */}
              <div className="space-y-3 pt-4 border-t border-linen-dark">
                <span className="text-[11px] font-mono font-bold text-earth uppercase tracking-wide block">Data Normalization Pipeline:</span>
                
                <div className="flex items-center space-x-3 text-xs text-charcoal/70">
                  <span className="px-2 py-1 rounded bg-olive/10 font-mono text-olive">Voice Log</span>
                  <ArrowRight className="w-3.5 h-3.5 text-earth/50" />
                  <span className="px-2 py-1 rounded bg-olive/10 font-mono text-olive">AI Transcription</span>
                  <ArrowRight className="w-3.5 h-3.5 text-earth/50" />
                  <span className="px-2 py-1 rounded bg-olive/10 font-mono text-olive">Gram Mass Normalization</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-linen-dark/50 flex items-center text-xs text-charcoal/65">
              <MessageSquareCode className="w-4 h-4 mr-2 text-olive" />
              <span>Supports Kannada voice entries with automatic dialect recognition.</span>
            </div>
          </div>

          {/* Column B: The Market Layer (Cash Out) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 rounded-lg border border-earth/10 bg-[#FAF9F5] shadow-sm relative overflow-hidden group hover:border-bblindigo/30 transition-all duration-300">
            {/* Background Finance Wave Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-bblindigo/5 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-bblindigo/10 text-bblindigo">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-bblindigo uppercase">
                    {t('ecosystem.marketTitle')}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-bblindigo/60 uppercase">Stream 02 // Output</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-earth">
                {t('ecosystem.marketSub')}
              </h3>

              <p className="text-charcoal/80 leading-relaxed text-sm md:text-base">
                {t('ecosystem.marketCopy')}
              </p>

              {/* Cash Out Flow Process */}
              <div className="space-y-3 pt-4 border-t border-linen-dark">
                <span className="text-[11px] font-mono font-bold text-earth uppercase tracking-wide block">Fulfillment & Revenue Routing:</span>
                
                <div className="flex items-center space-x-3 text-xs text-charcoal/70">
                  <span className="px-2 py-1 rounded bg-bblindigo/10 font-mono text-bblindigo">CSA Sub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-earth/50" />
                  <span className="px-2 py-1 rounded bg-bblindigo/10 font-mono text-bblindigo">Yield Aggregator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-earth/50" />
                  <span className="px-2 py-1 rounded bg-bblindigo/10 font-mono text-bblindigo">Traceable Payout</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-linen-dark/50 flex items-center text-xs text-charcoal/65">
              <Users className="w-4 h-4 mr-2 text-bblindigo" />
              <span>Full compliance with Indian cooperative bank routing protocols.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
