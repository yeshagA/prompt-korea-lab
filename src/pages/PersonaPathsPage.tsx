import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const paths = [
  {
    title: "학생",
    who: "대학생, 고등학생 등 AI 학습을 처음 시작하는 학습자",
    start: "입문 → 기초 프롬프팅",
    roadmap: "7일 플랜",
  },
  {
    title: "취업준비생",
    who: "실무형 AI 활용 역량을 키우고 싶은 취업준비생",
    start: "기초 프롬프팅 → 실전 활용",
    roadmap: "14일 플랜",
  },
  {
    title: "기업 / 팀",
    who: "팀 단위로 AI 생산성을 높이고자 하는 기업 담당자",
    start: "실전 활용 → 고급 기법",
    roadmap: "30일 플랜",
  },
];

const PersonaPathsPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-main">
        <h1 className="text-3xl font-bold text-foreground">나에게 맞는 학습 경로 선택</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl">
          사용자 목적에 맞게 가장 적절한 학습 시작점을 안내합니다.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((p) => (
            <div key={p.title} className="bg-card rounded-lg border p-6 flex flex-col">
              <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
              <dl className="mt-4 space-y-3 text-sm flex-1">
                <div>
                  <dt className="font-medium text-muted-foreground">누구를 위한 경로</dt>
                  <dd className="mt-0.5 text-foreground">{p.who}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">추천 시작점</dt>
                  <dd className="mt-0.5 text-foreground">{p.start}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">추천 로드맵</dt>
                  <dd className="mt-0.5 text-foreground">{p.roadmap}</dd>
                </div>
              </dl>
              <Button className="mt-6">이 경로 시작하기</Button>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <Link to="/roadmap"><Button variant="outline">로드맵 보기</Button></Link>
          <Link to="/learn"><Button>학습 시작하기</Button></Link>
          <Link to="/verify"><Button variant="outline">인증 확인</Button></Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default PersonaPathsPage;
