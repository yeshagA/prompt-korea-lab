import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const examples = [
  { title: "카카오형 고객응대", desc: "카카오톡 채널 고객 응대 시 활용할 수 있는 프롬프트 예시", cat: "고객응대" },
  { title: "네이버형 콘텐츠 정리", desc: "블로그, 스마트스토어 등 네이버 생태계 콘텐츠 작성 활용", cat: "콘텐츠" },
  { title: "쿠팡형 상품 설명 작성", desc: "이커머스 상품 설명, 리뷰 분석 등 판매 업무 활용", cat: "이커머스" },
  { title: "삼성형 회의 요약 및 보고서", desc: "기업 환경에서의 회의록 정리 및 보고서 작성 활용", cat: "오피스" },
  { title: "대학 과제 / 발표 준비", desc: "과제 작성, 발표 자료 구성, 참고자료 정리에 활용", cat: "학습" },
  { title: "취업 준비용 자기소개서", desc: "자기소개서 작성, 면접 질문 정리 등 취업 준비 활용", cat: "취업" },
];

const ExamplesPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-main">
        <h1 className="text-3xl font-bold text-foreground">활용 예시</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl">
          한국 사용자에게 익숙한 업무와 상황을 기반으로 실전 예시를 제공합니다.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((ex) => (
            <div key={ex.title} className="bg-card rounded-lg border p-6 flex flex-col justify-between hover:shadow-sm transition-shadow duration-200">
              <div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{ex.cat}</span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{ex.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ex.desc}</p>
              </div>
              <Button variant="outline" size="sm" className="mt-5 self-start">예시 보기</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default ExamplesPage;
