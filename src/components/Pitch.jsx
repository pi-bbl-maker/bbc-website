import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle2, User, Building, Mail, Users, MessageSquare } from 'lucide-react';

export default function Pitch() {
  const { t } = useLanguage();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    farmerCount: '',
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
        if (!value.trim()) error = 'Organization/Collective name is required.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'farmerCount':
        if (!value.trim()) {
          error = 'Farmer count is required.';
        } else {
          const num = Number(value);
          if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
            error = 'Please enter a positive whole number.';
          }
        }
        break;
      case 'message':
        if (!value.trim()) error = 'Message cannot be empty.';
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
        farmerCount: '',
        message: ''
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <section id="pitch" className="bg-[#FAF9F5] py-16 md:py-24 border-b border-linen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch Information Panel */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-wider text-earth font-bold">Distribution Philosophy</span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-earth leading-tight">
              {t('pitch.heading')}
            </h2>

            <p className="text-lg text-charcoal/80 leading-relaxed font-sans font-light">
              {t('pitch.copy')}
            </p>

            <div className="space-y-4 pt-4 font-mono text-xs text-charcoal/70">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-olive"></span>
                <span>No per-farmer user license fees. Scale collectives organically.</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-olive"></span>
                <span>Full white-label branding matching your NGO or federation logo.</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-olive"></span>
                <span>Integrated local i18n support matching regional language maps.</span>
              </div>
            </div>
          </div>

          {/* Fully Validated Partnership Form Panel */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF6F0] p-6 sm:p-8 rounded-lg border border-earth/15 shadow-md">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-olive/15 text-olive rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-earth">Partnership Inquiry Received</h3>
                  <p className="text-sm text-charcoal/70 max-w-sm mx-auto">
                    Thank you for reaching out. A Buffalo Back Labs systems engineer will contact you shortly to schedule a sandbox demonstration.
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
                    Inquire for Sandbox Access
                  </h3>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-earth/50" />
                      <span>Contact Name</span>
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

                  {/* Collective name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5 text-earth/50" />
                      <span>Collective / NGO Name</span>
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
                      placeholder="e.g. Kai Thota Collective"
                    />
                    {errors.org && touched.org && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.org}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-earth/50" />
                      <span>Professional Email</span>
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
                      placeholder="e.g. contact@kaithota.coop"
                    />
                    {errors.email && touched.email && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Target Farmer Count */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-earth/50" />
                      <span>Active Farmer Count</span>
                    </label>
                    <input
                      type="number"
                      name="farmerCount"
                      value={formData.farmerCount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full p-2.5 rounded border text-sm font-sans focus:outline-none bg-linen-light ${
                        errors.farmerCount && touched.farmerCount 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-earth/15 focus:border-earth'
                      }`}
                      placeholder="e.g. 50"
                      min="1"
                    />
                    {errors.farmerCount && touched.farmerCount && (
                      <p className="text-[11px] text-red-600 font-mono mt-0.5">{errors.farmerCount}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-charcoal/65 flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-earth/50" />
                      <span>Operational Scope</span>
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
                      placeholder="Describe your collective, current logistical streams, and geographical reach..."
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
