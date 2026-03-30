import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Clock } from "lucide-react";

const recommendedCourses = [
  {
    emoji: "🎓",
    tag: "학습",
    tagColor: "bg-sky-100 text-sky-700",
    title: "대학 과제 / 발표 준비",
    desc: "과제 작성, 발표 자료 구성, 참고자료 정리에 활용",
    backPoints: ["레포트 구조 잡기", "발표 스크립트 작성", "참고문헌 정리"],
    backColor: "bg-sky-600",
    image: "/ex5.jpg",
  },
  {
    emoji: "📝",
    tag: "콘텐츠",
    tagColor: "bg-green-100 text-green-700",
    title: "네이버형 콘텐츠 정리",
    desc: "블로그, 스마트스토어 등 네이버 생태계 콘텐츠 작성 활용",
    backPoints: ["SEO 최적화 글쓰기", "상품 설명 작성", "블로그 구조 설계"],
    backColor: "bg-green-600",
    image: "/ex2.jpg",
  },
  {
    emoji: "💬",
    tag: "고객응대",
    tagColor: "bg-blue-100 text-blue-700",
    title: "카카오형 고객응대",
    desc: "카카오톡 채널 고객 응대 시 활용할 수 있는 프롬프트 예시",
    backPoints: ["톤앤매너 설정법", "자동 응답 프롬프트", "불만 고객 대응"],
    backColor: "bg-blue-600",
    image: "/ex1.jpg",
  },
];

const whoIsThis = [
  "과제와 레포트를 AI로 빠르게 정리하고 싶은 분",
  "발표 자료와 스크립트 작성에 AI를 활용하고 싶은 분",
  "시험 대비 요약 및 학습 정리를 효율화하고 싶은 분",
  "AI 프롬프팅을 처음 배우는 대학생",
];

const StudentPage = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(recommendedCourses.length).fill(false)
  );
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll(".student-card");
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
    const section = document.querySelector(".student-who");
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
          src="/student-hero.jpg"
          alt="학생 경로"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 p-8 sm:p-12 w-full">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-700 mb-3">
            🎓 학생 경로
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            학생 학습 경로
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            과제, 발표, 학습 정리, 시험 대비를 위한 AI 활용 학습 경로입니다.
          </p>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="section-padding korean-bg student-who">
        <div className="container-main">
          <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">이런 분들께 추천해요</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whoIsThis.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-card rounded-xl border p-4">
                  <CheckCircle className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* recommended plan */}
          <div className={`mt-10 transition-all duration-700 delay-100 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="bg-card rounded-xl border-2 border-sky-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center text-2xl">
                  🌱
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-sky-600" />
                    <span className="text-sm font-bold text-sky-600">추천 플랜: 7일 플랜</span>
                  </div>
                  <p className="text-base font-bold text-foreground mt-0.5">핵심 개념 빠르게 익히기</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    AI 프롬프팅의 기본기를 이해하고 바로 활용 가능
                  </p>
                </div>
              </div>
              <Link to="/roadmap">
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white shrink-0">
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
            학생에게 맞는 실전 예시 과정입니다. 카드를 hover하면 상세 내용을 확인할 수 있습니다 ✨
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course, idx) => (
              <div
                key={course.title}
                data-idx={idx}
                className={`student-card relative rounded-xl border overflow-hidden h-72 group cursor-pointer
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
            학생을 위한 AI 프롬프팅 학습이 기다리고 있습니다.
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

export default StudentPage;