import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Database, Server, ArrowRight } from 'lucide-react';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Cpu className="w-6 h-6 text-[#1B2A4A]" />,
      title: t('services.s1Title'),
      desc: t('services.s1Desc'),
      num: '01',
      badge: 'Full-Stack Architecture'
    },
    {
      icon: <Database className="w-6 h-6 text-[#1E4D2B]" />,
      title: t('services.s2Title'),
      desc: t('services.s2Desc'),
      num: '02',
      badge: 'Open Protocols & DPI'
    },
    {
      icon: <Server className="w-6 h-6 text-[#8B5A2B]" />,
      title: t('services.s3Title'),
      desc: t('services.s3Desc'),
      num: '03',
      badge: 'Google Cloud & Firebase'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-[#4A6B82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#4D5D3B] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4D5D3B]"></span>
            <span>{t('services.sectionTag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            {t('services.heading')}
          </h2>

          <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed font-light">
            {t('services.subheading')}
          </p>
        </div>

        {/* 3 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-[#FAF6F0] p-8 border border-[#4A6B82]/20 hover:border-[#1B2A4A]/50 transition-all duration-200 flex flex-col justify-between group hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white border border-[#4A6B82]/20 shadow-sm group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-[#4A6B82]/60">
                    {srv.num}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#1B2A4A]/5 text-[#1B2A4A]">
                    {srv.badge}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1B2A4A]">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-[#222222]/80 leading-relaxed font-light">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#4A6B82]/15 flex items-center justify-between">
                <a 
                  href="#contact"
                  className="inline-flex items-center text-xs font-semibold text-[#1B2A4A] group-hover:text-[#1E4D2B] transition-colors"
                >
                  <span>Inquire for Deployment</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}