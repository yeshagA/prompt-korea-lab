import DashboardShell from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";

const PlaygroundPage = () => {
  return (
    <DashboardShell>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground">프롬프트 플레이그라운드</h1>
        <p className="mt-3 text-muted-foreground">
          프롬프트를 직접 입력하고 AI 응답을 실습해볼 수 있는 공간입니다.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-medium text-foreground">프롬프트 입력</p>
            <textarea
              className="mt-3 w-full min-h-[220px] rounded-lg border bg-background p-3 text-sm"
              placeholder="예: 이 자기소개서를 더 명확하고 전문적으로 다듬어줘."
            />
            <div className="mt-4 flex gap-3">
              <Button>실행</Button>
              <Button variant="outline">예시 불러오기</Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-medium text-foreground">AI 응답 결과</p>
            <div className="mt-3 min-h-[220px] rounded-lg border bg-background p-4 text-sm text-muted-foreground leading-relaxed">
              AI 응답 결과가 여기에 표시됩니다.
              <br />
              <br />
              예시:
              <br />
              “지원 동기와 강점을 더 명확하게 드러내도록 문장을 구조화했습니다.”
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default PlaygroundPage;