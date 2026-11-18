import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Github, Linkedin, BookOpen, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer className="py-16 md:py-24 bg-canvas-light dark:bg-canvas-dark transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Row: Full Logo & Email */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-10 border-b border-hairline-light dark:border-hairline-dark">
          <div>
            {theme === 'dark' ? (
              <img 
                src="/brand/Logo Color White.svg" 
                alt="Buffalo Back Labs" 
                className="h-7 sm:h-8 md:h-9 w-auto object-contain block"
              />
            ) : (
              <img 
                src="/brand/Logo Color Blue.svg" 
                alt="Buffalo Back Labs" 
                className="h-7 sm:h-8 md:h-9 w-auto object-contain block"
              />
            )}
          </div>

          <div>
            <a
              href="mailto:weare@buffaloback.in"
              className="inline-flex items-center space-x-2 text-sm font-medium text-ink-light dark:text-ink-dark hover:underline"
            >
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>weare@buffaloback.in</span>
            </a>
          </div>
        </div>

        {/* Middle Row: Registered Office, CIN & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-sans text-ink-muted dark:text-ink-darkMuted leading-relaxed">
          
          <div className="md:col-span-7 space-y-2">
            <span className="font-mono uppercase tracking-wider text-[11px] text-ink-light dark:text-ink-dark block font-medium">
              {t('contact.officeLabel')}
            </span>
            <p>
              {t('contact.office')}
            </p>
            <p className="font-mono text-[11px] text-ink-light/80 dark:text-ink-dark/80 pt-1">
              {t('contact.cin')}
            </p>
          </div>

          <div className="md:col-span-5 space-y-3 md:text-right">
            <span className="font-mono uppercase tracking-wider text-[11px] text-ink-light dark:text-ink-dark block font-medium">
              Network
            </span>
            <div className="flex flex-wrap md:justify-end gap-5 pt-1">
              <a
                href="https://github.com/pi-bbl-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-ink-light dark:text-ink-dark hover:text-brand-gold transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/company/buffaloback"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-ink-light dark:text-ink-dark hover:text-brand-gold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://buffaloback.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-ink-light dark:text-ink-dark hover:text-brand-gold transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Substack</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row: Copyright */}
        <div className="pt-8 border-t border-hairline-light dark:border-hairline-dark flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-ink-muted/70 dark:text-ink-darkMuted/70 gap-3">
          <span>{t('contact.copyright')}</span>
          <span className="tracking-wide">INDEPENDENT LAB // VOICE-FIRST SOVEREIGNTY</span>
        </div>

      </div>
    </footer>
  );
}