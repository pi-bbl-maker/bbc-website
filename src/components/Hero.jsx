import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ChevronRight, Activity, Cpu } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="platform" className="relative overflow-hidden bg-linen-light pt-8 pb-16 md:py-24 border-b border-linen-dark">
      {/* Background Matrix Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-earth" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-olive/10 border border-olive/20 text-olive text-xs font-semibold tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>B2B Collective Infrastructure</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-earth leading-[1.1]">
              {t('hero.headline')}
            </h1>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans max-w-xl">
              {t('hero.subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-earth text-linen hover:bg-earth-dark font-semibold text-sm transition-all duration-200 shadow-sm"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href="#ecosystem"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded border border-earth/25 hover:border-earth text-earth font-semibold text-sm transition-all duration-200 bg-transparent"
              >
                <span>Ecosystem Architecture</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* System Status Indicator */}
            <div className="flex items-center space-x-6 text-xs text-charcoal/65 border-t border-linen-dark/60 pt-6">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-olive"></span>
                </span>
                <span className="font-mono">PWA CLIENT: ACTIVE</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-olive" />
                <span className="font-mono">DB SCHEMA: MULTI-TENANT CSA v2.1</span>
              </div>
            </div>
          </div>

          {/* Layered Physical Field / Data Matrix Graphic Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute inset-0 border border-earth/10 rounded-lg p-2 bg-linen-dark/20">
                <div className="w-full h-full border border-earth/15 rounded bg-[#FCFAF6] shadow-sm relative overflow-hidden">
                  
                  {/* SVG Canvas for Field-to-Data-Matrix Transition */}
                  <svg className="w-full h-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="soil-to-code" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4D5D3B" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#3F2A1D" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.85" />
                      </linearGradient>
                      
                      <pattern id="matrix-dot" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="#1E1B4B" opacity="0.15" />
                      </pattern>
                    </defs>

                    {/* Dot Grid Background */}
                    <rect width="100%" height="100%" fill="url(#matrix-dot)" />

                    {/* Left & Bottom: Organic Field Contour Lines (Soil & Topo) */}
                    <g className="stroke-olive/40 fill-none" strokeWidth="1.5">
                      <path d="M-50,250 C100,200 150,350 300,300 C450,250 500,400 550,350" />
                      <path d="M-50,300 C80,260 120,400 280,340 C420,290 480,450 550,400" />
                      <path d="M-50,350 C60,320 90,450 260,390 C400,340 450,490 550,450" />
                      <path d="M-50,400 C40,380 60,490 240,440 C380,390 420,530 550,500" />
                    </g>

                    {/* Styled Agricultural Crop Plots (Perspective Grid) */}
                    <polygon points="40,280 200,230 320,380 80,460" fill="url(#soil-to-code)" className="opacity-[0.85] shadow-lg" />
                    
                    {/* Plot Division Lines simulating farm beds */}
                    <g className="stroke-linen/30" strokeWidth="1">
                      <line x1="80" y1="267" x2="140" y2="440" />
                      <line x1="120" y1="255" x2="200" y2="420" />
                      <line x1="160" y1="242" x2="260" y2="400" />
                      
                      <line x1="60" y1="325" x2="230" y2="277" />
                      <line x1="70" y1="375" x2="270" y2="320" />
                      <line x1="80" y1="425" x2="305" y2="365" />
                    </g>

                    {/* Data Overlay: Coordinate System + Intersecting Nodes */}
                    <g className="text-bblindigo font-mono text-[9px] font-bold">
                      {/* Grid Data Points */}
                      <circle cx="160" cy="242" r="3.5" className="fill-linen stroke-bblindigo" strokeWidth="1.5" />
                      <text x="170" y="240">PLOT_02 [OK]</text>

                      <circle cx="140" cy="440" r="3.5" className="fill-linen stroke-olive" strokeWidth="1.5" />
                      <text x="110" y="455">pH: 6.78</text>

                      <circle cx="200" cy="300" r="3.5" className="fill-bblindigo stroke-linen" strokeWidth="1.5" />
                      <text x="210" y="303">M: 2,450g</text>

                      <circle cx="260" cy="400" r="3.5" className="fill-linen stroke-earth" strokeWidth="1.5" />
                      <text x="270" y="405">TEMP: 24°C</text>

                      {/* Weave matrix path connecting nodes */}
                      <path d="M160,242 L200,300 L260,400" className="stroke-bblindigo fill-none" strokeWidth="1.5" strokeDasharray="3 3" />
                      <path d="M140,440 L200,300" className="stroke-olive fill-none" strokeWidth="1.5" strokeDasharray="3 3" />
                    </g>

                    {/* Top Right: The Clean Data Grid transition */}
                    <g className="stroke-bblindigo/35 fill-none" strokeWidth="1">
                      <line x1="300" y1="50" x2="450" y2="50" />
                      <line x1="300" y1="100" x2="450" y2="100" />
                      <line x1="300" y1="150" x2="450" y2="150" />
                      
                      <line x1="300" y1="50" x2="300" y2="180" />
                      <line x1="350" y1="50" x2="350" y2="180" />
                      <line x1="400" y1="50" x2="400" y2="180" />
                      <line x1="450" y1="50" x2="450" y2="180" />
                    </g>

                    {/* Data Matrix Hud UI Snippet Overlay */}
                    <g transform="translate(315, 60)" className="font-mono">
                      <rect x="0" y="0" width="120" height="90" rx="3" fill="#1E1B4B" className="opacity-95 shadow-md" />
                      <text x="10" y="20" fill="#FAF6F0" className="text-[8px] font-bold">BBL_MATRIX_CORE</text>
                      <text x="10" y="35" fill="#6E8259" className="text-[7px]">YIELD: 142.6 kg</text>
                      <text x="10" y="47" fill="#6E8259" className="text-[7px]">CSA ACTIVE: 94%</text>
                      <text x="10" y="60" fill="#FAF6F0" className="text-[7px]">WILD_SKUS: 8</text>
                      
                      {/* Mini bar chart */}
                      <rect x="10" y="70" width="25" height="10" fill="#FAF6F0" opacity="0.3" />
                      <rect x="10" y="70" width="20" height="10" fill="#6E8259" />

                      <rect x="40" y="70" width="25" height="10" fill="#FAF6F0" opacity="0.3" />
                      <rect x="40" y="70" width="12" height="10" fill="#6E8259" />

                      <rect x="70" y="70" width="25" height="10" fill="#FAF6F0" opacity="0.3" />
                      <rect x="70" y="70" width="22" height="10" fill="#FAF6F0" />
                    </g>

                    {/* Flow Arrow indicating data transformation */}
                    <path d="M220,180 L280,130" className="stroke-earth fill-none" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrow)" />
                  </svg>
                  
                  {/* Decorative Coordinate Labels */}
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono text-earth/50">GRID REF: IN-KA-02</span>
                  <span className="absolute top-3 right-3 text-[9px] font-mono text-bblindigo/50">MATRIX LINK: SECURE_1</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
