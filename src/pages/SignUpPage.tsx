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
    alert("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  signUp(email, password);
  navigate("/profile-setup");
};

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Sign Up</h1>
          <p className="mt-3 text-muted-foreground">
            Create your account to access courses, dashboard, analytics, and prompt playground.
          </p>

          <div className="mt-8 space-y-3">
            <Button variant="outline" className="w-full">Continue with Google</Button>
            <Button variant="outline" className="w-full">Continue with Kakao</Button>
            <Button variant="outline" className="w-full">Continue with Naver</Button>
          </div>

          <div className="my-6 text-center text-sm text-muted-foreground">or sign up with email</div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-xl border p-6">
            <div>
              <label className="text-sm font-medium">Email</label>
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
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Must be at least 8 characters and include 1 uppercase letter, 1 lowercase letter, and 1 number.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default SignUpPage;