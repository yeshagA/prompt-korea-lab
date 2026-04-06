import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { label: "학습하기", path: "/learn" },
  { label: "로드맵", path: "/roadmap" },
  { label: "인증 확인", path: "/verify" },
];

const personaItems = [
  { label: "🎓 학생", path: "/student", desc: "과제, 발표, 학습 정리" },
  { label: "💼 취업준비생", path: "/job-seeker", desc: "자기소개서, 면접 준비" },
  { label: "🏢 직장인", path: "/employee", desc: "회의 요약, 업무 자동화" },
];

const Navbar = () => {
  const { setSidebarOpen } = useSidebar();
  const [open, setOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const personaRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, signOut, user } = useAuth();

  const handleLogout = () => {
    signOut();
    setOpen(false);
    setUserDropdownOpen(false);
    navigate("/");
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "사용자";

  const displayRole =
    user?.role === "student" ? "학생"
    : user?.role === "job-seeker" ? "취업준비생"
    : user?.role === "employee" ? "직장인"
    : user?.role === "other" ? "기타"
    : "회원";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (personaRef.current && !personaRef.current.contains(e.target as Node)) {
        setPersonaOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setPersonaOpen(false);
    setUserDropdownOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const isPersonaActive = ["/student", "/job-seeker", "/employee"].includes(location.pathname);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container-main flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* left side — hamburger + logo */}
        <div className="flex items-center gap-3">
          {/* sidebar hamburger — always visible */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">Learn Prompting Korea</span>
          </Link>
        </div>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* 활용 예시 dropdown */}
          <div className="relative" ref={personaRef}>
            <button
              onClick={() => setPersonaOpen(!personaOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isPersonaActive
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              활용 예시
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${personaOpen ? "rotate-180" : ""}`} />
            </button>

            {personaOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-card border rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-xs text-muted-foreground font-medium">나의 경로 선택</p>
                </div>
                {personaItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setPersonaOpen(false)}
                    className={`flex flex-col px-4 py-3 hover:bg-muted transition-colors ${
                      location.pathname === item.path ? "bg-primary/5 text-primary" : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* auth */}
          {isLoggedIn ? (
            <div className="ml-4 flex items-center gap-3">
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border bg-background px-3 py-2 hover:bg-muted transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-xs font-semibold text-foreground">{displayName}</span>
                    <span className="text-xs text-muted-foreground">{displayRole}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{displayRole}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                      🏠 마이페이지
                    </Link>
                    <Link to="/analytics" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                      📊 분석
                    </Link>
                    <Link to="/playground" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                      🤖 플레이그라운드
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t">
                      🚪 로그아웃
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-2">
              <Link to="/login">
                <Button size="sm" variant="outline">로그인</Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">회원가입</Button>
              </Link>
            </div>
          )}
        </div>

        {/* mobile right side */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile dropdown menu */}
      {open && (
        <div className="md:hidden border-t bg-card px-4 pb-4">
          {isLoggedIn && (
            <div className="py-4 border-b border-border/50 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayRole}</p>
              </div>
            </div>
          )}

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-border/50 ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="py-2 border-b border-border/50">
            <p className="text-xs text-muted-foreground font-medium py-2">활용 예시</p>
            {personaItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block py-2 pl-3 text-sm font-medium ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {isLoggedIn ? (
            <div className="mt-3 space-y-2">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">🏠 마이페이지</Button>
              </Link>
              <Link to="/analytics" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">📊 분석</Button>
              </Link>
              <Link to="/playground" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">🤖 플레이그라운드</Button>
              </Link>
              <Button className="w-full" size="sm" onClick={handleLogout}>
                🚪 로그아웃
              </Button>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <Link to="/login" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">로그인</Button>
              </Link>
              <Link to="/sign-up" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm">회원가입</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;