import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Briefcase, Building2, CheckCircle } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

const UI = {
  ko: {
    badge: "학습 경로",
    heroTitle: "나에게 맞는\n학습 경로를 선택하세요",
    heroSub: "목적·역할·시간에 맞게 설계된 세 가지 경로 중 하나를 선택하고 오늘 바로 시작하세요.",
    paths: [
      {
        key: "student",
        icon: "grad",
        title: "학생",
        who: "대학생, 고등학생 등 AI 프롬프팅을 처음 시작하는 학습자",
        plan: "7일 플랜",
        planDesc: "하루 30분, 핵심 개념을 빠르게 습득",
        start: "입문 → 기초 프롬프팅",
        cert: true,
        points: [
          "과제·발표·시험 대비에 AI 즉시 활용",
          "기초 프롬프팅 원리와 구조 학습",
          "수료 후 인증서 발급",
        ],
        path: "/student",
        cta: "학생 경로 보기",
      },
      {
        key: "job-seeker",
        icon: "brief",
        title: "취업준비생",
        who: "AI 역량을 취업 스펙으로 만들고 싶은 취업준비생",
        plan: "14일 플랜",
        planDesc: "실무 중심, 자기소개서·면접·리서치 집중",
        start: "기초 프롬프팅 → 실전 활용",
        cert: true,
        points: [
          "자기소개서·이메일·리서치 AI 자동화",
          "면접 답변 구조화 프롬프트 실습",
          "인증서로 AI 역량 공식 증명",
        ],
        path: "/job-seeker",
        cta: "취업준비생 경로 보기",
      },
      {
        key: "employee",
        icon: "building",
        title: "직장인 · 기업 팀",
        who: "팀 생산성을 높이고 AI 도입을 이끌어가고 싶은 직장인·기업 담당자",
        plan: "30일 플랜",
        planDesc: "체계적·확장 가능한 AI 역량 구축",
        start: "실전 활용 → 고급 기법 → 팀 전략",
        cert: true,
        points: [
          "보고서·회의·반복 업무 AI 자동화",
          "팀 단위 프롬프트 표준화 전략",
          "조직 내 AI 도입 주도 역량 확보",
        ],
        path: "/employee",
        cta: "직장인 경로 보기",
      },
    ],
    compareTitle: "경로 한눈에 비교",
    compareRows: [
      { label: "추천 플랜", values: ["7일", "14일", "30일"] },
      { label: "주요 대상", values: ["학생·초보자", "취업준비생", "직장인·기업"] },
      { label: "인증서", values: [true, true, true] },
      { label: "시작점", values: ["입문", "기초 프롬프팅", "실전 활용"] },
    ],
    ctaTitle: "어디서부터 시작해야 할지 모르겠다면?",
    ctaDesc: "7일 플랜으로 가볍게 시작해보세요. 언제든 경로를 바꿀 수 있습니다.",
    ctaPrimary: "전체 코스 탐색",
    ctaSecondary: "로드맵 보기",
  },
  en: {
    badge: "Learning paths",
    heroTitle: "Choose the path\nthat fits your goals",
    heroSub: "Three purpose-built paths matched to your role, timeline, and ambition. Pick one and start today.",
    paths: [
      {
        key: "student",
        icon: "grad",
        title: "Student",
        who: "University and high school students new to AI prompting",
        plan: "7-Day Plan",
        planDesc: "30 minutes a day — core concepts fast",
        start: "Intro → Prompt basics",
        cert: true,
        points: [
          "Use AI immediately for assignments and presentations",
          "Learn core prompt principles and structure",
          "Earn a certificate on completion",
        ],
        path: "/student",
        cta: "View student path",
      },
      {
        key: "job-seeker",
        icon: "brief",
        title: "Job Seeker",
        who: "Candidates who want AI proficiency as a competitive edge",
        plan: "14-Day Plan",
        planDesc: "Practical focus on applications and interviews",
        start: "Prompt basics → Applied practice",
        cert: true,
        points: [
          "Automate cover letters, emails, and research",
          "Structure interview answers with AI prompts",
          "Prove AI skills with a verifiable certificate",
        ],
        path: "/job-seeker",
        cta: "View job seeker path",
      },
      {
        key: "employee",
        icon: "building",
        title: "Professional · Team",
        who: "Professionals and enterprise teams building scalable AI capability",
        plan: "30-Day Plan",
        planDesc: "Systematic, team-level AI adoption",
        start: "Applied → Advanced → Team strategy",
        cert: true,
        points: [
          "Automate reports, meetings, and repetitive tasks",
          "Build team-wide prompt standardisation",
          "Lead AI adoption across your organisation",
        ],
        path: "/employee",
        cta: "View professional path",
      },
    ],
    compareTitle: "Compare paths at a glance",
    compareRows: [
      { label: "Recommended plan", values: ["7 days", "14 days", "30 days"] },
      { label: "Best for", values: ["Students", "Job seekers", "Professionals"] },
      { label: "Certificate", values: [true, true, true] },
      { label: "Starting point", values: ["Intro", "Prompt basics", "Applied practice"] },
    ],
    ctaTitle: "Not sure where to start?",
    ctaDesc: "Begin with the 7-day plan. You can switch paths anytime.",
    ctaPrimary: "Explore all courses",
    ctaSecondary: "View roadmap",
  },
};

const PathIcon = ({ name, className }: { name: string; className?: string }) => {
  const cls = className ?? "h-5 w-5";
  if (name === "grad") return <GraduationCap className={cls} />;
  if (name === "brief") return <Briefcase className={cls} />;
  return <Building2 className={cls} />;
};

const PersonaPathsPage = () => {
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
      <section className="korean-bg border-b border-border">
        <div className="container-main py-16 sm:py-24">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/70 mb-5 border border-primary/20 rounded-full px-3 py-1">
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight whitespace-pre-line max-w-2xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-xl leading-relaxed">{t.heroSub}</p>
        </div>
      </section>

      {/* ── Path cards ────────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.paths.map((p, idx) => (
            <div
              key={p.key}
              data-observe={`path-${idx}`}
              className={`group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 transition-colors ${fadeIn(`path-${idx}`, idx * 80)}`}
            >
              {/* Card header */}
              <div className="px-6 py-6 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                  <PathIcon name={p.icon} className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">{p.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.who}</p>
                </div>
              </div>

              {/* Plan badge */}
              <div className="px-6 pt-5 pb-2 flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary">
                  {p.plan}
                </span>
                <span className="text-xs text-muted-foreground">{p.planDesc}</span>
              </div>

              {/* Points */}
              <div className="px-6 pb-5 flex-1">
                <ul className="space-y-2.5 mt-3">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Start point */}
              <div className="mx-6 border-t border-border" />
              <div className="px-6 py-4 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{p.start}</p>
                <Link to={p.path}>
                  <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all shrink-0">
                    {p.cta} <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison table ──────────────────────────────────────────── */}
      <section className="section-padding korean-bg border-b border-border">
        <div className="container-main">
          <div data-observe="compare" className={`mb-8 ${fadeIn("compare")}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {locale === "ko" ? "비교" : "Comparison"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.compareTitle}</h2>
          </div>

          <div data-observe="table" className={`overflow-x-auto rounded-2xl border border-border ${fadeIn("table", 80)}`}>
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-6 py-4 text-muted-foreground font-medium w-36" />
                  {t.paths.map((p) => (
                    <th key={p.key} className="px-6 py-4 text-center font-semibold text-foreground">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {t.compareRows.map((row, ridx) => (
                  <tr key={row.label} className={ridx % 2 === 0 ? "" : "bg-muted/20"}>
                    <td className="px-6 py-4 text-muted-foreground font-medium">{row.label}</td>
                    {row.values.map((val, vidx) => (
                      <td key={vidx} className="px-6 py-4 text-center text-foreground">
                        {typeof val === "boolean"
                          ? <CheckCircle className="inline h-4 w-4 text-emerald-600" />
                          : val
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
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

export default PersonaPathsPage;