import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useSidebar } from "@/context/SidebarContext";

const Navbar = () => {
  const { setSidebarOpen } = useSidebar();
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, signOut, user } = useAuth();
  const { copy } = useI18n();
  const navItems = copy.navbar.navItems;

  const handleLogout = () => {
    signOut();
    setOpen(false);
    setUserDropdownOpen(false);
    navigate("/");
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || copy.navbar.roles.userFallback;

  const displayRole =
    user?.role === "student" ? copy.navbar.roles.student
    : user?.role === "job-seeker" ? copy.navbar.roles["job-seeker"]
    : user?.role === "employee" ? copy.navbar.roles.employee
    : user?.role === "other" ? copy.navbar.roles.other
    : copy.navbar.roles.member;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setUserDropdownOpen(false);
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container-main flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* left — hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{copy.navbar.brand}</span>
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
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {copy.navbar.auth.dashboard}
                    </Link>
                    <Link
                      to="/analytics"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {copy.navbar.auth.analytics}
                    </Link>
                    <Link
                      to="/playground"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {copy.navbar.auth.playground}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t"
                    >
                      {copy.navbar.auth.logout}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-2">
              <Link to="/login">
                <Button size="sm" variant="outline">{copy.navbar.auth.login}</Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">{copy.navbar.auth.signUp}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile dropdown */}
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
                  {copy.navbar.auth.dashboard}
                </Button>
              </Link>
              <Link to="/analytics" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">
                  {copy.navbar.auth.analytics}
                </Button>
              </Link>
              <Link to="/playground" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">
                  {copy.navbar.auth.playground}
                </Button>
              </Link>
              <Button className="w-full" size="sm" onClick={handleLogout}>
                {copy.navbar.auth.logout}
              </Button>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <Link to="/login" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm" variant="outline">
                  {copy.navbar.auth.login}
                </Button>
              </Link>
              <Link to="/sign-up" onClick={() => setOpen(false)} className="block">
                <Button className="w-full" size="sm">{copy.navbar.auth.signUp}</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;