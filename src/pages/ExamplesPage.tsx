import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const examples = [
  {
    title: "카카오형 고객응대",
    desc: "카카오톡 채널 고객 응대 시 활용할 수 있는 프롬프트 예시",
    cat: "고객응대",
    catColor: "bg-yellow-100 text-yellow-700",
    image: "/ex1.jpg",
  },
  {
    title: "네이버형 콘텐츠 정리",
    desc: "블로그, 스마트스토어 등 네이버 생태계 콘텐츠 작성 활용",
    cat: "콘텐츠",
    catColor: "bg-green-100 text-green-700",
    image: "/ex2.jpg",
  },
  {
    title: "쿠팡형 상품 설명 작성",
    desc: "이커머스 상품 설명, 리뷰 분석 등 판매 업무 활용",
    cat: "이커머스",
    catColor: "bg-orange-100 text-orange-700",
    image: "/ex3.jpg",
  },
  {
    title: "삼성형 회의 요약 및 보고서",
    desc: "기업 환경에서의 회의록 정리 및 보고서 작성 활용",
    cat: "오피스",
    catColor: "bg-blue-100 text-blue-700",
    image: "/ex4.jpg",
  },
  {
    title: "대학 과제 / 발표 준비",
    desc: "과제 작성, 발표 자료 구성, 참고자료 정리에 활용",
    cat: "학습",
    catColor: "bg-sky-100 text-sky-700",
    image: "/ex5.jpg",
  },
  {
    title: "취업 준비용 자기소개서",
    desc: "자기소개서 작성, 면접 질문 정리 등 취업 준비 활용",
    cat: "취업",
    catColor: "bg-rose-100 text-rose-700",
    image: "/ex6.jpg",
  },
];

const ExamplesPage = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(examples.length).fill(false)
  );
  const [activeFilter, setActiveFilter] = useState<string>("전체");

  const filters = ["전체", "고객응대", "콘텐츠", "이커머스", "오피스", "학습", "취업"];

  const filtered = activeFilter === "전체"
    ? examples
    : examples.filter((ex) => ex.cat === activeFilter);

  useEffect(() => {
    const cards = document.querySelectorAll(".example-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 120);
          } else {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[idx] = false;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <Layout>
      <section className="section-padding korean-bg">
        <div className="container-main">

          {/* header */}
          <h1 className="text-3xl font-bold text-foreground">프롬프트 갤러리</h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            한국 사용자에게 익숙한 업무와 상황을 기반으로 실전 예시를 제공합니다.
          </p>

          {/* filter tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setVisibleCards(new Array(examples.length).fill(false));
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${activeFilter === f
                    ? "bg-primary text-white shadow-sm"
                    : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* cards grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ex, idx) => (
              <div
                key={ex.title}
                data-idx={idx}
                className={`example-card relative rounded-xl border overflow-hidden h-72 group cursor-pointer
                  transition-all duration-700
                  ${visibleCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* background photo */}
                <img
                  src={ex.image}
                  alt={ex.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* dark overlay — lifts on hover */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-500" />

                {/* content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  {/* category badge top */}
                  <div>
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${ex.catColor}`}>
                      {ex.cat}
                    </span>
                  </div>

                  {/* text at bottom */}
                  <div>
                    <h3 className="text-lg font-bold text-white">{ex.title}</h3>
                    <p className="mt-1.5 text-sm text-white/80 leading-relaxed">{ex.desc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 text-black border-white bg-white hover:bg-white/80"
                    >
                      예시 보기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* empty state */}
          {filtered.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground text-sm">
              해당 카테고리의 예시가 없습니다.
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default ExamplesPage;