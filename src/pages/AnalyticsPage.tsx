import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, Lightbulb, Clock, CheckCircle, Flame } from "lucide-react";

const AnalyticsPage = () => {
  const { isLoggedIn } = useAuth();
  const { locale } = useI18n();
  const navigate = useNavigate();
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const t = {
    badge: locale === "ko" ? "학습 분석" : "Learning analytics",
    heroTitle: locale === "ko" ? "나의 학습 현황" : "Your learning overview",
    heroSub: locale === "ko"
      ? "학습 시간, 완료율, 인기 모듈 등 핵심 지표를 한눈에 확인하세요."
      : "Track your study time, completion rate, and key learning metrics at a glance.",
    stats: [
      {
        label: locale === "ko" ? "총 학습 시간" : "Total study time",
        value: locale === "ko" ? "12시간 40분" : "12h 40m",
        bar: 63,
        icon: "clock",
      },
      {
        label: locale === "ko" ? "완료율" : "Completion rate",
        value: "74%",
        bar: 74,
        icon: "check",
      },
      {
        label: locale === "ko" ? "인기 모듈" : "Top module",
        value: locale === "ko" ? "실전 활용" : "Applied practice",
        bar: null,
        icon: "flame",
      },
      {
        label: locale === "ko" ? "선택된 플랜" : "Active plan",
        value: locale === "ko" ? "14일 플랜" : "14-day plan",
        bar: null,
        icon: "bar",
      },
    ],
    weeklyTitle: locale === "ko" ? "주간 학습 현황" : "Weekly activity",
    weekDays: locale === "ko"
      ? ["월", "화", "수", "목", "금", "토", "일"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekHours: [1.5, 2, 0.5, 2.5, 1, 0, 0.8],
    weekUnit: locale === "ko" ? "시간" : "h",
    moduleTitle: locale === "ko" ? "모듈 완료 현황" : "Module completion",
    modules: [
      { label: locale === "ko" ? "AI 소개" : "Intro to AI", pct: 100 },
      { label: locale === "ko" ? "기초 프롬프팅" : "Prompt basics", pct: 100 },
      { label: locale === "ko" ? "실전 활용" : "Applied practice", pct: 74 },
      { label: locale === "ko" ? "고급 기법" : "Advanced techniques", pct: 20 },
      { label: locale === "ko" ? "팀 전략" : "Team strategy", pct: 0 },
    ],
    trendsTitle: locale === "ko" ? "학습 추세" : "Learning trends",
    trends: [
      { text: locale === "ko" ? "이번 주 학습 시간이 지난 주 대비 18% 증가했습니다." : "Study time increased 18% compared to last week.", icon: "up" },
      { text: locale === "ko" ? "기초 프롬프팅 완료율이 꾸준히 상승하고 있습니다." : "Prompt basics completion rate is steadily rising.", icon: "up" },
      { text: locale === "ko" ? "실전 활용 모듈 방문 횟수가 가장 많습니다." : "Applied practice has the most module visits.", icon: "flame" },
    ],
    insightsTitle: locale === "ko" ? "추천 인사이트" : "Insights",
    insights: [
      { text: locale === "ko" ? "14일 플랜 사용자의 완료율이 7일 플랜보다 24% 높습니다." : "14-day plan users complete 24% more than 7-day plan users." },
      { text: locale === "ko" ? "활용 예시 페이지 체류 시간이 다른 페이지보다 2배 높습니다." : "Use-case pages have 2× the average session time of other pages." },
      { text: locale === "ko" ? "인증서 검증 기능에 대한 관심이 꾸준히 증가하고 있습니다." : "Interest in certificate verification continues to grow steadily." },
    ],
  };

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

  const StatIcon = ({ name }: { name: string }) => {
    if (name === "clock") return <Clock className="h-4 w-4 text-primary" />;
    if (name === "check") return <CheckCircle className="h-4 w-4 text-primary" />;
    if (name === "flame") return <Flame className="h-4 w-4 text-primary" />;
    return <BarChart3 className="h-4 w-4 text-primary" />;
  };

  const maxHours = Math.max(...t.weekHours);

  if (!isLoggedIn) return null;

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative h-[320px] sm:h-[360px] flex items-end overflow-hidden">
        <img src="/analytics-hero.jpg" alt="analytics" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container-main pb-10 sm:pb-14 w-full">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase border border-white/30 text-white/80 rounded-full px-3 py-1 mb-5">
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{t.heroTitle}</h1>
          <p className="mt-2 text-sm text-white/75 max-w-xl leading-relaxed">{t.heroSub}</p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {t.stats.map((s, idx) => (
              <div key={s.label} data-observe={`stat-${idx}`} className={`py-6 px-5 ${fadeIn(`stat-${idx}`, idx * 60)}`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-primary/8 flex items-center justify-center">
                    <StatIcon name={s.icon} />
                  </div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
                <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
                {s.bar !== null && (
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000"
                      style={{ width: visible[`stat-${idx}`] ? `${s.bar}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Charts + Modules ──────────────────────────────────────────── */}
      <section className="section-padding korean-bg">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Weekly bar chart */}
          <div data-observe="weekly" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("weekly")}`}>
            <div className="px-6 py-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{t.weeklyTitle}</p>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-end gap-2 h-32">
                {t.weekHours.map((h, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">{h > 0 ? `${h}${t.weekUnit}` : ""}</span>
                    <div className="w-full rounded-t-md bg-muted overflow-hidden" style={{ height: "100%" }}>
                      <div
                        className="w-full rounded-t-md bg-primary transition-all duration-1000 ease-out"
                        style={{
                          height: visible["weekly"] ? `${(h / maxHours) * 100}%` : "0%",
                          marginTop: "auto",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {t.weekDays.map((d) => (
                  <div key={d} className="flex-1 text-center text-[10px] text-muted-foreground">{d}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Module completion */}
          <div data-observe="modules" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("modules", 80)}`}>
            <div className="px-6 py-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{t.moduleTitle}</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              {t.modules.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-foreground font-medium">{m.label}</span>
                    <span className="text-muted-foreground">{m.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        m.pct === 100 ? "bg-emerald-500" : m.pct > 0 ? "bg-primary" : "bg-muted"
                      }`}
                      style={{ width: visible["modules"] ? `${m.pct}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Trends + Insights ─────────────────────────────────────────── */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Trends */}
          <div data-observe="trends" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("trends")}`}>
            <div className="px-6 py-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{t.trendsTitle}</p>
            </div>
            <div className="divide-y divide-border">
              {t.trends.map((item, idx) => (
                <div key={idx} className="px-6 py-4 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div data-observe="insights" className={`bg-card border border-border rounded-2xl overflow-hidden ${fadeIn("insights", 80)}`}>
            <div className="px-6 py-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{t.insightsTitle}</p>
            </div>
            <div className="divide-y divide-border">
              {t.insights.map((item, idx) => (
                <div key={idx} className="px-6 py-4 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </Layout>
  );
};

export default AnalyticsPage;