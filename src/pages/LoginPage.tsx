import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = signIn(email, password);

    if (!success) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-foreground">로그인</h1>
          <p className="mt-3 text-muted-foreground">
            이메일과 비밀번호를 입력하여 계속하세요.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-card rounded-xl border p-6">
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
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;