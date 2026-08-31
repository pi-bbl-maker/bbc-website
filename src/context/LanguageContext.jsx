import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import knTranslations from '../locales/kn.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState(enTranslations);

  useEffect(() => {
    if (locale === 'kn') {
      setTranslations(knTranslations);
    } else {
      setTranslations(enTranslations);
    }
  }, [locale]);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'en' ? 'kn' : 'en'));
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations;
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        // Fallback to English dictionary if not found in current dictionary
        let enResult = enTranslations;
        for (const enKey of keys) {
          if (enResult && enResult[enKey] !== undefined) {
            enResult = enResult[enKey];
          } else {
            enResult = path;
            break;
          }
        }
        return enResult;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
