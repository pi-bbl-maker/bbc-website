import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Github, MapPin, Send, CheckCircle2, MessageSquare, Building2, User } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    topic: 'Kai Thota Platform Deployment',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Message cannot be empty';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 600);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-b border-[#4A6B82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#4D5D3B] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1B2A4A]"></span>
            <span>{t('contact.sectionTag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            {t('contact.heading')}
          </h2>

          <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed font-light">
            {t('contact.subheading')}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiries & Living Lab Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl bg-[#FAF6F0] p-6 sm:p-8 border border-[#4A6B82]/20 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1B2A4A]">
                Direct Contacts & Lab Presence
              </h3>

              <div className="space-y-5 text-sm">
                
                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-[#4A6B82]/20 text-[#1B2A4A]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4A6B82] block">{t('contact.directEmail')}</span>
                    <a 
                      href="mailto:labs@buffaloback.org" 
                      className="font-medium text-[#1B2A4A] hover:underline"
                    >
                      labs@buffaloback.org
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-[#4A6B82]/20 text-[#1B2A4A]">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4A6B82] block">{t('contact.github')}</span>
                    <a 
                      href="https://github.com/pi-bbl-maker" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-[#1B2A4A] hover:underline"
                    >
                      github.com/pi-bbl-maker
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-[#4A6B82]/20 text-[#1B2A4A]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4A6B82] block">{t('contact.location')}</span>
                    <p className="text-xs sm:text-sm text-[#222222]/85 leading-relaxed font-sans">
                      {t('contact.locationText')}
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-[#4A6B82]/15 text-[11px] font-mono text-[#4A6B82]">
                Active Demonstrations: Visited by appointment at the Ragihalli living lab demo farm.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Collaboration Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#FAF6F0] p-6 sm:p-10 border border-[#4A6B82]/20 shadow-sm">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E4D2B]/10 text-[#1E4D2B] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B2A4A]">
                    {t('contact.successHeading')}
                  </h3>
                  <p className="text-sm text-[#222222]/80 max-w-md mx-auto leading-relaxed">
                    {t('contact.successMsg')}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', org: '', email: '', topic: 'Kai Thota Platform Deployment', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold hover:bg-[#2E3E61] transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Name & Org */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-medium text-[#1B2A4A] mb-1.5">
                        {t('contact.formName')} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-3 rounded-lg bg-white border ${errors.name ? 'border-red-500' : 'border-[#4A6B82]/30'} text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 min-h-[48px]`}
                        placeholder="e.g. Preethy Iyer"
                      />
                      {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="org" className="block text-xs font-mono font-medium text-[#1B2A4A] mb-1.5">
                        {t('contact.formOrg')}
                      </label>
                      <input
                        id="org"
                        type="text"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-lg bg-white border border-[#4A6B82]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 min-h-[48px]"
                        placeholder="e.g. Agroecology Collective / FPO"
                      />
                    </div>
                  </div>

                  {/* Email & Topic */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-medium text-[#1B2A4A] mb-1.5">
                        {t('contact.formEmail')} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-3 rounded-lg bg-white border ${errors.email ? 'border-red-500' : 'border-[#4A6B82]/30'} text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 min-h-[48px]`}
                        placeholder="name@organization.org"
                      />
                      {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="topic" className="block text-xs font-mono font-medium text-[#1B2A4A] mb-1.5">
                        {t('contact.formTopic')}
                      </label>
                      <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-lg bg-white border border-[#4A6B82]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 min-h-[48px]"
                      >
                        <option value="Kai Thota Platform Deployment">{t('contact.topic1')}</option>
                        <option value="Vernacular Voice AI (Iruliga/Lambani)">{t('contact.topic2')}</option>
                        <option value="Custom Agroecology Tech Architecture">{t('contact.topic3')}</option>
                        <option value="Research & Open Source Collaboration">{t('contact.topic4')}</option>
                        <option value="General Inquiry">{t('contact.topic5')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono font-medium text-[#1B2A4A] mb-1.5">
                      {t('contact.formMessage')} *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-3 rounded-lg bg-white border ${errors.message ? 'border-red-500' : 'border-[#4A6B82]/30'} text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20`}
                      placeholder="Describe your collective, research interest, or alignment..."
                    />
                    {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-[#1B2A4A] text-white hover:bg-[#2E3E61] font-semibold text-sm transition-all shadow-sm min-h-[48px] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>{t('contact.submitting')}</span>
                    ) : (
                      <>
                        <span>{t('contact.submitBtn')}</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}