import { useMemo, useState } from "react";
import { ShieldCheck, BookOpen, GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

type ReviewStatus = "pending" | "verified";

const initialStatuses: Record<string, ReviewStatus> = {
  "guide-brand-voice": "pending",
  "guide-rag-checklist": "pending",
  "course-prompt-basics": "verified",
  "course-team-automation": "pending",
};

const statusClasses: Record<ReviewStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  verified: "border-emerald-200 bg-emerald-50 text-emerald-700",
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
    setStatuses((prev) => ({
      ...prev,
      [id]: "verified",
    }));
  };

  return (
    <Layout>
      <section className="relative h-80 flex items-end overflow-hidden">
        <img
          src="/verify-hero.jpg"
          alt={copy.reviewer.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 w-full p-8 sm:p-12">
          <span className="inline-block rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-white">
            {copy.reviewer.heroBadge}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{copy.reviewer.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">{copy.reviewer.heroDescription}</p>
        </div>
      </section>

      <section className="section-padding korean-bg">
        <div className="container-main space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {copy.reviewer.summaryCards.map((card) => (
              <div key={card.key} className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-3 text-3xl font-bold text-foreground">
                  {summary[card.key as keyof typeof summary]}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{copy.reviewer.title}</h2>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                  {copy.reviewer.queueDescription}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{copy.reviewer.statuses.pending}</span>
              </div>
            </div>

            <Tabs defaultValue="guides" className="mt-8">
              <TabsList className="grid w-full grid-cols-2 md:w-[320px]">
                <TabsTrigger value="guides">{copy.reviewer.tabs.guides}</TabsTrigger>
                <TabsTrigger value="courses">{copy.reviewer.tabs.courses}</TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="mt-6">
                <div className="grid gap-4">
                  {copy.reviewer.guides.length === 0 && (
                    <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                      {copy.reviewer.emptyState}
                    </div>
                  )}

                  {copy.reviewer.guides.map((guide) => {
                    const status = statuses[guide.id];

                    return (
                      <article key={guide.id} className="rounded-2xl border p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <BookOpen className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-foreground">{guide.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{guide.summary}</p>
                              </div>
                            </div>

                            <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2 xl:grid-cols-4">
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.uploadedBy}</p>
                                <p>{guide.uploadedBy}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.submittedOn}</p>
                                <p>{guide.submittedOn}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.format}</p>
                                <p>{guide.format}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.contentLanguage}</p>
                                <p>{guide.contentLanguage}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.scopeGuide}</p>
                                <p>{guide.scope}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex min-w-[180px] flex-col items-start gap-3 lg:items-end">
                            <Badge variant="outline" className={cn("rounded-full px-3 py-1", statusClasses[status])}>
                              {copy.reviewer.statuses[status]}
                            </Badge>
                            <Button
                              onClick={() => handleVerify(guide.id)}
                              disabled={status === "verified"}
                              className="min-w-[140px]"
                            >
                              {status === "verified"
                                ? copy.reviewer.verifiedButton
                                : copy.reviewer.verifyButton}
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="courses" className="mt-6">
                <div className="grid gap-4">
                  {copy.reviewer.courses.length === 0 && (
                    <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                      {copy.reviewer.emptyState}
                    </div>
                  )}

                  {copy.reviewer.courses.map((course) => {
                    const status = statuses[course.id];

                    return (
                      <article key={course.id} className="rounded-2xl border p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <GraduationCap className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{course.summary}</p>
                              </div>
                            </div>

                            <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2 xl:grid-cols-4">
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.uploadedBy}</p>
                                <p>{course.uploadedBy}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.submittedOn}</p>
                                <p>{course.submittedOn}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.format}</p>
                                <p>{course.format}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.contentLanguage}</p>
                                <p>{course.contentLanguage}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.scopeCourse}</p>
                                <p>{course.scope}</p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{copy.reviewer.labels.duration}</p>
                                <p>{course.duration}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex min-w-[180px] flex-col items-start gap-3 lg:items-end">
                            <Badge variant="outline" className={cn("rounded-full px-3 py-1", statusClasses[status])}>
                              {copy.reviewer.statuses[status]}
                            </Badge>
                            <Button
                              onClick={() => handleVerify(course.id)}
                              disabled={status === "verified"}
                              className="min-w-[140px]"
                            >
                              {status === "verified"
                                ? copy.reviewer.verifiedButton
                                : copy.reviewer.verifyButton}
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReviewerPage;
