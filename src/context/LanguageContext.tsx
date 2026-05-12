"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en_US from '../locales/en_US/common.json';
import pt_BR from '../locales/pt_BR/common.json';
import es_ES from '../locales/es_ES/common.json';

export type Locale = 'en_US' | 'pt_BR' | 'es_ES';

const messages = { en_US, pt_BR, es_ES } as const;
export type Messages = typeof messages.en_US;

const langAttr: Record<Locale, string> = {
  en_US: 'en-US',
  pt_BR: 'pt-BR',
  es_ES: 'es-ES',
};

function detectLocale(): Locale {
  const stored = localStorage.getItem('portfolio-locale') as Locale | null;
  if (stored && stored in messages) return stored;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('pt')) return 'pt_BR';
  if (lang.startsWith('es')) return 'es_ES';
  return 'en_US';
}

function resolvePath(obj: unknown, path: string): string {
  const result = path.split('.').reduce((curr: unknown, key) => {
    if (curr && typeof curr === 'object') return (curr as Record<string, unknown>)[key];
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en_US');

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    document.documentElement.lang = langAttr[detected];
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('portfolio-locale', newLocale);
    document.documentElement.lang = langAttr[newLocale];
  }, []);

  const t = useCallback((key: string): string => {
    return resolvePath(messages[locale], key);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, messages: messages[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
