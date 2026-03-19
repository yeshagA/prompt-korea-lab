import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, BookOpen, ArrowRight, GraduationCap, Briefcase, Users } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const trustBadges = [
  { icon: BookOpen, label: "무료 학습" },
  { icon: CheckCircle, label: "오픈소스 기반" },
  { icon: Shield, label: "인증 검증 지원" },
];

const personas = [
  { title: "학생", icon: GraduationCap, desc: "기초부터 차근차근 배우고 과제, 보고서, 학습에 바로 활용할 수 있습니다.", cta: "학생 경로 보기", path: "/paths" },
  { title: "취업준비생", icon: Briefcase, desc: "실무형 프롬프팅을 익혀 자기소개서, 리서치, 업무 문서 준비에 활용할 수 있습니다.", cta: "취업준비생 경로 보기", path: "/paths" },
  { title: "기업 / 팀", icon: Users, desc: "팀 생산성과 업무 효율을 높이는 AI 활용 학습 경로를 제공합니다.", cta: "기업 경로 보기", path: "/paths" },
];

const roadmaps = [
  { days: "7일", desc: "입문자와 학생을 위한 빠른 시작 플랜" },
  { days: "14일", desc: "취업준비생과 실무 입문자를 위한 실전 플랜" },
  { days: "30일", desc: "심화 학습자와 팀을 위한 체계적 확장 플랜" },
];

const examples = [
  { title: "카카오형 고객응대", desc: "카카오톡 채널 고객 응대에 활용할 수 있는 프롬프트 예시" },
  { title: "네이버형 콘텐츠 정리", desc: "블로그, 스마트스토어 등 콘텐츠 작성과 정리에 활용" },
  { title: "쿠팡형 상품 설명 작성", desc: "이커머스 상품 설명, 리뷰 분석 등 판매 업무에 활용" },
  { title: "삼성형 회의 요약 및 보고서", desc: "기업 환경에서의 회의록 정리 및 보고서 작성에 활용" },
];

const Home = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding bg-card">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-6">
              한국형 AI 프롬프팅 학습 플랫폼
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              한국을 위한<br />Learn Prompting Test
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              학생, 취업준비생, 실무자와 팀을 위한 실전형 AI 프롬프팅 학습 경험을 제공합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/learn">
                <Button size="lg">학습 시작하기</Button>
              </Link>
              <Link to="/roadmap">
                <Button variant="outline" size="lg">로드맵 보기</Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <b.icon className="h-4 w-4 text-accent" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <img src={heroIllustration} alt="AI 프롬프팅 학습 플랫폼 일러스트레이션" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>

    {/* Personas */}
    <section className="section-padding">
      <div className="container-main">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">누구를 위한 학습인가요?</h2>
        <p className="mt-2 text-sm text-muted-foreground">사용자 목적에 맞는 학습 시작점을 선택할 수 있습니다.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p) => (
            <div key={p.title} className="bg-card rounded-lg border p-6 flex flex-col justify-between transition-shadow duration-200 hover:shadow-sm">
              <div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
              <Link to={p.path} className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline">
                {p.cta} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Roadmap Preview */}
    <section className="section-padding bg-card">
      <div className="container-main">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">7일, 14일, 30일 학습 플랜</h2>
        <p className="mt-2 text-sm text-muted-foreground">시간과 목표에 맞는 학습 플랜을 선택해 빠르게 시작하세요.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmaps.map((r) => (
            <div key={r.days} className="bg-background rounded-lg border p-6 flex flex-col justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{r.days} 플랜</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
              <Link to="/roadmap" className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:underline">
                플랜 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Examples Preview */}
    <section className="section-padding">
      <div className="container-main">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">한국 실무와 가까운 예시로 배우기</h2>
        <p className="mt-2 text-sm text-muted-foreground">한국 사용자에게 익숙한 업무와 상황을 기반으로 실전 예시를 제공합니다.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {examples.map((ex) => (
            <Link to="/examples" key={ex.title} className="bg-card rounded-lg border p-5 hover:shadow-sm transition-shadow duration-200">
              <p className="text-sm font-semibold text-foreground">{ex.title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{ex.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Certificate Trust */}
    <section className="section-padding bg-card">
      <div className="container-main text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">인증서를 공개적으로 검증할 수 있습니다</h2>
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

export default Home;
