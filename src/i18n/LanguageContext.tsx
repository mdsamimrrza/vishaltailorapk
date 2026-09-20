import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base from "./base.json";
import { extras } from "./extras";

export type Language = "ne" | "hi" | "en";

const STORAGE_KEY = "vishal-lang";

const dictionaries: Record<Language, Record<string, string>> = {
  ne: { ...(base as any).ne, ...(extras as any).ne },
  hi: { ...(base as any).hi, ...(extras as any).hi },
  en: { ...(base as any).en, ...(extras as any).en },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "ne" || saved === "hi" || saved === "en") setLanguageState(saved);
      })
      .catch(() => {});
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  }, []);

  const t = useCallback(
    (key: string) => dictionaries[language][key] ?? dictionaries.en[key] ?? key,
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
