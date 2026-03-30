import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Clock } from "lucide-react";

const recommendedCourses = [
  {
    emoji: "💼",
    tag: "취업",
    tagColor: "bg-rose-100 text-rose-700",
    title: "취업 준비용 자기소개서",
    desc: "자기소개서 작성, 면접 질문 정리 등 취업 준비 활용",
    image: "/ex6.jpg",
  },
  {
    emoji: "💬",
    tag: "고객응대",
    tagColor: "bg-blue-100 text-blue-700",
    title: "카카오형 고객응대",
    desc: "카카오톡 채널 고객 응대 시 활용할 수 있는 프롬프트 예시",
    image: "/ex1.jpg",
  },
  {
    emoji: "📝",
    tag: "콘텐츠",
    tagColor: "bg-green-100 text-green-700",
    title: "네이버형 콘텐츠 정리",
    desc: "블로그, 스마트스토어 등 네이버 생태계 콘텐츠 작성 활용",
    image: "/ex2.jpg",
  },
];

const whoIsThis = [
  "자기소개서를 AI로 더 설득력 있게 다듬고 싶은 분",
  "면접 예상 질문을 AI로 준비하고 싶은 분",
  "직무 분석 및 기업 리서치를 효율적으로 하고 싶은 분",
  "취업 준비 중 AI 활용 능력을 강점으로 만들고 싶은 분",
];

const JobSeekerPage = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(recommendedCourses.length).fill(false)
  );
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll(".jobseeker-card");
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
    const section = document.querySelector(".jobseeker-who");
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
          src="/jobseeker-hero.jpg"
          alt="취업준비생 경로"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 p-8 sm:p-12 w-full">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-700 mb-3">
            💼 취업준비생 경로
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            취업준비생 경로
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            자기소개서, 면접 준비, 리서치, 문서 작성을 위한 실전형 AI 활용 학습 경로입니다.
          </p>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="section-padding korean-bg jobseeker-who">
        <div className="container-main">
          <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">이런 분들께 추천해요</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whoIsThis.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-card rounded-xl border p-4">
                  <CheckCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* recommended plan */}
          <div className={`mt-10 transition-all duration-700 delay-100 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="bg-card rounded-xl border-2 border-rose-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-rose-600" />
                    <span className="text-sm font-bold text-rose-600">추천 플랜: 14일 플랜</span>
                  </div>
                  <p className="text-base font-bold text-foreground mt-0.5">실무 중심 프롬프팅 익히기</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    실제 업무형 AI 활용 능력 확보
                  </p>
                </div>
              </div>
              <Link to="/roadmap">
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shrink-0">
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
            취업준비생에게 맞는 실전 예시 과정입니다. 카드를 hover하면 상세 내용을 확인할 수 있습니다 ✨
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course, idx) => (
              <div
                key={course.title}
                data-idx={idx}
                className={`jobseeker-card relative rounded-xl border overflow-hidden h-72 group cursor-pointer
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
            취업준비생을 위한 AI 프롬프팅 학습이 기다리고 있습니다.
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

export default JobSeekerPage;