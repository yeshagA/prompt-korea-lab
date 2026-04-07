import { useMemo, useState } from "react";
import { ShieldCheck, BookOpen, GraduationCap, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/context/I18nContext";

type ReviewStatus = "pending" | "verified";

const initialStatuses: Record<string, ReviewStatus> = {
  "guide-brand-voice": "pending",
  "guide-rag-checklist": "pending",
  "course-prompt-basics": "verified",
  "course-team-automation": "pending",
};

const ReviewerPage = () => {
  const { copy } = useI18n();
  const [statuses, setStatuses] = useState<Record<string, ReviewStatus>>(initialStatuses);

  const allItems = useMemo(
    () => [...copy.reviewer.guides, ...copy.reviewer.courses],
    [copy.reviewer.courses, copy.reviewer.guides]
  );

  const summary = useMemo(() => {
    const total = allItems.length;
    const pending = allItems.filter((item) => statuses[item.id] === "pending").length;
    const verified = total - pending;
    return { total, pending, verified };
  }, [allItems, statuses]);

  const handleVerify = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "verified" }));
  };

  // ─── Shared card renderer ────────────────────────────────────────────
  const renderItem = (
    item: typeof copy.reviewer.guides[0] & { duration?: string },
    type: "guide" | "course"
  ) => {
    const status = statuses[item.id];
    const isPending = status === "pending";

    return (
      <article
        key={item.id}
        className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
      >
        {/* Header strip */}
        <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
              {type === "guide"
                ? <BookOpen className="h-4 w-4 text-primary" />
                : <GraduationCap className="h-4 w-4 text-primary" />
              }
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground leading-snug">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{item.summary}</p>
            </div>
          </div>

          {/* Status badge */}
          <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
            isPending
              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
              : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
          }`}>
            {copy.reviewer.statuses[status]}
          </span>
        </div>

        {/* Metadata grid */}
        <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-border">
          {[
            { label: copy.reviewer.labels.uploadedBy, value: item.uploadedBy },
            { label: copy.reviewer.labels.submittedOn, value: item.submittedOn },
            { label: copy.reviewer.labels.format, value: item.format },
            { label: copy.reviewer.labels.contentLanguage, value: item.contentLanguage },
            {
              label: type === "guide"
                ? copy.reviewer.labels.scopeGuide
                : copy.reviewer.labels.scopeCourse,
              value: item.scope
            },
            ...(type === "course" && item.duration
              ? [{ label: copy.reviewer.labels.duration, value: item.duration }]
              : []
            ),
          ].map((row) => (
            <div key={row.label}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                {row.label}
              </p>
              <p className="text-sm text-foreground">{row.value}</p>
            </div>
          ))}
        </div>

        {/* Action row */}
        <div className="px-6 py-4 flex items-center justify-end">
          <Button
            size="sm"
            onClick={() => handleVerify(item.id)}
            disabled={!isPending}
            variant={isPending ? "default" : "outline"}
            className={!isPending ? "text-emerald-600 border-emerald-200 dark:border-emerald-800" : ""}
          >
            {!isPending && <Check className="h-3.5 w-3.5 mr-1.5" />}
            {isPending ? copy.reviewer.verifyButton : copy.reviewer.verifiedButton}
          </Button>
        </div>
      </article>
    );
  };

  return (
    <Layout>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="korean-bg border-b border-border">
        <div className="container-main py-16 sm:py-24 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/70 mb-5 border border-primary/20 rounded-full px-3 py-1">
              {copy.reviewer.heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              {copy.reviewer.title}
            </h1>
            <p className="mt-5 text-base text-muted-foreground max-w-xl leading-relaxed">
              {copy.reviewer.heroDescription}
            </p>
          </div>
          <div className="shrink-0 w-20 h-20 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center self-start sm:self-auto">
            <ShieldCheck className="h-9 w-9 text-primary" />
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-3 divide-x divide-border">
            {copy.reviewer.summaryCards.map((card) => (
              <div key={card.key} className="py-6 px-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {summary[card.key as keyof typeof summary]}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Queue ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-main">

          {/* Section header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {copy.reviewer.heroBadge}
            </p>
            <h2 className="text-2xl font-bold text-foreground">{copy.reviewer.queueDescription}</h2>
          </div>

          <Tabs defaultValue="guides">
            <TabsList className="mb-6 h-9 rounded-lg border border-border bg-muted/40 p-1 w-fit">
              <TabsTrigger value="guides" className="rounded-md text-sm px-4">
                {copy.reviewer.tabs.guides}
              </TabsTrigger>
              <TabsTrigger value="courses" className="rounded-md text-sm px-4">
                {copy.reviewer.tabs.courses}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-4">
              {copy.reviewer.guides.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
                  {copy.reviewer.emptyState}
                </div>
              ) : (
                copy.reviewer.guides.map((guide) => renderItem(guide, "guide"))
              )}
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              {copy.reviewer.courses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
                  {copy.reviewer.emptyState}
                </div>
              ) : (
                copy.reviewer.courses.map((course) => renderItem(course as any, "course"))
              )}
            </TabsContent>
          </Tabs>

        </div>
      </section>

    </Layout>
  );
};

export default ReviewerPage;