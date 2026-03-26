import DashboardShell from "@/components/DashboardShell";

const AnalyticsPage = () => {
  return (
    <DashboardShell>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground">분석</h1>
        <p className="mt-3 text-muted-foreground">
          학습 시간, 완료율, 인기 모듈 등 핵심 지표를 확인할 수 있습니다.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">총 학습 시간</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">12시간 40분</h2>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">완료율</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">74%</h2>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">인기 모듈</p>
            <h2 className="mt-3 text-lg font-semibold text-foreground">실전 활용</h2>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">가장 많이 선택된 경로</p>
            <h2 className="mt-3 text-lg font-semibold text-foreground">14일 플랜</h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">학습 추세</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• 이번 주 학습 시간 증가</li>
              <li>• 기초 프롬프팅 완료율 상승</li>
              <li>• 실전 활용 모듈 방문 증가</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">추천 인사이트</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• 14일 플랜 사용자가 가장 많습니다</li>
              <li>• 활용 예시 페이지 체류 시간이 높습니다</li>
              <li>• 인증 확인 기능에 대한 관심이 증가하고 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default AnalyticsPage;