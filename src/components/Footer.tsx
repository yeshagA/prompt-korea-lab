import { Link } from "react-router-dom";

const footerLinks = [
  { label: "학습하기", path: "/learn" },
  { label: "로드맵", path: "/roadmap" },
  { label: "활용 예시", path: "/examples" },
  { label: "인증 확인", path: "/verify" },
  { label: "프로젝트 소개", path: "/about" },
];

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container-main px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-base font-bold text-foreground">Learn Prompting Korea</h3>
          <p className="text-sm text-muted-foreground mt-1">러닝 프롬프팅 코리아</p>
          <p className="text-sm text-muted-foreground mt-3">
            한국형 AI 프롬프팅 학습 경험을 위한 프로젝트
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">바로가기</h4>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">외부 링크</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t text-center">
        <p className="text-xs text-muted-foreground">© 2026 Learn Prompting Korea. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
