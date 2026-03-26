import { Link } from "react-router-dom";

const supportLinks = [
  { label: "문의하기", href: "mailto:yourteam@email.com" },
  { label: "피드백 보내기", href: "https://github.com/yeshagA/prompt-korea-lab/issues" },
  { label: "프로젝트 소개", to: "/about" },
];

const resourceLinks = [
  { label: "Learn Prompting 원본 사이트", href: "https://learnprompting.org" },
  { label: "GitHub 저장소", href: "https://github.com/yeshagA/prompt-korea-lab" },
  { label: "인증 확인", to: "/verify" },
];

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container-main px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / Description */}
        <div>
          <h3 className="text-base font-bold text-foreground">Learn Prompting Korea</h3>
          <p className="text-sm text-muted-foreground mt-1">러닝 프롬프팅 코리아</p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            학생, 취업준비생, 실무자와 팀을 위한 한국형 AI 프롬프팅 학습 플랫폼
          </p>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">지원</h4>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link.label}>
                {"to" in link ? (
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">리소스</h4>
          <ul className="space-y-2">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                {"to" in link ? (
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 Learn Prompting Korea. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;