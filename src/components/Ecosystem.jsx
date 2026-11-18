import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Network, Cpu, Trees, ShoppingBag, Smartphone, Globe2 } from 'lucide-react';

export default function Ecosystem() {
  const { t } = useLanguage();

  const entities = [
    {
      icon: <Cpu className="w-5 h-5 text-[#1B2A4A]" />,
      title: t('ecosystem.e1Title'),
      role: t('ecosystem.e1Role'),
      desc: t('ecosystem.e1Desc'),
      color: 'bg-[#1B2A4A]/5 border-[#1B2A4A]/25'
    },
    {
      icon: <Trees className="w-5 h-5 text-[#1E4D2B]" />,
      title: t('ecosystem.e2Title'),
      role: t('ecosystem.e2Role'),
      desc: t('ecosystem.e2Desc'),
      color: 'bg-[#1E4D2B]/5 border-[#1E4D2B]/25'
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-[#C85A32]" />,
      title: t('ecosystem.e3Title'),
      role: t('ecosystem.e3Role'),
      desc: t('ecosystem.e3Desc'),
      color: 'bg-[#C85A32]/5 border-[#C85A32]/25'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#8B5A2B]" />,
      title: t('ecosystem.e4Title'),
      role: t('ecosystem.e4Role'),
      desc: t('ecosystem.e4Desc'),
      color: 'bg-[#8B5A2B]/5 border-[#8B5A2B]/25'
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[#4A6B82]" />,
      title: t('ecosystem.e5Title'),
      role: t('ecosystem.e5Role'),
      desc: t('ecosystem.e5Desc'),
      color: 'bg-[#4A6B82]/5 border-[#4A6B82]/25'
    }
  ];

  return (
    <section id="ecosystem" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#4A6B82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#4D5D3B] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1E4D2B]"></span>
            <span>{t('ecosystem.sectionTag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            {t('ecosystem.heading')}
          </h2>

          <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed font-light">
            {t('ecosystem.subheading')}
          </p>
        </div>

        {/* Ecosystem Interconnected Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entities.map((item, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl p-6 sm:p-7 border bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs text-[#4A6B82]/70 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1B2A4A]">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono font-medium text-[#4D5D3B] block mt-0.5">
                    {item.role}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#4A6B82]/10 text-[11px] font-mono text-[#4A6B82]">
                Ecosystem Node // Integrated Loop
              </div>
            </div>
          ))}
        </div>

        {/* Circular Integration Footnote */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#4A6B82]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#4A6B82]">
          <div className="flex items-center space-x-2">
            <Network className="w-4 h-4 text-[#1B2A4A]" />
            <span>SOVEREIGN ARCHITECTURE • REGENERATIVE VALUE FLOWS • NON-EXTRACTIVE DATA COMMONS</span>
          </div>
          <span className="text-[#1E4D2B] font-semibold">
            BBL × 16DT × BBCF × KAI THOTA
          </span>
        </div>

      </div>
    </section>
  );
}