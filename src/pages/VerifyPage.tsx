import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Building2,
  GraduationCap,
  Handshake,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/context/I18nContext";

type ResultState = "idle" | "valid" | "revoked" | "not-found";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const UI = {
  ko: {
    badge: "인증서 검증",
    heroTitle: "자격증의 진위를\n즉시 확인하세요",
    heroSub: "프롬프트하늘에서 발급된 모든 수료증은 고유 ID로 공개 검증이 가능합니다.\n채용 담당자, 교육기관, 파트너 누구든 몇 초 안에 확인하세요.",
    searchTitle: "인증서 ID 조회",
    searchDesc: "인증서에 인쇄된 고유 ID를 입력하세요.",
    inputLabel: "인증서 ID",
    inputPlaceholder: "예: LPK-2026-001",
    enterHint: "Enter 키로도 조회할 수 있습니다.",
    verifyBtn: "조회하기",
    validTitle: "유효한 인증서",
    revokedTitle: "취소된 인증서",
    notFoundTitle: "인증서를 찾을 수 없음",
    notFoundDesc: "입력하신 ID와 일치하는 인증서 기록이 없습니다. ID를 다시 확인해 주세요.",
    testHint: "테스트: LPK-2026-001 (유효) · LPK-2026-002 (취소됨)",
    labelName: "이름",
    labelCourse: "과정",
    labelDate: "발급일",
    labelStatus: "상태",
    labelReason: "사유",
    stateValid: "유효",
    stateRevoked: "취소됨",
    revokedReason: "학습 데이터 위조 확인됨",
    validCourse: "프롬프트 엔지니어링 입문",
    howTitle: "검증 방법",
    howDesc: "세 단계로 인증서의 진위를 확인할 수 있습니다.",
    steps: [
      { step: 1, title: "ID 확인", desc: "인증서 하단에 인쇄된 고유 ID(LPK-YYYY-XXX)를 확인하세요." },
      { step: 2, title: "ID 입력", desc: "위 검색창에 ID를 입력하고 조회하기를 클릭합니다." },
      { step: 3, title: "결과 확인", desc: "이름, 과정, 발급일, 유효 상태를 즉시 확인합니다." },
    ],
    audienceTitle: "누가 사용하나요?",
    audienceDesc: "인증서 검증은 별도의 로그인 없이 누구나 사용할 수 있습니다.",
    audiences: [
      { title: "기업 · 채용 담당자", desc: "지원자의 AI 역량 수료 여부를 채용 프로세스에서 즉시 확인합니다." },
      { title: "교육기관 · 교수자", desc: "학생의 외부 학습 이력과 수료 자격을 공식적으로 검토합니다." },
      { title: "파트너 · 협력사", desc: "협업 대상의 AI 전문성을 신뢰할 수 있는 방식으로 검증합니다." },
    ],
  },
  en: {
    badge: "Certificate Verification",
    heroTitle: "Verify any certificate\nin seconds",
    heroSub: "Every certificate issued by Prompt Haneul carries a unique ID that can be publicly verified.\nHiring managers, institutions, and partners — confirm authenticity instantly.",
    searchTitle: "Look up a certificate",
    searchDesc: "Enter the unique ID printed on the certificate.",
    inputLabel: "Certificate ID",
    inputPlaceholder: "e.g. LPK-2026-001",
    enterHint: "You can also press Enter to search.",
    verifyBtn: "Verify",
    validTitle: "Certificate is valid",
    revokedTitle: "Certificate revoked",
    notFoundTitle: "Certificate not found",
    notFoundDesc: "No record matches the ID you entered. Please double-check and try again.",
    testHint: "Try: LPK-2026-001 (valid) · LPK-2026-002 (revoked)",
    labelName: "Name",
    labelCourse: "Course",
    labelDate: "Issue date",
    labelStatus: "Status",
    labelReason: "Reason",
    stateValid: "Valid",
    stateRevoked: "Revoked",
    revokedReason: "Fraudulent completion data detected",
    validCourse: "Introduction to Prompt Engineering",
    howTitle: "How verification works",
    howDesc: "Three steps to confirm the authenticity of any certificate.",
    steps: [
      { step: 1, title: "Find the ID", desc: "Locate the unique ID (LPK-YYYY-XXX) printed at the bottom of the certificate." },
      { step: 2, title: "Enter the ID", desc: "Type or paste it into the search field above and click Verify." },
      { step: 3, title: "Read the result", desc: "The holder's name, course, issue date, and status appear instantly." },
    ],
    audienceTitle: "Who uses this?",
    audienceDesc: "Verification is open to everyone — no login required.",
    audiences: [
      { title: "Employers & HR teams", desc: "Confirm AI competency certificates during hiring without friction." },
      { title: "Academic institutions", desc: "Review students' external learning credentials for formal recognition." },
      { title: "Partners & collaborators", desc: "Validate AI expertise before entering professional engagements." },
    ],
  },
};

const AUDIENCE_ICONS = [Building2, GraduationCap, Handshake];

// ─── Component ────────────────────────────────────────────────────────────────
const VerifyPage = () => {
  const { locale } = useI18n();
  const t = UI[locale as "ko" | "en"] ?? UI.ko;

  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<ResultState>("idle");
  const [matchedId, setMatchedId] = useState<string | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const mockData: Record<string, {
    state: "valid" | "revoked";
    name?: string;
    course?: string;
    date?: string;
    reason?: string;
  }> = {
    "LPK-2026-001": { state: "valid", name: "Kim Min-su", course: t.validCourse, date: "2026-02-15" },
    "LPK-2026-002": { state: "revoked", reason: t.revokedReason },
  };

  const data = matchedId ? mockData[matchedId] : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.observe;
          if (id && entry.isIntersecting) setVisible((p) => ({ ...p, [id]: true }));
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fadeIn = (id: string, delay = 0) =>
    `transition-all duration-700 ${delay ? `delay-[${delay}ms]` : ""} ${
      visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  const handleVerify = () => {
    const id = certId.trim().toUpperCase();
    const entry = mockData[id];
    if (entry) { setResult(entry.state); setMatchedId(id); }
    else { setResult("not-found"); setMatchedId(null); }
  };

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="korean-bg border-b border-border">
        <div className="container-main py-16 sm:py-24 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/70 mb-5 border border-primary/20 rounded-full px-3 py-1">
              {t.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight whitespace-pre-line max-w-xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 text-base text-muted-foreground max-w-lg whitespace-pre-line leading-relaxed">
              {t.heroSub}
            </p>
          </div>

          {/* Shield accent */}
          <div className="shrink-0 w-20 h-20 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center self-start sm:self-auto">
            <ShieldCheck className="h-9 w-9 text-primary" />
          </div>
        </div>
      </section>

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-2xl mx-auto">

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Header strip */}
            <div className="px-7 py-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.searchTitle}</p>
                <p className="text-xs text-muted-foreground">{t.searchDesc}</p>
              </div>
            </div>

            {/* Input */}
            <div className="px-7 py-6">
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {t.inputLabel}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  placeholder={t.inputPlaceholder}
                  className="flex-1 h-10 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <Button onClick={handleVerify} size="sm" className="px-5 h-10 shrink-0">
                  {t.verifyBtn}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{t.enterHint}</p>

              {/* ── Results ── */}

              {result === "valid" && data && (
                <div className="mt-6 rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-3.5 bg-emerald-50 dark:bg-emerald-950 border-b border-border">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{t.validTitle}</p>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {[
                        { label: t.labelName, value: data.name },
                        { label: t.labelCourse, value: data.course },
                        { label: t.labelDate, value: data.date },
                        {
                          label: t.labelStatus,
                          value: (
                            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                              <CheckCircle className="h-3.5 w-3.5" /> {t.stateValid}
                            </span>
                          ),
                        },
                      ].map((row) => (
                        <tr key={row.label}>
                          <td className="px-5 py-3 text-muted-foreground font-medium w-32">{row.label}</td>
                          <td className="px-5 py-3 text-foreground font-semibold">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {result === "revoked" && data && (
                <div className="mt-6 rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-3.5 bg-red-50 dark:bg-red-950 border-b border-border">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />
                    <p className="text-sm font-semibold text-red-700 dark:text-red-300">{t.revokedTitle}</p>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {[
                        {
                          label: t.labelStatus,
                          value: (
                            <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold">
                              <XCircle className="h-3.5 w-3.5" /> {t.stateRevoked}
                            </span>
                          ),
                        },
                        { label: t.labelReason, value: data.reason },
                      ].map((row) => (
                        <tr key={row.label}>
                          <td className="px-5 py-3 text-muted-foreground font-medium w-32">{row.label}</td>
                          <td className="px-5 py-3 text-foreground font-semibold">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {result === "not-found" && (
                <div className="mt-6 rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-3.5 bg-amber-50 dark:bg-amber-950 border-b border-border">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">{t.notFoundTitle}</p>
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    <p className="text-sm text-muted-foreground">{t.notFoundDesc}</p>
                    <p className="text-xs text-muted-foreground/70 font-mono">{t.testHint}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="section-padding korean-bg border-t border-border">
        <div className="container-main">
          <div data-observe="how" className={fadeIn("how")}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{t.howTitle}</p>
            <h2 className="text-2xl font-bold text-foreground">{t.howDesc}</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {t.steps.map((step, idx) => (
              <div
                key={step.step}
                data-observe={`step-${idx}`}
                className={`bg-card px-7 py-8 flex flex-col gap-4 ${fadeIn(`step-${idx}`, idx * 100)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border border-border text-xs font-bold text-muted-foreground flex items-center justify-center shrink-0">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who uses this ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-main">
          <div data-observe="who" className={fadeIn("who")}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{t.audienceTitle}</p>
            <h2 className="text-2xl font-bold text-foreground">{t.audienceDesc}</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.audiences.map((aud, idx) => {
              const Icon = AUDIENCE_ICONS[idx];
              return (
                <div
                  key={aud.title}
                  data-observe={`aud-${idx}`}
                  className={`bg-card border border-border rounded-2xl px-6 py-7 flex flex-col gap-4 hover:border-primary/30 transition-colors ${fadeIn(`aud-${idx}`, idx * 100)}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{aud.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{aud.desc}</p>
                  </div>
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