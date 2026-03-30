import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, BarChart3, Target, Award, CheckCircle, Circle } from "lucide-react";

const DashboardPage = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "사용자";

  const displayRole =
    user?.role === "student" ? "학생 경로"
    : user?.role === "job-seeker" ? "취업준비생 경로"
    : user?.role === "employee" ? "직장인 경로"
    : "일반 경로";

  const roleEmoji =
    user?.role === "student" ? "🎓"
    : user?.role === "job-seeker" ? "💼"
    : user?.role === "employee" ? "🏢"
    : "👤";

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
    const stats = document.querySelector(".stats-section");
    const content = document.querySelector(".content-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === stats) {
            if (entry.isIntersecting) setStatsVisible(true);
            else setStatsVisible(false);
          }
          if (entry.target === content) {
            if (entry.isIntersecting) setContentVisible(true);
            else setContentVisible(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (stats) observer.observe(stats);
    if (content) observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "학습 진행률", value: "68%", bar: 68, color: "bg-blue-500", borderColor: "border-blue-200", textColor: "text-blue-600", emoji: "📈" },
    { label: "완료한 모듈", value: "5개", bar: 41, color: "bg-green-500", borderColor: "border-green-200", textColor: "text-green-600", emoji: "✅" },
    { label: "다음 추천 학습", value: "실전 활용", bar: null, color: "bg-yellow-500", borderColor: "border-yellow-200", textColor: "text-yellow-600", emoji: "🎯" },
    { label: "인증 상태", value: "진행 중", bar: null, color: "bg-purple-500", borderColor: "border-purple-200", textColor: "text-purple-600", emoji: "🏅" },
  ];

  const missions = [
    { text: "실전 활용 모듈 완료하기", done: true },
    { text: "프롬프트 1회 실습하기", done: true },
    { text: "한국형 활용 예시 1개 확인하기", done: false },
  ];

  const quickLinks = [
    { label: "📚 학습 계속하기", path: "/learn", color: "border-blue-200 hover:bg-blue-50" },
    { label: "📊 분석 보기", path: "/analytics", color: "border-green-200 hover:bg-green-50" },
    { label: "🖼️ 프롬프트 갤러리", path: "/examples", color: "border-yellow-200 hover:bg-yellow-50" },
    { label: "🤖 플레이그라운드", path: "/playground", color: "border-purple-200 hover:bg-purple-50" },
  ];

  if (!isLoggedIn) return null;

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <img
          src="/dashboard-hero.jpg"
          alt="마이페이지"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            {roleEmoji} {displayRole}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            다시 오신 것을 환영합니다, {displayName} 👋
          </h1>
          <p className="mt-2 text-white/80 text-sm">
            오늘의 학습 목표를 확인하고 계속 진행해보세요.
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link to="/learn">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                학습 계속하기
              </Button>
            </Link>
            <Link to="/playground">
              <Button className="bg-white/15 text-white border border-white hover:bg-white/30 backdrop-blur-sm">
                플레이그라운드 열기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-padding korean-bg stats-section">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`bg-card rounded-2xl border-2 ${stat.borderColor} p-6
                  transition-all duration-700 hover:shadow-md hover:-translate-y-1
                  ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <span className="text-2xl">{stat.emoji}</span>
                </div>
                <h2 className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</h2>
                {stat.bar !== null && (
                  <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stat.color} transition-all duration-1000`}
                      style={{ width: statsVisible ? `${stat.bar}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-card content-section">
        <div className="container-main">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">

              {/* today's prompt */}
              <div className={`rounded-2xl border-2 border-primary/20 bg-primary/5 p-6
                transition-all duration-700
                ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">오늘의 프롬프트</h3>
                </div>
                <div className="bg-card rounded-xl p-4 border text-sm text-muted-foreground italic">
                  "이 자기소개 문장을 더 자신감 있고 전문적으로 면접용으로 다듬어줘."
                </div>
                <Link to="/playground" className="mt-4 inline-block">
                  <Button size="sm">
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    실행하기
                  </Button>
                </Link>
              </div>

              {/* weekly mission */}
              <div className={`rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-6
                transition-all duration-700 delay-100
                ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-bold text-foreground">주간 미션</h3>
                  <span className="ml-auto text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    2/3 완료
                  </span>
                </div>
                <ul className="space-y-3">
                  {missions.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      {m.done
                        ? <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                        : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      }
                      <span className={m.done ? "line-through text-muted-foreground" : "text-foreground font-medium"}>
                        {m.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 h-2 rounded-full bg-yellow-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-500 transition-all duration-1000"
                    style={{ width: contentVisible ? "66%" : "0%" }}
                  />
                </div>
              </div>

              {/* recent activity */}
              <div className={`rounded-2xl border p-6 bg-card
                transition-all duration-700 delay-200
                ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">최근 활동</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    { text: "입문 모듈 완료", time: "2일 전", color: "bg-green-500" },
                    { text: "기초 프롬프팅 진행 중", time: "오늘", color: "bg-blue-500" },
                    { text: "이번 주 총 학습 시간: 4시간 20분", time: "이번 주", color: "bg-purple-500" },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                      <span className="text-foreground flex-1">{item.text}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* right column */}
            <div className="space-y-6">

              {/* quick links */}
              <div className={`rounded-2xl border p-6 bg-card
                transition-all duration-700 delay-100
                ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <h3 className="text-lg font-bold text-foreground mb-4">빠른 이동</h3>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="block">
                      <div className={`border-2 ${link.color} rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm`}>
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* achievement */}
              <div className={`rounded-2xl border-2 border-purple-200 bg-purple-50 p-6
                transition-all duration-700 delay-200
                ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-foreground">학습 성과</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  현재 <strong className="text-purple-600">5개</strong>의 모듈을 완료했으며 인증 취득 경로를 잘 따라가고 있습니다.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {["🌱", "📘", "⚡"].map((emoji, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-sm">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">완료한 레벨</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default DashboardPage;