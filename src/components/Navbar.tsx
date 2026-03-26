import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "학습하기", path: "/learn" },
  { label: "로드맵", path: "/roadmap" },
  { label: "활용 예시", path: "/examples" },
  { label: "인증 확인", path: "/verify" },
  { label: "프로젝트 소개", path: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, signOut, user } = useAuth();

  const handleLogout = () => {
    signOut();
    setOpen(false);
    navigate("/");
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "사용자";

  const displayRole =
    user?.role === "student"
      ? "학생"
      : user?.role === "job-seeker"
      ? "취업준비생"
      : user?.role === "employee"
      ? "직장인"
      : user?.role === "other"
      ? "기타"
      : "회원";

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container-main flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">Learn Prompting Korea</span>
        </Link>

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

          {isLoggedIn ? (
            <div className="ml-4 flex items-center gap-3">
              <Link to="/dashboard">
                <Button size="sm" variant="outline">
                  대시보드
                </Button>
              </Link>

              <div className="flex items-center gap-3 rounded-full border bg-background px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-foreground">{displayName}</span>
                  <span className="text-xs text-muted-foreground">{displayRole}</span>
                </div>

                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>

              <Button size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-2">
              <Link to="/login">
                <Button size="sm" variant="outline">
                  로그인
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">회원가입</Button>
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

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

          {isLoggedIn ? (
            <div className="mt-3 space-y-2">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">
                  대시보드
                </Button>
              </Link>
              <Button className="w-full" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <Link to="/login" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">
                  로그인
                </Button>
              </Link>
              <Link to="/sign-up" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm">
                  회원가입
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;