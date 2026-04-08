import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles, BarChart3, Target, Award,
  CheckCircle, Circle, ArrowRight, BookOpen,
  FlaskConical, TrendingUp,
} from "lucide-react";

const DashboardPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { locale } = useI18n();
  const navigate = useNavigate();
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const t = {
    welcome: locale === "ko" ? "다시 오신 것을 환영합니다" : "Welcome back",
    subtitle: locale === "ko"
      ? "오늘의 학습 목표를 확인하고 계속 진행해보세요."
      : "Check your learning goals and keep going.",
    continueLearning: locale === "ko" ? "학습 계속하기" : "Continue learning",
    openPlayground: locale === "ko" ? "플레이그라운드" : "Playground",
    role: {
      student: locale === "ko" ? "학생 경로" : "Student path",
      "job-seeker": locale === "ko" ? "취업준비생 경로" : "Job seeker path",
      employee: locale === "ko" ? "직장인 경로" : "Employee path",
      other: locale === "ko" ? "일반 경로" : "General path",
    },
    statsLabel: [
      locale === "ko" ? "학습 진행률" : "Progress",
      locale === "ko" ? "완료한 모듈" : "Modules done",
      locale === "ko" ? "다음 추천" : "Next up",
      locale === "ko" ? "인증 상태" : "Cert status",
    ],
    statsValue: [
      "68%",
      locale === "ko" ? "5개" : "5",
      locale === "ko" ? "실전 활용" : "Applied practice",
      locale === "ko" ? "진행 중" : "In progress",
    ],
    statsBars: [68, 41, null, null],
    todayPrompt: locale === "ko" ? "오늘의 프롬프트" : "Today's prompt",
    todayPromptText: locale === "ko"
      ? "이 자기소개 문장을 더 자신감 있고 전문적으로 면접용으로 다듬어줘."
      : "Make this personal statement more confident and professional for an interview.",
    runPrompt: locale === "ko" ? "플레이그라운드에서 실행" : "Run in Playground",
    weeklyMission: locale === "ko" ? "주간 미션" : "Weekly mission",
    missionProgress: locale === "ko" ? "2/3 완료" : "2 of 3 done",
    missions: [
      { text: locale === "ko" ? "실전 활용 모듈 완료하기" : "Complete applied practice module", done: true },
      { text: locale === "ko" ? "프롬프트 1회 실습하기" : "Practice one prompt", done: true },
      { text: locale === "ko" ? "한국형 활용 예시 1개 확인하기" : "Check one use-case example", done: false },
    ],
    recentActivity: locale === "ko" ? "최근 활동" : "Recent activity",
    activities: [
      { text: locale === "ko" ? "입문 모듈 완료" : "Introduction module completed", time: locale === "ko" ? "2일 전" : "2 days ago" },
      { text: locale === "ko" ? "기초 프롬프팅 진행 중" : "Prompting basics in progress", time: locale === "ko" ? "오늘" : "Today" },
      { text: locale === "ko" ? "이번 주 총 학습 시간: 4시간 20분" : "Total this week: 4h 20min", time: locale === "ko" ? "이번 주" : "This week" },
    ],
    quickLinks: locale === "ko" ? "빠른 이동" : "Quick links",
    links: [
      { label: locale === "ko" ? "학습 계속하기" : "Continue learning", path: "/learn", icon: "book" },
      { label: locale === "ko" ? "분석 보기" : "View analytics", path: "/analytics", icon: "bar" },
      { label: locale === "ko" ? "플레이그라운드" : "Playground", path: "/playground", icon: "flask" },
    ],
    achievement: locale === "ko" ? "학습 성과" : "Achievement",
    achievementText: locale === "ko"
      ? "현재 5개의 모듈을 완료했으며 인증 취득 경로를 잘 따라가고 있습니다."
      : "You've completed 5 modules and are on track for certification.",
    completedLevels: locale === "ko" ? "완료한 레벨" : "Completed levels",
    certProgress: locale === "ko" ? "인증서 진행률" : "Certificate progress",
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || (locale === "ko" ? "사용자" : "User");

  const displayRole = t.role[(user?.role as keyof typeof t.role) ?? "other"] ?? t.role.other;

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.observe;
          if (id && entry.isIntersecting) setVisible((p) => ({ ...p, [id]: true }));
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll("[data-observe]");
    els.forEach((el) => observer.observe(el));
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const id = (el as HTMLElement).dataset.observe;
        if (id) setVisible((p) => ({ ...p, [id]: true }));
      }
    });
    return () => observer.disconnect();
  }, [locale]);

  const fadeIn = (id: string, delay = 0) =>
    `transition-all duration-700 ${delay ? `delay-[${delay}ms]` : ""} ${
      visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  const LinkIcon = ({ name }: { name: string }) => {
    if (name === "book") return <BookOpen className="h-4 w-4" />;
    if (name === "bar") return <BarChart3 className="h-4 w-4" />;
    return <FlaskConical className="h-4 w-4" />;
  };

  if (!isLoggedIn) return null;

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative h-[360px] sm:h-[400px] flex items-end overflow-hidden">
        <img src="/dashboard-hero.jpg" alt="dashboard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container-main pb-10 sm:pb-14 w-full">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase border border-white/30 text-white/80 rounded-full px-3 py-1 mb-5">
            {displayRole}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {t.welcome}, {displayName}
          </h1>
          <p className="mt-2 text-sm text-white/75 max-w-lg">{t.subtitle}</p>
          <div className="mt-5 flex gap-3 flex-wrap">
            <Link to="/learn">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold" size="sm">
                {t.continueLearning} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link to="/playground">
              <Button size="sm" className="bg-white/15 text-white border border-white/40 hover:bg-white/25 backdrop-blur-sm">
                {t.openPlayground}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {t.statsLabel.map((label, idx) => (
              <div key={label} data-observe={`stat-${idx}`} className={`py-6 px-5 ${fadeIn(`stat-${idx}`, idx * 60)}`}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-xl font-bold text-foreground">{t.statsValue[idx]}</p>
                {t.statsBars[idx] !== null && (
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000"
                      style={{ width: visible[`stat-${idx}`] ? `${t.statsBars[idx]}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <section className="section-padding korean-bg">
        <div className="container-main">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Left — 2/3 width */}
            <div className="xl:col-span-2 space-y-5">

              {/* Today's prompt */}
              <div data-observe="prompt" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("prompt")}`}>
                <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t.todayPrompt}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">
                    "{t.todayPromptText}"
                  </p>
                  <Link to="/playground" className="mt-4 inline-block">
                    <Button size="sm" variant="outline">
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      {t.runPrompt}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Weekly mission */}
              <div data-observe="mission" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("mission", 80)}`}>
                <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t.weeklyMission}</p>
                  <span className="ml-auto text-xs font-semibold text-primary bg-primary/8 border border-primary/15 px-2.5 py-0.5 rounded-full">
                    {t.missionProgress}
                  </span>
                </div>
                <div className="px-6 py-5">
                  <ul className="space-y-3">
                    {t.missions.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        {m.done
                          ? <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                          : <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        }
                        <span className={m.done ? "line-through text-muted-foreground" : "text-foreground"}>
                          {m.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000"
                      style={{ width: visible["mission"] ? "66%" : "0%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent activity */}
              <div data-observe="activity" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("activity", 140)}`}>
                <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t.recentActivity}</p>
                </div>
                <div className="divide-y divide-border">
                  {t.activities.map((item, idx) => (
                    <div key={idx} className="px-6 py-4 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm text-foreground flex-1">{item.text}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right — 1/3 width */}
            <div className="space-y-5">

              {/* Quick links */}
              <div data-observe="links" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("links", 60)}`}>
                <div className="px-6 py-5 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">{t.quickLinks}</p>
                </div>
                <div className="p-4 space-y-2">
                  {t.links.map((link) => (
                    <Link key={link.path} to={link.path} className="block">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-primary/4 transition-colors text-sm font-medium text-foreground">
                        <div className="w-7 h-7 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 text-primary">
                          <LinkIcon name={link.icon} />
                        </div>
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Achievement */}
              <div data-observe="achievement" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("achievement", 120)}`}>
                <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t.achievement}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.achievementText}</p>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{t.certProgress}</span>
                      <span className="font-semibold text-foreground">5 / 12</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000"
                        style={{ width: visible["achievement"] ? "41%" : "0%" }}
                      />
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">{t.completedLevels}</p>
                    <div className="flex gap-2">
                      {[
                        locale === "ko" ? "입문" : "Intro",
                        locale === "ko" ? "기초" : "Basics",
                        locale === "ko" ? "실전" : "Applied",
                      ].map((lvl) => (
                        <span key={lvl} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default DashboardPage;