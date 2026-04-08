import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Lock, ShieldCheck, GraduationCap,
  Briefcase, Building2, CheckCircle, AlertTriangle,
  Eye, EyeOff, Award,
} from "lucide-react";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const UI = {
  ko: {
    badge: "계정",
    heroTitle: "계정 설정",
    heroSub: "프로필, 학습 경로, 비밀번호를 관리합니다.",

    profileSection: "프로필 정보",
    profileDesc: "이름과 학습 경로를 업데이트합니다.",
    emailLabel: "이메일",
    emailNote: "이메일 주소는 변경할 수 없습니다.",
    firstNameLabel: "이름",
    lastNameLabel: "성",
    firstNamePlaceholder: "이름을 입력하세요",
    lastNamePlaceholder: "성을 입력하세요",
    roleLabel: "학습 경로",
    roles: [
      { value: "student", label: "학생", desc: "과제, 발표, 학습 정리", icon: "grad" },
      { value: "job-seeker", label: "취업준비생", desc: "자기소개서, 면접 준비", icon: "brief" },
      { value: "employee", label: "직장인 / 기업 구성원", desc: "보고서, 회의, 업무 자동화", icon: "building" },
    ],
    saveProfile: "프로필 저장",
    savedProfile: "저장됨",

    planSection: "현재 플랜",
    planDesc: "현재 사용 중인 학습 플랜과 인증서 현황입니다.",
    planLabels: {
      currentPlan: "현재 플랜",
      planValue: "무료 플랜",
      certStatus: "인증서 상태",
      certValue: "진행 중 (5/12 모듈)",
      memberSince: "가입일",
      memberValue: "2026년 1월",
    },

    passwordSection: "비밀번호 변경",
    passwordDesc: "현재 비밀번호를 확인한 후 새 비밀번호를 설정합니다.",
    currentPasswordLabel: "현재 비밀번호",
    currentPasswordPlaceholder: "현재 비밀번호를 입력하세요",
    newPasswordLabel: "새 비밀번호",
    newPasswordPlaceholder: "새 비밀번호를 입력하세요",
    confirmPasswordLabel: "새 비밀번호 확인",
    confirmPasswordPlaceholder: "새 비밀번호를 다시 입력하세요",
    passwordHint: "최소 8자 이상, 대문자·소문자·숫자를 각각 1개 이상 포함해야 합니다.",
    changePassword: "비밀번호 변경",
    passwordSuccess: "비밀번호가 성공적으로 변경되었습니다.",
    passwordMismatch: "새 비밀번호가 일치하지 않습니다.",
    passwordWeak: "비밀번호가 조건을 충족하지 않습니다.",
    passwordWrong: "현재 비밀번호가 올바르지 않습니다.",

    dangerSection: "계정 관리",
    dangerDesc: "계정 로그아웃 또는 탈퇴를 진행합니다.",
    logoutBtn: "로그아웃",
    deleteBtn: "계정 탈퇴",
    deleteWarning: "계정을 탈퇴하면 모든 학습 데이터와 인증서가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.",
  },

  en: {
    badge: "Account",
    heroTitle: "Account settings",
    heroSub: "Manage your profile, learning path, and password.",

    profileSection: "Profile information",
    profileDesc: "Update your name and learning path.",
    emailLabel: "Email",
    emailNote: "Your email address cannot be changed.",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    firstNamePlaceholder: "Enter your first name",
    lastNamePlaceholder: "Enter your last name",
    roleLabel: "Learning path",
    roles: [
      { value: "student", label: "Student", desc: "Assignments, presentations, study", icon: "grad" },
      { value: "job-seeker", label: "Job seeker", desc: "Cover letters, interview prep", icon: "brief" },
      { value: "employee", label: "Professional / Team", desc: "Reports, meetings, automation", icon: "building" },
    ],
    saveProfile: "Save profile",
    savedProfile: "Saved",

    planSection: "Current plan",
    planDesc: "Your active learning plan and certificate progress.",
    planLabels: {
      currentPlan: "Current plan",
      planValue: "Free plan",
      certStatus: "Certificate status",
      certValue: "In progress (5/12 modules)",
      memberSince: "Member since",
      memberValue: "January 2026",
    },

    passwordSection: "Change password",
    passwordDesc: "Verify your current password before setting a new one.",
    currentPasswordLabel: "Current password",
    currentPasswordPlaceholder: "Enter your current password",
    newPasswordLabel: "New password",
    newPasswordPlaceholder: "Enter your new password",
    confirmPasswordLabel: "Confirm new password",
    confirmPasswordPlaceholder: "Re-enter your new password",
    passwordHint: "Minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number.",
    changePassword: "Change password",
    passwordSuccess: "Your password has been changed successfully.",
    passwordMismatch: "New passwords do not match.",
    passwordWeak: "Password does not meet the requirements.",
    passwordWrong: "Current password is incorrect.",

    dangerSection: "Account management",
    dangerDesc: "Log out or permanently delete your account.",
    logoutBtn: "Log out",
    deleteBtn: "Delete account",
    deleteWarning: "Deleting your account will permanently remove all your learning data and certificates. This cannot be undone.",
  },
};

// ─── Role icon ────────────────────────────────────────────────────────────────
const RoleIcon = ({ name, className }: { name: string; className?: string }) => {
  const cls = className ?? "h-4 w-4";
  if (name === "grad") return <GraduationCap className={cls} />;
  if (name === "brief") return <Briefcase className={cls} />;
  return <Building2 className={cls} />;
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="px-7 py-5 border-b border-border">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </div>
    <div className="px-7 py-6">{children}</div>
  </div>
);

// ─── Input field ──────────────────────────────────────────────────────────────
const Field = ({
  label, type = "text", value, onChange, placeholder, note, readOnly = false,
  rightSlot,
}: {
  label: string; type?: string; value: string; onChange?: (v: string) => void;
  placeholder?: string; note?: string; readOnly?: boolean; rightSlot?: React.ReactNode;
}) => (
  <div>
    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-10 rounded-lg border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all
          ${readOnly ? "bg-muted cursor-not-allowed text-muted-foreground border-border" : "bg-background border-border"}
          ${rightSlot ? "pr-10" : ""}
        `}
      />
      {rightSlot && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
      )}
    </div>
    {note && <p className="mt-1.5 text-xs text-muted-foreground">{note}</p>}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────
const AccountPage = () => {
  const { user, isLoggedIn, signOut, updateProfile } = useAuth();
  const { locale } = useI18n();
  const navigate = useNavigate();
  const t = UI[locale as "ko" | "en"] ?? UI.ko;

  // Profile
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [role, setRole] = useState<"student" | "job-seeker" | "employee" | "other">(
   (user?.role as "student" | "job-seeker" | "employee" | "other") || "student"
  );
  const [profileSaved, setProfileSaved] = useState(false);

  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwStatus, setPwStatus] = useState<"idle" | "success" | "mismatch" | "weak" | "wrong">("idle");

  // Password strength
  const pwValid = newPw.length >= 8 && /[A-Z]/.test(newPw) && /[a-z]/.test(newPw) && /[0-9]/.test(newPw);
  const pwStrength = !newPw ? 0 : newPw.length < 6 ? 1 : newPw.length < 8 || !pwValid ? 2 : 3;
  const pwStrengthColor = ["bg-muted", "bg-red-500", "bg-amber-500", "bg-emerald-500"][pwStrength];
  const pwStrengthLabel = [
    "",
    locale === "ko" ? "취약" : "Weak",
    locale === "ko" ? "보통" : "Fair",
    locale === "ko" ? "강함" : "Strong",
  ][pwStrength];

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  const handleSaveProfile = () => {
    updateProfile({ firstName, lastName, role: role as "student" | "job-seeker" | "employee" | "other" });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleChangePassword = () => {
    // Mock: treat any non-empty currentPw as correct for demo
    if (!currentPw) { setPwStatus("wrong"); return; }
    if (!pwValid) { setPwStatus("weak"); return; }
    if (newPw !== confirmPw) { setPwStatus("mismatch"); return; }
    setPwStatus("success");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwStatus("idle"), 4000);
  };

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  if (!isLoggedIn) return null;

  const displayEmail = user?.email || "—";

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="korean-bg border-b border-border">
        <div className="container-main py-14 sm:py-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/70 mb-5 border border-primary/20 rounded-full px-3 py-1">
              {t.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t.heroTitle}</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.heroSub}</p>
          </div>
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <User className="h-7 w-7 text-primary" />
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-2xl mx-auto space-y-6">

          {/* ── Profile ── */}
          <Section title={t.profileSection} desc={t.profileDesc}>
            <div className="space-y-5">

              {/* Email — readonly */}
              <Field
                label={t.emailLabel}
                value={displayEmail}
                readOnly
                note={t.emailNote}
              />

              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={t.firstNameLabel}
                  value={firstName}
                  onChange={setFirstName}
                  placeholder={t.firstNamePlaceholder}
                />
                <Field
                  label={t.lastNameLabel}
                  value={lastName}
                  onChange={setLastName}
                  placeholder={t.lastNamePlaceholder}
                />
              </div>

              {/* Role selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-3">
                  {t.roleLabel}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {t.roles.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRole(r.value)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                        role === r.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-background hover:border-primary/40 text-foreground"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        role === r.value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        <RoleIcon name={r.icon} className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{r.label}</p>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                      {role === r.value && (
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                size="sm"
                className={profileSaved ? "bg-emerald-600 hover:bg-emerald-600" : ""}
              >
                {profileSaved
                  ? <><CheckCircle className="h-3.5 w-3.5 mr-1.5" /> {t.savedProfile}</>
                  : t.saveProfile
                }
              </Button>
            </div>
          </Section>

          {/* ── Current plan ── */}
          <Section title={t.planSection} desc={t.planDesc}>
            <div className="space-y-4">

              {/* Plan rows */}
              <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                {[
                  { label: t.planLabels.currentPlan, value: t.planLabels.planValue, icon: <ShieldCheck className="h-4 w-4 text-primary" /> },
                  { label: t.planLabels.certStatus, value: t.planLabels.certValue, icon: <Award className="h-4 w-4 text-amber-500" /> },
                  { label: t.planLabels.memberSince, value: t.planLabels.memberValue, icon: <Mail className="h-4 w-4 text-muted-foreground" /> },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3 px-5 py-4">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {row.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{row.label}</p>
                      <p className="text-sm font-semibold text-foreground">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cert progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{locale === "ko" ? "인증서 진행률" : "Certificate progress"}</span>
                  <span className="font-semibold text-foreground">5 / 12</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: "41%" }} />
                </div>
              </div>
            </div>
          </Section>

          {/* ── Password ── */}
          <Section title={t.passwordSection} desc={t.passwordDesc}>
            <div className="space-y-4">

              <Field
                label={t.currentPasswordLabel}
                type={showCurrentPw ? "text" : "password"}
                value={currentPw}
                onChange={setCurrentPw}
                placeholder={t.currentPasswordPlaceholder}
                rightSlot={
                  <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="text-muted-foreground hover:text-foreground transition-colors">
                    {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <Field
                label={t.newPasswordLabel}
                type={showNewPw ? "text" : "password"}
                value={newPw}
                onChange={(v) => { setNewPw(v); setPwStatus("idle"); }}
                placeholder={t.newPasswordPlaceholder}
                note={t.passwordHint}
                rightSlot={
                  <button onClick={() => setShowNewPw(!showNewPw)} className="text-muted-foreground hover:text-foreground transition-colors">
                    {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              {/* Strength bar */}
              {newPw && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{locale === "ko" ? "비밀번호 강도" : "Password strength"}</span>
                    <span className={`font-semibold ${["", "text-red-500", "text-amber-500", "text-emerald-600"][pwStrength]}`}>
                      {pwStrengthLabel}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-muted overflow-hidden flex gap-0.5">
                    {[1, 2, 3].map((seg) => (
                      <div
                        key={seg}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          pwStrength >= seg ? pwStrengthColor : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Field
                label={t.confirmPasswordLabel}
                type={showConfirmPw ? "text" : "password"}
                value={confirmPw}
                onChange={(v) => { setConfirmPw(v); setPwStatus("idle"); }}
                placeholder={t.confirmPasswordPlaceholder}
                rightSlot={
                  <button onClick={() => setShowConfirmPw(!showConfirmPw)} className="text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              {/* Status message */}
              {pwStatus !== "idle" && (
                <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ${
                  pwStatus === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}>
                  {pwStatus === "success"
                    ? <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    : <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  }
                  {pwStatus === "success" && t.passwordSuccess}
                  {pwStatus === "mismatch" && t.passwordMismatch}
                  {pwStatus === "weak" && t.passwordWeak}
                  {pwStatus === "wrong" && t.passwordWrong}
                </div>
              )}

              <Button onClick={handleChangePassword} size="sm" variant="outline">
                <Lock className="h-3.5 w-3.5 mr-1.5" />
                {t.changePassword}
              </Button>
            </div>
          </Section>

          {/* ── Danger zone ── */}
          <Section title={t.dangerSection} desc={t.dangerDesc}>
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed bg-muted/50 border border-border rounded-lg px-4 py-3">
                <AlertTriangle className="inline h-3.5 w-3.5 mr-1.5 text-amber-500" />
                {t.deleteWarning}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t.logoutBtn}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 dark:border-red-800"
                  onClick={() => {
                    if (window.confirm(t.deleteWarning)) {
                      signOut();
                      navigate("/");
                    }
                  }}
                >
                  {t.deleteBtn}
                </Button>
              </div>
            </div>
          </Section>

        </div>
      </section>

    </Layout>
  );
};

export default AccountPage;