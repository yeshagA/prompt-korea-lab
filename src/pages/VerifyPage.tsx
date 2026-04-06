import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Building2, GraduationCap, Handshake, Search } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

type ResultState = "idle" | "valid" | "revoked" | "not-found";

const VerifyPage = () => {
  const { copy } = useI18n();
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<ResultState>("idle");
  const [matchedId, setMatchedId] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [howVisible, setHowVisible] = useState(false);
  const [whoVisible, setWhoVisible] = useState(false);
  const mockData: Record<string, {
    state: "valid" | "revoked";
    name?: string;
    course?: string;
    date?: string;
    reason?: string;
  }> = {
    "LPK-2026-001": {
      state: "valid",
      name: "Kim Min-su",
      course: copy.verify.results.validCourse,
      date: "2026-02-15",
    },
    "LPK-2026-002": {
      state: "revoked",
      reason: copy.verify.results.revokedReason,
    },
  };
  const data = matchedId ? mockData[matchedId] : null;
  const howItWorks = copy.verify.howItWorks;
  const whoCanUse = [
    {
      icon: Building2,
      title: copy.verify.audiences[0].title,
      desc: copy.verify.audiences[0].desc,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: GraduationCap,
      title: copy.verify.audiences[1].title,
      desc: copy.verify.audiences[1].desc,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: Handshake,
      title: copy.verify.audiences[2].title,
      desc: copy.verify.audiences[2].desc,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const how = document.querySelector(".how-section");
    const who = document.querySelector(".who-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === how) {
            if (entry.isIntersecting) setHowVisible(true);
            else setHowVisible(false);
          }
          if (entry.target === who) {
            if (entry.isIntersecting) setWhoVisible(true);
            else setWhoVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (how) observer.observe(how);
    if (who) observer.observe(who);
    return () => observer.disconnect();
  }, []);

  const handleVerify = () => {
    const normalizedId = certId.trim().toUpperCase();
    const entry = mockData[normalizedId];
    if (entry) {
      setResult(entry.state);
      setMatchedId(normalizedId);
    } else {
      setResult("not-found");
      setMatchedId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerify();
  };

  return (
    <Layout>

      {/* ── Hero Banner ── */}
      <section className="relative h-80 flex items-end overflow-hidden">
        <img
          src="/verify-hero.jpg"
          alt={copy.verify.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            {copy.verify.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{copy.verify.title}</h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            {copy.verify.heroDescription}
          </p>
        </div>
      </section>

      {/* ── Search Section ── */}
      <section className="section-padding korean-bg">
        <div className="container-main max-w-2xl mx-auto">

          {/* big search box */}
          <div className="bg-card rounded-2xl border-2 border-primary/20 p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{copy.verify.searchTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.verify.searchDescription}
              </p>
            </div>

            <label className="block text-sm font-semibold text-foreground mb-2">
              {copy.verify.inputLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={copy.verify.inputPlaceholder}
                className="flex-1 rounded-xl border-2 bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <Button
                onClick={handleVerify}
                size="lg"
                className="px-6 rounded-xl"
              >
                {copy.verify.verifyButton}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {copy.verify.enterHint}
            </p>

            {/* ── Results ── */}
            {result === "valid" && data && (
              <div className="mt-6 rounded-xl border-2 border-green-200 bg-green-50 p-6">
                <div className="flex items-center gap-2 text-green-700 mb-4">
                  <CheckCircle className="h-6 w-6" />
                  <h3 className="text-base font-bold">{copy.verify.results.validTitle}</h3>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <dt className="text-green-700 font-medium">{copy.verify.resultLabels.name}</dt>
                    <dd className="font-bold text-foreground">{data.name}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <dt className="text-green-700 font-medium">{copy.verify.resultLabels.course}</dt>
                    <dd className="font-bold text-foreground">{data.course}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <dt className="text-green-700 font-medium">{copy.verify.resultLabels.date}</dt>
                    <dd className="font-bold text-foreground">{data.date}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-green-700 font-medium">{copy.verify.resultLabels.status}</dt>
                    <dd className="font-bold text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> {copy.verify.resultStates.valid}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {result === "revoked" && data && (
              <div className="mt-6 rounded-xl border-2 border-red-200 bg-red-50 p-6">
                <div className="flex items-center gap-2 text-red-700 mb-4">
                  <XCircle className="h-6 w-6" />
                  <h3 className="text-base font-bold">{copy.verify.results.revokedTitle}</h3>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-red-200">
                    <dt className="text-red-700 font-medium">{copy.verify.resultLabels.status}</dt>
                    <dd className="font-bold text-red-600 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> {copy.verify.resultStates.revoked}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-red-700 font-medium">{copy.verify.resultLabels.reason}</dt>
                    <dd className="font-bold text-foreground text-right max-w-xs">{data.reason}</dd>
                  </div>
                </dl>
              </div>
            )}

            {result === "not-found" && (
              <div className="mt-6 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6">
                <div className="flex items-center gap-2 text-yellow-700 mb-2">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-base font-bold">{copy.verify.results.notFoundTitle}</h3>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  {copy.verify.results.notFoundDescription}
                </p>
                <p className="text-xs text-yellow-600 mt-3">
                  {copy.verify.results.testHint}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-padding bg-card how-section">
        <div className="container-main">
          <div className={`text-center transition-all duration-700 ${howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">{copy.verify.howTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {copy.verify.howDescription}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((item, idx) => (
              <div
                key={item.step}
                className={`bg-card rounded-xl border p-6 text-center transition-all duration-700 hover:shadow-md
                  ${howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Can Use ── */}
      <section className="section-padding korean-bg who-section">
        <div className="container-main">
          <div className={`text-center transition-all duration-700 ${whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl font-bold text-foreground">{copy.verify.audienceTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {copy.verify.audienceDescription}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoCanUse.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-xl border-2 ${item.borderColor} ${item.bgColor} p-6
                    transition-all duration-700 hover:shadow-md hover:-translate-y-1
                    ${whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className={`h-12 w-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className={`text-base font-bold ${item.color}`}>{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default VerifyPage;
