import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Clock } from "lucide-react";

const recommendedCourses = [
  {
    emoji: "🏢",
    tag: "오피스",
    tagColor: "bg-purple-100 text-purple-700",
    title: "삼성형 회의 요약 및 보고서",
    desc: "기업 환경에서의 회의록 정리 및 보고서 작성 활용",
    image: "/ex4.jpg",
  },
  {
    emoji: "🛍️",
    tag: "이커머스",
    tagColor: "bg-orange-100 text-orange-700",
    title: "쿠팡형 상품 설명 작성",
    desc: "이커머스 상품 설명, 리뷰 분석 등 판매 업무 활용",
    image: "/ex3.jpg",
  },
  {
    emoji: "💬",
    tag: "고객응대",
    tagColor: "bg-blue-100 text-blue-700",
    title: "카카오형 고객응대",
    desc: "카카오톡 채널 고객 응대 시 활용할 수 있는 프롬프트 예시",
    image: "/ex1.jpg",
  },
];

const whoIsThis = [
  "회의록 정리와 보고서 작성을 AI로 빠르게 처리하고 싶은 분",
  "반복적인 업무를 자동화하여 생산성을 높이고 싶은 분",
  "팀 내 AI 도입을 이끌어가고 싶은 직장인",
  "기업 환경에서 실무에 바로 적용 가능한 AI 활용법을 배우고 싶은 분",
];

const EmployeePage = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(recommendedCourses.length).fill(false)
  );
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll(".employee-card");
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
            }, idx * 150);
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
  }, []);

  useEffect(() => {
    const section = document.querySelector(".employee-who");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSectionVisible(true);
          else setSectionVisible(false);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <img
          src="/employee-hero.jpg"
          alt="직장인 경로"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 p-8 sm:p-12 w-full">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700 mb-3">
            🏢 직장인 경로
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            직장인 / 기업 구성원 경로
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            회의 요약, 보고서 작성, 업무 자동화, 생산성 향상을 위한 AI 활용 학습 경로입니다.
          </p>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="section-padding korean-bg employee-who">
        <div className="container-main">
          <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">이런 분들께 추천해요</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whoIsThis.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-card rounded-xl border p-4">
                  <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* recommended plan */}
          <div className={`mt-10 transition-all duration-700 delay-100 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="bg-card rounded-xl border-2 border-purple-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">추천 플랜: 30일 플랜</span>
                  </div>
                  <p className="text-base font-bold text-foreground mt-0.5">체계적이고 확장 가능한 프롬프팅 역량 구축</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    실무 및 팀 환경에서 응용 가능한 수준 도달
                  </p>
                </div>
              </div>
              <Link to="/roadmap">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">
                  로드맵 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recommended Courses ── */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">추천 과정</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            직장인에게 맞는 실전 예시 과정입니다. 카드를 hover하면 상세 내용을 확인할 수 있습니다 ✨
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course, idx) => (
              <div
                key={course.title}
                data-idx={idx}
                className={`employee-card relative rounded-xl border overflow-hidden h-72 group cursor-pointer
                  transition-all duration-700
                  ${visibleCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-500" />
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${course.tagColor} w-fit`}>
                    {course.tag}
                  </span>
                  <div>
                    <div className="text-2xl mb-1">{course.emoji}</div>
                    <h3 className="text-base font-bold text-white">{course.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{course.desc}</p>
                    <Link to="/examples">
                      <Button size="sm" className="mt-3 text-black border-white bg-white hover:bg-white/80" variant="outline">
                        예시 보기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding korean-bg">
        <div className="container-main text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground">지금 바로 시작해보세요</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            직장인을 위한 AI 프롬프팅 학습이 기다리고 있습니다.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link to="/learn">
              <Button size="lg">학습 시작하기</Button>
            </Link>
            <Link to="/roadmap">
              <Button size="lg" variant="outline">로드맵 보기</Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default EmployeePage;