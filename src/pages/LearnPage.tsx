import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lock, BookOpen, CheckCircle } from "lucide-react";

const categories = [
  {
    title: "입문",
    desc: "프롬프팅이란 무엇인지 기본 개념을 알아봅니다.",
    level: "Lv.1",
    emoji: "🌱",
    badgeColor: "bg-green-100 text-green-700",
    borderColor: "border-green-200",
    barColor: "bg-green-500",
    difficulty: "입문",
    difficultyColor: "text-green-600",
    topics: ["프롬프트란?", "AI 기본 이해", "첫 번째 프롬프트"],
  },
  {
    title: "기초 프롬프팅",
    desc: "좋은 프롬프트를 만드는 기본 원리와 구조를 배웁니다.",
    level: "Lv.2",
    emoji: "📘",
    badgeColor: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
    barColor: "bg-blue-500",
    difficulty: "초급",
    difficultyColor: "text-blue-600",
    topics: ["명확한 지시", "맥락 제공", "역할 설정"],
  },
  {
    title: "실전 활용",
    desc: "업무, 학습, 문서 작성 등 실무에 적용합니다.",
    level: "Lv.3",
    emoji: "⚡",
    badgeColor: "bg-yellow-100 text-yellow-700",
    borderColor: "border-yellow-200",
    barColor: "bg-yellow-500",
    difficulty: "중급",
    difficultyColor: "text-yellow-600",
    topics: ["업무 자동화", "문서 작성", "이메일 작성"],
  },
  {
    title: "고급 기법",
    desc: "체인 오브 소트, 멀티스텝 등 고급 기법을 익힙니다.",
    level: "Lv.4",
    emoji: "🔥",
    badgeColor: "bg-orange-100 text-orange-700",
    borderColor: "border-orange-200",
    barColor: "bg-orange-500",
    difficulty: "고급",
    difficultyColor: "text-orange-600",
    topics: ["Chain of Thought", "Few-shot", "멀티스텝"],
  },
  {
    title: "윤리와 검증",
    desc: "AI 활용의 윤리적 측면과 결과 검증 방법을 다룹니다.",
    level: "Lv.5",
    emoji: "🛡️",
    badgeColor: "bg-red-100 text-red-700",
    borderColor: "border-red-200",
    barColor: "bg-red-500",
    difficulty: "전문가",
    difficultyColor: "text-red-600",
    topics: ["AI 윤리", "결과 검증", "책임있는 AI"],
  },
];

const LearnPage = () => {
  const { isLoggedIn } = useAuth();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );

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
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <section className="section-padding korean-bg">
        <div className="container-main">

          {/* header */}
          <h1 className="text-3xl font-bold text-foreground">학습하기</h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            Learn Prompting의 핵심 개념과 실전형 프롬프팅 방법을 단계적으로 학습해보세요.
          </p>

          {/* progress bar */}
          <div className="mt-8 bg-card rounded-xl border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {isLoggedIn ? "나의 학습 진행률" : "전체 커리큘럼"}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {isLoggedIn ? "0 / 5 레벨 완료" : "5개 레벨"}
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: isLoggedIn ? "0%" : "100%", opacity: isLoggedIn ? 1 : 0.15 }}
              />
            </div>
            <div className="mt-3 flex justify-between">
              {categories.map((c, idx) => (
                <div key={c.level} className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${isLoggedIn ? "bg-muted text-muted-foreground" : `${c.badgeColor}`}`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:block">{c.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* login banner */}
          {!isLoggedIn && (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 flex items-center justify-between">
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

          {/* cards */}
          <div
            ref={cardsRef}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((c, idx) => (
              <div
                key={c.title}
                data-idx={idx}
                className={`learn-card relative bg-card rounded-xl border-2 ${c.borderColor} p-6 flex flex-col justify-between
                  transition-all duration-700 hover:shadow-lg hover:-translate-y-1
                  ${visibleCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  ${!isLoggedIn ? "overflow-hidden" : ""}`}
              >
                {/* lock overlay for logged out */}
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-card/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                      <Lock className="h-6 w-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">로그인 필요</span>
                    </div>
                  </div>
                )}

                <div>
                  {/* level badge + difficulty */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${c.badgeColor}`}>
                      {c.level}
                    </span>
                    <span className={`text-xs font-medium ${c.difficultyColor}`}>
                      {c.difficulty}
                    </span>
                  </div>

                  {/* emoji + title */}
                  <div className="text-3xl mb-2">{c.emoji}</div>
                  <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>

                  {/* topic pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* color bar at bottom */}
                  <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.barColor} transition-all duration-1000`}
                      style={{ width: visibleCards[idx] ? "100%" : "0%" }}
                    />
                  </div>
                </div>

                {isLoggedIn ? (
                  <Button size="sm" className="mt-5 self-start">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    학습 시작
                  </Button>
                ) : (
                  <Link to="/login" className="mt-5 self-start">
                    <Button size="sm" variant="outline">
                      로그인 후 이용
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LearnPage;