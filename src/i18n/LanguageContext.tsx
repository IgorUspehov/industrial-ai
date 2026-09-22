import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { en, type Translations } from './en';
import { de } from './de';
import { ru } from './ru';

export type LanguageCode = 'en' | 'de' | 'ru';

const dictionaries: Record<LanguageCode, Translations> = { en, de, ru };

const STORAGE_KEY = 'industrial-ai-lang';

const languageOrder: LanguageCode[] = ['en', 'de', 'ru'];

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: Translations;
  languages: { code: LanguageCode; label: string }[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): LanguageCode {
  if (typeof window === 'undefined') return 'de';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && languageOrder.includes(stored as LanguageCode)) {
    return stored as LanguageCode;
  }
  return 'de';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(getInitialLang);

  const setLang = useCallback((code: LanguageCode) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = dictionaries[lang];

  const languages = languageOrder.map((code) => ({
    code,
    label: dictionaries[code].meta.label,
  }));

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx.t;
}
