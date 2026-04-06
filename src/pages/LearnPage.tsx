import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  Lock,
  ArrowRight,
  Award,
  ClipboardCheck,
  BookOpen,
  Cpu,
  Shield,
  Megaphone,
  Zap,
  BrainCircuit,
  Users,
  Search,
  ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Level = "beginner" | "intermediate" | "advanced";
type Role = "student" | "job-seeker" | "employee" | "all";
type CourseKey = string;

interface Course {
  key: CourseKey;
  icon: React.ReactNode;
  level: Level;
  roles: Role[];
  certificate: boolean;
  examRequired: boolean;
  durationWeeks: number;
  modules: number;
  ko: { title: string; desc: string; tag: string };
  en: { title: string; desc: string; tag: string };
}

// ─── Course data ──────────────────────────────────────────────────────────────
const COURSES: Course[] = [
  {
    key: "chatgpt-everyone",
    icon: <BrainCircuit className="h-5 w-5" />,
    level: "beginner",
    roles: ["student", "job-seeker", "employee"],
    certificate: true,
    examRequired: false,
    durationWeeks: 1,
    modules: 6,
    ko: { title: "모두를 위한 ChatGPT", desc: "ChatGPT의 기초부터 고급 활용 기법까지 단계별로 학습합니다.", tag: "인기" },
    en: { title: "ChatGPT for Everyone", desc: "Master ChatGPT from fundamentals to advanced techniques, step by step.", tag: "Popular" },
  },
  {
    key: "intro-prompt-engineering",
    icon: <BookOpen className="h-5 w-5" />,
    level: "beginner",
    roles: ["student", "job-seeker"],
    certificate: true,
    examRequired: false,
    durationWeeks: 1,
    modules: 5,
    ko: { title: "프롬프트 엔지니어링 입문", desc: "효과적인 프롬프트를 작성하는 핵심 원리와 기초 기법을 익힙니다.", tag: "신규" },
    en: { title: "Intro to Prompt Engineering", desc: "Learn the core principles and foundational techniques for crafting effective prompts.", tag: "New" },
  },
  {
    key: "intro-gen-ai",
    icon: <Cpu className="h-5 w-5" />,
    level: "beginner",
    roles: ["student", "employee"],
    certificate: false,
    examRequired: false,
    durationWeeks: 1,
    modules: 4,
    ko: { title: "생성형 AI 소개", desc: "생성형 AI의 기본 작동 원리와 현실 세계 활용 사례를 살펴봅니다.", tag: "무료" },
    en: { title: "Introduction to Generative AI", desc: "Explore how generative AI works and its real-world applications.", tag: "Free" },
  },
  {
    key: "intro-llm",
    icon: <BrainCircuit className="h-5 w-5" />,
    level: "beginner",
    roles: ["student"],
    certificate: false,
    examRequired: false,
    durationWeeks: 1,
    modules: 5,
    ko: { title: "대형 언어 모델(LLM) 입문", desc: "LLM이 어떻게 학습되고 작동하는지 개념적으로 이해합니다.", tag: "" },
    en: { title: "Introduction to LLMs", desc: "Conceptually understand how large language models are trained and function.", tag: "" },
  },
  {
    key: "daily-efficiency",
    icon: <Zap className="h-5 w-5" />,
    level: "intermediate",
    roles: ["job-seeker", "employee"],
    certificate: true,
    examRequired: false,
    durationWeeks: 2,
    modules: 7,
    ko: { title: "생성형 AI로 업무 효율 높이기", desc: "반복 업무를 AI로 자동화하고 일상적인 업무 효율을 끌어올립니다.", tag: "실무" },
    en: { title: "Boost Daily Efficiency with AI", desc: "Automate repetitive tasks and dramatically improve day-to-day productivity.", tag: "Practical" },
  },
  {
    key: "advanced-prompt-engineering",
    icon: <BookOpen className="h-5 w-5" />,
    level: "advanced",
    roles: ["student", "job-seeker", "employee"],
    certificate: true,
    examRequired: true,
    durationWeeks: 3,
    modules: 9,
    ko: { title: "고급 프롬프트 엔지니어링", desc: "Chain-of-Thought, Few-shot, 멀티스텝 프롬프팅 등 심화 기법을 다룹니다.", tag: "심화" },
    en: { title: "Advanced Prompt Engineering", desc: "Covers Chain-of-Thought, Few-shot, and multi-step prompting techniques in depth.", tag: "Advanced" },
  },
  {
    key: "intro-agents",
    icon: <Cpu className="h-5 w-5" />,
    level: "intermediate",
    roles: ["student", "employee"],
    certificate: true,
    examRequired: true,
    durationWeeks: 2,
    modules: 6,
    ko: { title: "생성형 AI 에이전트 입문", desc: "자율 AI 에이전트의 개념과 실제 구현 방법을 학습합니다.", tag: "신규" },
    en: { title: "Intro to Generative AI Agents", desc: "Learn the concepts and practical implementation of autonomous AI agents.", tag: "New" },
  },
  {
    key: "intro-rag",
    icon: <BrainCircuit className="h-5 w-5" />,
    level: "intermediate",
    roles: ["student", "employee"],
    certificate: true,
    examRequired: true,
    durationWeeks: 2,
    modules: 6,
    ko: { title: "RAG(검색 증강 생성) 입문", desc: "외부 데이터를 AI에 결합하는 RAG 아키텍처를 이해하고 적용합니다.", tag: "" },
    en: { title: "Intro to RAG", desc: "Understand and apply Retrieval-Augmented Generation to combine external data with AI.", tag: "" },
  },
  {
    key: "marketing-ai",
    icon: <Megaphone className="h-5 w-5" />,
    level: "intermediate",
    roles: ["job-seeker", "employee"],
    certificate: true,
    examRequired: false,
    durationWeeks: 2,
    modules: 7,
    ko: { title: "마케팅을 위한 생성형 AI", desc: "콘텐츠 제작, 카피라이팅, 캠페인 기획에 AI를 적용하는 방법을 배웁니다.", tag: "실무" },
    en: { title: "Generative AI in Marketing", desc: "Apply AI to content creation, copywriting, and campaign planning.", tag: "Practical" },
  },
  {
    key: "ai-safety",
    icon: <Shield className="h-5 w-5" />,
    level: "intermediate",
    roles: ["student", "employee"],
    certificate: true,
    examRequired: true,
    durationWeeks: 2,
    modules: 6,
    ko: { title: "AI 안전성", desc: "AI 시스템의 위험 요소, 편향, 윤리적 고려 사항을 심층적으로 탐구합니다.", tag: "" },
    en: { title: "AI Safety", desc: "Deep dive into risks, bias, and ethical considerations in AI systems.", tag: "" },
  },
  {
    key: "prompt-hacking-intro",
    icon: <Shield className="h-5 w-5" />,
    level: "advanced",
    roles: ["student"],
    certificate: true,
    examRequired: true,
    durationWeeks: 2,
    modules: 5,
    ko: { title: "프롬프트 해킹 입문", desc: "프롬프트 인젝션과 탈옥 기법을 이해하고 방어 전략을 학습합니다.", tag: "전문가" },
    en: { title: "Intro to Prompt Hacking", desc: "Understand prompt injection, jailbreaking, and defensive strategies.", tag: "Expert" },
  },
  {
    key: "prompt-hacking-advanced",
    icon: <Shield className="h-5 w-5" />,
    level: "advanced",
    roles: ["student"],
    certificate: true,
    examRequired: true,
    durationWeeks: 3,
    modules: 8,
    ko: { title: "고급 프롬프트 해킹 및 AI 보안", desc: "AI 보안 실전 마스터클래스 — HackAPrompt 창시자와 함께합니다.", tag: "전문가" },
    en: { title: "Advanced Prompt Hacking & AI Security", desc: "AI security masterclass from the creator of HackAPrompt.", tag: "Expert" },
  },
  {
    key: "runway-ml",
    icon: <Zap className="h-5 w-5" />,
    level: "beginner",
    roles: ["student", "job-seeker"],
    certificate: false,
    examRequired: false,
    durationWeeks: 1,
    modules: 4,
    ko: { title: "Runway ML 입문", desc: "텍스트·이미지·영상을 아우르는 멀티모달 AI 크리에이티브 도구를 활용합니다.", tag: "크리에이티브" },
    en: { title: "Runway ML for Everyone", desc: "Use multimodal AI creative tools spanning text, image, and video.", tag: "Creative" },
  },
  {
    key: "team-ai-strategy",
    icon: <Users className="h-5 w-5" />,
    level: "advanced",
    roles: ["employee"],
    certificate: true,
    examRequired: true,
    durationWeeks: 4,
    modules: 10,
    ko: { title: "팀을 위한 AI 도입 전략", desc: "조직 내 AI 표준화와 팀 단위 프롬프트 운영 체계를 구축합니다.", tag: "기업" },
    en: { title: "AI Adoption Strategy for Teams", desc: "Build AI standardization and team-level prompt operations within your organization.", tag: "Enterprise" },
  },
];

// ─── i18n copy ────────────────────────────────────────────────────────────────
const UI = {
  ko: {
    badge: "AI 학습 코스",
    heroTitle: "원하는 코스를\n바로 시작하세요",
    heroSub: "프롬프트 기초부터 AI 보안까지 — 목적에 맞게 설계된 14개 코스가 준비되어 있습니다.\n학생이든, 취업준비생이든, 현직자든 지금 바로 탐색을 시작하세요. 회원가입이 필요 없습니다.",
    searchPlaceholder: "코스 검색...",
    filterBtn: "필터",
    clearFilters: "필터 초기화",
    filterTitle: "코스 필터",
    levelLabel: "난이도",
    levels: { all: "전체", beginner: "입문", intermediate: "중급", advanced: "심화" },
    roleLabel: "대상",
    roles: { all: "전체", student: "학생", "job-seeker": "취업준비생", employee: "직장인" },
    certLabel: "인증서",
    certOptions: { all: "전체", yes: "발급 있음", no: "발급 없음" },
    examLabel: "시험 여부",
    examOptions: { all: "전체", yes: "시험 있음", no: "시험 없음" },
    resultCount: (n: number) => `${n}개 코스`,
    weeksUnit: "주",
    modulesUnit: "개 모듈",
    cert: "인증서",
    exam: "시험",
    startBtn: "학습 시작",
    loginRequired: "로그인 후 이용 가능",
    loginPromptTitle: "로그인하고 학습을 시작하세요",
    loginPromptDesc: "무료로 가입하고 모든 코스에 접근하세요.",
    loginBtn: "로그인",
    signupBtn: "무료 가입",
    noResults: "조건에 맞는 코스가 없습니다.",
    noResultsSub: "필터를 변경해 보세요.",
    levelBeginner: "입문",
    levelIntermediate: "중급",
    levelAdvanced: "심화",
  },
  en: {
    badge: "AI Courses",
    heroTitle: "Find your course\nand start today",
    heroSub: "From prompt fundamentals to AI security — 14 courses built around real goals, not generic syllabi.\nWhether you're a student, job seeker, or professional, start exploring now.",
    searchPlaceholder: "Search courses...",
    filterBtn: "Filter",
    clearFilters: "Clear filters",
    filterTitle: "Filter courses",
    levelLabel: "Difficulty",
    levels: { all: "All", beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    roleLabel: "Who it's for",
    roles: { all: "All", student: "Students", "job-seeker": "Job seekers", employee: "Professionals" },
    certLabel: "Certificate",
    certOptions: { all: "All", yes: "Included", no: "Not included" },
    examLabel: "Exam required",
    examOptions: { all: "All", yes: "Yes", no: "No" },
    resultCount: (n: number) => `${n} course${n !== 1 ? "s" : ""}`,
    weeksUnit: "wk",
    modulesUnit: " modules",
    cert: "Certificate",
    exam: "Exam",
    startBtn: "Start learning",
    loginRequired: "Login required",
    loginPromptTitle: "Sign in to start learning",
    loginPromptDesc: "Create a free account and unlock all courses.",
    loginBtn: "Log in",
    signupBtn: "Sign up free",
    noResults: "No courses match your filters.",
    noResultsSub: "Try adjusting your filters.",
    levelBeginner: "Beginner",
    levelIntermediate: "Intermediate",
    levelAdvanced: "Advanced",
  },
};

// ─── Level badge style ────────────────────────────────────────────────────────
const levelStyle: Record<Level, string> = {
  beginner: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  intermediate: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  advanced: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
};

const levelDot: Record<Level, string> = {
  beginner: "bg-emerald-500",
  intermediate: "bg-blue-500",
  advanced: "bg-violet-500",
};

// ─── Course card ──────────────────────────────────────────────────────────────
interface CardProps {
  course: Course;
  t: typeof UI["ko"];
  locale: string;
  isLoggedIn: boolean;
  onStart: () => void;
}

const CourseCard = ({ course, t, locale, isLoggedIn, onStart }: CardProps) => {
  const copy = locale === "ko" ? course.ko : course.en;
  const levelLabel = t.levels[course.level];

  return (
    <div className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all duration-300">
      {/* Card top — icon area */}
      <div className="relative px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary shrink-0">
            {course.icon}
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {copy.tag && (
              <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {copy.tag}
              </span>
            )}
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${levelStyle[course.level]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${levelDot[course.level]}`} />
              {levelLabel}
            </span>
          </div>
        </div>

        <h3 className="mt-4 text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
          {copy.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {copy.desc}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-border" />

      {/* Metadata row */}
      <div className="px-6 py-3 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <span>{course.durationWeeks}{t.weeksUnit} · {course.modules}{t.modulesUnit}</span>
        {course.certificate && (
          <span className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            {t.cert}
          </span>
        )}
        {course.examRequired && (
          <span className="flex items-center gap-1">
            <ClipboardCheck className="h-3.5 w-3.5 text-blue-500" />
            {t.exam}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 mt-auto">
        {isLoggedIn ? (
          <Button size="sm" className="w-full" onClick={onStart}>
            {t.startBtn}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={onStart}
          >
            <Lock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            {t.startBtn}
          </Button>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const LearnPage = () => {
  const { isLoggedIn } = useAuth();
  const { locale } = useI18n();
  const t = UI[locale as "ko" | "en"] ?? UI.ko;
  const navigate = useNavigate();

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<"all" | Level>("all");
  const [filterRole, setFilterRole] = useState<Role>("all");
  const [filterCert, setFilterCert] = useState<"all" | "yes" | "no">("all");
  const [filterExam, setFilterExam] = useState<"all" | "yes" | "no">("all");

  // Login prompt modal
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const activeFilterCount = [
    filterLevel !== "all",
    filterRole !== "all",
    filterCert !== "all",
    filterExam !== "all",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilterLevel("all");
    setFilterRole("all");
    setFilterCert("all");
    setFilterExam("all");
  };

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const copy = locale === "ko" ? c.ko : c.en;
      if (search && !copy.title.toLowerCase().includes(search.toLowerCase()) &&
          !copy.desc.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterLevel !== "all" && c.level !== filterLevel) return false;
      if (filterRole !== "all" && !c.roles.includes(filterRole)) return false;
      if (filterCert === "yes" && !c.certificate) return false;
      if (filterCert === "no" && c.certificate) return false;
      if (filterExam === "yes" && !c.examRequired) return false;
      if (filterExam === "no" && c.examRequired) return false;
      return true;
    });
  }, [search, filterLevel, filterRole, filterCert, filterExam, locale]);

  const handleStart = () => {
    if (!isLoggedIn) setShowLoginPrompt(true);
    // if logged in, navigate to course (stub)
  };

  // Close filter on outside click
  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      const panel = document.getElementById("filter-panel");
      const btn = document.getElementById("filter-btn");
      if (panel && !panel.contains(e.target as Node) && btn && !btn.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [filterOpen]);

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="korean-bg border-b border-border">
        <div className="container-main py-16 sm:py-24">
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

      {/* ── Filter + Grid ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-main">

          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Filter button */}
            <div className="relative">
              <button
                id="filter-btn"
                onClick={() => setFilterOpen((v) => !v)}
                className={`flex items-center gap-2 h-9 px-4 text-sm rounded-lg border transition-colors
                  ${filterOpen || activeFilterCount > 0
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-foreground hover:bg-muted/50"
                  }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t.filterBtn}
                {activeFilterCount > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={`h-3.5 w-3.5 ml-0.5 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Filter panel */}
              {filterOpen && (
                <div
                  id="filter-panel"
                  className="absolute top-full left-0 mt-2 z-30 bg-card border border-border rounded-2xl shadow-lg p-5 w-72 space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{t.filterTitle}</p>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <X className="h-3 w-3" /> {t.clearFilters}
                      </button>
                    )}
                  </div>

                  {/* Level */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{t.levelLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "beginner", "intermediate", "advanced"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setFilterLevel(l)}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors
                            ${filterLevel === l
                              ? "border-primary bg-primary text-white"
                              : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                        >
                          {t.levels[l]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{t.roleLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "student", "job-seeker", "employee"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setFilterRole(r)}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors
                            ${filterRole === r
                              ? "border-primary bg-primary text-white"
                              : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                        >
                          {t.roles[r]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Certificate */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{t.certLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "yes", "no"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setFilterCert(c)}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors
                            ${filterCert === c
                              ? "border-primary bg-primary text-white"
                              : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                        >
                          {t.certOptions[c]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Exam */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{t.examLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "yes", "no"] as const).map((e) => (
                        <button
                          key={e}
                          onClick={() => setFilterExam(e)}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors
                            ${filterExam === e
                              ? "border-primary bg-primary text-white"
                              : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                        >
                          {t.examOptions[e]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Result count */}
            <span className="text-sm text-muted-foreground ml-auto">
              {t.resultCount(filtered.length)}
            </span>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((course) => (
                <CourseCard
                  key={course.key}
                  course={course}
                  t={t}
                  locale={locale}
                  isLoggedIn={isLoggedIn}
                  onStart={handleStart}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-foreground font-medium">{t.noResults}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.noResultsSub}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                {t.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Login prompt banner (logged out only) ─────────────────────────── */}
      {!isLoggedIn && (
        <section className="border-t border-border bg-muted/30">
          <div className="container-main py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.loginPromptTitle}</p>
                <p className="text-xs text-muted-foreground">{t.loginPromptDesc}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">{t.loginBtn}</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">{t.signupBtn}</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Login Modal (on "Start learning" click) ────────────────────────── */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">{t.loginPromptTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.loginPromptDesc}</p>
            <div className="mt-6 flex gap-3">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full" onClick={() => setShowLoginPrompt(false)}>
                  {t.loginBtn}
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full" onClick={() => setShowLoginPrompt(false)}>
                  {t.signupBtn}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default LearnPage;