import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeartHandshake, ShieldCheck, Sprout, Building2 } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Sprout className="w-5 h-5 text-[#1E4D2B]" />,
      title: t('about.val1Title'),
      desc: t('about.val1Desc'),
      accent: 'border-[#1E4D2B]/30'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#1B2A4A]" />,
      title: t('about.val2Title'),
      desc: t('about.val2Desc'),
      accent: 'border-[#1B2A4A]/30'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#8B5A2B]" />,
      title: t('about.val3Title'),
      desc: t('about.val3Desc'),
      accent: 'border-[#8B5A2B]/30'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-[#4A6B82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#4D5D3B] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1B2A4A]"></span>
            <span>{t('about.sectionTag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            {t('about.heading')}
          </h2>

          <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed font-light">
            {t('about.subheading')}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#222222]/85 font-light leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#4A6B82]/20 flex items-start space-x-3">
              <Building2 className="w-5 h-5 text-[#1B2A4A] shrink-0 mt-0.5" />
              <div className="text-xs text-[#222222]/80 font-mono">
                <span className="font-bold text-[#1B2A4A] block">Corporate Structure:</span>
                Incorporated as <strong>Buffalo Back Labs (OPC) Private Limited</strong>. Operating as a social enterprise technology lab supporting decentralized food sovereignty.
              </div>
            </div>
          </div>

          {/* Living Lab Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#FAF6F0] border border-[#4A6B82]/20 p-6 space-y-4 shadow-sm">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE9E0] relative border border-[#4A6B82]/15">
                <img 
                  src="/screenshots/kaithota-field.png" 
                  alt="Ragihalli Bio-Regional Living Lab" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 text-white text-[10px] font-mono backdrop-blur-sm">
                  Ragihalli Living Lab • Bannerghatta
                </div>
              </div>

              <div className="text-xs text-[#222222]/75 font-sans leading-relaxed">
                <strong className="text-[#1B2A4A] block font-semibold">Boots on the Ground:</strong>
                All software architectures are deployed and tested on active farming parcels at the Ragihalli Living Lab alongside the 16 Doddi Trust demonstration hub.
              </div>
            </div>
          </div>

        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl bg-[#FAF6F0] border ${v.accent} space-y-3`}
            >
              <div className="p-2.5 rounded-lg bg-white w-fit shadow-sm border border-[#4A6B82]/15">
                {v.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B2A4A]">
                {v.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#222222]/80 font-light leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}