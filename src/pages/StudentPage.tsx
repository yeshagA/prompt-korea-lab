import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Award, Clock, BrainCircuit, BookOpen } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const UI = {
  ko: {
    badge: "학생 경로",
    heroTitle: "AI로 학업 경쟁력을\n한 단계 높이세요",
    heroSub: "과제, 발표, 시험 대비까지 — 학생에게 꼭 맞는 AI 프롬프팅 학습 경로입니다.",

    whatTitle: "이 경로에서 무엇을 배우나요?",
    whatDesc: "단순히 ChatGPT를 쓰는 방법이 아닙니다. AI에게 정확하게 질문하고, 원하는 결과를 얻어내는 능력 — 프롬프트 엔지니어링을 배웁니다. 이 기술은 과제 하나를 해결하는 것을 넘어, 취업과 직장 생활까지 평생 써먹을 수 있는 역량입니다.",
    whatPoints: [
      "레포트 구조 설계와 논리적 글쓰기에 AI를 활용하는 법",
      "발표 스크립트와 슬라이드 구성을 AI와 함께 준비하는 법",
      "시험 범위를 빠르게 정리하고 요약하는 AI 학습법",
      "참고자료 검색과 정리를 자동화하는 프롬프트 기법",
      "그룹 프로젝트에서 역할 분담과 회의록 정리에 AI 쓰는 법",
    ],

    whyTitle: "왜 지금 배워야 하나요?",
    whyDesc: "AI는 이미 학교 안으로 들어왔습니다. 교수와 기업 모두 AI를 다룰 줄 아는 사람을 원합니다. 하지만 단순히 AI를 '사용하는 것'과 AI를 '잘 다루는 것'은 다릅니다. 프롬프트 엔지니어링을 배운 학생은 같은 AI 도구로 훨씬 나은 결과를 만들어냅니다.",
    whyPoints: [
      { stat: "85%", desc: "국내 대기업이 AI 활용 역량을 채용 기준으로 고려" },
      { stat: "3×", desc: "프롬프트를 제대로 쓴 학생의 과제 완성 속도 차이" },
      { stat: "7일", desc: "기초 프롬프트 엔지니어링 습득에 필요한 최소 시간" },
    ],

    planTitle: "추천 학습 플랜",
    planDesc: "바쁜 학생을 위해 7일 플랜을 추천합니다. 하루 30분이면 충분합니다.",
    planSteps: [
      { days: "Day 1–2", title: "AI와 프롬프팅 소개", desc: "ChatGPT가 어떻게 작동하는지, 왜 프롬프트가 중요한지 이해합니다." },
      { days: "Day 3–4", title: "좋은 프롬프트의 3요소", desc: "역할·맥락·지시 구조로 AI에게 정확한 요청을 보내는 법을 익힙니다." },
      { days: "Day 5–6", title: "학습에 바로 쓰는 프롬프트", desc: "레포트, 발표, 시험 대비 실전 프롬프트를 직접 작성합니다." },
      { days: "Day 7", title: "복습 및 실전 적용", desc: "배운 내용을 실제 과제에 적용하고 인증서 시험을 준비합니다." },
    ],

    coursesTitle: "추천 코스",
    coursesDesc: "학생에게 가장 잘 맞는 두 가지 코스입니다.",
    courses: [
      {
        key: "chatgpt",
        icon: "brain",
        tag: "입문",
        tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        title: "모두를 위한 ChatGPT",
        desc: "ChatGPT를 제대로 쓰는 방법 — 기초부터 고급 활용까지. 과제, 발표, 조사에 바로 쓸 수 있습니다.",
        weeks: 1,
        cert: true,
      },
      {
        key: "prompt-eng",
        icon: "book",
        tag: "입문",
        tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        title: "프롬프트 엔지니어링 입문",
        desc: "좋은 프롬프트의 원리와 구조를 처음부터 배웁니다. 학업뿐 아니라 취업 준비에도 직결됩니다.",
        weeks: 1,
        cert: true,
      },
    ],
    weeksUnit: "주",
    certLabel: "인증서",
    startBtn: "코스 시작하기",
    viewAll: "전체 코스 보기",

    certTitle: "수료하면 인증서가 발급됩니다",
    certDesc: "코스를 완료하면 고유 ID가 있는 디지털 인증서가 발급됩니다. 이력서와 LinkedIn 프로필에 바로 추가하고, 취업 지원 시 제출할 수 있습니다. 채용 담당자가 공개 검증 페이지에서 진위를 즉시 확인합니다.",

    ctaTitle: "오늘 시작하세요",
    ctaDesc: "로그인 없이 모든 코스를 탐색할 수 있습니다. 준비가 되면 그때 가입하세요.",
    ctaPrimary: "전체 코스 탐색",
    ctaSecondary: "학습 플랜 보기",
  },

  en: {
    badge: "Student path",
    heroTitle: "Sharpen your academic edge\nwith AI",
    heroSub: "Assignments, presentations, exam prep — a learning path built specifically for students.",

    whatTitle: "What will you learn?",
    whatDesc: "This isn't just about using ChatGPT. You'll learn prompt engineering — the skill of asking AI the right questions to get the results you actually need. That skill goes far beyond one assignment. It stays useful through graduation, job hunting, and your entire career.",
    whatPoints: [
      "How to use AI to structure essays and write logically",
      "How to prepare presentation scripts and slides with AI",
      "AI-powered study techniques for fast exam prep and summarisation",
      "Prompts that automate reference searches and citation organisation",
      "Using AI for group project coordination and meeting notes",
    ],

    whyTitle: "Why learn this now?",
    whyDesc: "AI is already inside the classroom. Professors and employers both want people who can work with it effectively. But there's a big difference between simply using AI and using it well. Students who know prompt engineering consistently produce better results with the same tools.",
    whyPoints: [
      { stat: "85%", desc: "of major Korean companies consider AI proficiency in hiring" },
      { stat: "3×", desc: "faster assignment completion for students who prompt well" },
      { stat: "7 days", desc: "minimum time to build a solid prompting foundation" },
    ],

    planTitle: "Recommended learning plan",
    planDesc: "For busy students, the 7-day plan is the perfect starting point. Just 30 minutes a day.",
    planSteps: [
      { days: "Day 1–2", title: "Intro to AI & Prompting", desc: "Understand how ChatGPT works and why the way you ask matters." },
      { days: "Day 3–4", title: "The 3 elements of a great prompt", desc: "Role, context, and instruction — the framework behind every effective prompt." },
      { days: "Day 5–6", title: "Prompts for student life", desc: "Write real prompts for essays, presentations, and exam prep." },
      { days: "Day 7", title: "Review and apply", desc: "Apply everything to an actual assignment and prepare for the certificate exam." },
    ],

    coursesTitle: "Recommended courses",
    coursesDesc: "The two courses that fit student needs best.",
    courses: [
      {
        key: "chatgpt",
        icon: "brain",
        tag: "Beginner",
        tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        title: "ChatGPT for Everyone",
        desc: "How to really use ChatGPT — from basics to advanced. Directly applicable to assignments, presentations, and research.",
        weeks: 1,
        cert: true,
      },
      {
        key: "prompt-eng",
        icon: "book",
        tag: "Beginner",
        tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        title: "Intro to Prompt Engineering",
        desc: "Learn the principles behind effective prompts from scratch. Useful for academics and job applications alike.",
        weeks: 1,
        cert: true,
      },
    ],
    weeksUnit: "wk",
    certLabel: "Certificate",
    startBtn: "Start course",
    viewAll: "View all courses",

    certTitle: "Earn a certificate on completion",
    certDesc: "Finish a course and receive a digital certificate with a unique verifiable ID. Add it directly to your resume or LinkedIn profile and submit it with job applications. Employers can verify authenticity instantly on our public verification page.",

    ctaTitle: "Start learning today",
    ctaDesc: "Browse all courses without signing in. Create an account when you're ready.",
    ctaPrimary: "Explore all courses",
    ctaSecondary: "View learning plans",
  },
};

const IconComp = ({ name, className }: { name: string; className?: string }) => {
  const cls = className ?? "h-4 w-4";
  if (name === "brain") return <BrainCircuit className={cls} />;
  return <BookOpen className={cls} />;
};

// ─── Component ────────────────────────────────────────────────────────────────
const StudentPage = () => {
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

    // Immediately reveal already-visible elements
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

      {/* ── Hero — image kept ──────────────────────────────────────────── */}
      <section className="relative h-[420px] sm:h-[480px] flex items-end overflow-hidden">
        <img
          src="/student-hero.jpg"
          alt="Student path"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container-main pb-12 sm:pb-16 w-full">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase border border-white/30 text-white/80 rounded-full px-3 py-1 mb-5">
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight whitespace-pre-line max-w-2xl">
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-base text-white/75 max-w-xl leading-relaxed">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── What you learn ────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — prose */}
            <div data-observe="what" className={fadeIn("what")}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {locale === "ko" ? "학습 내용" : "What you'll learn"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                {t.whatTitle}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {t.whatDesc}
              </p>
            </div>

            {/* Right — checklist */}
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

      {/* ── Why now ───────────────────────────────────────────────────── */}
      <section className="section-padding korean-bg border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — stats column */}
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

            {/* Right — prose */}
            <div data-observe="why" className={fadeIn("why", 100)}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {locale === "ko" ? "지금 배워야 하는 이유" : "Why now"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                {t.whyTitle}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {t.whyDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7-day plan ────────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-main">
          <div data-observe="plan" className={fadeIn("plan")}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {locale === "ko" ? "학습 플랜" : "Learning plan"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.planTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.planDesc}</p>
          </div>

          {/* Timeline */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {t.planSteps.map((step, idx) => (
              <div
                key={step.days}
                data-observe={`plan-${idx}`}
                className={`bg-card px-7 py-7 flex flex-col gap-3 ${fadeIn(`plan-${idx}`, idx * 80)}`}
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  {step.days}
                </span>
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
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.weeks}{t.weeksUnit}
                    </span>
                    {course.cert && (
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-amber-500" /> {t.certLabel}
                      </span>
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
              <Button size="lg">
                {t.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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

export default StudentPage;