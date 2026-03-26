import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  { title: "입문", desc: "프롬프팅이란 무엇인지 기본 개념을 알아봅니다.", level: "Lv.1", color: "bg-accent/10 text-accent" },
  { title: "기초 프롬프팅", desc: "좋은 프롬프트를 만드는 기본 원리와 구조를 배웁니다.", level: "Lv.2", color: "bg-primary/10 text-primary" },
  { title: "실전 활용", desc: "업무, 학습, 문서 작성 등 실무에 적용합니다.", level: "Lv.3", color: "bg-primary/10 text-primary" },
  { title: "고급 기법", desc: "체인 오브 소트, 멀티스텝 등 고급 기법을 익힙니다.", level: "Lv.4", color: "bg-destructive/10 text-destructive" },
  { title: "윤리와 검증", desc: "AI 활용의 윤리적 측면과 결과 검증 방법을 다룹니다.", level: "Lv.5", color: "bg-destructive/10 text-destructive" },
];

const LearnPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main">
          <h1 className="text-3xl font-bold text-foreground">학습하기</h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            Learn Prompting의 핵심 개념과 실전형 프롬프팅 방법을 단계적으로 학습해보세요.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => (
              <div
                key={c.title}
                className="bg-card rounded-lg border p-6 flex flex-col justify-between hover:shadow-sm transition-shadow duration-200"
              >
                <div>
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${c.color}`}>
                    {c.level}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>

                {isLoggedIn ? (
                  <Button size="sm" className="mt-5 self-start">
                    학습 시작
                  </Button>
                ) : (
                  <Link to="/login" className="mt-5 self-start">
                    <Button size="sm" variant="outline">
                      로그인 후 이용
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LearnPage;