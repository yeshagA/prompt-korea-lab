import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const SignUpPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValid) {
      alert("비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자를 각각 1개 이상 포함해야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    signUp(email, password);
    navigate("/profile-setup");
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-foreground">회원가입</h1>
          <p className="mt-3 text-muted-foreground">
            계정을 만들어 강의, 대시보드, 분석, 프롬프트 실습을 이용하세요.
          </p>

          <div className="mt-8 space-y-3">
            <Button variant="outline" className="w-full">Google로 계속하기</Button>
            <Button variant="outline" className="w-full">카카오로 계속하기</Button>
            <Button variant="outline" className="w-full">네이버로 계속하기</Button>
          </div>

          <div className="my-6 text-center text-sm text-muted-foreground">
            또는 이메일로 가입하기
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-xl border p-6">
            <div>
              <label className="text-sm font-medium">이메일</label>
              <input
                type="email"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">비밀번호</label>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 만들어주세요"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                최소 8자 이상, 대문자 1개, 소문자 1개, 숫자 1개를 포함해야 합니다.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">비밀번호 확인</label>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              계정 만들기
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default SignUpPage;