import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Github, Linkedin, BookOpen, MapPin, Mail, Building2 } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B1F22] text-[#F4F1EA] border-t border-[#163338] transition-colors py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ashwidea-style 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Column 1: Brand & Socials (md:col-span-5) */}
          <div className="md:col-span-5 space-y-6">
            <a href="/" className="inline-block" aria-label="Buffalo Back Labs">
              <img 
                src="/brand/Logo Color White.svg" 
                alt="Buffalo Back Labs" 
                className="h-10 w-auto object-contain block"
              />
            </a>
            
            <p className="text-sm text-[#F4F1EA]/80 font-sans leading-relaxed max-w-sm">
              {t('footer.summary')}
            </p>

            {/* Circular Social Buttons */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://github.com/pi-bbl-maker"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold/20 text-[#F4F1EA] hover:text-brand-gold border border-white/10 hover:border-brand-gold/40 flex items-center justify-center transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/buffaloback"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold/20 text-[#F4F1EA] hover:text-brand-gold border border-white/10 hover:border-brand-gold/40 flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://buffaloback.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold/20 text-[#F4F1EA] hover:text-brand-gold border border-white/10 hover:border-brand-gold/40 flex items-center justify-center transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation (md:col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">
              {t('footer.quickNav')}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F4F1EA]/85 font-medium">
              <li>
                <a href="#products" className="hover:text-brand-gold transition-colors block py-0.5">
                  {t('nav.products')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-gold transition-colors block py-0.5">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-brand-gold transition-colors block py-0.5">
                  {t('nav.research')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-gold transition-colors block py-0.5">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-brand-gold transition-colors block py-0.5">
                  {t('nav.ecosystem')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch (md:col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">
              {t('footer.connect')}
            </h3>
            <div className="space-y-3.5 text-xs text-[#F4F1EA]/85 leading-relaxed font-sans">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{t('contact.office')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a 
                  href="mailto:weare@buffaloback.in" 
                  className="text-[#F4F1EA] hover:text-brand-gold transition-colors underline-offset-4 hover:underline"
                >
                  weare@buffaloback.in
                </a>
              </div>
              <div className="flex items-center space-x-3 font-mono text-[11px] text-[#F4F1EA]/70">
                <Building2 className="w-4 h-4 text-brand-gold/80 shrink-0" />
                <span>{t('contact.cin')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Hairline divider + Centered copyright */}
        <div className="border-t border-white/10 pt-8 mt-12 text-center text-xs font-sans text-[#F4F1EA]/60">
          <p>{t('contact.copyright')}</p>
        </div>

      </div>
    </footer>
  );
}
