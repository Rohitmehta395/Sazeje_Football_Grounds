"use client";

import * as React from "react";
import { nl, Translations } from "./nl";
import { en } from "./en";

export type Language = "nl" | "en";

export interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}

const LanguageContext = React.createContext<LanguageContextType>({
  lang: "nl",
  t: nl,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>("nl");

  const setLang = React.useCallback((newLang: Language) => {
    setLangState(newLang);
    document.documentElement.setAttribute("data-lang", newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const t = lang === "en" ? en : nl;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return React.useContext(LanguageContext);
}
