import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/I18nContext";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const UI = {
  ko: {
    badge: "비밀번호 재설정",
    title: "비밀번호를 잊으셨나요?",
    desc: "가입 시 사용한 이메일 주소를 입력하세요. 재설정 링크를 보내드립니다.",
    emailLabel: "이메일 주소",
    emailPlaceholder: "you@example.com",
    submitBtn: "재설정 링크 보내기",
    backToLogin: "로그인으로 돌아가기",
    successTitle: "이메일을 확인하세요",
    successDesc: (email: string) =>
      `${email} 주소로 비밀번호 재설정 링크를 보냈습니다. 받은 편지함을 확인해 주세요. 몇 분이 지나도 메일이 없다면 스팸 폴더를 확인해보세요.`,
    successBtn: "로그인 페이지로 이동",
    resend: "이메일을 받지 못하셨나요?",
    resendLink: "다시 보내기",
  },
  en: {
    badge: "Password reset",
    title: "Forgot your password?",
    desc: "Enter the email address you used to sign up and we'll send you a reset link.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    submitBtn: "Send reset link",
    backToLogin: "Back to login",
    successTitle: "Check your email",
    successDesc: (email: string) =>
      `We sent a password reset link to ${email}. Please check your inbox. If you don't see it after a few minutes, check your spam folder.`,
    successBtn: "Go to login",
    resend: "Didn't receive the email?",
    resendLink: "Send again",
  },
};

const ResetPasswordPage = () => {
  const { locale } = useI18n();
  const t = UI[locale as "ko" | "en"] ?? UI.ko;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resent, setResent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock — in production call your auth provider's reset method here
    setSubmitted(true);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <Layout>
      <section className="section-padding korean-bg min-h-[calc(100vh-200px)] flex items-center">
        <div className="container-main max-w-md mx-auto w-full">

          {/* Back link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.backToLogin}
          </Link>

          {!submitted ? (
            /* ── Request form ── */
            <div className="bg-card border border-border rounded-2xl overflow-hidden">

              {/* Header */}
              <div className="px-7 py-6 border-b border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.badge}
                  </p>
                  <h1 className="text-base font-bold text-foreground leading-snug">{t.title}</h1>
                </div>
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.desc}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-2">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      required
                      className="w-full h-10 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {t.submitBtn}
                  </Button>
                </form>
              </div>
            </div>

          ) : (
            /* ── Success state ── */
            <div className="bg-card border border-border rounded-2xl overflow-hidden">

              {/* Header */}
              <div className="px-7 py-6 border-b border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.badge}
                  </p>
                  <h1 className="text-base font-bold text-foreground leading-snug">{t.successTitle}</h1>
                </div>
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.successDesc(email)}
                </p>

                <Link to="/login">
                  <Button className="w-full">{t.successBtn}</Button>
                </Link>

                <div className="mt-5 pt-5 border-t border-border flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <span>{t.resend}</span>
                  <button
                    onClick={handleResend}
                    disabled={resent}
                    className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {resent
                      ? (locale === "ko" ? "전송됨 ✓" : "Sent ✓")
                      : t.resendLink
                    }
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default ResetPasswordPage;