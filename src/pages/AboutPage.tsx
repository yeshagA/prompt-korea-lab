import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const blocks = [
  {
    title: "왜 필요한가?",
    text: "단순 번역이 아니라 한국형 학습 경험이 필요합니다. 한국 사용자의 업무 환경, 언어 맥락, 학습 흐름에 맞춘 콘텐츠와 구조를 제공합니다.",
  },
  {
    title: "무엇을 만드는가?",
    text: "현지화 운영 시스템, 한국형 학습 경로, 인증 검증 기능을 포함한 통합 학습 플랫폼을 만들고 있습니다.",
  },
  {
    title: "누구를 위한가?",
    text: "학생, 취업준비생, 기업 / 팀, 외부 검증자(기업, 대학, 파트너)를 위한 프로젝트입니다.",
  },
];

const AboutPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-main max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">프로젝트 소개</h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Learn Prompting Korea는 Learn Prompting을 한국 사용자에게 더 적합하게 제공하기 위한 프로젝트입니다.
        </p>

        <div className="mt-10 space-y-6">
          {blocks.map((b) => (
            <div key={b.title} className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-lg border p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground">오픈소스 기반 프로젝트</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            이 프로젝트는 오픈소스로 운영됩니다. 기여와 피드백을 환영합니다.
          </p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              GitHub 보기
            </Button>
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
