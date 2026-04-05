import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const languageOptions = [
  { value: "ko", shortLabel: "KO" },
  { value: "en", shortLabel: "EN" },
] as const;

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { locale, setLocale, copy } = useI18n();

  return (
    <div
      className={cn("inline-flex items-center rounded-full border bg-background p-1", className)}
      role="group"
      aria-label={copy.languageSwitcher.label}
    >
      {languageOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
            locale === option.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={locale === option.value}
          aria-label={`${copy.languageSwitcher.label}: ${
            option.value === "ko" ? copy.languageSwitcher.ko : copy.languageSwitcher.en
          }`}
        >
          {option.shortLabel}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
