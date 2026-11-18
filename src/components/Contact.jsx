import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Required';
    if (!formData.email.trim()) {
      errs.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Invalid email';
    }
    if (!formData.message.trim()) errs.message = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-light dark:text-ink-dark uppercase">
              {t('contact.title')}
            </h2>
            <p className="font-sans text-base sm:text-lg text-ink-muted dark:text-ink-darkMuted font-light leading-relaxed">
              {t('contact.desc')}
            </p>
            <div className="pt-2">
              <a
                href="mailto:weare@buffaloback.in"
                className="inline-flex items-center space-x-2 text-base font-medium text-brand-blue dark:text-brand-gold hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>weare@buffaloback.in</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 border border-hairline-light dark:border-hairline-dark rounded space-y-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                <p className="text-base text-ink-light dark:text-ink-dark font-medium">
                  {t('contact.sent')}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="text-xs font-mono tracking-wider uppercase text-ink-muted hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                      {t('contact.formName')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-0 py-2.5 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-ink-light dark:focus:border-ink-dark transition-colors"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-0 py-2.5 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-ink-light dark:focus:border-ink-dark transition-colors"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-2.5 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-ink-light dark:focus:border-ink-dark transition-colors resize-none"
                  />
                  {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded text-sm font-medium tracking-wide bg-brand-blue text-white dark:bg-ink-dark dark:text-canvas-dark hover:opacity-90 transition-opacity min-h-[44px]"
                  >
                    <span>{submitting ? t('contact.sending') : t('contact.send')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}