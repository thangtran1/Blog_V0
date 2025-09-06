"use client";

import React, { ReactNode, useEffect, useState } from "react";
import i18n from "i18next";
import {
  initReactI18next,
  I18nextProvider,
  useTranslation,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en";
import viTranslation from "./locales/vi";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        vi: { translation: viTranslation },
        en: { translation: enTranslation },
      },
      fallbackLng: "vi",
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "cookie", "htmlTag"],
        caches: ["localStorage", "cookie"],
        lookupLocalStorage: "i18nextLng",
        lookupCookie: "i18next",
      },
      react: {
        useSuspense: false,
      },
    });
}

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      i18n.on("initialized", () => setReady(true));
    }
  }, []);

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.on("initialized", () => setReady(true));
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    changeLanguage,
    currentLanguage,
    ready,
  };
};
