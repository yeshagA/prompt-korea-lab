import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Locale } from "@/i18n/messages";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: (typeof messages)[Locale];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "lpk_locale";

const isLocale = (value: string | null): value is Locale =>
  value === "ko" || value === "en";

const getDefaultLocale = (): Locale => {
  if (typeof window === "undefined") return "ko";

  const savedLocale = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(savedLocale)) return savedLocale;

  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
};

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getDefaultLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
      copy: messages[locale],
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
};
