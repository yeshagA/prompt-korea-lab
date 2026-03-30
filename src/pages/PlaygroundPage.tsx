import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const examplePrompts = [
  "이 자기소개서를 더 전문적으로 다듬어줘",
  "이 회의록을 요약해줘",
  "카카오톡 고객 응대 메시지 작성해줘",
  "이 문장을 더 간결하게 만들어줘",
  "블로그 제목 5개 추천해줘",
  "면접 예상 질문 3개 만들어줘",
];

const tips = [
  { emoji: "🎯", title: "명확하게 지시하기", desc: "모호한 표현보다 구체적인 요청이 더 좋은 결과를 만듭니다." },
  { emoji: "🎭", title: "역할 설정하기", desc: '"전문 카피라이터로서..." 처럼 역할을 부여하면 더 전문적인 응답을 얻을 수 있습니다.' },
  { emoji: "📋", title: "맥락 제공하기", desc: "배경 정보와 목적을 함께 제공하면 AI가 더 적합한 답변을 제공합니다." },
];

const PlaygroundPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);

  // redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const tipsEl = document.querySelector(".tips-section");
    if (!tipsEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTipsVisible(true);
          else setTipsVisible(false);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(tipsEl);
    return () => observer.disconnect();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <img
          src="/playground-hero.jpg"
          alt="플레이그라운드"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            🤖 AI 실습
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            프롬프트 플레이그라운드
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            프롬프트를 직접 입력하고 AI 응답을 실습해볼 수 있는 공간입니다.
          </p>
        </div>
      </section>

      {/* ── Main Playground ── */}
      <section className="section-padding korean-bg">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* input */}
            <div className="rounded-2xl border-2 border-primary/20 bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                  ✍️
                </div>
                <p className="text-base font-bold text-foreground">프롬프트 입력</p>
              </div>
              <textarea
                className="w-full min-h-[220px] rounded-xl border-2 bg-background p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="예: 이 자기소개서를 더 명확하고 전문적으로 다듬어줘."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="mt-4 flex gap-3">
                <Button className="flex-1">🚀 실행</Button>
                <Button variant="outline" onClick={() => setPrompt("")}>초기화</Button>
              </div>
            </div>

            {/* output */}
            <div className="rounded-2xl border-2 border-muted bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center text-lg">
                  🤖
                </div>
                <p className="text-base font-bold text-foreground">AI 응답 결과</p>
              </div>
              <div className="min-h-[220px] rounded-xl border-2 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                AI 응답 결과가 여기에 표시됩니다.
                <br /><br />
                예시:
                <br />
                <span className="text-foreground font-medium">
                  "지원 동기와 강점을 더 명확하게 드러내도록 문장을 구조화했습니다."
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1">📋 복사하기</Button>
                <Button variant="outline" size="sm" className="flex-1">💾 저장하기</Button>
              </div>
            </div>
          </div>

          {/* example prompts */}
          <div className="mt-8 rounded-2xl border bg-card p-6">
            <h3 className="text-base font-bold text-foreground mb-4">
              💡 예시 프롬프트 — 클릭하면 자동 입력됩니다
            </h3>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  className="text-xs px-3 py-2 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors border hover:border-primary/30 font-medium"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tips ── */}
      <section className="section-padding bg-card tips-section">
        <div className="container-main">
          <h2 className={`text-2xl font-bold text-foreground mb-2 transition-all duration-700 ${tipsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            🎓 좋은 프롬프트 작성 팁
          </h2>
          <p className={`text-sm text-muted-foreground mb-8 transition-all duration-700 delay-100 ${tipsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            이 팁들을 활용하면 더 좋은 AI 응답을 얻을 수 있습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, idx) => (
              <div
                key={tip.title}
                className={`rounded-2xl border p-6 hover:shadow-md hover:-translate-y-1
                  transition-all duration-700
                  ${tipsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-4xl mb-4">{tip.emoji}</div>
                <h3 className="text-base font-bold text-foreground">{tip.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default PlaygroundPage;