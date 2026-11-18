import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, CheckCircle2, WifiOff, Globe, Layers, Award, Truck } from 'lucide-react';

export default function Products() {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#4A6B82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#4D5D3B] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1E4D2B]"></span>
            <span>{t('products.sectionTag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            {t('products.heading')}
          </h2>

          <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed font-light">
            {t('products.subheading')}
          </p>
        </div>

        {/* Product 1: Featured Kai Thota PWA */}
        <div className="mb-16 rounded-3xl bg-white border border-[#4A6B82]/20 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E4D2B]/10 text-[#1E4D2B] text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('products.kaithota.tag')}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A4A]">
                {t('products.kaithota.title')}
              </h3>

              <p className="text-sm sm:text-base text-[#222222]/80 leading-relaxed font-light">
                {t('products.kaithota.desc')}
              </p>

              {/* Feature Points */}
              <ul className="space-y-3 pt-2">
                {[
                  t('products.kaithota.f1'),
                  t('products.kaithota.f2'),
                  t('products.kaithota.f3'),
                  t('products.kaithota.f4')
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#222222]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#1E4D2B] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Link */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://app.kaithota.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-[#1B2A4A] text-white hover:bg-[#2E3E61] font-semibold text-sm transition-all shadow-sm min-h-[48px]"
                >
                  <span>{t('products.kaithota.cta')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-xs font-mono text-[#4A6B82]">
                  PWA • Offline IndexedDB • Zero App Store Gating
                </span>
              </div>
            </div>

            {/* Right Visuals: Real Screenshots */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-[#FAF6F0] p-4 sm:p-6 border border-[#4A6B82]/20 shadow-inner">
                {/* Desktop View */}
                <div className="rounded-xl overflow-hidden shadow-lg border border-[#4A6B82]/15 bg-white">
                  <div className="bg-[#EFE9E0] px-3 py-1.5 border-b border-[#4A6B82]/15 flex items-center justify-between text-[10px] font-mono text-[#4A6B82]">
                    <span>app.kaithota.in // Live Application</span>
                    <span className="text-green-700 font-semibold">● ONLINE SYNC</span>
                  </div>
                  <img 
                    src="/screenshots/kaithota-desktop.png" 
                    alt="Kai Thota Desktop Interface" 
                    className="w-full h-auto object-cover max-h-[340px]"
                    loading="lazy"
                  />
                </div>

                {/* Mobile Preview Badge */}
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#4A6B82] pt-2 border-t border-[#4A6B82]/15">
                  <span className="inline-flex items-center">
                    <WifiOff className="w-3.5 h-3.5 mr-1 text-[#1E4D2B]" />
                    Tested in offline field conditions at Ragihalli
                  </span>
                  <span className="inline-flex items-center">
                    <Globe className="w-3.5 h-3.5 mr-1 text-[#1B2A4A]" />
                    Kannada First
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Secondary Products: 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product 2: PGSOC Verification */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#4A6B82]/20 shadow-sm flex flex-col justify-between hover:border-[#1B2A4A]/40 transition-all">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1B2A4A]/10 text-[#1B2A4A] text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{t('products.pgsoc.tag')}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B2A4A]">
                {t('products.pgsoc.title')}
              </h3>

              <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed font-light">
                {t('products.pgsoc.desc')}
              </p>

              <ul className="space-y-2.5 pt-2">
                {[
                  t('products.pgsoc.f1'),
                  t('products.pgsoc.f2'),
                  t('products.pgsoc.f3')
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#222222]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B2A4A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#4A6B82]/15 text-[11px] font-mono text-[#4A6B82]">
              Aligned with Participatory Guarantee Systems for India (PGS-India)
            </div>
          </div>

          {/* Product 3: Collective Logistics & Preference Master */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#4A6B82]/20 shadow-sm flex flex-col justify-between hover:border-[#1B2A4A]/40 transition-all">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8B5A2B]/10 text-[#8B5A2B] text-xs font-semibold">
                <Truck className="w-3.5 h-3.5" />
                <span>{t('products.preference.tag')}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B2A4A]">
                {t('products.preference.title')}
              </h3>

              <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed font-light">
                {t('products.preference.desc')}
              </p>

              <ul className="space-y-2.5 pt-2">
                {[
                  t('products.preference.f1'),
                  t('products.preference.f2'),
                  t('products.preference.f3')
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#222222]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#4A6B82]/15 text-[11px] font-mono text-[#4A6B82]">
              Powering Community Supported Agriculture (CSA) networks & fair settlements
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}