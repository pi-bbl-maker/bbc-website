import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;

  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    topic: 'Kai Thota / PGS Tools',
    message: '',
    company_website_url: '' // Honeypot spam trap
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Required';
    if (!formData.email.trim()) {
      errs.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email';
    }
    if (!formData.message.trim()) errs.message = 'Required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot: if bot populated hidden field, silently simulate success
    if (formData.company_website_url) {
      setStatus('success');
      return;
    }

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    setErrorMessage('');

    const payload = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: formData.name.trim(),
      org: formData.org.trim(),
      email: formData.email.trim(),
      topic: formData.topic,
      message: formData.message.trim(),
      company_website_url: formData.company_website_url
    };

    try {
      if (webhookUrl && webhookUrl.startsWith('https://script.google.com')) {
        // Dispatch to Google Apps Script Webhook
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors', // Avoids CORS preflight redirects from script.google.com
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } else {
        // Local dev / unconfigured webhook fallback: simulate slight network latency
        await new Promise((resolve) => setTimeout(resolve, 600));
        console.log('[BBL Contact Webhook: Dev Mode]', payload);
      }
      setStatus('success');
    } catch (err) {
      console.error('[BBL Contact Error]', err);
      // Fallback: If network error occurs, give user direct mailto fallback
      setErrorMessage(t('contact.error'));
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      org: '',
      email: '',
      topic: 'Kai Thota / PGS Tools',
      message: '',
      company_website_url: ''
    });
    setErrors({});
    setStatus('idle');
  };

  const mailtoHref = `mailto:weare@buffaloback.in?subject=${encodeURIComponent(
    `[BBL Inquiry] ${formData.topic || 'General'}: ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nOrganization: ${formData.org}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-hairline-light dark:border-hairline-dark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Context & Direct Email */}
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
                className="inline-flex items-center space-x-2 text-base font-medium text-brand-blue dark:text-brand-gold hover:underline min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>weare@buffaloback.in</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5-Field Contact Form */}
          <div className="md:col-span-7">
            {status === 'success' ? (
              <div className="p-8 border border-hairline-light dark:border-hairline-dark rounded space-y-4 bg-white/40 dark:bg-canvas-surface/40 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                <h3 className="font-heading text-xl font-medium text-ink-light dark:text-ink-dark">
                  {t('contact.sent')}
                </h3>
                <p className="text-sm font-sans text-ink-muted dark:text-ink-darkMuted font-light">
                  A notification has been sent to our team at <code className="text-xs font-mono">weare@buffaloback.in</code>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="text-xs font-mono tracking-wider uppercase text-ink-light dark:text-ink-dark hover:underline min-h-[44px] flex items-center"
                  >
                    {t('contact.reset')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Honeypot hidden input for spam bots */}
                <input
                  type="text"
                  name="company_website_url"
                  value={formData.company_website_url}
                  onChange={(e) => setFormData({ ...formData, company_website_url: e.target.value })}
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name & Org */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                      {t('contact.formName')} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t('contact.formNamePlaceholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold transition-colors min-h-[48px]"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-org" className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                      {t('contact.formOrg')} <span className="text-[10px] font-sans opacity-70">({t('contact.formOrgPlaceholder')})</span>
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      placeholder="e.g. Women Farmer Collective / FPO"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold transition-colors min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Email & Topic Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                      {t('contact.formEmail')} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t('contact.formEmailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold transition-colors min-h-[48px]"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                      {t('contact.formTopic')}
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold transition-colors min-h-[48px] cursor-pointer"
                    >
                      <option value="Kai Thota / PGS Tools" className="bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark">
                        {t('contact.topicKaiThota')}
                      </option>
                      <option value="Custom Field Tech" className="bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark">
                        {t('contact.topicCustom')}
                      </option>
                      <option value="Research & Open Source" className="bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark">
                        {t('contact.topicResearch')}
                      </option>
                      <option value="Partnership / Grant" className="bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark">
                        {t('contact.topicPartnership')}
                      </option>
                      <option value="General" className="bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark">
                        {t('contact.topicGeneral')}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-ink-darkMuted mb-2">
                    {t('contact.formMessage')} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder={t('contact.formMessagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-hairline-light dark:border-hairline-dark text-ink-light dark:text-ink-dark text-sm focus:outline-none focus:border-brand-blue dark:focus:border-brand-gold transition-colors resize-none"
                  />
                  {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                </div>

                {/* Inline Error State */}
                {status === 'error' && (
                  <div className="p-4 border border-red-300 dark:border-red-900 rounded bg-red-50/50 dark:bg-red-950/20 text-xs text-red-700 dark:text-red-300 space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || t('contact.error')}</span>
                    </div>
                    <div className="pt-1">
                      <a 
                        href={mailtoHref}
                        className="underline font-medium hover:opacity-80"
                      >
                        Click here to send directly via your email client →
                      </a>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded text-sm font-medium tracking-wide bg-brand-blue text-white dark:bg-ink-dark dark:text-canvas-dark hover:opacity-90 transition-opacity min-h-[48px] disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.send')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <span className="text-xs font-mono text-ink-muted/70 dark:text-ink-darkMuted/70">
                    Direct logs & alert to weare@buffaloback.in
                  </span>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}