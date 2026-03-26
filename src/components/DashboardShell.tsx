import { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, User, LayoutDashboard, BarChart3, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const DashboardShell = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "User";

  const displayRole =
    user?.role === "student"
      ? "Student"
      : user?.role === "job-seeker"
      ? "Job Seeker"
      : user?.role === "employee"
      ? "Employee"
      : "Member";

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const sidebarItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Playground", path: "/playground", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="h-16 border-b bg-card flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            className="h-10 w-10 rounded-lg border bg-background flex items-center justify-center hover:bg-muted"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>

          <span className="text-base font-semibold">Dashboard</span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </div>

          <div className="rounded-full border bg-background px-4 py-2 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{displayRole}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 min-h-[calc(100vh-64px)] border-r bg-card p-5">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Workspace</h2>

            <div className="rounded-2xl border bg-background p-4 mb-6">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="mt-2 font-semibold text-foreground">{displayName}</p>
              <p className="text-sm text-muted-foreground">{displayRole}</p>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl border bg-background p-4">
              <p className="text-sm font-medium text-foreground">Today’s Focus</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Continue your current path and try one prompt in the playground.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm text-muted-foreground hover:bg-muted md:hidden"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-8 bg-background">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;