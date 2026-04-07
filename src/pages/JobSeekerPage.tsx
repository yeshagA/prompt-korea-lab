import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Award, Clock, Zap, BookOpen } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

const UI = {
  ko: {
    badge: "취업준비생 경로",
    heroTitle: "AI로 취업 준비를\n확실하게 차별화하세요",
    heroSub: "자기소개서, 면접 준비, 직무 리서치 — 취업 전선에서 AI를 무기로 만드는 학습 경로입니다.",

    whatTitle: "이 경로에서 무엇을 배우나요?",
    whatDesc: "채용 담당자는 이제 AI를 쓸 줄 아는 지원자를 원합니다. 하지만 단순히 AI를 쓰는 것과 AI로 설득력 있는 결과물을 만드는 것은 다릅니다. 이 경로는 자기소개서부터 면접 답변까지 — 취업의 모든 단계에서 AI를 전략적으로 활용하는 법을 가르칩니다.",
    whatPoints: [
      "직무와 기업에 맞춘 자기소개서를 AI로 구조화하는 법",
      "예상 면접 질문을 생성하고 답변을 다듬는 프롬프트 기법",
      "기업 리서치와 업계 동향 파악을 자동화하는 방법",
      "포트폴리오 설명과 프로젝트 요약을 AI로 완성하는 법",
      "이메일, 지원서, 커버레터를 빠르게 작성하는 실전 프롬프트",
    ],

    whyTitle: "왜 AI 프롬프팅이 취업에 유리한가요?",
    whyDesc: "이미 많은 지원자들이 AI를 씁니다. 차이는 얼마나 잘 쓰느냐입니다. 프롬프트를 제대로 다루는 지원자는 같은 시간에 더 완성도 높은 자기소개서를 쓰고, 더 날카로운 면접 준비를 합니다. AI 활용 능력 자체가 채용 시장에서 하나의 스펙이 되고 있습니다.",
    whyPoints: [
      { stat: "92%", desc: "국내 채용 담당자가 AI 활용 능력을 긍정적으로 평가" },
      { stat: "14일", desc: "실무형 AI 프롬프팅 역량 습득에 필요한 추천 기간" },
      { stat: "2×", desc: "프롬프트를 잘 쓰는 지원자의 자기소개서 완성도 차이" },
    ],

    planTitle: "추천 학습 플랜",
    planDesc: "취업준비생에게는 14일 플랜을 추천합니다. 실무 중심으로 설계된 커리큘럼입니다.",
    planSteps: [
      { days: "Day 1–3", title: "문서 · 자기소개서 작성", desc: "AI로 자기소개서 구조를 잡고 직무에 맞게 다듬는 법을 배웁니다." },
      { days: "Day 4–6", title: "이메일 · 커버레터", desc: "지원서와 비즈니스 이메일을 빠르고 설득력 있게 작성합니다." },
      { days: "Day 7–9", title: "리서치 · 정보 정리", desc: "기업 분석과 업계 트렌드 요약을 자동화하는 프롬프트를 익힙니다." },
      { days: "Day 10–12", title: "면접 준비", desc: "예상 질문 생성, 답변 구조화, 모의 면접 프롬프트를 실습합니다." },
      { days: "Day 13–14", title: "종합 실습 · 인증서", desc: "배운 내용을 실제 지원 상황에 적용하고 인증서를 취득합니다." },
    ],

    coursesTitle: "추천 코스",
    coursesDesc: "취업준비생에게 가장 효과적인 두 가지 코스입니다.",
    courses: [
      {
        key: "prompt-eng",
        icon: "book",
        tag: "입문",
        tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        title: "프롬프트 엔지니어링 입문",
        desc: "자기소개서, 이메일, 리서치에 바로 쓸 수 있는 프롬프트의 원리와 구조를 처음부터 배웁니다.",
        weeks: 1,
        cert: true,
      },
      {
        key: "efficiency",
        icon: "zap",
        tag: "중급",
        tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        title: "생성형 AI로 업무 효율 높이기",
        desc: "취업 준비의 반복 작업을 AI로 줄이고 완성도 높은 지원서를 만드는 실전 기술을 익힙니다.",
        weeks: 2,
        cert: true,
      },
    ],
    weeksUnit: "주",
    certLabel: "인증서",
    startBtn: "코스 시작하기",
    viewAll: "전체 코스 보기",

    certTitle: "인증서로 AI 역량을 증명하세요",
    certDesc: "코스 수료 후 발급되는 디지털 인증서는 이력서와 LinkedIn에 바로 추가할 수 있습니다. 채용 담당자가 공개 검증 페이지에서 즉시 진위를 확인할 수 있어 신뢰도 높은 스펙이 됩니다.",

    ctaTitle: "오늘 시작하세요",
    ctaDesc: "로그인 없이 모든 코스를 탐색할 수 있습니다. 준비가 되면 그때 가입하세요.",
    ctaPrimary: "전체 코스 탐색",
    ctaSecondary: "학습 플랜 보기",
  },

  en: {
    badge: "Job seeker path",
    heroTitle: "Make AI your edge\nin the job market",
    heroSub: "Cover letters, interview prep, company research — a learning path that turns AI into your competitive advantage.",

    whatTitle: "What will you learn?",
    whatDesc: "Recruiters now want candidates who can work with AI. But there's a difference between using AI and producing genuinely compelling results with it. This path teaches you to use AI strategically at every stage of your job search — from applications to interviews.",
    whatPoints: [
      "How to structure and tailor cover letters with AI for each role",
      "Prompts to generate interview questions and sharpen your answers",
      "Automating company research and industry trend analysis",
      "Completing portfolio descriptions and project summaries with AI",
      "Writing emails, applications, and cover letters faster with real prompts",
    ],

    whyTitle: "Why does prompt engineering help in job hunting?",
    whyDesc: "Many candidates already use AI. The difference is how well they use it. Candidates who know prompt engineering write more polished applications in less time and prepare sharper interview answers. AI proficiency itself is becoming a differentiator in hiring.",
    whyPoints: [
      { stat: "92%", desc: "of Korean recruiters view AI proficiency as a positive hiring signal" },
      { stat: "14 days", desc: "recommended time to build practical AI prompting skills" },
      { stat: "2×", desc: "quality difference in applications from candidates who prompt well" },
    ],

    planTitle: "Recommended learning plan",
    planDesc: "For job seekers, the 14-day plan is purpose-built around real application needs.",
    planSteps: [
      { days: "Day 1–3", title: "Documents & cover letters", desc: "Learn to structure and refine cover letters with AI for specific roles." },
      { days: "Day 4–6", title: "Email & applications", desc: "Write persuasive emails and application materials quickly." },
      { days: "Day 7–9", title: "Research & analysis", desc: "Automate company research and industry trend summarisation." },
      { days: "Day 10–12", title: "Interview preparation", desc: "Generate questions, structure answers, and run AI-assisted mock interviews." },
      { days: "Day 13–14", title: "Full practice & certificate", desc: "Apply everything to a real application scenario and earn your certificate." },
    ],

    coursesTitle: "Recommended courses",
    coursesDesc: "The two courses that work best for job seekers.",
    courses: [
      {
        key: "prompt-eng",
        icon: "book",
        tag: "Beginner",
        tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        title: "Intro to Prompt Engineering",
        desc: "Learn the principles behind effective prompts — directly applicable to cover letters, emails, and research.",
        weeks: 1,
        cert: true,
      },
      {
        key: "efficiency",
        icon: "zap",
        tag: "Intermediate",
        tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        title: "Boost Daily Efficiency with AI",
        desc: "Cut repetitive prep work and produce higher-quality applications with practical AI techniques.",
        weeks: 2,
        cert: true,
      },
    ],
    weeksUnit: "wk",
    certLabel: "Certificate",
    startBtn: "Start course",
    viewAll: "View all courses",

    certTitle: "Prove your AI skills with a certificate",
    certDesc: "A digital certificate issued on course completion can be added directly to your resume and LinkedIn. Recruiters can verify authenticity instantly on our public verification page — making it a credible and verifiable credential.",

    ctaTitle: "Start learning today",
    ctaDesc: "Browse all courses without signing in. Create an account when you're ready.",
    ctaPrimary: "Explore all courses",
    ctaSecondary: "View learning plans",
  },
};

const IconComp = ({ name, className }: { name: string; className?: string }) => {
  const cls = className ?? "h-4 w-4";
  if (name === "zap") return <Zap className={cls} />;
  return <BookOpen className={cls} />;
};

const JobSeekerPage = () => {
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
        <img src="/jobseeker-hero.jpg" alt="Job seeker path" className="absolute inset-0 w-full h-full object-cover" />
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

      {/* ── 14-day plan ───────────────────────────────────────────────── */}
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

export default JobSeekerPage;