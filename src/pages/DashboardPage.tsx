import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, BarChart3, Target, Award } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "사용자";

  const displayRole =
    user?.role === "student"
      ? "학생 경로"
      : user?.role === "job-seeker"
      ? "취업준비생 경로"
      : user?.role === "employee"
      ? "직장인 경로"
      : "일반 경로";

  return (
    <DashboardShell>
      <div className="max-w-6xl">
        <div className="rounded-2xl border bg-card p-8">
          <p className="text-sm text-primary font-medium">{displayRole}</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            다시 오신 것을 환영합니다, {displayName}
          </h1>
          <p className="mt-3 text-muted-foreground">
            오늘의 학습 목표를 확인하고 계속 진행해보세요.
          </p>

          <div className="mt-6 flex gap-3">
            <Link to="/learn">
              <Button>학습 계속하기</Button>
            </Link>
            <Link to="/playground">
              <Button variant="outline">플레이그라운드 열기</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">학습 진행률</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">68%</h2>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-[68%] rounded-full bg-primary" />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">완료한 모듈</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">5개</h2>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">다음 추천 학습</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">실전 활용</h2>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">인증 상태</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">진행 중</h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">오늘의 프롬프트</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                이 자기소개 문장을 더 자신감 있고 전문적으로 면접용으로 다듬어줘.
              </p>
              <Link to="/playground" className="mt-5 inline-block">
                <Button size="sm">실행하기</Button>
              </Link>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">주간 미션</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• 실전 활용 모듈 완료하기</li>
                <li>• 프롬프트 1회 실습하기</li>
                <li>• 한국형 활용 예시 1개 확인하기</li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">최근 활동</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• 입문 모듈 완료</li>
                <li>• 기초 프롬프팅 진행 중</li>
                <li>• 이번 주 총 학습 시간: 4시간 20분</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">빠른 이동</h3>
              <div className="mt-4 space-y-3">
                <Link to="/learn" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    학습 계속하기
                  </Button>
                </Link>
                <Link to="/analytics" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    분석 보기
                  </Button>
                </Link>
                <Link to="/examples" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    활용 예시 보기
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">학습 성과</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                현재 5개의 모듈을 완료했으며 인증 취득 경로를 잘 따라가고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;