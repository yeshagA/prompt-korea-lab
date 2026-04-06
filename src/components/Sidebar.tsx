import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, ChevronDown, ChevronRight, User, LogOut, Settings, Shield, FileText, Globe, Bell, Moon, Type } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme, fontSize, setFontSize, language, setLanguage } = useSidebar();
  const { isLoggedIn, signOut, user, updateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<null | "general" | "account" | "notifications">(null);

  // account edit state
  const [editFirstName, setEditFirstName] = useState(user?.firstName || "");
  const [editLastName, setEditLastName] = useState(user?.lastName || "");
  const [editRole, setEditRole] = useState(user?.role || "student");
  const [saved, setSaved] = useState(false);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "사용자";

  const displayRole =
    user?.role === "student" ? "학생"
    : user?.role === "job-seeker" ? "취업준비생"
    : user?.role === "employee" ? "직장인"
    : "회원";

  const handleLogout = () => {
    signOut();
    setSidebarOpen(false);
    navigate("/");
  };

  const handleSaveProfile = () => {
    updateProfile({
      firstName: editFirstName,
      lastName: editLastName,
      role: editRole as "student" | "job-seeker" | "employee" | "other",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const close = () => {
    setSidebarOpen(false);
    setActivePanel(null);
    setSettingsOpen(false);
  };

  const navLinks = [
    { label: "📚 학습하기", path: "/learn" },
    { label: "🗺️ 로드맵", path: "/roadmap" },
    { label: "🖼️ 프롬프트 갤러리", path: "/examples" },
    { label: "✅ 인증 확인", path: "/verify" },
  ];

  const personaLinks = [
    { label: "🎓 학생", path: "/student" },
    { label: "💼 취업준비생", path: "/job-seeker" },
    { label: "🏢 직장인", path: "/employee" },
  ];

  const myLinks = [
    { label: "🏠 마이페이지", path: "/dashboard" },
    { label: "📊 분석", path: "/analytics" },
    { label: "🤖 플레이그라운드", path: "/playground" },
  ];

  if (!sidebarOpen) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        onClick={close}
      />

      {/* sidebar panel */}
      <div className="fixed top-0 left-0 h-full w-80 bg-card border-r shadow-2xl z-[70] flex flex-col overflow-hidden">

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="text-base font-bold text-primary">Learn Prompting Korea</span>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* user info */}
        {isLoggedIn && (
          <div className="px-5 py-4 border-b bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* active panel */}
          {activePanel === "general" && (
            <div className="px-5 py-4">
              <button
                onClick={() => setActivePanel(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-foreground"
              >
                ← 뒤로
              </button>
              <h3 className="text-sm font-bold text-foreground mb-4">⚙️ 일반 설정</h3>

              {/* dark mode */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">다크 모드</span>
                  </div>
                  {/* oval toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      theme === "dark" ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                        theme === "dark" ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* font size */}
                <div className="py-3 border-b">
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">글자 크기</span>
                  </div>
                  <div className="flex gap-2">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          fontSize === size
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-muted-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {size === "small" ? "작게" : size === "medium" ? "보통" : "크게"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* language */}
                <div className="py-3 border-b">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">언어</span>
                  </div>
                  <div className="flex gap-2">
                    {(["ko", "en"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          language === lang
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-muted-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {lang === "ko" ? "🇰🇷 한국어" : "🇺🇸 English"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === "account" && (
            <div className="px-5 py-4">
              <button
                onClick={() => setActivePanel(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-foreground"
              >
                ← 뒤로
              </button>
              <h3 className="text-sm font-bold text-foreground mb-4">👤 계정 설정</h3>

              {!isLoggedIn ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">로그인이 필요한 기능입니다.</p>
                  <Link
                    to="/login"
                    onClick={close}
                    className="inline-block bg-primary text-white text-sm px-4 py-2 rounded-lg hover:opacity-90"
                  >
                    로그인하기
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">이메일</label>
                    <div className="mt-1 rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground">
                      {user?.email}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">이메일은 변경할 수 없습니다</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">이름 (First Name)</label>
                    <input
                      type="text"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="이름"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">성 (Last Name)</label>
                    <input
                      type="text"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="성"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">사용자 유형</label>
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="student">🎓 학생</option>
                      <option value="job-seeker">💼 취업준비생</option>
                      <option value="employee">🏢 직장인</option>
                      <option value="other">👤 기타</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-primary text-white text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    {saved ? "✅ 저장됨!" : "변경사항 저장"}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-sm py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}

          {activePanel === "notifications" && (
            <div className="px-5 py-4">
              <button
                onClick={() => setActivePanel(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-foreground"
              >
                ← 뒤로
              </button>
              <h3 className="text-sm font-bold text-foreground mb-4">🔔 알림 설정</h3>
              <div className="space-y-4">
                {[
                  { label: "학습 리마인더", desc: "매일 학습 목표를 알려드립니다" },
                  { label: "새 콘텐츠 알림", desc: "새로운 강의가 추가될 때 알림" },
                  { label: "인증서 만료 알림", desc: "인증서 만료 30일 전 알림" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-sm text-foreground font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-primary">
                      <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* main navigation — shown when no panel active */}
          {!activePanel && (
            <div className="py-3">

              {/* persona section */}
              <div className="px-5 py-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  학습 경로
                </p>
                {personaLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={close}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t mx-5 my-2" />

              {/* main nav */}
              <div className="px-5 py-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  메뉴
                </p>
                {navLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={close}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* logged in links */}
              {isLoggedIn && (
                <>
                  <div className="border-t mx-5 my-2" />
                  <div className="px-5 py-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      내 공간
                    </p>
                    {myLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={close}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${
                          location.pathname === item.path
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* not logged in buttons */}
              {!isLoggedIn && (
                <>
                  <div className="border-t mx-5 my-2" />
                  <div className="px-5 py-2 space-y-2">
                    <Link to="/login" onClick={close} className="block">
                      <div className="w-full text-center py-2.5 rounded-xl border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        로그인
                      </div>
                    </Link>
                    <Link to="/sign-up" onClick={close} className="block">
                      <div className="w-full text-center py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                        회원가입
                      </div>
                    </Link>
                  </div>
                </>
              )}

            </div>
          )}
        </div>

        {/* bottom settings */}
        {!activePanel && (
          <div className="border-t bg-card">

            {/* settings expandable */}
            <div>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted transition-colors text-sm font-medium text-foreground"
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  설정
                </div>
                {settingsOpen
                  ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                }
              </button>

              {settingsOpen && (
                <div className="bg-muted/50 border-t border-b">
                  <button
                    onClick={() => setActivePanel("general")}
                    className="w-full flex items-center gap-3 px-8 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    일반
                  </button>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate("/login");
                        close();
                      } else {
                        setActivePanel("account");
                      }
                    }}
                    className="w-full flex items-center gap-3 px-8 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    계정
                  </button>
                  <button
                    onClick={() => setActivePanel("notifications")}
                    className="w-full flex items-center gap-3 px-8 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    알림
                  </button>
                </div>
              )}
            </div>

            {/* privacy & terms */}
            <Link
              to="/privacy"
              onClick={close}
              className="flex items-center gap-3 px-5 py-3.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Shield className="h-4 w-4" />
              개인정보 처리방침
            </Link>
            <Link
              to="/terms"
              onClick={close}
              className="flex items-center gap-3 px-5 py-3.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-t"
            >
              <FileText className="h-4 w-4" />
              이용약관
            </Link>

            <div className="px-5 py-3 border-t">
              <p className="text-xs text-muted-foreground text-center">
                © 2026 Bee Intelligence Global
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;