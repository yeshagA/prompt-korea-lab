import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProfileSetupPage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [role, setRole] = useState(user?.role || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      role: role as "student" | "job-seeker" | "employee" | "other",
    });
    navigate("/dashboard");
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">프로필 설정</h1>
          <p className="mt-3 text-muted-foreground">
            학습을 시작하기 전에 기본 정보를 입력해주세요.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-card rounded-xl border p-6">
            <div>
              <label className="text-sm font-medium">이름</label>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">성</label>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">이메일</label>
              <input
                type="email"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div>
              <label className="text-sm font-medium">사용자 유형</label>
              <select
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">선택하세요</option>
                <option value="student">학생</option>
                <option value="job-seeker">취업준비생</option>
                <option value="employee">직장인 / 기업 구성원</option>
                <option value="other">기타</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              저장하고 계속하기
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ProfileSetupPage;