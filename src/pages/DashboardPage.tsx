import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, BarChart3, Target, Award, CheckCircle, Circle } from "lucide-react";

const DashboardPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { locale } = useI18n();
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const t = {
    role: {
      student: locale === "ko" ? "학생 경로" : "Student path",
      jobSeeker: locale === "ko" ? "취업준비생 경로" : "Job seeker path",
      employee: locale === "ko" ? "직장인 경로" : "Employee path",
      other: locale === "ko" ? "일반 경로" : "General path",
    },
    welcome: locale === "ko" ? "다시 오신 것을 환영합니다" : "Welcome back",
    subtitle: locale === "ko" ? "오늘의 학습 목표를 확인하고 계속 진행해보세요." : "Check your learning goals and keep going.",
    continueLearning: locale === "ko" ? "학습 계속하기" : "Continue learning",
    openPlayground: locale === "ko" ? "플레이그라운드 열기" : "Open playground",
    stats: [
      { label: locale === "ko" ? "학습 진행률" : "Progress", value: "68%", bar: 68, color: "bg-blue-500", borderColor: "border-blue-200", textColor: "text-blue-600", emoji: "📈" },
      { label: locale === "ko" ? "완료한 모듈" : "Modules done", value: locale === "ko" ? "5개" : "5", bar: 41, color: "bg-green-500", borderColor: "border-green-200", textColor: "text-green-600", emoji: "✅" },
      { label: locale === "ko" ? "다음 추천 학습" : "Next lesson", value: locale === "ko" ? "실전 활용" : "Applied practice", bar: null, color: "bg-yellow-500", borderColor: "border-yellow-200", textColor: "text-yellow-600", emoji: "🎯" },
      { label: locale === "ko" ? "인증 상태" : "Cert status", value: locale === "ko" ? "진행 중" : "In progress", bar: null, color: "bg-purple-500", borderColor: "border-purple-200", textColor: "text-purple-600", emoji: "🏅" },
    ],
    todayPrompt: locale === "ko" ? "오늘의 프롬프트" : "Today's prompt",
    todayPromptText: locale === "ko"
      ? "이 자기소개 문장을 더 자신감 있고 전문적으로 면접용으로 다듬어줘."
      : "Make this personal statement more confident and professional for an interview.",
    run: locale === "ko" ? "실행하기" : "Run",
    weeklyMission: locale === "ko" ? "주간 미션" : "Weekly mission",
    missionProgress: locale === "ko" ? "2/3 완료" : "2/3 done",
    missions: [
      { text: locale === "ko" ? "실전 활용 모듈 완료하기" : "Complete applied practice module", done: true },
      { text: locale === "ko" ? "프롬프트 1회 실습하기" : "Practice one prompt", done: true },
      { text: locale === "ko" ? "한국형 활용 예시 1개 확인하기" : "Check one use case example", done: false },
    ],
    recentActivity: locale === "ko" ? "최근 활동" : "Recent activity",
    activities: [
      { text: locale === "ko" ? "입문 모듈 완료" : "Introduction module done", time: locale === "ko" ? "2일 전" : "2 days ago", color: "bg-green-500" },
      { text: locale === "ko" ? "기초 프롬프팅 진행 중" : "Prompting basics in progress", time: locale === "ko" ? "오늘" : "Today", color: "bg-blue-500" },
      { text: locale === "ko" ? "이번 주 총 학습 시간: 4시간 20분" : "Total this week: 4h 20min", time: locale === "ko" ? "이번 주" : "This week", color: "bg-purple-500" },
    ],
    quickLinks: locale === "ko" ? "빠른 이동" : "Quick links",
    links: [
      { label: locale === "ko" ? "📚 학습 계속하기" : "📚 Continue learning", path: "/learn", color: "border-blue-200 hover:bg-blue-50" },
      { label: locale === "ko" ? "📊 분석 보기" : "📊 View analytics", path: "/analytics", color: "border-green-200 hover:bg-green-50" },
      { label: locale === "ko" ? "🖼️ 프롬프트 갤러리" : "🖼️ Prompt gallery", path: "/examples", color: "border-yellow-200 hover:bg-yellow-50" },
      { label: locale === "ko" ? "🤖 플레이그라운드" : "🤖 Playground", path: "/playground", color: "border-purple-200 hover:bg-purple-50" },
    ],
    achievement: locale === "ko" ? "학습 성과" : "Achievement",
    achievementText: locale === "ko"
      ? "현재 5개의 모듈을 완료했으며 인증 취득 경로를 잘 따라가고 있습니다."
      : "You have completed 5 modules and are on track for certification.",
    completedLevels: locale === "ko" ? "완료한 레벨" : "Completed levels",
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || (locale === "ko" ? "사용자" : "User");

  const displayRole =
    user?.role === "student" ? t.role.student
    : user?.role === "job-seeker" ? t.role.jobSeeker
    : user?.role === "employee" ? t.role.employee
    : t.role.other;

  const roleEmoji =
    user?.role === "student" ? "🎓"
    : user?.role === "job-seeker" ? "💼"
    : user?.role === "employee" ? "🏢"
    : "👤";

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const stats = document.querySelector(".stats-section");
    const content = document.querySelector(".content-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === stats) {
            if (entry.isIntersecting) setStatsVisible(true);
            else setStatsVisible(false);
          }
          if (entry.target === content) {
            if (entry.isIntersecting) setContentVisible(true);
            else setContentVisible(false);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (stats) observer.observe(stats);
    if (content) observer.observe(content);
    return () => observer.disconnect();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <img src="/dashboard-hero.jpg" alt="dashboard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            {roleEmoji} {displayRole}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {t.welcome}, {displayName} 👋
          </h1>
          <p className="mt-2 text-white/80 text-sm">{t.subtitle}</p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link to="/learn">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                {t.continueLearning}
              </Button>
            </Link>
            <Link to="/playground">
              <Button className="bg-white/15 text-white border border-white hover:bg-white/30 backdrop-blur-sm">
                {t.openPlayground}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-padding korean-bg stats-section">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {t.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`bg-card rounded-2xl border-2 ${stat.borderColor} p-6
                  transition-all duration-700 hover:shadow-md hover:-translate-y-1
                  ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <span className="text-2xl">{stat.emoji}</span>
                </div>
                <h2 className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</h2>
                {stat.bar !== null && (
                  <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stat.color} transition-all duration-1000`}
                      style={{ width: statsVisible ? `${stat.bar}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-card content-section">
        <div className="container-main">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">

              {/* today's prompt */}
              <div className={`rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">{t.todayPrompt}</h3>
                </div>
                <div className="bg-card rounded-xl p-4 border text-sm text-muted-foreground italic">
                  "{t.todayPromptText}"
                </div>
                <Link to="/playground" className="mt-4 inline-block">
                  <Button size="sm">
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    {t.run}
                  </Button>
                </Link>
              </div>

              {/* weekly mission */}
              <div className={`rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-6 transition-all duration-700 delay-100 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-bold text-foreground">{t.weeklyMission}</h3>
                  <span className="ml-auto text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    {t.missionProgress}
                  </span>
                </div>
                <ul className="space-y-3">
                  {t.missions.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      {m.done
                        ? <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                        : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      }
                      <span className={m.done ? "line-through text-muted-foreground" : "text-foreground font-medium"}>
                        {m.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 h-2 rounded-full bg-yellow-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-500 transition-all duration-1000"
                    style={{ width: contentVisible ? "66%" : "0%" }}
                  />
                </div>
              </div>

              {/* recent activity */}
              <div className={`rounded-2xl border p-6 bg-card transition-all duration-700 delay-200 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">{t.recentActivity}</h3>
                </div>
                <ul className="space-y-3">
                  {t.activities.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                      <span className="text-foreground flex-1">{item.text}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* right column */}
            <div className="space-y-6">

              {/* quick links */}
              <div className={`rounded-2xl border p-6 bg-card transition-all duration-700 delay-100 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <h3 className="text-lg font-bold text-foreground mb-4">{t.quickLinks}</h3>
                <div className="space-y-2">
                  {t.links.map((link) => (
                    <Link key={link.path} to={link.path} className="block">
                      <div className={`border-2 ${link.color} rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm`}>
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* achievement */}
              <div className={`rounded-2xl border-2 border-purple-200 bg-purple-50 p-6 transition-all duration-700 delay-200 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-foreground">{t.achievement}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.achievementText}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {["🌱", "📘", "⚡"].map((emoji, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-sm">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{t.completedLevels}</span>
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