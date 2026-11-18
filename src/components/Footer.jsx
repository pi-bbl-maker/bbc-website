import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Github, Mail, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1B2A4A] text-white pt-16 pb-12 border-t border-[#4A6B82]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/brand/Logo Color White.svg" 
                alt="Buffalo Back Labs Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-white/80 max-w-sm font-light leading-relaxed">
              {t('footer.tagline')}
            </p>

            <p className="text-xs text-[#FAB818] font-mono">
              {t('footer.sub')}
            </p>

            {/* AI Transparency Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-[#FAB818]" />
              <span>{t('footer.aiDisclosure')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#4A6B82] font-semibold block">
                Platform
              </span>
              <ul className="space-y-2 font-light">
                <li><a href="#products" className="text-white/80 hover:text-white transition-colors">Products</a></li>
                <li><a href="#services" className="text-white/80 hover:text-white transition-colors">Services</a></li>
                <li><a href="#research" className="text-white/80 hover:text-white transition-colors">Voice AI & Research</a></li>
                <li>
                  <a 
                    href="https://app.kaithota.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FAB818] hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Kai Thota App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#4A6B82] font-semibold block">
                Organization
              </span>
              <ul className="space-y-2 font-light">
                <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About BBL</a></li>
                <li><a href="#ecosystem" className="text-white/80 hover:text-white transition-colors">Ecosystem</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Partner With Us</a></li>
                <li>
                  <a 
                    href="https://github.com/pi-bbl-maker" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center space-x-1"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Living Lab & Contact */}
          <div className="md:col-span-3 space-y-3 text-xs text-white/80 font-mono">
            <span className="uppercase tracking-wider text-[#4A6B82] font-semibold block">
              Living Lab Coordinates
            </span>
            <p className="leading-relaxed font-sans text-xs text-white/70">
              Ragihalli Bio-Regional Living Lab & Demo Farm, Bannerghatta, Bengaluru, Karnataka, India
            </p>
            <p className="text-[#FAB818] text-[11px]">
              {t('footer.coordinates')}
            </p>
            <div className="pt-2">
              <a 
                href="mailto:labs@buffaloback.org" 
                className="inline-flex items-center space-x-1.5 text-xs text-white hover:text-[#FAB818] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>labs@buffaloback.org</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-white/60 gap-4">
          <div>
            {t('footer.attribution')}
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>SOVEREIGN DIGITAL COMMONS</span>
            <span>•</span>
            <span>BUILT WITH TRANSPARENT AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}