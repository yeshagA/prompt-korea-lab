import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Award, Clock, Zap, Users } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

const UI = {
  ko: {
    badge: "직장인 · 기업 경로",
    heroTitle: "AI로 팀의 생산성을\n한 차원 높이세요",
    heroSub: "보고서, 회의 요약, 업무 자동화, 팀 도입 전략 — 직장인과 기업 구성원을 위한 심화 AI 학습 경로입니다.",

    whatTitle: "이 경로에서 무엇을 배우나요?",
    whatDesc: "단순히 AI로 글을 쓰는 것이 아닙니다. 반복 업무를 자동화하고, 회의와 보고서의 품질을 높이고, 팀 전체가 AI를 일관되게 활용할 수 있는 체계를 만드는 법을 배웁니다. 이 경로를 마치면 조직 내 AI 도입을 주도할 수 있는 역량을 갖추게 됩니다.",
    whatPoints: [
      "회의록 자동 정리와 액션 아이템 추출 프롬프트",
      "기획서·보고서·제안서를 AI와 함께 구조화하는 법",
      "반복 업무(이메일, 공지, 양식)를 프롬프트로 자동화하는 방법",
      "팀을 위한 프롬프트 표준화와 AI 운영 체계 구축",
      "데이터 분석 결과를 AI로 요약하고 시각화하는 기법",
    ],

    whyTitle: "왜 직장인에게 프롬프트 엔지니어링이 필요한가요?",
    whyDesc: "기업들은 이미 AI를 업무에 도입하고 있습니다. 하지만 도구가 있다고 해서 생산성이 자동으로 오르지는 않습니다. AI를 제대로 다루는 구성원이 있을 때 비로소 팀 전체의 효율이 달라집니다. 프롬프트 엔지니어링은 그 핵심 역량입니다.",
    whyPoints: [
      { stat: "40%", desc: "프롬프트를 잘 쓰는 팀의 문서 작업 시간 단축 비율" },
      { stat: "30일", desc: "팀 단위 AI 도입 역량 구축을 위한 추천 학습 기간" },
      { stat: "3×", desc: "AI 표준화를 갖춘 팀의 업무 일관성 개선 효과" },
    ],

    planTitle: "추천 학습 플랜",
    planDesc: "직장인과 기업 팀에게는 30일 플랜을 추천합니다. 체계적이고 확장 가능한 AI 역량을 구축합니다.",
    planSteps: [
      { days: "Day 1–7", title: "고급 프롬프팅 기법", desc: "Chain-of-Thought, Few-shot 등 결과물 품질을 높이는 심화 기법을 배웁니다." },
      { days: "Day 8–14", title: "멀티스텝 작업 설계", desc: "복잡한 업무를 AI로 단계별로 분해하고 처리하는 방법을 익힙니다." },
      { days: "Day 15–21", title: "품질 검증 · 개선", desc: "AI 결과물을 검토하고 일관된 품질을 유지하는 프롬프트 기법을 다룹니다." },
      { days: "Day 22–27", title: "실무 시나리오 실습", desc: "실제 직무 상황에 맞는 시나리오로 종합 실습을 진행합니다." },
      { days: "Day 28–30", title: "팀 도입 전략", desc: "팀 단위 AI 표준화, 프롬프트 라이브러리 구축, 도입 전략을 수립합니다." },
    ],

    coursesTitle: "추천 코스",
    coursesDesc: "직장인과 기업 팀에게 가장 효과적인 두 가지 코스입니다.",
    courses: [
      {
        key: "efficiency",
        icon: "zap",
        tag: "중급",
        tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        title: "생성형 AI로 업무 효율 높이기",
        desc: "반복 업무를 AI로 줄이고 보고서·이메일·문서의 생산성을 실질적으로 높입니다.",
        weeks: 2,
        cert: true,
      },
      {
        key: "team-strategy",
        icon: "users",
        tag: "심화",
        tagStyle: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
        title: "팀을 위한 AI 도입 전략",
        desc: "조직 내 AI 표준화와 팀 단위 프롬프트 운영 체계를 구축하는 전문가 과정입니다.",
        weeks: 4,
        cert: true,
      },
    ],
    weeksUnit: "주",
    certLabel: "인증서",
    startBtn: "코스 시작하기",
    viewAll: "전체 코스 보기",

    certTitle: "팀과 조직에서 통하는 인증서",
    certDesc: "코스 수료 후 발급되는 디지털 인증서는 개인 역량 증명은 물론, 기업 내부 교육 이수 증빙으로도 활용할 수 있습니다. 채용·평가·제안 과정에서 검증 가능한 공식 자격으로 인정받습니다.",

    ctaTitle: "오늘 시작하세요",
    ctaDesc: "로그인 없이 모든 코스를 탐색할 수 있습니다. 준비가 되면 그때 가입하세요.",
    ctaPrimary: "전체 코스 탐색",
    ctaSecondary: "학습 플랜 보기",
  },

  en: {
    badge: "Professional · Enterprise path",
    heroTitle: "Lift your team's productivity\nwith AI",
    heroSub: "Reports, meeting summaries, task automation, team adoption — a deep-learning path for professionals and enterprise teams.",

    whatTitle: "What will you learn?",
    whatDesc: "This isn't about writing text with AI. You'll learn to automate repetitive work, raise the quality of reports and meetings, and build a system where your whole team uses AI consistently. By the end, you'll be ready to lead AI adoption within your organisation.",
    whatPoints: [
      "Prompts for automatic meeting notes and action item extraction",
      "How to structure plans, reports, and proposals with AI",
      "Automating repetitive tasks — emails, announcements, templates",
      "Standardising prompts across a team and building AI workflows",
      "Summarising and presenting data analysis results with AI",
    ],

    whyTitle: "Why do professionals need prompt engineering?",
    whyDesc: "Companies are already adopting AI. But having the tools doesn't automatically raise productivity — it takes people who know how to use them well. Prompt engineering is the skill that unlocks the real value of AI at the team level.",
    whyPoints: [
      { stat: "40%", desc: "reduction in document prep time for teams that prompt well" },
      { stat: "30 days", desc: "recommended time to build team-level AI adoption skills" },
      { stat: "3×", desc: "improvement in workflow consistency for AI-standardised teams" },
    ],

    planTitle: "Recommended learning plan",
    planDesc: "For professionals and enterprise teams, the 30-day plan builds systematic, scalable AI capability.",
    planSteps: [
      { days: "Day 1–7", title: "Advanced prompting techniques", desc: "Chain-of-Thought, Few-shot, and other techniques that raise output quality." },
      { days: "Day 8–14", title: "Multi-step task design", desc: "Break complex work into AI-processable steps and manage workflows." },
      { days: "Day 15–21", title: "Quality validation", desc: "Review AI outputs and maintain consistent quality with validation prompts." },
      { days: "Day 22–27", title: "Real-world scenario practice", desc: "Comprehensive practice using actual workplace scenarios and deliverables." },
      { days: "Day 28–30", title: "Team adoption strategy", desc: "Build prompt libraries, set standards, and plan AI rollout for your team." },
    ],

    coursesTitle: "Recommended courses",
    coursesDesc: "The two courses that deliver the most value for professionals and teams.",
    courses: [
      {
        key: "efficiency",
        icon: "zap",
        tag: "Intermediate",
        tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        title: "Boost Daily Efficiency with AI",
        desc: "Cut repetitive tasks and substantially raise the quality and speed of reports, emails, and documents.",
        weeks: 2,
        cert: true,
      },
      {
        key: "team-strategy",
        icon: "users",
        tag: "Advanced",
        tagStyle: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
        title: "AI Adoption Strategy for Teams",
        desc: "Build AI standardisation and team-level prompt operations within your organisation.",
        weeks: 4,
        cert: true,
      },
    ],
    weeksUnit: "wk",
    certLabel: "Certificate",
    startBtn: "Start course",
    viewAll: "View all courses",

    certTitle: "A certificate that works inside organisations",
    certDesc: "The digital certificate issued on completion proves individual capability and can be used as official training documentation within a company. It's publicly verifiable — accepted in hiring, performance reviews, and proposal processes.",

    ctaTitle: "Start learning today",
    ctaDesc: "Browse all courses without signing in. Create an account when you're ready.",
    ctaPrimary: "Explore all courses",
    ctaSecondary: "View learning plans",
  },
};

const IconComp = ({ name, className }: { name: string; className?: string }) => {
  const cls = className ?? "h-4 w-4";
  if (name === "zap") return <Zap className={cls} />;
  if (name === "users") return <Users className={cls} />;
  return <Zap className={cls} />;
};

const EmployeePage = () => {
  const { locale } = useI18n();
  const t = UI[locale as "ko" | "en"] ?? UI.ko;

  const [visible, setVisible] = useState<Record<string, boolean>>({});

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

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative h-[420px] sm:h-[480px] flex items-end overflow-hidden">
        <img src="/employee-hero.jpg" alt="Employee path" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container-main pb-12 sm:pb-16 w-full">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase border border-white/30 text-white/80 rounded-full px-3 py-1 mb-5">
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight whitespace-pre-line max-w-2xl">
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-base text-white/75 max-w-xl leading-relaxed">{t.heroSub}</p>
        </div>
      </section>

      {/* ── What you learn ────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div data-observe="what" className={fadeIn("what")}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {locale === "ko" ? "학습 내용" : "What you'll learn"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">{t.whatTitle}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.whatDesc}</p>
            </div>
            <div data-observe="what-list" className={`pt-2 ${fadeIn("what-list", 100)}`}>
              <ul className="space-y-4">
                {t.whatPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why ───────────────────────────────────────────────────────── */}
      <section className="section-padding korean-bg border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div data-observe="why-stats" className={fadeIn("why-stats")}>
              <div className="space-y-6">
                {t.whyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-5 border-b border-border last:border-0 pb-6 last:pb-0">
                    <span className="text-3xl font-bold text-primary shrink-0 leading-none">{pt.stat}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div data-observe="why" className={fadeIn("why", 100)}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {locale === "ko" ? "지금 배워야 하는 이유" : "Why now"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">{t.whyTitle}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.whyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 30-day plan ───────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-main">
          <div data-observe="plan" className={fadeIn("plan")}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {locale === "ko" ? "학습 플랜" : "Learning plan"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.planTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.planDesc}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {t.planSteps.map((step, idx) => (
              <div
                key={step.days}
                data-observe={`plan-${idx}`}
                className={`bg-card px-7 py-7 flex flex-col gap-3 ${fadeIn(`plan-${idx}`, idx * 70)}`}
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">{step.days}</span>
                <p className="text-base font-semibold text-foreground">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link to="/roadmap">
              <Button variant="outline" size="sm">
                {locale === "ko" ? "전체 로드맵 보기" : "View full roadmap"}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2 Featured courses ────────────────────────────────────────── */}
      <section className="section-padding korean-bg border-b border-border">
        <div className="container-main">
          <div data-observe="courses" className={`flex items-end justify-between gap-4 flex-wrap ${fadeIn("courses")}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                {locale === "ko" ? "코스" : "Courses"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.coursesTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.coursesDesc}</p>
            </div>
            <Link to="/learn">
              <Button variant="outline" size="sm">
                {t.viewAll} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.courses.map((course, idx) => (
              <div
                key={course.key}
                data-observe={`course-${idx}`}
                className={`group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-sm transition-all duration-300 ${fadeIn(`course-${idx}`, idx * 80)}`}
              >
                <div className="px-6 pt-6 pb-4 flex-1 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                      <IconComp name={course.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${course.tagStyle}`}>
                      {course.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{course.desc}</p>
                  </div>
                </div>
                <div className="mx-6 border-t border-border" />
                <div className="px-6 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.weeks}{t.weeksUnit}</span>
                    {course.cert && (
                      <span className="flex items-center gap-1"><Award className="h-3 w-3 text-amber-500" /> {t.certLabel}</span>
                    )}
                  </div>
                  <Link to="/learn">
                    <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                      {t.startBtn} <ArrowRight className="h-3 w-3" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificate ───────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-observe="cert" className={fadeIn("cert")}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {locale === "ko" ? "인증서" : "Certificate"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.certTitle}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.certDesc}</p>
              <Link to="/verify" className="mt-6 inline-block">
                <Button variant="outline" size="sm">
                  {locale === "ko" ? "검증 페이지 보기" : "View verification page"}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div data-observe="cert-img" className={`flex items-center justify-center ${fadeIn("cert-img", 150)}`}>
              <div className="w-full max-w-md rounded-2xl border border-border bg-card overflow-hidden">
                <img
                  src="/demo-cert.svg"
                  alt="Sample certificate"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector(".cert-ph")) {
                      const ph = document.createElement("div");
                      ph.className = "cert-ph py-16 text-center";
                      ph.innerHTML = `<p style="font-size:12px;color:var(--muted-foreground)">demo-cert.svg</p>`;
                      parent.appendChild(ph);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-padding korean-bg">
        <div data-observe="cta" className={`container-main max-w-2xl mx-auto text-center ${fadeIn("cta")}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.ctaTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.ctaDesc}</p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link to="/learn">
              <Button size="lg">{t.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Link to="/roadmap">
              <Button size="lg" variant="outline">{t.ctaSecondary}</Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default EmployeePage;