import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "입문",
    desc: "프롬프팅이란 무엇인지 기본 개념을 알아봅니다.",
    level: "Lv.1",
    emoji: "🌱",
    badgeColor: "bg-green-100 text-green-700",
    borderColor: "border-green-400",
    barColor: "bg-green-500",
    difficulty: "입문",
    difficultyColor: "text-green-600",
    topics: ["프롬프트란?", "AI 기본 이해", "첫 번째 프롬프트"],
    image: "/lv1.jpg",
  },
  {
    title: "기초 프롬프팅",
    desc: "좋은 프롬프트를 만드는 기본 원리와 구조를 배웁니다.",
    level: "Lv.2",
    emoji: "📘",
    badgeColor: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-400",
    barColor: "bg-blue-500",
    difficulty: "초급",
    difficultyColor: "text-blue-600",
    topics: ["명확한 지시", "맥락 제공", "역할 설정"],
    image: "/lv2.jpg",
  },
  {
    title: "실전 활용",
    desc: "업무, 학습, 문서 작성 등 실무에 적용합니다.",
    level: "Lv.3",
    emoji: "⚡",
    badgeColor: "bg-yellow-100 text-yellow-700",
    borderColor: "border-yellow-400",
    barColor: "bg-yellow-500",
    difficulty: "중급",
    difficultyColor: "text-yellow-600",
    topics: ["업무 자동화", "문서 작성", "이메일 작성"],
    image: "/lv3.jpg",
  },
  {
    title: "고급 기법",
    desc: "체인 오브 소트, 멀티스텝 등 고급 기법을 익힙니다.",
    level: "Lv.4",
    emoji: "🔥",
    badgeColor: "bg-orange-100 text-orange-700",
    borderColor: "border-orange-400",
    barColor: "bg-orange-500",
    difficulty: "고급",
    difficultyColor: "text-orange-600",
    topics: ["Chain of Thought", "Few-shot", "멀티스텝"],
    image: "/lv4.jpg",
  },
  {
    title: "윤리와 검증",
    desc: "AI 활용의 윤리적 측면과 결과 검증 방법을 다룹니다.",
    level: "Lv.5",
    emoji: "🛡️",
    badgeColor: "bg-red-100 text-red-700",
    borderColor: "border-red-400",
    barColor: "bg-red-500",
    difficulty: "전문가",
    difficultyColor: "text-red-600",
    topics: ["AI 윤리", "결과 검증", "책임있는 AI"],
    image: "/lv5.jpg",
  },
];

const LearnPage = () => {
  const { isLoggedIn } = useAuth();
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".learn-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 120);
          } else {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[idx] = false;
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.querySelector(".steps-section");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStepsVisible(true);
          else setStepsVisible(false);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-80 flex items-end overflow-hidden">
        <img
          src="/learn-hero.jpg"
          alt="학습하기"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            📚 전체 커리큘럼
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            학습하기
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Learn Prompting의 핵심 개념과 실전형 프롬프팅 방법을 단계적으로 학습해보세요.
          </p>
        </div>
      </section>

      {/* ── Learning Journey Steps ── */}
      <section className="section-padding korean-bg steps-section">
        <div className="container-main">
          <div className={`transition-all duration-700 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">학습 여정</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              단계별로 차근차근 따라오세요
            </p>

            {/* steps row */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.map((c, idx) => (
                <div key={c.level} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 ${c.borderColor} bg-card`}>
                    <span className="text-lg">{c.emoji}</span>
                    <div>
                      <span className={`text-xs font-bold ${c.difficultyColor}`}>{c.level}</span>
                      <p className="text-sm font-semibold text-foreground leading-tight">{c.title}</p>
                    </div>
                  </div>
                  {idx < categories.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* login banner */}
          {!isLoggedIn && (
            <div className={`mt-8 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 flex items-center justify-between transition-all duration-700 delay-200 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground font-medium">
                  로그인하면 모든 레벨의 학습을 시작할 수 있습니다.
                </p>
              </div>
              <Link to="/login">
                <Button size="sm">로그인하기</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Level Cards with Photos ── */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-foreground mb-2">전체 레벨</h2>
          <p className="text-sm text-muted-foreground mb-8">
            각 레벨을 클릭하여 학습을 시작하세요
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, idx) => (
              <div
                key={c.title}
                data-idx={idx}
                className={`learn-card relative rounded-xl overflow-hidden h-72 group cursor-pointer
                  transition-all duration-700
                  ${visibleCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* background photo */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-500" />

                {/* lock overlay for logged out */}
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Lock className="h-7 w-7 text-white" />
                      <span className="text-xs text-white/80 font-medium">로그인 필요</span>
                    </div>
                  </div>
                )}

                {/* content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  {/* top row */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${c.badgeColor}`}>
                      {c.level}
                    </span>
                    <span className="text-2xl">{c.emoji}</span>
                  </div>

                  {/* bottom content */}
                  <div>
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-sm text-white/80 leading-relaxed">{c.desc}</p>

                    {/* topic pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* button */}
                    {isLoggedIn ? (
                      <Button
                        size="sm"
                        className="mt-4 bg-white text-gray-800 hover:bg-white/90 font-semibold"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        학습 시작
                      </Button>
                    ) : (
                      <Link to="/login">
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-4 text-black border-white bg-white hover:bg-white/80"
                        >
                          로그인 후 이용
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section-padding korean-bg">
        <div className="container-main text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground">
            어디서부터 시작해야 할지 모르겠나요?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            나에게 맞는 학습 경로를 먼저 확인해보세요.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link to="/student">
              <Button size="lg" variant="outline">🎓 학생</Button>
            </Link>
            <Link to="/job-seeker">
              <Button size="lg" variant="outline">💼 취업준비생</Button>
            </Link>
            <Link to="/employee">
              <Button size="lg" variant="outline">🏢 직장인</Button>
            </Link>
          </div>
          <div className="mt-4">
            <Link to="/roadmap">
              <Button size="lg">📅 로드맵 보기</Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default LearnPage;