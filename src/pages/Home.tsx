import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, BookOpen, ArrowRight } from "lucide-react";

const trustBadges = [
  { icon: BookOpen, label: "무료 학습" },
  { icon: CheckCircle, label: "오픈소스 기반" },
  { icon: Shield, label: "인증 검증 지원" },
];

const personas = [
  { title: "학생", desc: "기초부터 차근차근 배우고 과제, 보고서, 학습에 활용", cta: "학생 경로 보기", path: "/paths" },
  { title: "취업준비생", desc: "실무형 프롬프팅을 익혀 자기소개서, 리서치, 업무 문서에 활용", cta: "취업준비생 경로 보기", path: "/paths" },
  { title: "기업 / 팀", desc: "팀 생산성과 업무 효율을 높이는 AI 활용 학습", cta: "기업 경로 보기", path: "/paths" },
];

const roadmaps = [
  { days: "7일", target: "입문자 / 학생", goal: "빠르게 핵심 개념 이해하기" },
  { days: "14일", target: "취업준비생 / 실무 입문자", goal: "실전형 업무 활용 익히기" },
  { days: "30일", target: "심화 학습자 / 팀", goal: "체계적으로 프롬프팅 역량 확장하기" },
];

const examples = [
  "카카오형 고객응대 프롬프트",
  "네이버형 콘텐츠 / 검색 활용",
  "쿠팡형 이커머스 업무",
  "삼성형 오피스 생산성 업무",
];

const Home = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding bg-card">
      <div className="container-main">
        <div className="max-w-2xl">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-6">
            한국형 AI 프롬프팅 학습 플랫폼
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            한국을 위한<br />Learn Prompting
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
      </div>
    </section>

    {/* Personas */}
    <section className="section-padding">
      <div className="container-main">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">누구를 위한 학습인가요?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p) => (
            <div key={p.title} className="bg-card rounded-lg border p-6 flex flex-col justify-between transition-shadow duration-200 hover:shadow-sm">
              <div>
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
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmaps.map((r) => (
            <div key={r.days} className="bg-background rounded-lg border p-6">
              <div className="text-2xl font-bold text-primary">{r.days} 플랜</div>
              <p className="mt-3 text-xs font-medium text-muted-foreground">추천 대상: {r.target}</p>
              <p className="mt-2 text-sm text-foreground">{r.goal}</p>
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
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {examples.map((ex) => (
            <Link to="/examples" key={ex} className="bg-card rounded-lg border p-5 hover:shadow-sm transition-shadow duration-200">
              <p className="text-sm font-semibold text-foreground">{ex}</p>
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
