import Layout from "@/components/Layout";

const DashboardPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-main">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-3 text-muted-foreground">
          학습 진행 상황과 추천 학습을 한눈에 확인할 수 있습니다.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">학습 진행률</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">68%</h2>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">완료한 모듈</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">5개</h2>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">다음 추천 학습</p>
            <h2 className="mt-3 text-lg font-semibold text-foreground">실전 활용</h2>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">최근 활동</p>
            <h2 className="mt-3 text-lg font-semibold text-foreground">14일 플랜 진행 중</h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold text-foreground">이번 주 학습 요약</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• 입문 모듈 완료</li>
              <li>• 기초 프롬프팅 진행 중</li>
              <li>• 총 학습 시간: 4시간 20분</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold text-foreground">추천 액션</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• 다음 학습: 실전 활용 시작</li>
              <li>• 로드맵 페이지 다시 보기</li>
              <li>• 예시 페이지에서 실무 사례 확인</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default DashboardPage;