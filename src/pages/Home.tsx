import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Briefcase,
  Building2,
  LayoutDashboard,
  BarChart3,
  Globe,
  Mail,
  MapPin,
} from "lucide-react";

const heroImages = [
  { src: "/hero1.jpg", label: "벚꽃 거리" },
  { src: "/hero2.jpg", label: "북촌 한옥마을" },
  { src: "/hero3.jpg", label: "한강의 밤" },
  { src: "/hero4.jpg", label: "경복궁" },
];

const userGroups = [
  {
    title: "학생",
    icon: GraduationCap,
    desc: "과제, 발표, 학습 정리, 시험 대비를 위한 AI 활용 학습",
    path: "/student",
    image: "/student.jpg",
  },
  {
    title: "취업준비생",
    icon: Briefcase,
    desc: "자기소개서, 면접 준비, 리서치, 문서 작성을 위한 실전형 AI 활용",
    path: "/job-seeker",
    image: "/jobseeker.jpg",
  },
  {
    title: "직장인 / 기업 구성원",
    icon: Building2,
    desc: "회의 요약, 보고서 작성, 업무 자동화, 생산성 향상을 위한 AI 활용",
    path: "/employee",
    image: "/worker.jpg",
  },
];

const dashboardStats = [
  { label: "학습 진행률", value: 72, unit: "%", color: "bg-primary" },
  { label: "완료한 모듈 수", value: 8, total: 12, unit: "개", color: "bg-accent" },
  { label: "완료율", value: 65, unit: "%", color: "bg-primary" },
  { label: "총 학습 시간", value: 24, unit: "시간", color: "bg-accent" },
];

const analyticsStats = [
  { label: "인기 모듈", value: "프롬프트 기초", static: true },
  { label: "경로별 이용률", value: 89, unit: "%", color: "bg-primary" },
  { label: "이번 주 학습", value: 5, unit: "일", color: "bg-accent" },
  { label: "평균 점수", value: 91, unit: "점", color: "bg-primary" },
];

const courseCards = [
  {
    emoji: "💬",
    tag: "고객응대",
    tagColor: "bg-blue-100 text-blue-700",
    title: "카카오형 고객응대",
    desc: "카카오톡 채널 고객 응대 시 활용할 수 있는 프롬프트 예시",
    backTitle: "배울 수 있는 것",
    backPoints: ["톤앤매너 설정법", "자동 응답 프롬프트", "불만 고객 대응"],
    backColor: "bg-blue-600",
  },
  {
    emoji: "📝",
    tag: "콘텐츠",
    tagColor: "bg-green-100 text-green-700",
    title: "네이버형 콘텐츠 정리",
    desc: "블로그, 스마트스토어 등 네이버 생태계 콘텐츠 작성 활용",
    backTitle: "배울 수 있는 것",
    backPoints: ["SEO 최적화 글쓰기", "상품 설명 작성", "블로그 구조 설계"],
    backColor: "bg-green-600",
  },
  {
    emoji: "🛍️",
    tag: "이커머스",
    tagColor: "bg-orange-100 text-orange-700",
    title: "쿠팡형 상품 설명 작성",
    desc: "이커머스 상품 설명, 리뷰 분석 등 판매 업무 활용",
    backTitle: "배울 수 있는 것",
    backPoints: ["상품 상세페이지 작성", "리뷰 분석 요약", "키워드 최적화"],
    backColor: "bg-orange-500",
  },
  {
    emoji: "🏢",
    tag: "오피스",
    tagColor: "bg-purple-100 text-purple-700",
    title: "삼성형 회의 요약 및 보고서",
    desc: "기업 환경에서의 회의록 정리 및 보고서 작성 활용",
    backTitle: "배울 수 있는 것",
    backPoints: ["회의록 자동 정리", "보고서 구조화", "요약 프롬프트 설계"],
    backColor: "bg-purple-600",
  },
  {
    emoji: "🎓",
    tag: "학습",
    tagColor: "bg-sky-100 text-sky-700",
    title: "대학 과제 / 발표 준비",
    desc: "과제 작성, 발표 자료 구성, 참고자료 정리에 활용",
    backTitle: "배울 수 있는 것",
    backPoints: ["레포트 구조 잡기", "발표 스크립트 작성", "참고문헌 정리"],
    backColor: "bg-sky-600",
  },
  {
    emoji: "💼",
    tag: "취업",
    tagColor: "bg-rose-100 text-rose-700",
    title: "취업 준비용 자기소개서",
    desc: "자기소개서 작성, 면접 질문 정리 등 취업 준비 활용",
    backTitle: "배울 수 있는 것",
    backPoints: ["자소서 첨삭 프롬프트", "면접 예상 질문 생성", "직무 분석 요청법"],
    backColor: "bg-rose-600",
  },
];

const whyPoints = [
  {
    emoji: "🌐",
    title: "번역이 아닌 현지화",
    desc: "기존 AI 학습 플랫폼은 영어 콘텐츠를 번역만 합니다. 저희는 한국 문화와 업무 환경에 맞게 처음부터 설계했습니다.",
  },
  {
    emoji: "🏅",
    title: "신뢰할 수 있는 인증",
    desc: "기업과 대학이 실제로 검증할 수 있는 인증 시스템을 구축하여 수료증의 신뢰도를 높였습니다.",
  },
  {
    emoji: "🤖",
    title: "AI와 함께 실습",
    desc: "이론만 배우는 것이 아니라 직접 프롬프트를 작성하고 AI 응답을 비교하며 실전 감각을 키울 수 있습니다.",
  },
];

const Home = () => {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const playgroundRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const [currentHero, setCurrentHero] = useState(0);
  const [fadeHero, setFadeHero] = useState(true);

  const [playgroundVisible, setPlaygroundVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [showResponseCursor, setShowResponseCursor] = useState(false);

  const [beeHappy, setBeeHappy] = useState(false);
  const [beeBounce, setBeeBounce] = useState(false);

  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [barWidths, setBarWidths] = useState<number[]>([0, 0, 0, 0]);

  // 1. hero slideshow
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

  // 2. hero title animation
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
    const handleVisibility = () => {
      if (document.visibilityState === "visible") triggerAnimation();
    };
    const handleScroll = () => {
      if (window.scrollY < 100) triggerAnimation();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. persona cards
  useEffect(() => {
    const cards = document.querySelectorAll(".persona-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add("card-visible");
            }, i * 150);
          } else {
            (entry.target as HTMLElement).classList.remove("card-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // 4. playground typing
  useEffect(() => {
    const prompt = "이 자기소개서를 더 명확하고 전문적으로 다듬어줘.";
    const response = "네! 더 명확한 구조와 전문적인 어조로 다듬어 드릴게요. 첫 문장부터 핵심 역량을 강조하고, 구체적인 경험을 중심으로 재구성했습니다.";
    const section = playgroundRef.current;
    if (!section) return;

    let typingTimeout: ReturnType<typeof setTimeout>;
    let cursorInterval: ReturnType<typeof setInterval>;

    const startAnimation = () => {
      setTypedText("");
      setShowCursor(false);
      setShowResponse(false);
      setResponseText("");
      setShowResponseCursor(false);
      setPlaygroundVisible(true);
      setBeeHappy(false);
      setBeeBounce(true);
      setTimeout(() => setBeeBounce(false), 600);

      setShowCursor(true);
      let cursorOn = true;
      cursorInterval = setInterval(() => {
        cursorOn = !cursorOn;
        setShowCursor(cursorOn);
      }, 500);

      let i = 0;
      const typeChar = () => {
        if (i < prompt.length) {
          const current = i;
          setTypedText(prompt.slice(0, current + 1));
          i++;
          typingTimeout = setTimeout(typeChar, 50);
        } else {
          clearInterval(cursorInterval);
          setShowCursor(false);
          setTimeout(() => {
            setShowResponse(true);
            setBeeHappy(true);
            let j = 0;
            setShowResponseCursor(true);
            let resCursorOn = true;
            const resCursorInterval = setInterval(() => {
              resCursorOn = !resCursorOn;
              setShowResponseCursor(resCursorOn);
            }, 500);
            const typeResponse = () => {
              if (j < response.length) {
                const current = j;
                setResponseText(response.slice(0, current + 1));
                j++;
                typingTimeout = setTimeout(typeResponse, 30);
              } else {
                clearInterval(resCursorInterval);
                setShowResponseCursor(false);
              }
            };
            typeResponse();
          }, 800);
        }
      };
      typeChar();
    };

    const resetAnimation = () => {
      clearTimeout(typingTimeout);
      clearInterval(cursorInterval);
      setTypedText("");
      setShowCursor(false);
      setShowResponse(false);
      setResponseText("");
      setShowResponseCursor(false);
      setPlaygroundVisible(false);
      setBeeHappy(false);
      setBeeBounce(false);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAnimation();
          else resetAnimation();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      clearTimeout(typingTimeout);
      clearInterval(cursorInterval);
    };
  }, []);

  // 5. dashboard
  useEffect(() => {
    const section = dashboardRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDashboardVisible(true);
            setTimeout(() => setBarWidths([72, 66, 65, 100]), 200);
            const targets = [72, 8, 65, 24];
            targets.forEach((target, idx) => {
              let current = 0;
              const step = Math.ceil(target / 40);
              const interval = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(interval); }
                setCounts((prev) => {
                  const next = [...prev];
                  next[idx] = current;
                  return next;
                });
              }, 30);
            });
          } else {
            setDashboardVisible(false);
            setBarWidths([0, 0, 0, 0]);
            setCounts([0, 0, 0, 0]);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 6. about section fade in
  useEffect(() => {
    const section = aboutRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setAboutVisible(true);
          else setAboutVisible(false);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>

      {/* ── Hero Section ── */}
      <section className="relative h-screen max-h-[680px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: fadeHero ? 1 : 0 }}
        >
          <img
            src={heroImages[currentHero].src}
            alt={heroImages[currentHero].label}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFadeHero(false);
                setTimeout(() => { setCurrentHero(idx); setFadeHero(true); }, 300);
              }}
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
          <h1
            ref={heroRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
          >
            <span data-word className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0s" }}>
              배우고,
            </span>{" "}
            <span data-word className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0.3s" }}>
              실습하고,
            </span>
            <br />
            <span data-word className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0.6s" }}>
              인증받는
            </span>{" "}
            <span data-word className="inline-block text-yellow-300 animate-[fadeSlideUp_1s_ease_forwards] opacity-0" style={{ animationDelay: "0.9s" }}>
              생성형 AI 학습
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            학생, 취업준비생, 직장인을 위한 한국형 AI 학습, 프롬프트 실습, 인증 경험을 제공합니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/learn">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                무료로 시작하기
              </Button>
            </Link>
            <Link to="/employee">
              <Button size="lg" className="bg-white/15 text-white border border-white hover:bg-white/30 font-semibold backdrop-blur-sm">
                기업용 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="section-padding korean-bg">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            누구를 위한 플랫폼인가요?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            사용자 목적에 맞는 AI 학습 경로를 선택할 수 있습니다.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {userGroups.map((group) => (
              <div key={group.title} className="persona-card relative rounded-xl border overflow-hidden h-72 group">
                <img src={group.image} alt={group.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                  <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <group.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">{group.desc}</p>
                  <Link to={group.path} className="mt-5 inline-block">
                    <Button variant="outline" size="sm" className="text-black border-white bg-white hover:bg-white/80">
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prompt Playground with Bee ── */}
      <section className="section-padding bg-card" ref={playgroundRef}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`relative transition-all duration-300 cursor-pointer select-none ${beeBounce ? "animate-bounce" : ""} ${beeHappy ? "scale-125" : "scale-100"}`}
                  onMouseEnter={() => setBeeBounce(true)}
                  onMouseLeave={() => setBeeBounce(false)}
                >
                  <img
                    src="/bee.png"
                    alt="bee mascot"
                    className={`w-14 h-14 drop-shadow-lg transition-all duration-500 ${beeHappy ? "rotate-12" : ""}`}
                    style={{ animation: beeHappy ? "none" : "beeFloat 2s ease-in-out infinite" }}
                  />
                  {beeHappy && <span className="absolute -top-2 -right-2 text-lg animate-ping">✨</span>}
                </div>
                <div className="text-sm text-muted-foreground">
                  {beeHappy ? "정말 잘 했어요! 🎉" : beeBounce ? "안녕하세요! 🐝" : "프롬프트를 입력해보세요!"}
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">프롬프트 Playground</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                직접 프롬프트를 입력하고, 응답을 비교하며 실습할 수 있는 실전형 학습 공간입니다.
              </p>
              <Link to="/playground" className="mt-6 inline-block">
                <Button>실습하러 가기</Button>
              </Link>
            </div>

            <div className="bg-background rounded-xl border p-6">
              <p className="text-sm font-medium text-muted-foreground">프롬프트 입력</p>
              <div className="mt-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground min-h-[56px] flex items-center">
                <span>{typedText}</span>
                <span className={`ml-0.5 inline-block w-0.5 h-4 bg-primary ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`} />
              </div>
              <p className="mt-5 text-sm font-medium text-muted-foreground">AI 응답</p>
              <div className={`mt-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground transition-all duration-700 ${showResponse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
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

      {/* ── Dashboard & Analytics ── */}
      <section className="section-padding korean-bg" ref={dashboardRef}>
        <div className="container-main">
          <h2 className={`text-2xl sm:text-3xl font-bold text-foreground transition-all duration-700 ${dashboardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            학습 현황과 분석을 한눈에
          </h2>
          <p className={`mt-2 text-sm text-muted-foreground transition-all duration-700 delay-100 ${dashboardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            개인 학습 진행률과 핵심 지표를 직관적으로 확인할 수 있습니다.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`bg-card rounded-xl border p-6 transition-all duration-700 delay-200 ${dashboardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Dashboard</h3>
              <div className="mt-4 space-y-4">
                {dashboardStats.slice(0, 2).map((stat, idx) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold text-foreground">
                        {counts[idx]}{stat.unit}{stat.total ? ` / ${stat.total}개` : ""}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`} style={{ width: `${barWidths[idx]}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-muted-foreground">다음 추천 학습</span>
                  <span className="font-semibold text-primary">프롬프트 고급편</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">최근 활동</span>
                  <span className="font-semibold text-foreground">오늘 32분</span>
                </div>
              </div>
              <Link to="/dashboard" className="mt-5 inline-block">
                <Button variant="outline" size="sm">대시보드 보기</Button>
              </Link>
            </div>

            <div className={`bg-card rounded-xl border p-6 transition-all duration-700 delay-300 ${dashboardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
              <div className="mt-4 space-y-4">
                {analyticsStats.map((stat, idx) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold text-foreground">
                        {stat.static ? stat.value : `${counts[idx + 2]}${stat.unit}`}
                      </span>
                    </div>
                    {!stat.static && (
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`} style={{ width: `${barWidths[idx + 2]}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link to="/analytics" className="mt-5 inline-block">
                <Button variant="outline" size="sm">분석 보기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Course Flip Cards ── */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            어떤 걸 배울 수 있나요?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            카드를 hover하면 상세 내용을 확인할 수 있습니다 ✨
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCards.map((course) => (
              <div key={course.title} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-card border flex flex-col justify-between">
                    <div>
                      <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${course.tagColor}`}>
                        {course.tag}
                      </span>
                      <div className="text-4xl mt-3">{course.emoji}</div>
                      <h3 className="mt-3 text-base font-bold text-foreground">{course.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{course.desc}</p>
                    </div>
                  </div>
                  <div className={`flip-card-back ${course.backColor} flex flex-col justify-between`}>
                    <div>
                      <h3 className="text-base font-bold text-white">{course.backTitle}</h3>
                      <ul className="mt-4 space-y-2">
                        {course.backPoints.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-white/90">
                            <span className="mt-0.5">✅</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/learn" className="mt-4 inline-block">
                      <Button size="sm" className="bg-white text-gray-800 hover:bg-white/90 font-semibold">
                        학습 시작하기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="section-padding korean-bg" ref={aboutRef}>
        <div className="container-main">

          {/* Part 1 — Company (Bee Intelligence Global) */}
          <div className={`transition-all duration-700 ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)" }}>
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    B
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Bee Intelligence Global</h3>
                    <p className="text-sm text-white/80">Empowering Human Growth Through AI</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
                  We develop ethical AI solutions that augment human capabilities, focusing on mental wellness and productivity enhancement through innovative technology.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3">
                    <Mail className="h-4 w-4 text-white/80 shrink-0" />
                    <span className="text-sm text-white">support@beeintel.ai</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3">
                    <MapPin className="h-4 w-4 text-white/80 shrink-0" />
                    <span className="text-sm text-white">76 Gyeonginnam-gil, Incheon, Korea</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
                    <Globe className="h-4 w-4 text-white/80" />
                    <span className="text-sm text-white">Enlighten Qalb</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
                    <Globe className="h-4 w-4 text-white/80" />
                    <span className="text-sm text-white">bRide Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Part 3 — Why this platform */}
          <div className={`mt-16 transition-all duration-700 delay-200 ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              왜 이 플랫폼인가요?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              기존 AI 학습 플랫폼의 한계를 넘어, 진짜 한국형 경험을 제공합니다.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyPoints.map((point, idx) => (
                <div
                  key={point.title}
                  className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow duration-300"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{point.emoji}</div>
                  <h3 className="text-base font-bold text-foreground">{point.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </Layout>
  );
};

export default Home;