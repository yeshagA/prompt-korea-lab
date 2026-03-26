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
      alert("Invalid email or password.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-main max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Log In</h1>
          <p className="mt-3 text-muted-foreground">
            Enter your email and password to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-card rounded-xl border p-6">
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
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;