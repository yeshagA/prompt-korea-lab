import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Building2, GraduationCap, Handshake, Search } from "lucide-react";

type ResultState = "idle" | "valid" | "revoked" | "not-found";

const mockData: Record<string, {
  state: "valid" | "revoked";
  name?: string;
  course?: string;
  date?: string;
  reason?: string;
}> = {
  "LPK-2026-001": { state: "valid", name: "김민수", course: "기초 프롬프팅 과정", date: "2026-02-15" },
  "LPK-2026-002": { state: "revoked", reason: "학습 과정 미이수로 인한 취소" },
};

const howItWorks = [
  { step: "01", title: "ID 입력", desc: "인증서에 적힌 고유 ID를 입력합니다.", emoji: "✍️" },
  { step: "02", title: "즉시 확인", desc: "실시간으로 인증서 유효성을 검증합니다.", emoji: "⚡" },
  { step: "03", title: "결과 확인", desc: "수료 여부, 과정명, 발급일을 확인합니다.", emoji: "✅" },
];

const whoCanUse = [
  {
    icon: Building2,
    title: "기업 채용 담당자",
    desc: "지원자의 AI 프롬프팅 역량을 공식적으로 검증할 수 있습니다.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: GraduationCap,
    title: "대학 및 교육기관",
    desc: "학생의 수료 여부를 신뢰할 수 있는 방식으로 확인합니다.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    icon: Handshake,
    title: "파트너 기관",
    desc: "협력사 및 파트너가 인증서의 진위를 간편하게 확인합니다.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

const VerifyPage = () => {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<ResultState>("idle");
  const [data, setData] = useState<(typeof mockData)[string] | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [howVisible, setHowVisible] = useState(false);
  const [whoVisible, setWhoVisible] = useState(false);

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
    const entry = mockData[certId.trim().toUpperCase()];
    if (entry) {
      setResult(entry.state);
      setData(entry);
    } else {
      setResult("not-found");
      setData(null);
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
          alt="인증 확인"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className={`relative z-10 p-8 sm:p-12 w-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/80 text-white mb-3">
            🏅 인증 시스템
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            인증 확인
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            인증서 ID를 입력하여 수료 여부를 즉시 확인하세요.
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
              <h2 className="text-xl font-bold text-foreground">인증서 ID 조회</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                인증서에 표시된 ID를 정확히 입력해주세요
              </p>
            </div>

            <label className="block text-sm font-semibold text-foreground mb-2">
              인증서 ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="예) LPK-2026-001"
                className="flex-1 rounded-xl border-2 bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <Button
                onClick={handleVerify}
                size="lg"
                className="px-6 rounded-xl"
              >
                인증 확인
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              💡 Enter 키를 눌러도 확인할 수 있습니다
            </p>

            {/* ── Results ── */}
            {result === "valid" && data && (
              <div className="mt-6 rounded-xl border-2 border-green-200 bg-green-50 p-6">
                <div className="flex items-center gap-2 text-green-700 mb-4">
                  <CheckCircle className="h-6 w-6" />
                  <h3 className="text-base font-bold">유효한 인증서입니다 ✅</h3>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <dt className="text-green-700 font-medium">이름</dt>
                    <dd className="font-bold text-foreground">{data.name}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <dt className="text-green-700 font-medium">과정명</dt>
                    <dd className="font-bold text-foreground">{data.course}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <dt className="text-green-700 font-medium">발급일</dt>
                    <dd className="font-bold text-foreground">{data.date}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-green-700 font-medium">상태</dt>
                    <dd className="font-bold text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> 유효
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {result === "revoked" && data && (
              <div className="mt-6 rounded-xl border-2 border-red-200 bg-red-50 p-6">
                <div className="flex items-center gap-2 text-red-700 mb-4">
                  <XCircle className="h-6 w-6" />
                  <h3 className="text-base font-bold">취소된 인증서입니다 ❌</h3>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-red-200">
                    <dt className="text-red-700 font-medium">상태</dt>
                    <dd className="font-bold text-red-600 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> 취소됨
                    </dd>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-red-700 font-medium">취소 사유</dt>
                    <dd className="font-bold text-foreground text-right max-w-xs">{data.reason}</dd>
                  </div>
                </dl>
              </div>
            )}

            {result === "not-found" && (
              <div className="mt-6 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6">
                <div className="flex items-center gap-2 text-yellow-700 mb-2">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-base font-bold">인증서를 찾을 수 없습니다 ⚠️</h3>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  입력한 인증서 ID를 다시 확인해주세요. 대소문자를 구분하지 않습니다.
                </p>
                <p className="text-xs text-yellow-600 mt-3">
                  💡 테스트: <strong>LPK-2026-001</strong> (유효) 또는 <strong>LPK-2026-002</strong> (취소됨)
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
            <h2 className="text-2xl font-bold text-foreground">어떻게 작동하나요?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              3단계로 빠르게 인증서를 확인할 수 있습니다
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
            <h2 className="text-2xl font-bold text-foreground">누가 사용할 수 있나요?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              기업, 대학, 파트너 기관 모두 무료로 인증서를 확인할 수 있습니다.
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