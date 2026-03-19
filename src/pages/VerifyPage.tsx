import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type ResultState = "idle" | "valid" | "revoked" | "not-found";

const mockData: Record<string, { state: "valid" | "revoked"; name?: string; course?: string; date?: string; reason?: string }> = {
  "LPK-2026-001": { state: "valid", name: "김민수", course: "기초 프롬프팅 과정", date: "2026-02-15" },
  "LPK-2026-002": { state: "revoked", reason: "학습 과정 미이수로 인한 취소" },
};

const VerifyPage = () => {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<ResultState>("idle");
  const [data, setData] = useState<(typeof mockData)[string] | null>(null);

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

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground">인증 확인</h1>
          <p className="mt-3 text-base text-muted-foreground">
            인증서 ID를 입력하여 수료 여부를 확인하세요.
          </p>
          <div className="mt-8">
            <label className="block text-sm font-medium text-foreground text-left mb-1.5">인증서 ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="예) LPK-2026-001"
                className="flex-1 rounded-md border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button onClick={handleVerify}>인증 확인</Button>
            </div>
          </div>

          {result === "valid" && data && (
            <div className="mt-8 bg-card rounded-lg border border-accent/30 p-6 text-left">
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle className="h-5 w-5" />
                <h3 className="font-semibold">유효한 인증서입니다</h3>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">이름</dt><dd className="font-medium text-foreground">{data.name}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">과정명</dt><dd className="font-medium text-foreground">{data.course}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">발급일</dt><dd className="font-medium text-foreground">{data.date}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">상태</dt><dd className="font-medium text-accent">Valid</dd></div>
              </dl>
            </div>
          )}

          {result === "revoked" && data && (
            <div className="mt-8 bg-card rounded-lg border border-destructive/30 p-6 text-left">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                <h3 className="font-semibold">취소된 인증서입니다</h3>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">상태</dt><dd className="font-medium text-destructive">Revoked</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">사유</dt><dd className="font-medium text-foreground">{data.reason}</dd></div>
              </dl>
            </div>
          )}

          {result === "not-found" && (
            <div className="mt-8 bg-card rounded-lg border p-6 text-left">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold text-foreground">인증서를 찾을 수 없습니다</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">입력한 인증서 ID를 다시 확인해주세요.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default VerifyPage;
