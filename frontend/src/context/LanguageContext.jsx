/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'sri-navaladian-language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ta' ? 'ta' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    const valid = lang === 'ta' ? 'ta' : 'en';
    setLanguageState(valid);
    try {
      localStorage.setItem(STORAGE_KEY, valid);
    } catch {
      // Storage unavailable fallback
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    
    // Dynamically update document title
    const pageTitle = language === 'ta' 
      ? translations.ta?.meta?.title 
      : translations.en?.meta?.title;
    if (pageTitle) {
      document.title = pageTitle;
    }

    // Dynamically update meta description
    const pageDesc = language === 'ta'
      ? translations.ta?.meta?.description
      : translations.en?.meta?.description;
    if (pageDesc) {
      let metaDescEl = document.querySelector('meta[name="description"]');
      if (metaDescEl) {
        metaDescEl.setAttribute('content', pageDesc);
      }
    }
  }, [language]);

  /**
   * Nested key resolver, e.g. t('hero.titleLine1')
   */
  const t = (key) => {
    if (!key) return '';
    const keys = key.split('.');
    
    // Attempt lookup in active language
    let result = translations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        result = undefined;
        break;
      }
    }

    // Fallback to English if missing
    if (result === undefined && language !== 'en') {
      let fallback = translations.en;
      for (const k of keys) {
        if (fallback && typeof fallback === 'object' && k in fallback) {
          fallback = fallback[k];
        } else {
          fallback = undefined;
          break;
        }
      }
      return fallback !== undefined ? fallback : key;
    }

    return result !== undefined ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
