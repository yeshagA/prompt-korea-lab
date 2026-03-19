import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const plans = [
  {
    days: "7일",
    target: "학생 / 초보자",
    goal: "핵심 개념 빠르게 익히기",
    modules: ["Learn Prompting 소개", "프롬프트 기본 원리", "좋은 프롬프트 구조", "간단한 실전 예시"],
    result: "AI 프롬프팅의 기본기를 이해하고 바로 활용 가능",
  },
  {
    days: "14일",
    target: "취업준비생 / 실무 입문자",
    goal: "실무 중심 프롬프팅 익히기",
    modules: ["문서 작성", "이메일 작성", "조사 / 정리", "아이디어 발상", "업무 자동화 기초"],
    result: "실제 업무형 AI 활용 능력 확보",
  },
  {
    days: "30일",
    target: "심화 학습자 / 기업 팀",
    goal: "체계적이고 확장 가능한 프롬프팅 역량 구축",
    modules: ["고급 프롬프팅 기법", "멀티스텝 작업", "검증과 품질 향상", "사례 기반 연습", "팀 활용 전략"],
    result: "실무 및 팀 환경에서 응용 가능한 수준 도달",
  },
];

const RoadmapPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-main">
        <h1 className="text-3xl font-bold text-foreground">학습 로드맵</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl">
          자신의 시간과 목표에 맞는 학습 플랜을 선택하세요.
        </p>
        <div className="mt-10 space-y-8">
          {plans.map((p) => (
            <div key={p.days} className="bg-card rounded-lg border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-2xl font-bold text-primary">{p.days} 플랜</h2>
                <span className="text-xs font-medium text-muted-foreground">추천 대상: {p.target}</span>
              </div>
              <p className="mt-2 text-sm text-foreground font-medium">목표: {p.goal}</p>
              <div className="mt-5">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">예시 모듈</h4>
                <ul className="flex flex-wrap gap-2">
                  {p.modules.map((m) => (
                    <li key={m} className="text-xs bg-muted px-3 py-1.5 rounded-full text-foreground">{m}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                <strong className="text-foreground">결과:</strong> {p.result}
              </p>
              <Button className="mt-5" size="sm">{p.days} 플랜 시작</Button>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-lg p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground">아직 잘 모르겠다면 <strong>7일 플랜</strong>부터 시작해보세요.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default RoadmapPage;
