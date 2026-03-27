import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Briefcase,
  Building2,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

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

const Home = () => {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const playgroundRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLElement>(null);
  const certRef = useRef<HTMLElement>(null);

  const [playgroundVisible, setPlaygroundVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [showResponseCursor, setShowResponseCursor] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [certVisible, setCertVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [barWidths, setBarWidths] = useState<number[]>([0, 0, 0, 0]);

  // 1. hero title animation
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

  // 2. persona cards animation — repeats every time
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
            // reset when out of view so it replays on scroll back
            (entry.target as HTMLElement).classList.remove("card-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // 3. playground typing animation — repeats every time
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
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            // reset when scrolled away so it replays
            resetAnimation();
          }
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

  // 4. dashboard counters + bars — repeats every time
  useEffect(() => {
    const section = dashboardRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDashboardVisible(true);
            setTimeout(() => {
              setBarWidths([72, 66, 65, 100]);
            }, 200);

            const targets = [72, 8, 65, 24];
            targets.forEach((target, idx) => {
              let current = 0;
              const step = Math.ceil(target / 40);
              const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(interval);
                }
                setCounts((prev) => {
                  const next = [...prev];
                  next[idx] = current;
                  return next;
                });
              }, 30);
            });
          } else {
            // reset when scrolled away so it replays
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

  // 5. certificate fade-in — repeats every time
  useEffect(() => {
    const section = certRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCertVisible(true);
          } else {
            // reset when scrolled away so it replays
            setCertVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>

      {/* ── Hero Section ── */}
      <section className="section-padding bg-card">
        <div className="container-main text-center max-w-4xl mx-auto">
          <h1
            ref={heroRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
          >
            <span
              data-word
              className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0"
              style={{ animationDelay: "0s" }}
            >
              배우고,
            </span>{" "}
            <span
              data-word
              className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              실습하고,
            </span>
            <br />
            <span
              data-word
              className="inline-block animate-[fadeSlideUp_1s_ease_forwards] opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              인증받는
            </span>{" "}
            <span
              data-word
              className="inline-block text-primary animate-[fadeSlideUp_1s_ease_forwards] opacity-0"
              style={{ animationDelay: "0.9s" }}
            >
              생성형 AI 학습
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            학생, 취업준비생, 직장인을 위한 한국형 AI 학습, 프롬프트 실습, 인증 경험을 제공합니다.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/learn">
              <Button size="lg">무료로 시작하기</Button>
            </Link>
            <Link to="/employee">
              <Button variant="outline" size="lg">기업용 보기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            누구를 위한 플랫폼인가요?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            사용자 목적에 맞는 AI 학습 경로를 선택할 수 있습니다.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {userGroups.map((group) => (
              <div
                key={group.title}
                className="persona-card relative rounded-xl border overflow-hidden h-72 group"
              >
                <img
                  src={group.image}
                  alt={group.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                  <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <group.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    {group.desc}
                  </p>
                  <Link to={group.path} className="mt-5 inline-block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-black border-white bg-white hover:bg-white/80"
                    >
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prompt Playground ── */}
      <section className="section-padding bg-card" ref={playgroundRef}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className={`h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-700 ${playgroundVisible ? "scale-110" : "scale-100"}`}>
                <Sparkles className={`h-6 w-6 text-primary transition-all duration-700 ${playgroundVisible ? "animate-spin" : ""}`} style={{ animationIterationCount: 1, animationDuration: "1s" }} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                프롬프트 Playground
              </h2>
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
      <section className="section-padding" ref={dashboardRef}>
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
                        {counts[idx]}{stat.unit}
                        {stat.total ? ` / ${stat.total}개` : ""}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${barWidths[idx]}%` }}
                      />
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
                        <div
                          className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${barWidths[idx + 2]}%` }}
                        />
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

      {/* ── Certificate Verify ── */}
      <section className="section-padding bg-card" ref={certRef}>
        <div className={`container-main text-center max-w-2xl mx-auto transition-all duration-700 ${certVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            인증서를 공개적으로 검증할 수 있습니다
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            기업, 대학, 파트너는 인증서 ID를 통해 수료 여부를 확인할 수 있습니다.
          </p>
          <div className="mt-8 flex gap-2 max-w-sm mx-auto">
            <input
              type="text"
              placeholder="예) LPK-2026-001"
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              readOnly
            />
            <Button size="sm">인증 확인</Button>
          </div>
          <Link to="/verify" className="mt-6 inline-block">
            <Button variant="outline" size="sm">인증 확인 페이지로 이동</Button>
          </Link>
        </div>
      </section>

    </Layout>
  );
};

export default Home;