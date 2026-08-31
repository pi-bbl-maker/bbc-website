import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle, ShieldAlert, WifiOff, RefreshCw } from 'lucide-react';

export default function Problem() {
  const { t } = useLanguage();

  return (
    <section className="bg-linen py-16 md:py-24 border-b border-linen-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Problem Narrative */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-earth font-mono text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-earth/80" />
            <span>The Agricultural Software Paradox</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-earth leading-tight">
            {t('problem.heading')}
          </h2>

          <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-sans font-light">
            {t('problem.copy')}
          </p>
        </div>

        {/* Structural Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-linen-dark/60">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded bg-earth/5 text-earth">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-earth text-base">Auditor vs. Field</h3>
            </div>
            <p className="text-sm text-charcoal/75 leading-relaxed">
              Standard agricultural software is built to compile compliance reports for distant agencies. We design software that fits seamlessly into the farmer's physical workflow.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded bg-earth/5 text-earth">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-earth text-base">Offline Realities</h3>
            </div>
            <p className="text-sm text-charcoal/75 leading-relaxed">
              Fields lack reliable connectivity. Our mobile interfaces operate entirely locally, capturing transactions and syncing automatically once a network connection is established.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded bg-earth/5 text-earth">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-earth text-base">Elastic Supply Chain</h3>
            </div>
            <p className="text-sm text-charcoal/75 leading-relaxed">
              Monoculture software expects uniform outputs. Our logistics systems are built to handle biodiverse, variable micro-yields aggregated dynamically across collectives.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
