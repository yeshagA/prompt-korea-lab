import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X, ChevronDown, ChevronRight,
  User, LogOut, Settings, Shield,
  FileText, Moon, Globe, Bell,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme } = useSidebar();
  const { isLoggedIn, signOut, user } = useAuth();
  const { copy, locale } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<null | "notifications">(null);

  const [notifLearning, setNotifLearning] = useState(true);
  const [notifNewContent, setNotifNewContent] = useState(true);
  const [notifCert, setNotifCert] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || copy.navbar.roles.userFallback;

  const displayRole =
    user?.role === "student" ? copy.navbar.roles.student
    : user?.role === "job-seeker" ? copy.navbar.roles["job-seeker"]
    : user?.role === "employee" ? copy.navbar.roles.employee
    : copy.navbar.roles.member;

  const handleLogout = () => {
    signOut();
    setSidebarOpen(false);
    navigate("/");
  };

  const close = () => {
    setSidebarOpen(false);
    setActivePanel(null);
    setSettingsOpen(false);
  };

  const labels = {
    chooseRole: locale === "ko" ? "나의 경로 선택" : "Choose your path",
    settings: locale === "ko" ? "설정" : "Settings",
    darkMode: locale === "ko" ? "다크 모드" : "Dark mode",
    language: locale === "ko" ? "언어" : "Language",
    account: locale === "ko" ? "계정" : "Account",
    notifications: locale === "ko" ? "알림" : "Notifications",
    privacy: locale === "ko" ? "개인정보 처리방침" : "Privacy policy",
    terms: locale === "ko" ? "이용약관" : "Terms of use",
    back: locale === "ko" ? "← 뒤로" : "← Back",
    notifSettings: locale === "ko" ? "알림 설정" : "Notification settings",
    notifItems: [
      {
        key: "learning",
        label: locale === "ko" ? "학습 리마인더" : "Learning reminder",
        desc: locale === "ko" ? "매일 학습 목표를 알려드립니다" : "Daily learning goal reminders",
        value: notifLearning,
        set: setNotifLearning,
      },
      {
        key: "newContent",
        label: locale === "ko" ? "새 콘텐츠 알림" : "New content alerts",
        desc: locale === "ko" ? "새로운 강의가 추가될 때 알림" : "Notified when new courses are added",
        value: notifNewContent,
        set: setNotifNewContent,
      },
      {
        key: "cert",
        label: locale === "ko" ? "인증서 만료 알림" : "Certificate expiry",
        desc: locale === "ko" ? "인증서 만료 30일 전 알림" : "Reminder 30 days before expiry",
        value: notifCert,
        set: setNotifCert,
      },
      {
        key: "email",
        label: locale === "ko" ? "이메일 수신" : "Email notifications",
        desc: locale === "ko" ? "주요 업데이트를 이메일로 받기" : "Receive updates via email",
        value: notifEmail,
        set: setNotifEmail,
      },
    ],
  };

  const personaLinks = [
    {
      label: locale === "ko" ? "학생" : "Student",
      path: "/student",
      desc: locale === "ko" ? "과제, 발표, 학습 정리" : "Assignments, presentations",
    },
    {
      label: locale === "ko" ? "취업준비생" : "Job Seeker",
      path: "/job-seeker",
      desc: locale === "ko" ? "자기소개서, 면접 준비" : "Resumes, interviews",
    },
    {
      label: locale === "ko" ? "직장인" : "Employee",
      path: "/employee",
      desc: locale === "ko" ? "회의 요약, 업무 자동화" : "Meeting notes, automation",
    },
  ];

  if (!sidebarOpen) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={close} />

      {/* sidebar panel */}
      <div className="fixed top-0 left-0 h-full w-72 bg-card border-r shadow-2xl z-[70] flex flex-col overflow-hidden">

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="text-sm font-bold text-primary">{copy.navbar.brand}</span>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* user info */}
        {isLoggedIn && (
          <Link to="/account" onClick={close} className="px-5 py-3 border-b bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayRole}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
          </Link>
        )}

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Notifications panel ── */}
          {activePanel === "notifications" && (
            <div className="px-5 py-4">
              <button
                onClick={() => setActivePanel(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-foreground"
              >
                {labels.back}
              </button>
              <h3 className="text-sm font-bold text-foreground mb-4">{labels.notifSettings}</h3>
              <div className="space-y-1">
                {labels.notifItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="pr-4">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => item.set(!item.value)}
                      className={`relative w-11 h-6 rounded-full shrink-0 transition-colors duration-300 ${
                        item.value ? "bg-primary" : "bg-muted border border-border"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                          item.value ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Main — persona links ── */}
          {!activePanel && (
            <div className="py-4 px-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                {labels.chooseRole}
              </p>
              {personaLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={close}
                  className={`flex flex-col px-4 py-3 rounded-xl mb-2 transition-colors border ${
                    location.pathname === item.path
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "text-foreground hover:bg-muted border-transparent hover:border-border"
                  }`}
                >
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom settings ── */}
        {!activePanel && (
          <div className="border-t bg-card">

            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-muted-foreground" />
                {labels.settings}
              </div>
              {settingsOpen
                ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                : <ChevronRight className="h-4 w-4 text-muted-foreground" />
              }
            </button>

            {settingsOpen && (
              <div className="bg-muted/40 border-t border-b px-5 py-3 space-y-4">

                {/* dark mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{labels.darkMode}</span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      theme === "dark" ? "bg-primary" : "bg-muted border border-border"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                        theme === "dark" ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{labels.language}</span>
                  </div>
                  <LanguageSwitcher />
                </div>

                {/* notifications */}
                <button
                  onClick={() => {
                    setActivePanel("notifications");
                    setSettingsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                >
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  {labels.notifications}
                </button>

                {/* account — links to page */}
                <Link
                  to="/account"
                  onClick={close}
                  className="w-full flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  {labels.account}
                </Link>

              </div>
            )}

            {/* logout if logged in */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors border-t"
              >
                <LogOut className="h-3.5 w-3.5" />
                {copy.navbar.auth.logout}
              </button>
            )}

            <Link
              to="/privacy"
              onClick={close}
              className="flex items-center gap-3 px-5 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-t"
            >
              <Shield className="h-3.5 w-3.5" />
              {labels.privacy}
            </Link>
            <Link
              to="/terms"
              onClick={close}
              className="flex items-center gap-3 px-5 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-t"
            >
              <FileText className="h-3.5 w-3.5" />
              {labels.terms}
            </Link>

            <div className="px-5 py-2 border-t">
              <p className="text-xs text-muted-foreground text-center">© 2026 Learn Prompting</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;