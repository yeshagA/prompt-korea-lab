import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

// ─── i18n copy ───────────────────────────────────────────────────────────────
const copy = {
  ko: {
    badge: "학습 로드맵",
    heroTitle: "목표에 맞는 학습 경로를\n선택하세요",
    heroSub: "7일이면 기초를 다지고, 14일이면 실무에 쓸 수 있고, 30일이면 팀을 이끌 수 있습니다.\n지금 나에게 맞는 경로를 선택하고, 오늘 첫 번째 모듈을 완료하세요.",
    tableTitle: "플랜 비교",
    rows: {
      duration: "기간",
      level: "난이도",
      target: "추천 대상",
      modules: "모듈 수",
      practice: "실습",
      certificate: "인증서",
    },
    plans: [
      {
        key: "7d",
        label: "7일 플랜",
        level: "입문",
        target: "학생 · 초보자",
        goal: "AI 프롬프팅의 핵심 개념을 빠르게 파악합니다.",
        modules: 4,
        practice: true,
        certificate: false,
        steps: [
          { range: "Day 1–2", title: "AI와 프롬프팅 소개", desc: "기본 개념과 작동 원리 이해" },
          { range: "Day 3–4", title: "프롬프트 핵심 원칙", desc: "좋은 프롬프트를 만드는 3요소" },
          { range: "Day 5–6", title: "구조화된 프롬프트 작성", desc: "역할 · 맥락 · 지시 프레임워크" },
          { range: "Day 7", title: "실전 적용", desc: "학습 내용으로 직접 프롬프트 작성" },
        ],
        outcome: "기본기를 갖춰 즉시 활용 가능한 수준에 도달합니다.",
        cta: "7일 플랜 시작",
      },
      {
        key: "14d",
        label: "14일 플랜",
        level: "중급",
        target: "취업준비생 · 실무 입문자",
        goal: "업무에 바로 적용할 수 있는 실무형 프롬프팅을 익힙니다.",
        modules: 5,
        practice: true,
        certificate: true,
        steps: [
          { range: "Day 1–3", title: "문서 · 보고서 작성", desc: "기획서·제안서 AI 활용" },
          { range: "Day 4–6", title: "비즈니스 이메일", desc: "이메일 자동화 프롬프트" },
          { range: "Day 7–9", title: "리서치 · 정보 정리", desc: "요약 및 분석 프롬프트" },
          { range: "Day 10–12", title: "아이디어 발상", desc: "창의적 브레인스토밍 기법" },
          { range: "Day 13–14", title: "업무 자동화 기초", desc: "반복 업무의 AI 전환" },
        ],
        outcome: "실제 업무 환경에서 즉시 활용 가능한 AI 역량을 확보합니다.",
        cta: "14일 플랜 시작",
      },
      {
        key: "30d",
        label: "30일 플랜",
        level: "심화",
        target: "심화 학습자 · 기업 팀",
        goal: "체계적이고 확장 가능한 프롬프팅 역량을 구축합니다.",
        modules: 5,
        practice: true,
        certificate: true,
        steps: [
          { range: "Day 1–7", title: "고급 프롬프팅 기법", desc: "Chain-of-Thought · Few-shot 학습" },
          { range: "Day 8–14", title: "멀티스텝 작업 설계", desc: "복잡한 작업을 단계별로 분해" },
          { range: "Day 15–21", title: "품질 검증 · 개선", desc: "AI 결과물 품질 향상 기법" },
          { range: "Day 22–27", title: "실무 시나리오 실습", desc: "업무 시나리오 종합 연습" },
          { range: "Day 28–30", title: "팀 활용 전략", desc: "팀 단위 AI 도입 및 표준화" },
        ],
        outcome: "실무 및 팀 환경에서 AI를 주도적으로 운용할 수 있는 수준에 도달합니다.",
        cta: "30일 플랜 시작",
      },
    ],
    ctaTitle: "어떤 경로가 나에게 맞을까요?",
    ctaSub: "페르소나별 학습 경로를 확인하거나 바로 학습을 시작하세요.",
    ctaStudent: "학생",
    ctaJobSeeker: "취업준비생",
    ctaEmployee: "직장인",
    ctaLearn: "학습 시작하기",
    note: "어디서부터 시작해야 할지 모르겠다면 7일 플랜을 추천합니다. 언제든 플랜을 변경할 수 있습니다.",
  },
  en: {
    badge: "Learning Roadmap",
    heroTitle: "Choose the path that\nfits your goals",
    heroSub: "7 days to build your foundation. 14 days to use AI at work.\n30 days to lead your team.\nPick the path that fits your life — and finish your first module today.",
    tableTitle: "Plan comparison",
    rows: {
      duration: "Duration",
      level: "Level",
      target: "Who it's for",
      modules: "Modules",
      practice: "Hands-on",
      certificate: "Certificate",
    },
    plans: [
      {
        key: "7d",
        label: "7-Day Plan",
        level: "Beginner",
        target: "Students · Newcomers",
        goal: "Grasp core AI prompting concepts quickly.",
        modules: 4,
        practice: true,
        certificate: false,
        steps: [
          { range: "Day 1–2", title: "Intro to AI & Prompting", desc: "Understand the basics and how it works" },
          { range: "Day 3–4", title: "Core Prompt Principles", desc: "The 3 elements of a great prompt" },
          { range: "Day 5–6", title: "Structured Prompts", desc: "Role · context · instruction framework" },
          { range: "Day 7", title: "Real-world Application", desc: "Write prompts using everything learned" },
        ],
        outcome: "You'll be ready to use AI prompting effectively right away.",
        cta: "Start 7-Day Plan",
      },
      {
        key: "14d",
        label: "14-Day Plan",
        level: "Intermediate",
        target: "Job seekers · Early professionals",
        goal: "Build practical prompting skills for the workplace.",
        modules: 5,
        practice: true,
        certificate: true,
        steps: [
          { range: "Day 1–3", title: "Documents & Reports", desc: "AI-assisted writing for work" },
          { range: "Day 4–6", title: "Business Email", desc: "Automated email prompts" },
          { range: "Day 7–9", title: "Research & Summarization", desc: "Prompts for analysis" },
          { range: "Day 10–12", title: "Idea Generation", desc: "Creative brainstorming techniques" },
          { range: "Day 13–14", title: "Task Automation Basics", desc: "Automate repetitive work with AI" },
        ],
        outcome: "You'll have practical AI skills applicable in any professional setting.",
        cta: "Start 14-Day Plan",
      },
      {
        key: "30d",
        label: "30-Day Plan",
        level: "Advanced",
        target: "Advanced learners · Enterprise teams",
        goal: "Build scalable, systematic prompting expertise.",
        modules: 5,
        practice: true,
        certificate: true,
        steps: [
          { range: "Day 1–7", title: "Advanced Techniques", desc: "Chain-of-Thought · Few-shot learning" },
          { range: "Day 8–14", title: "Multi-step Task Design", desc: "Breaking complex tasks into steps" },
          { range: "Day 15–21", title: "Quality Validation", desc: "Improving AI output quality" },
          { range: "Day 22–27", title: "Scenario Practice", desc: "Real-world workflow simulations" },
          { range: "Day 28–30", title: "Team Strategy", desc: "AI adoption and standardization for teams" },
        ],
        outcome: "You'll be able to lead AI integration in professional and team environments.",
        cta: "Start 30-Day Plan",
      },
    ],
    ctaTitle: "Not sure which path suits you?",
    ctaSub: "Explore persona-based paths or jump straight into learning.",
    ctaStudent: "Student",
    ctaJobSeeker: "Job Seeker",
    ctaEmployee: "Employee",
    ctaLearn: "Start Learning",
    note: "Not sure where to begin? We recommend starting with the 7-Day Plan. You can switch anytime.",
  },
};

// Accent colors per plan — minimal, professional
const PLAN_ACCENTS = [
  { dot: "#16a34a", line: "#bbf7d0", badge: "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300" },
  { dot: "#2563eb", line: "#bfdbfe", badge: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
  { dot: "#7c3aed", line: "#ddd6fe", badge: "bg-violet-50 text-violet-800 dark:bg-violet-950 dark:text-violet-300" },
];

// ─── Component ────────────────────────────────────────────────────────────────
const RoadmapPage = () => {
  const { locale } = useI18n();
  const t = copy[locale as "ko" | "en"] ?? copy.ko;

  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.observe;
          if (id && entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fadeIn = (id: string, delay = 0) =>
    `transition-all duration-700 ${delay ? `delay-[${delay}ms]` : ""} ${
      visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden korean-bg border-b border-border">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Subtle geometric accent */}
          <div className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full border border-primary/10" />
          <div className="absolute -top-8 right-20 w-[340px] h-[340px] rounded-full border border-primary/8" />
        </div>

        <div className="container-main py-20 sm:py-28 relative z-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/70 mb-5 border border-primary/20 rounded-full px-3 py-1">
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight whitespace-pre-line max-w-2xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-xl whitespace-pre-line leading-relaxed">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            {t.tableTitle}
          </p>
          <div
            data-observe="table"
            className={`overflow-x-auto rounded-xl border border-border ${fadeIn("table")}`}
          >
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-6 py-4 text-muted-foreground font-medium w-36" />
                  {t.plans.map((p, i) => (
                    <th key={p.key} className="px-6 py-4 text-center font-semibold text-foreground">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                        style={{ background: PLAN_ACCENTS[i].dot }}
                      />
                      {p.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { key: "duration", vals: t.plans.map((p) => p.label) },
                  { key: "level", vals: t.plans.map((p) => p.level) },
                  { key: "target", vals: t.plans.map((p) => p.target) },
                  { key: "modules", vals: t.plans.map((p) => `${p.modules}`) },
                  { key: "practice", vals: t.plans.map((p) => p.practice) },
                  { key: "certificate", vals: t.plans.map((p) => p.certificate) },
                ].map((row, rowIdx) => (
                  <tr key={row.key} className={rowIdx % 2 === 0 ? "" : "bg-muted/20"}>
                    <td className="px-6 py-3 text-muted-foreground font-medium">
                      {t.rows[row.key as keyof typeof t.rows]}
                    </td>
                    {row.vals.map((val, i) => (
                      <td key={i} className="px-6 py-3 text-center text-foreground">
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="inline h-4 w-4 text-green-600" />
                          ) : (
                            <X className="inline h-4 w-4 text-muted-foreground/40" />
                          )
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Plan cards ────────────────────────────────────────────────────── */}
      <section className="section-padding korean-bg">
        <div className="container-main space-y-6">
          {t.plans.map((plan, idx) => {
            const accent = PLAN_ACCENTS[idx];
            const obsId = `plan-${plan.key}`;
            return (
              <div
                key={plan.key}
                data-observe={obsId}
                className={`bg-card rounded-2xl border border-border overflow-hidden ${fadeIn(obsId, idx * 80)}`}
              >
                {/* Card header */}
                <div className="px-7 py-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: accent.dot }}
                    />
                    <h2 className="text-xl font-bold text-foreground">{plan.label}</h2>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${accent.badge}`}>
                      {plan.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.target}</p>
                </div>

                {/* Card body */}
                <div className="px-7 py-6 grid sm:grid-cols-[1fr_1px_1fr] gap-6">

                  {/* Left: goal + steps */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{plan.goal}</p>

                    {/* Timeline */}
                    <ol className="space-y-0">
                      {plan.steps.map((step, si) => (
                        <li key={step.title} className="flex gap-4">
                          {/* Spine */}
                          <div className="flex flex-col items-center">
                            <div
                              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                              style={{ background: accent.dot }}
                            />
                            {si < plan.steps.length - 1 && (
                              <div
                                className="w-px flex-1 mt-1"
                                style={{ background: accent.line }}
                              />
                            )}
                          </div>
                          {/* Text */}
                          <div className={`pb-5 ${si === plan.steps.length - 1 ? "pb-0" : ""}`}>
                            <span className="text-xs font-semibold text-muted-foreground block mb-0.5">
                              {step.range}
                            </span>
                            <span className="text-sm font-semibold text-foreground block">
                              {step.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{step.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block bg-border" />

                  {/* Right: outcome + CTA */}
                  <div className="flex flex-col justify-between gap-6">
                    <div className="rounded-xl bg-muted/50 border border-border px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                        {locale === "ko" ? "수료 후" : "After completion"}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">{plan.outcome}</p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      {plan.certificate && (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
                          <Check className="h-3 w-3 text-green-600" />
                          {locale === "ko" ? "인증서 발급" : "Certificate included"}
                        </span>
                      )}
                      <Button
                        size="sm"
                        className="ml-auto"
                        style={{
                          background: accent.dot,
                          border: "none",
                          color: "#fff",
                        }}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Note ──────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="container-main">
          <p className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-4 py-3 leading-relaxed">
            {t.note}
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-t border-border">
        <div
          data-observe="cta"
          className={`container-main max-w-2xl mx-auto text-center ${fadeIn("cta")}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t.ctaTitle}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {t.ctaSub}
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link to="/student">
              <Button variant="outline" size="sm">{t.ctaStudent}</Button>
            </Link>
            <Link to="/job-seeker">
              <Button variant="outline" size="sm">{t.ctaJobSeeker}</Button>
            </Link>
            <Link to="/employee">
              <Button variant="outline" size="sm">{t.ctaEmployee}</Button>
            </Link>
          </div>
          <div className="mt-4">
            <Link to="/learn">
              <Button size="lg">
                {t.ctaLearn}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default RoadmapPage;