import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle2, User, Building, Mail, Target, MessageSquare } from 'lucide-react';

export default function Pitch() {
  const { t } = useLanguage();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    focus: '',
    message: ''
  });
  
  // Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email format validator
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Field validation logic
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required.';
        break;
      case 'org':
        if (!value.trim()) error = 'Organization/Fund name is required.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'focus':
        if (!value.trim()) error = 'Organization focus or partnership interest is required.';
        break;
      case 'message':
        if (!value.trim()) error = 'Message / Alignment Vision cannot be empty.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {};
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setTouched(allTouched);
    setErrors(newErrors);

    // If no errors, simulate submit
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        org: '',
        email: '',
        focus: '',
        message: ''
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <section id="pitch" className="bg-[#FAF9F5] py-20 md:py-32 border-b border-earth/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch Information Panel */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-earth font-bold block">Alliance & Growth</span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-earth leading-tight">
              {t('pitch.heading')}
            </h2>

            <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed font-sans font-light">
              {t('pitch.copy')}
            </p>

            <div className="space-y-4 pt-4 font-mono text-xs text-charcoal/70">
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                <span>Open-source digital infrastructure for rural ecosystem enablement.</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                <span>Structured data models configured for verified agroecological outcomes.</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                <span>Designed to support diverse cooperatives and federations globally.</span>
              </div>
            </div>
          </div>

          {/* Fully Validated Partnership Form Panel */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF6F0] p-6 sm:p-8 rounded-lg border border-earth/15 shadow-sm">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-olive/15 text-olive rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-earth">{t('form.success')}</h3>
                  <p className="text-sm text-charcoal/70 max-w-sm mx-auto">
                    {t('form.successText')}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center text-xs text-earth underline hover:text-olive font-bold mt-4"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-earth border-b border-linen-dark pb-3 mb-2">
                    {t('pitch.cta')}
                  </h3>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-earth/50" />
                      <span>{t('form.name')}</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full p-2.5 rounded border text-sm font-sans focus:outline-none bg-linen-light ${
                        errors.name && touched.name 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-earth/15 focus:border-earth'
                      }`}
                      placeholder="e.g. Preethy Srinivas"
                    />
                    {errors.name && touched.name && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Organization name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5 text-earth/50" />
                      <span>{t('form.org')}</span>
                    </label>
                    <input
                      type="text"
                      name="org"
                      value={formData.org}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full p-2.5 rounded border text-sm font-sans focus:outline-none bg-linen-light ${
                        errors.org && touched.org 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-earth/15 focus:border-earth'
                      }`}
                      placeholder="e.g. Patient Capital Fund"
                    />
                    {errors.org && touched.org && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.org}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-earth/50" />
                      <span>{t('form.email')}</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full p-2.5 rounded border text-sm font-sans focus:outline-none bg-linen-light ${
                        errors.email && touched.email 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-earth/15 focus:border-earth'
                      }`}
                      placeholder="e.g. contact@patientcapital.org"
                    />
                    {errors.email && touched.email && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Focus Field (Modified to exclude VC term as requested) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <Target className="w-3.5 h-3.5 text-earth/50" />
                      <span>{t('form.focus')}</span>
                    </label>
                    <input
                      type="text"
                      name="focus"
                      value={formData.focus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full p-2.5 rounded border text-sm font-sans focus:outline-none bg-linen-light ${
                        errors.focus && touched.focus 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-earth/15 focus:border-earth'
                      }`}
                      placeholder="e.g. Agroecology Scaling, Social Impact, Ecosystem Enablement"
                    />
                    {errors.focus && touched.focus && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.focus}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-earth/50" />
                      <span>{t('form.message')}</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="3"
                      className={`w-full p-2.5 rounded border text-sm font-sans focus:outline-none bg-linen-light ${
                        errors.message && touched.message 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-earth/15 focus:border-earth'
                      }`}
                      placeholder="Share alignment views or details regarding your ecosystem interest..."
                    ></textarea>
                    {errors.message && touched.message && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 p-3 bg-earth text-linen hover:bg-earth-dark font-semibold text-sm rounded shadow-sm transition-all mt-4"
                  >
                    <span>{t('pitch.cta')}</span>
                    <Send className="w-4 h-4" />
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
