import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { en } from './en';
import { fr } from './fr';

export type Language = 'en' | 'fr';
export type Translations = typeof en;

const translations: Record<Language, Translations> = { en, fr };

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('rehabx-lang');
    return (saved === 'fr' ? 'fr' : 'en') as Language;
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('rehabx-lang', l);
    document.documentElement.lang = l;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'fr' : 'en');
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
