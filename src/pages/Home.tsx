import { useEffect, useRef } from "react";
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
  },
  {
    title: "취업준비생",
    icon: Briefcase,
    desc: "자기소개서, 면접 준비, 리서치, 문서 작성을 위한 실전형 AI 활용",
    path: "/job-seeker",
  },
  {
    title: "직장인 / 기업 구성원",
    icon: Building2,
    desc: "회의 요약, 보고서 작성, 업무 자동화, 생산성 향상을 위한 AI 활용",
    path: "/employee",
  },
];

const Home = () => {
  const heroRef = useRef<HTMLHeadingElement>(null);

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

  // tab switching
  const handleVisibility = () => {
    if (document.visibilityState === "visible") triggerAnimation();
  };

  // scroll back to top
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

  return (
    <Layout>
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
                className="bg-card rounded-xl border p-6 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <group.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {group.desc}
                </p>
                <Link to={group.path} className="mt-5 inline-block">
                  <Button variant="outline" size="sm">자세히 보기</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
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
              <div className="mt-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                "이 자기소개서를 더 명확하고 전문적으로 다듬어줘."
              </div>
              <p className="mt-5 text-sm font-medium text-muted-foreground">AI 응답</p>
              <div className="mt-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                AI가 더 명확한 구조와 전문적인 어조로 답변을 제공하는 예시 영역
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            학습 현황과 분석을 한눈에
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            개인 학습 진행률과 핵심 지표를 직관적으로 확인할 수 있습니다.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border p-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Dashboard</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>학습 진행률</li>
                <li>완료한 모듈 수</li>
                <li>다음 추천 학습</li>
                <li>최근 활동</li>
              </ul>
              <Link to="/dashboard" className="mt-5 inline-block">
                <Button variant="outline" size="sm">대시보드 보기</Button>
              </Link>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>총 학습 시간</li>
                <li>완료율</li>
                <li>인기 모듈</li>
                <li>경로별 이용률</li>
              </ul>
              <Link to="/analytics" className="mt-5 inline-block">
                <Button variant="outline" size="sm">분석 보기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-main text-center max-w-2xl mx-auto">
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