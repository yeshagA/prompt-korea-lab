import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const analyticsData = [
  { label: "총 학습 시간", value: "12시간 40분", emoji: "⏱️", color: "text-blue-600", borderColor: "border-blue-200", bgColor: "bg-blue-50", bar: 63 },
  { label: "완료율", value: "74%", emoji: "✅", color: "text-green-600", borderColor: "border-green-200", bgColor: "bg-green-50", bar: 74 },
  { label: "인기 모듈", value: "실전 활용", emoji: "🔥", color: "text-orange-600", borderColor: "border-orange-200", bgColor: "bg-orange-50", bar: null },
  { label: "가장 많이 선택된 경로", value: "14일 플랜", emoji: "📅", color: "text-purple-600", borderColor: "border-purple-200", bgColor: "bg-purple-50", bar: null },
];

const trends = [
  { text: "이번 주 학습 시간 증가", emoji: "📈", color: "text-green-600" },
  { text: "기초 프롬프팅 완료율 상승", emoji: "⬆️", color: "text-blue-600" },
  { text: "실전 활용 모듈 방문 증가", emoji: "🔥", color: "text-orange-600" },
];

const insights = [
  { text: "14일 플랜 사용자가 가장 많습니다", emoji: "📊" },
  { text: "활용 예시 페이지 체류 시간이 높습니다", emoji: "⏰" },
  { text: "인증 확인 기능에 대한 관심이 증가하고 있습니다", emoji: "🏅" },
];

const AnalyticsPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [insightsVisible, setInsightsVisible] = useState(false);

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
    const stats = document.querySelector(".analytics-stats");
    const insightsEl = document.querySelector(".analytics-insights");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === stats) {
            if (entry.isIntersecting) setStatsVisible(true);
            else setStatsVisible(false);
          }
          if (entry.target === insightsEl) {
            if (entry.isIntersecting) setInsightsVisible(true);
            else setInsightsVisible(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (stats) observer.observe(stats);
    if (insightsEl) observer.observe(insightsEl);
    return () => observer.disconnect();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <img
          src="/analytics-hero.jpg"
          alt="분석"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            📊 학습 분석
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">분석</h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            학습 시간, 완료율, 인기 모듈 등 핵심 지표를 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-padding korean-bg analytics-stats">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.map((item, idx) => (
              <div
                key={item.label}
                className={`rounded-2xl border-2 ${item.borderColor} ${item.bgColor} p-6
                  transition-all duration-700 hover:shadow-md hover:-translate-y-1
                  ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h2 className={`text-2xl font-bold ${item.color}`}>{item.value}</h2>
                {item.bar !== null && (
                  <div className="mt-3 h-2 w-full rounded-full bg-white/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} bg-current transition-all duration-1000`}
                      style={{ width: statsVisible ? `${item.bar}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="section-padding bg-card analytics-insights">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className={`rounded-2xl border p-6 transition-all duration-700 ${insightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h3 className="text-lg font-bold text-foreground mb-4">📈 학습 추세</h3>
              <ul className="space-y-4">
                {trends.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <span className={`text-sm font-medium ${item.color}`}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-2xl border p-6 transition-all duration-700 delay-150 ${insightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h3 className="text-lg font-bold text-foreground mb-4">💡 추천 인사이트</h3>
              <ul className="space-y-4">
                {insights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                    <span className="text-xl shrink-0">{item.emoji}</span>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </Layout>
  );
};

export default AnalyticsPage;