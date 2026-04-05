import { Link } from "react-router-dom";
import { useI18n } from "@/context/I18nContext";

const Footer = () => {
  const { copy } = useI18n();

  return (
    <footer className="border-t bg-card">
      <div className="container-main px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-base font-bold text-foreground">{copy.footer.brandTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{copy.footer.brandSubtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {copy.footer.brandDescription}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{copy.footer.supportTitle}</h4>
            <ul className="space-y-2">
              {copy.footer.supportLinks.map((link) => (
                <li key={link.label}>
                  {"to" in link ? (
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{copy.footer.resourcesTitle}</h4>
            <ul className="space-y-2">
              {copy.footer.resourceLinks.map((link) => (
                <li key={link.label}>
                  {"to" in link ? (
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center">
          <p className="text-xs text-muted-foreground">{copy.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
