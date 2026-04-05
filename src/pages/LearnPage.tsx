import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";

const LearnPage = () => {
  const { isLoggedIn } = useAuth();
  const { copy } = useI18n();
  const categories = copy.learn.categories;
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    setVisibleCards(new Array(categories.length).fill(false));
  }, [categories.length]);

  useEffect(() => {
    const cards = document.querySelectorAll(".learn-card");
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
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.querySelector(".steps-section");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStepsVisible(true);
          else setStepsVisible(false);
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
      <section className="relative h-80 flex items-end overflow-hidden">
        <img
          src="/learn-hero.jpg"
          alt={copy.learn.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            {copy.learn.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{copy.learn.title}</h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            {copy.learn.heroDescription}
          </p>
        </div>
      </section>

      {/* ── Learning Journey Steps ── */}
      <section className="section-padding korean-bg steps-section">
        <div className="container-main">
          <div className={`transition-all duration-700 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">{copy.learn.journeyTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {copy.learn.journeyDescription}
            </p>

            {/* steps row */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.map((c, idx) => (
                <div key={c.level} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 ${c.borderColor} bg-card`}>
                    <span className="text-lg">{c.emoji}</span>
                    <div>
                      <span className={`text-xs font-bold ${c.difficultyColor}`}>{c.level}</span>
                      <p className="text-sm font-semibold text-foreground leading-tight">{c.title}</p>
                    </div>
                  </div>
                  {idx < categories.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* login banner */}
          {!isLoggedIn && (
            <div className={`mt-8 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 flex items-center justify-between transition-all duration-700 delay-200 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground font-medium">
                  {copy.learn.loginBanner}
                </p>
              </div>
              <Link to="/login">
                <Button size="sm">{copy.learn.loginCta}</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Level Cards with Photos ── */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-foreground mb-2">{copy.learn.levelsTitle}</h2>
          <p className="text-sm text-muted-foreground mb-8">
            {copy.learn.levelsDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, idx) => (
              <div
                key={c.title}
                data-idx={idx}
                className={`learn-card relative rounded-xl overflow-hidden h-72 group cursor-pointer
                  transition-all duration-700
                  ${visibleCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* background photo */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-500" />

                {/* lock overlay for logged out */}
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Lock className="h-7 w-7 text-white" />
                      <span className="text-xs text-white/80 font-medium">{copy.learn.loginRequired}</span>
                    </div>
                  </div>
                )}

                {/* content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  {/* top row */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${c.badgeColor}`}>
                      {c.level}
                    </span>
                    <span className="text-2xl">{c.emoji}</span>
                  </div>

                  {/* bottom content */}
                  <div>
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-sm text-white/80 leading-relaxed">{c.desc}</p>

                    {/* topic pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* button */}
                    {isLoggedIn ? (
                      <Button
                        size="sm"
                        className="mt-4 bg-white text-gray-800 hover:bg-white/90 font-semibold"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {copy.learn.startButton}
                      </Button>
                    ) : (
                      <Link to="/login">
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-4 text-black border-white bg-white hover:bg-white/80"
                        >
                          {copy.learn.loginToAccessButton}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section-padding korean-bg">
        <div className="container-main text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground">{copy.learn.ctaTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {copy.learn.ctaDescription}
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {copy.learn.personaButtons.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button size="lg" variant="outline">{item.label}</Button>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/roadmap">
              <Button size="lg">{copy.learn.roadmapButton}</Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default LearnPage;
