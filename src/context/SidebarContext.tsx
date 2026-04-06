import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type FontSize = "small" | "medium" | "large";
type Language = "ko" | "en";

type SidebarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("lpk_theme") as Theme) || "light";
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem("lpk_fontsize") as FontSize) || "medium";
  });
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("lpk_language") as Language) || "ko";
  });

  // apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("lpk_theme", theme);
  }, [theme]);

  // apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-small", "font-medium", "font-large");
    root.classList.add(`font-${fontSize}`);
    localStorage.setItem("lpk_fontsize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("lpk_language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SidebarContext.Provider value={{
      sidebarOpen, setSidebarOpen,
      theme, toggleTheme,
      fontSize, setFontSize,
      language, setLanguage,
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
};