import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/I18nContext";
import {
  GraduationCap,
  Briefcase,
  Building2,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Zap,
  CheckCircle,
  BrainCircuit,
  Shield,
  Clock,
} from "lucide-react";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const UI = {
  ko: {
    whoTitle: "누구를 위한 플랫폼인가요?",
    whoDesc: "학습 목적과 직업에 맞는 맞춤형 AI 커리큘럼이 준비되어 있습니다.",
    detailsBtn: "자세히 보기",

    stats: [
      { value: "14", label: "코스" },
      { value: "3", label: "학습 플랜" },
      { value: "100%", label: "무료 탐색" },
      { value: "인증서", label: "발급 가능" },
    ],

    whatTitle: "Learn Prompting이란?",
    whatDesc: "AI를 처음 접하는 학생부터 조직에 AI를 도입하려는 기업 팀까지 — 목적에 맞게 설계된 한국어 AI 학습 플랫폼입니다.",
    whatPoints: [
      { icon: "bookopen", title: "14개 체계적 코스", desc: "입문부터 심화까지 난이도별로 설계된 커리큘럼" },
      { icon: "users", title: "역할 맞춤 학습", desc: "학생·취업준비생·직장인 각자의 목표에 최적화" },
      { icon: "award", title: "공식 인증서 발급", desc: "수료 후 검증 가능한 디지털 인증서 제공" },
      { icon: "zap", title: "실습 중심 교육", desc: "이론보다 실제 업무에 바로 쓸 수 있는 기술에 집중" },
    ],

    howTitle: "어떻게 학습하나요?",
    howDesc: "세 단계로 AI 역량을 완성합니다.",
    howSteps: [
      { num: "01", title: "경로 선택", desc: "자신의 역할과 목표에 맞는 코스 또는 학습 플랜을 선택합니다. 필터로 난이도·인증서·시험 여부를 설정할 수 있습니다." },
      { num: "02", title: "학습 및 실습", desc: "각 모듈은 짧고 실질적인 내용으로 구성됩니다. 프롬프트를 직접 작성하며 배우고, 피드백으로 실력을 높입니다." },
      { num: "03", title: "인증서 취득", desc: "코스를 완료하면 고유 ID가 부여된 디지털 인증서가 발급됩니다. 누구나 공개 검증 페이지에서 진위를 확인할 수 있습니다." },
    ],

    popularTitle: "인기 코스",
    popularDesc: "가장 많이 수강하는 코스부터 시작해보세요.",
    viewAll: "전체 코스 보기",
    popularCourses: [
      { key: "chatgpt", icon: "brain", tag: "입문", tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", title: "모두를 위한 ChatGPT", desc: "ChatGPT를 제대로 쓰는 방법 — 기초부터 고급 활용까지.", weeks: 1, cert: true },
      { key: "prompt-eng", icon: "book", tag: "입문", tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", title: "프롬프트 엔지니어링 입문", desc: "좋은 프롬프트의 원리와 구조를 처음부터 배웁니다.", weeks: 1, cert: true },
      { key: "advanced", icon: "zap", tag: "심화", tagStyle: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300", title: "고급 프롬프트 엔지니어링", desc: "Chain-of-Thought, Few-shot 등 실무 심화 기법을 다룹니다.", weeks: 3, cert: true },
      { key: "efficiency", icon: "zap", tag: "중급", tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300", title: "생성형 AI로 업무 효율 높이기", desc: "반복 업무를 AI로 줄이고 실무 생산성을 높입니다.", weeks: 2, cert: true },
      { key: "agents", icon: "brain", tag: "중급", tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300", title: "생성형 AI 에이전트 입문", desc: "자율 AI 에이전트의 개념과 구현 방법을 배웁니다.", weeks: 2, cert: true },
      { key: "security", icon: "shield", tag: "심화", tagStyle: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300", title: "고급 프롬프트 해킹 및 AI 보안", desc: "AI 보안과 프롬프트 인젝션 방어를 전문가 수준으로 익힙니다.", weeks: 3, cert: true },
    ],
    weeksUnit: "주",
    certLabel: "인증서",
    startBtn: "시작하기",

    certTitle: "수료 후, 증명하세요",
    certDesc: "모든 코스를 완료하면 고유 ID가 부여된 디지털 인증서가 발급됩니다. 채용 담당자, 교육기관, 파트너 누구든 공개 검증 페이지에서 즉시 진위를 확인할 수 있습니다.",
    certPoints: [
      "고유 ID로 공개 검증 가능",
      "이력서·LinkedIn에 바로 추가",
      "기업 채용 프로세스에서 활용",
      "위조 불가한 디지털 발급",
    ],
    certCta: "검증 페이지 보기",

    playgroundTitle: "AI 프롬프트를 직접 써보세요",
    playgroundDesc: "플레이그라운드에서 프롬프트를 작성하고 AI의 응답을 실시간으로 확인합니다. 로그인 후 이용 가능합니다.",
    playgroundCta: "플레이그라운드 열기",
    promptLabel: "입력한 프롬프트",
    responseLabel: "AI 응답",
    happyBee: "잘 하고 있어요! 🎉",
    hoverBee: "안녕하세요! 👋",
    defaultBee: "프롬프트를 작성해보세요",

    whyTitle: "왜 Learn Prompting인가요?",
    whyDesc: "한국 학습자를 위해 설계된 AI 교육의 새로운 기준",
    whyPoints: [
      { icon: "book", title: "한국어 전용 콘텐츠", desc: "번역이 아닌, 처음부터 한국어로 설계된 AI 커리큘럼" },
      { icon: "users", title: "역할 기반 맞춤 학습", desc: "학생·취업준비생·직장인 각자의 상황에 맞는 학습 경로" },
      { icon: "award", title: "공식 인증서", desc: "산업 현장에서 바로 제출할 수 있는 검증 가능한 수료증" },
      { icon: "zap", title: "실용 중심 커리큘럼", desc: "이론보다 실제로 쓸 수 있는 기술과 프롬프트 작성 실습" },
      { icon: "clock", title: "유연한 학습 일정", desc: "7일·14일·30일 플랜으로 자신의 속도에 맞게 학습" },
      { icon: "shield", title: "검증된 콘텐츠 품질", desc: "AI 전문가와 현직자가 검토한 신뢰할 수 있는 교육 자료" },
    ],

    ctaTitle: "오늘 시작하세요",
    ctaDesc: "로그인 없이 모든 코스를 탐색할 수 있습니다. 마음에 드는 코스를 찾으면 그때 가입하세요.",
    ctaPrimary: "코스 탐색하기",
    ctaSecondary: "학습 플랜 보기",
  },

  en: {
    whoTitle: "Who is this for?",
    whoDesc: "Purpose-built AI curricula matched to your role and goals.",
    detailsBtn: "Learn more",

    stats: [
      { value: "14", label: "Courses" },
      { value: "3", label: "Learning plans" },
      { value: "100%", label: "Free to browse" },
      { value: "Cert.", label: "Available" },
    ],

    whatTitle: "What is Learn Prompting?",
    whatDesc: "A Korean-native AI learning platform — from first-time learners to enterprise teams. Every course is written in Korean from the ground up, not translated.",
    whatPoints: [
      { icon: "bookopen", title: "14 structured courses", desc: "Curricula designed by difficulty — beginner through advanced" },
      { icon: "users", title: "Role-based learning", desc: "Optimised paths for students, job seekers, and professionals" },
      { icon: "award", title: "Official certificates", desc: "Verifiable digital certificates issued on completion" },
      { icon: "zap", title: "Hands-on focus", desc: "Skills you can use at work immediately — not just theory" },
    ],

    howTitle: "How does it work?",
    howDesc: "Three steps to AI fluency.",
    howSteps: [
      { num: "01", title: "Choose your path", desc: "Pick a course or learning plan that fits your role and timeline. Use filters for difficulty, certificate, and exam requirements." },
      { num: "02", title: "Learn by doing", desc: "Each module is short and practical. Write real prompts, get feedback, and build skills that transfer to your work immediately." },
      { num: "03", title: "Get certified", desc: "Complete a course and receive a digital certificate with a unique verifiable ID. Anyone can check authenticity on our public verification page." },
    ],

    popularTitle: "Most popular courses",
    popularDesc: "Start with what thousands of learners chose first.",
    viewAll: "View all courses",
    popularCourses: [
      { key: "chatgpt", icon: "brain", tag: "Beginner", tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", title: "ChatGPT for Everyone", desc: "How to really use ChatGPT — from basics to advanced techniques.", weeks: 1, cert: true },
      { key: "prompt-eng", icon: "book", tag: "Beginner", tagStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", title: "Intro to Prompt Engineering", desc: "Learn the principles and structure of effective prompts from scratch.", weeks: 1, cert: true },
      { key: "advanced", icon: "zap", tag: "Advanced", tagStyle: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300", title: "Advanced Prompt Engineering", desc: "Chain-of-Thought, Few-shot, and multi-step techniques in depth.", weeks: 3, cert: true },
      { key: "efficiency", icon: "zap", tag: "Intermediate", tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300", title: "Boost Daily Efficiency with AI", desc: "Cut repetitive tasks and raise productivity with AI.", weeks: 2, cert: true },
      { key: "agents", icon: "brain", tag: "Intermediate", tagStyle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300", title: "Intro to Generative AI Agents", desc: "Understand and build autonomous AI agents step by step.", weeks: 2, cert: true },
      { key: "security", icon: "shield", tag: "Advanced", tagStyle: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300", title: "Advanced Prompt Hacking & AI Security", desc: "Expert-level AI security and prompt injection defence.", weeks: 3, cert: true },
    ],
    weeksUnit: "wk",
    certLabel: "Certificate",
    startBtn: "Start",

    certTitle: "Complete a course. Prove it.",
    certDesc: "Every course completion earns a digital certificate with a unique verifiable ID. Employers, institutions, and partners can confirm authenticity instantly on our public verification page.",
    certPoints: [
      "Publicly verifiable with unique ID",
      "Add directly to your resume or LinkedIn",
      "Accepted in hiring and evaluation processes",
      "Tamper-proof digital issuance",
    ],
    certCta: "Visit verification page",

    playgroundTitle: "Try writing a prompt yourself",
    playgroundDesc: "Use the Playground to write prompts and see AI responses in real time. Available after login.",
    playgroundCta: "Open Playground",
    promptLabel: "Your prompt",
    responseLabel: "AI response",
    happyBee: "Great work! 🎉",
    hoverBee: "Hello! 👋",
    defaultBee: "Try writing a prompt",

    whyTitle: "Why Learn Prompting?",
    whyDesc: "A new standard in AI education built from the ground up for Korean learners",
    whyPoints: [
      { icon: "book", title: "Built in Korean", desc: "Every course is written in Korean from scratch — not translated from English" },
      { icon: "users", title: "Role-based learning paths", desc: "Separate tracks for students, job seekers, and professionals" },
      { icon: "award", title: "Official certificates", desc: "Verifiable completion certificates ready for professional use" },
      { icon: "zap", title: "Practical curriculum", desc: "Real skills and prompt writing practice — not just theory" },
      { icon: "clock", title: "Flexible schedules", desc: "7, 14, and 30-day plans so you learn at your own pace" },
      { icon: "shield", title: "Verified content quality", desc: "Reviewed by AI experts and working professionals" },
    ],

    ctaTitle: "Start learning today",
    ctaDesc: "Browse all courses without signing in. Create an account when you're ready to begin.",
    ctaPrimary: "Explore courses",
    ctaSecondary: "View learning plans",
  },
};

// ─── Icon resolver ────────────────────────────────────────────────────────────
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const props = { className: className ?? "h-5 w-5" };
  if (name === "brain") return <BrainCircuit {...props} />;
  if (name === "book" || name === "bookopen") return <BookOpen {...props} />;
  if (name === "award") return <Award {...props} />;
  if (name === "users") return <Users {...props} />;
  if (name === "zap") return <Zap {...props} />;
  if (name === "shield") return <Shield {...props} />;
  if (name === "clock") return <Clock {...props} />;
  return <BookOpen {...props} />;
};

// ─── Component ────────────────────────────────────────────────────────────────
const Home = () => {
  const { copy, locale } = useI18n();
  const t = UI[locale as "ko" | "en"] ?? UI.ko;

  const heroRef = useRef<HTMLHeadingElement>(null);
  const playgroundRef = useRef<HTMLElement>(null);
  const heroImages = copy.home.heroImages;

  const [currentHero, setCurrentHero] = useState(0);
  const [fadeHero, setFadeHero] = useState(true);

  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [showResponseCursor, setShowResponseCursor] = useState(false);
  const [beeHappy, setBeeHappy] = useState(false);
  const [beeBounce, setBeeBounce] = useState(false);

  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const userGroups = [
    { ...copy.home.userGroups[0], icon: GraduationCap, path: "/student", image: "/student.jpg" },
    { ...copy.home.userGroups[1], icon: Briefcase, path: "/job-seeker", image: "/jobseeker.jpg" },
    { ...copy.home.userGroups[2], icon: Building2, path: "/employee", image: "/worker.jpg" },
  ];

  // 1. hero slideshow — unchanged
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeHero(false);
      setTimeout(() => {
        setCurrentHero((prev) => (prev + 1) % heroImages.length);
        setFadeHero(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 2. hero title animation — unchanged
  useEffect(() => {
    const triggerAnimation = () => {
      if (!heroRef.current) return;
      const spans = heroRef.current.querySelectorAll("span[data-word]");
      spans.forEach((span, i) => {
        const el = span as HTMLElement;
        el.style.animation = "none";
        el.style.opacity = "0";
        void el.offsetWidth;
        setTimeout(() => {
          el.style.animation = "";
          el.style.animationDelay = `${i * 0.3}s`;
        }, 10);
      });
    };
    const handleVisibility = () => { if (document.visibilityState === "visible") triggerAnimation(); };
    const handleScroll = () => { if (window.scrollY < 100) triggerAnimation(); };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. persona cards — unchanged
  useEffect(() => {
    const cards = document.querySelectorAll(".persona-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => { (entry.target as HTMLElement).classList.add("card-visible"); }, i * 150);
          } else {
            (entry.target as HTMLElement).classList.remove("card-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [locale]);

  // 4. playground typing — unchanged
  useEffect(() => {
    const prompt = copy.home.playground.demoPrompt;
    const response = copy.home.playground.demoResponse;
    const section = playgroundRef.current;
    if (!section) return;
    let typingTimeout: ReturnType<typeof setTimeout>;
    let cursorInterval: ReturnType<typeof setInterval>;

    const startAnimation = () => {
      setTypedText(""); setShowCursor(false); setShowResponse(false);
      setResponseText(""); setShowResponseCursor(false);
      setBeeHappy(false); setBeeBounce(true);
      setTimeout(() => setBeeBounce(false), 600);
      setShowCursor(true);
      let cursorOn = true;
      cursorInterval = setInterval(() => { cursorOn = !cursorOn; setShowCursor(cursorOn); }, 500);
      let i = 0;
      const typeChar = () => {
        if (i < prompt.length) {
          const current = i; setTypedText(prompt.slice(0, current + 1)); i++;
          typingTimeout = setTimeout(typeChar, 50);
        } else {
          clearInterval(cursorInterval); setShowCursor(false);
          setTimeout(() => {
            setShowResponse(true); setBeeHappy(true);
            let j = 0; setShowResponseCursor(true);
            let resCursorOn = true;
            const resCursorInterval = setInterval(() => { resCursorOn = !resCursorOn; setShowResponseCursor(resCursorOn); }, 500);
            const typeResponse = () => {
              if (j < response.length) {
                const current = j; setResponseText(response.slice(0, current + 1)); j++;
                typingTimeout = setTimeout(typeResponse, 30);
              } else { clearInterval(resCursorInterval); setShowResponseCursor(false); }
            };
            typeResponse();
          }, 800);
        }
      };
      typeChar();
    };

    const resetAnimation = () => {
      clearTimeout(typingTimeout); clearInterval(cursorInterval);
      setTypedText(""); setShowCursor(false); setShowResponse(false);
      setResponseText(""); setShowResponseCursor(false);
      setBeeHappy(false); setBeeBounce(false);
    };

    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) startAnimation(); else resetAnimation(); }); },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => { observer.disconnect(); clearTimeout(typingTimeout); clearInterval(cursorInterval); };
  }, [copy.home.playground.demoPrompt, copy.home.playground.demoResponse]);

// 5. generic scroll reveals
useEffect(() => {
  setVisible({});
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.observe;
        if (id && entry.isIntersecting) setVisible((p) => ({ ...p, [id]: true }));
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll("[data-observe]");
  elements.forEach((el) => observer.observe(el));

  // Immediately reveal elements already in the viewport
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
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

      {/* ══ HERO — unchanged ═════════════════════════════════════════════ */}
      <section className="relative h-screen max-h-[680px] flex items-center overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: fadeHero ? 1 : 0 }}>
          <img src={heroImages[currentHero].src} alt={heroImages[currentHero].label} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setFadeHero(false); setTimeout(() => { setCurrentHero(idx); setFadeHero(true); }, 300); }}
              className={`h-2 rounded-full transition-all duration-300 ${currentHero === idx ? "bg-white w-6" : "bg-white/50 w-2"}`}
            />
          ))}
        </div>

        <div className="absolute top-5 right-6 z-20">
          <span className="text-white/80 text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            📍 {heroImages[currentHero].label}
          </span>
        </div>

        <div className="relative z-10 w-full text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 ref={heroRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            <span data-word className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0s" }}>{copy.home.heroWords[0]}</span>{" "}
            <span data-word className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0.3s" }}>{copy.home.heroWords[1]}</span>
            <br />
            <span data-word className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0.6s" }}>{copy.home.heroWords[2]}</span>{" "}
            <span data-word className="inline-block text-yellow-300 animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0.9s" }}>{copy.home.heroWords[3]}</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            {copy.home.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/learn">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                {copy.home.heroPrimaryCta}
              </Button>
            </Link>
            <Link to="/employee">
              <Button size="lg" className="bg-white/15 text-white border border-white hover:bg-white/30 font-semibold backdrop-blur-sm">
                {copy.home.heroSecondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════════════════ */}
      <section className="bg-card border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {t.stats.map((s) => (
              <div key={s.label} className="py-6 px-4 text-center">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHO ══════════════════════════════════════════════════════════ */}
      <section className="section-padding korean-bg">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.whoTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.whoDesc}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {userGroups.map((group) => (
              <div key={group.title} className="persona-card relative rounded-xl border overflow-hidden h-72 group cursor-pointer">
                <img src={group.image} alt={group.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-500" />

                {/* Default state */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full group-hover:opacity-0 transition-opacity duration-300">
                  <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <group.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <p className="mt-1 text-xs text-white/60 uppercase tracking-widest">
                  </p>
                </div>

                {/* Hover state */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <group.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{group.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{group.desc}</p>
                  <Link to={group.path} className="mt-5 inline-block">
                    <Button variant="outline" size="sm" className="text-black border-white bg-white hover:bg-white/80">
                      {t.detailsBtn} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT ═════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-main">
          <div data-observe="what" className={`max-w-2xl ${fadeIn("what")}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {locale === "ko" ? "플랫폼 소개" : "About the platform"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.whatTitle}</h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{t.whatDesc}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.whatPoints.map((pt, idx) => (
              <div
                key={pt.title}
                data-observe={`what-pt-${idx}`}
                className={`bg-card border border-border rounded-2xl px-6 py-7 flex flex-col gap-3 hover:border-primary/30 transition-colors ${fadeIn(`what-pt-${idx}`, idx * 80)}`}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                  <Icon name={pt.icon} className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{pt.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW ══════════════════════════════════════════════════════════ */}
      <section className="section-padding korean-bg border-t border-border">
        <div className="container-main">
          <div data-observe="how" className={fadeIn("how")}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {locale === "ko" ? "학습 방법" : "How it works"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.howTitle}</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {t.howSteps.map((step, idx) => (
              <div
                key={step.num}
                data-observe={`how-${idx}`}
                className={`bg-card px-7 py-8 flex flex-col gap-5 ${fadeIn(`how-${idx}`, idx * 100)}`}
              >
                <span className="text-3xl font-bold text-primary/20 leading-none">{step.num}</span>
                <div>
                  <p className="text-base font-semibold text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POPULAR COURSES ══════════════════════════════════════════════ */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-main">
          <div data-observe="courses" className={`flex items-end justify-between gap-4 flex-wrap ${fadeIn("courses")}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                {locale === "ko" ? "코스" : "Courses"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.popularTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.popularDesc}</p>
            </div>
            <Link to="/learn">
              <Button variant="outline" size="sm">
                {t.viewAll} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.popularCourses.map((course, idx) => (
              <div
                key={course.key}
                data-observe={`course-${idx}`}
                className={`group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-sm transition-all duration-300 ${fadeIn(`course-${idx}`, idx * 70)}`}
              >
                <div className="px-6 pt-6 pb-4 flex-1 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                      <Icon name={course.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${course.tagStyle}`}>
                      {course.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">{course.desc}</p>
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

      {/* ══ CERTIFICATE ══════════════════════════════════════════════════ */}
      <section className="section-padding korean-bg border-t border-border">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-observe="cert" className={fadeIn("cert")}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {locale === "ko" ? "인증서" : "Certificates"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.certTitle}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.certDesc}</p>
              <ul className="mt-6 space-y-3">
                {t.certPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link to="/verify" className="mt-8 inline-block">
                <Button variant="outline" size="sm">
                  {t.certCta} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div data-observe="cert-img" className={`flex items-center justify-center ${fadeIn("cert-img", 150)}`}>
              <div className="w-full max-w-md rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <img
                  src="/demo-cert.svg"
                  alt="Sample certificate"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector(".cert-placeholder")) {
                      const ph = document.createElement("div");
                      ph.className = "cert-placeholder flex flex-col items-center justify-center gap-3 py-16 text-center px-8";
                      ph.innerHTML = `<p style="font-size:13px;color:var(--muted-foreground)">Add demo-cert.svg to your public/ folder</p>`;
                      parent.appendChild(ph);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLAYGROUND ═══════════════════════════════════════════════════ */}
      <section className="section-padding bg-background border-t border-border" ref={playgroundRef}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`relative transition-all duration-300 cursor-pointer select-none ${beeBounce ? "animate-bounce" : ""} ${beeHappy ? "scale-125" : "scale-100"}`}
                  onMouseEnter={() => setBeeBounce(true)}
                  onMouseLeave={() => setBeeBounce(false)}
                >
                  <img
                    src="/bee.png"
                    alt="bee mascot"
                    className={`w-12 h-12 drop-shadow-lg transition-all duration-500 ${beeHappy ? "rotate-12" : ""}`}
                    style={{ animation: beeHappy ? "none" : "beeFloat 2s ease-in-out infinite" }}
                  />
                  {beeHappy && <span className="absolute -top-2 -right-2 text-base animate-ping">✨</span>}
                </div>
                <span className="text-xs text-muted-foreground">
                  {beeHappy ? t.happyBee : beeBounce ? t.hoverBee : t.defaultBee}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {locale === "ko" ? "플레이그라운드" : "Playground"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.playgroundTitle}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.playgroundDesc}</p>
              <Link to="/playground" className="mt-6 inline-block">
                <Button size="sm">
                  {t.playgroundCta} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{t.promptLabel}</p>
              <div className="rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground min-h-[56px] flex items-center">
                <span>{typedText}</span>
                <span className={`ml-0.5 inline-block w-0.5 h-4 bg-primary ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`} />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{t.responseLabel}</p>
              <div className={`rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground transition-all duration-700 ${showResponse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                {showResponse ? (
                  <span>
                    {responseText}
                    <span className={`ml-0.5 inline-block w-0.5 h-4 bg-primary ${showResponseCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`} />
                  </span>
                ) : (
                  <span className="invisible">placeholder</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY ══════════════════════════════════════════════════════════ */}
      <section className="section-padding korean-bg border-t border-border">
        <div className="container-main">
          <div data-observe="why" className={fadeIn("why")}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {locale === "ko" ? "우리의 강점" : "Why us"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.whyTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.whyDesc}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.whyPoints.map((pt, idx) => (
              <div
                key={pt.title}
                data-observe={`why-${idx}`}
                className={`bg-card border border-border rounded-2xl px-6 py-7 flex flex-col gap-3 hover:border-primary/30 transition-colors ${fadeIn(`why-${idx}`, idx * 70)}`}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                  <Icon name={pt.icon} className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{pt.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════ */}
      <section className="section-padding bg-background border-t border-border">
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

export default Home;