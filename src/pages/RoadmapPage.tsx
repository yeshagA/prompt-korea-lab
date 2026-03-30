import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info, Clock, Target, Trophy, CheckCircle } from "lucide-react";

const plans = [
  {
    days: "7일",
    target: "학생 / 초보자",
    goal: "핵심 개념 빠르게 익히기",
    difficulty: "입문",
    emoji: "🌱",
    color: "text-green-600",
    badgeColor: "bg-green-100 text-green-700",
    borderColor: "border-green-400",
    bgColor: "bg-green-50",
    barColor: "bg-green-500",
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
    image: "/plan7.jpg",
    modules: [
      { day: "Day 1–2", title: "Learn Prompting 소개", desc: "AI와 프롬프팅의 기본 개념 이해" },
      { day: "Day 3–4", title: "프롬프트 기본 원리", desc: "좋은 프롬프트를 만드는 핵심 원칙" },
      { day: "Day 5–6", title: "좋은 프롬프트 구조", desc: "역할, 맥락, 지시의 3요소" },
      { day: "Day 7", title: "간단한 실전 예시", desc: "학습한 내용으로 실제 프롬프트 작성" },
    ],
    result: "AI 프롬프팅의 기본기를 이해하고 바로 활용 가능",
  },
  {
    days: "14일",
    target: "취업준비생 / 실무 입문자",
    goal: "실무 중심 프롬프팅 익히기",
    difficulty: "중급",
    emoji: "⚡",
    color: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
    barColor: "bg-blue-500",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    image: "/plan14.jpg",
    modules: [
      { day: "Day 1–3", title: "문서 작성", desc: "보고서, 기획서, 제안서 AI 활용법" },
      { day: "Day 4–6", title: "이메일 작성", desc: "비즈니스 이메일 자동화 프롬프트" },
      { day: "Day 7–9", title: "조사 / 정리", desc: "리서치 및 정보 요약 프롬프트" },
      { day: "Day 10–12", title: "아이디어 발상", desc: "브레인스토밍과 창의적 프롬프팅" },
      { day: "Day 13–14", title: "업무 자동화 기초", desc: "반복 업무를 AI로 자동화하는 방법" },
    ],
    result: "실제 업무형 AI 활용 능력 확보",
  },
  {
    days: "30일",
    target: "심화 학습자 / 기업 팀",
    goal: "체계적이고 확장 가능한 프롬프팅 역량 구축",
    difficulty: "심화",
    emoji: "🏆",
    color: "text-purple-600",
    badgeColor: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-50",
    barColor: "bg-purple-500",
    buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
    image: "/plan30.jpg",
    modules: [
      { day: "Day 1–7", title: "고급 프롬프팅 기법", desc: "Chain of Thought, Few-shot 등 고급 기법" },
      { day: "Day 8–14", title: "멀티스텝 작업", desc: "복잡한 작업을 단계별로 분해하는 방법" },
      { day: "Day 15–21", title: "검증과 품질 향상", desc: "AI 결과물의 품질을 높이는 검증 기법" },
      { day: "Day 22–27", title: "사례 기반 연습", desc: "실제 업무 시나리오로 종합 실습" },
      { day: "Day 28–30", title: "팀 활용 전략", desc: "팀 단위 AI 도입 및 프롬프트 표준화" },
    ],
    result: "실무 및 팀 환경에서 응용 가능한 수준 도달",
  },
];

const comparisonRows = [
  { label: "기간", values: ["7일", "14일", "30일"] },
  { label: "난이도", values: ["입문", "중급", "심화"] },
  { label: "추천 대상", values: ["학생 / 초보자", "취업준비생", "기업 팀"] },
  { label: "모듈 수", values: ["4개", "5개", "5개"] },
  { label: "실습 포함", values: ["✅", "✅", "✅"] },
  { label: "인증서 발급", values: ["❌", "✅", "✅"] },
];

const RoadmapPage = () => {
  const [visiblePlans, setVisiblePlans] = useState<boolean[]>(
    new Array(plans.length).fill(false)
  );
  const [tableVisible, setTableVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".roadmap-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisiblePlans((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 150);
          } else {
            setVisiblePlans((prev) => {
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
    const table = document.querySelector(".comparison-table");
    if (!table) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTableVisible(true);
          else setTableVisible(false);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(table);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cta = document.querySelector(".cta-section");
    if (!cta) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCtaVisible(true);
          else setCtaVisible(false);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-80 flex items-end overflow-hidden">
        <img
          src="/roadmap-hero.jpg"
          alt="학습 로드맵"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            🗺️ 학습 플랜
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            학습 로드맵
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            자신의 시간과 목표에 맞는 학습 플랜을 선택하세요.
          </p>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="section-padding korean-bg">
        <div className="container-main">
          <div className={`comparison-table bg-card rounded-xl border overflow-hidden transition-all duration-700 ${tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="px-6 py-4 border-b">
              <h2 className="text-sm font-bold text-foreground">📊 플랜 한눈에 비교</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-3 text-muted-foreground font-medium w-32">항목</th>
                    {plans.map((p) => (
                      <th key={p.days} className={`px-6 py-3 text-center font-bold ${p.color}`}>
                        {p.emoji} {p.days} 플랜
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="px-6 py-3 text-muted-foreground font-medium">{row.label}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className="px-6 py-3 text-center text-foreground">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Plan Cards ── */}
      <section className="section-padding bg-card">
        <div className="container-main space-y-8">
          {plans.map((p, idx) => (
            <div
              key={p.days}
              data-idx={idx}
              className={`roadmap-card relative rounded-xl overflow-hidden border-2 ${p.borderColor}
                transition-all duration-700
                ${visiblePlans[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {/* background photo — top half */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.days}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                {/* header on photo */}
                <div className="absolute inset-0 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.emoji}</span>
                    <div>
                      <h2 className={`text-2xl font-bold text-white`}>{p.days} 플랜</h2>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                        {p.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{p.days}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>{p.target}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* content below photo */}
              <div className="p-6 sm:p-8 bg-card">
                <p className="text-sm font-medium text-foreground">
                  🎯 목표: {p.goal}
                </p>

                {/* timeline steps */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    학습 일정
                  </h4>
                  <div className="space-y-3">
                    {p.modules.map((m, midx) => (
                      <div key={m.title} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full ${p.badgeColor} flex items-center justify-center text-xs font-bold shrink-0`}>
                            {midx + 1}
                          </div>
                          {midx < p.modules.length - 1 && (
                            <div className={`w-0.5 h-6 mt-1 ${p.barColor} opacity-30`} />
                          )}
                        </div>
                        <div className="pb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold ${p.color}`}>{m.day}</span>
                            <span className="text-sm font-semibold text-foreground">{m.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* result box */}
                <div className={`mt-6 rounded-lg ${p.bgColor} px-4 py-3 flex items-start gap-2`}>
                  <Trophy className={`h-4 w-4 ${p.color} mt-0.5 shrink-0`} />
                  <p className="text-sm text-foreground">
                    <strong>수료 후:</strong> {p.result}
                  </p>
                </div>

                <Button className={`mt-5 ${p.buttonClass}`} size="sm">
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  {p.days} 플랜 시작
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Info Banner ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container-main">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground">
              아직 잘 모르겠다면 <strong>🌱 7일 플랜</strong>부터 시작해보세요. 언제든지 플랜을 변경할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding korean-bg cta-section">
        <div className={`container-main text-center max-w-xl mx-auto transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl font-bold text-foreground">
            나에게 맞는 경로가 궁금하다면?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            직접 학습 경로를 선택하고 오늘 바로 시작해보세요.
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
            <Link to="/learn">
              <Button size="lg">📚 학습 시작하기</Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default RoadmapPage;