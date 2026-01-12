import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Users,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Bell,
} from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "teacher" | "student" | "parent";
  userName?: string;
}

const navigationByRole = {
  teacher: [
    { name: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
    { name: "Upload Tests", href: "/dashboard/teacher/upload", icon: Upload },
    { name: "Students", href: "/dashboard/teacher/students", icon: Users },
    { name: "Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3 },
    { name: "Reports", href: "/dashboard/teacher/reports", icon: FileText },
  ],
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
    { name: "My Scores", href: "/dashboard/student/scores", icon: TrendingUp },
    { name: "Review Mistakes", href: "/dashboard/student/review", icon: BookOpen },
    { name: "Learning Path", href: "/dashboard/student/learning", icon: GraduationCap },
  ],
  parent: [
    { name: "Dashboard", href: "/dashboard/parent", icon: LayoutDashboard },
    { name: "Child's Progress", href: "/dashboard/parent/progress", icon: TrendingUp },
    { name: "Reports", href: "/dashboard/parent/reports", icon: FileText },
    { name: "Notifications", href: "/dashboard/parent/notifications", icon: Bell },
  ],
};

const DashboardLayout = ({ children, role, userName = "User" }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigation = navigationByRole[role];

  const roleColors = {
    teacher: "from-primary to-primary/80",
    student: "from-accent to-accent/80",
    parent: "from-success to-success/80",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Logo />
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleColors[role]} flex items-center justify-center text-primary-foreground font-semibold`}>
              {userName.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-sm">{userName}</div>
              <div className="text-xs text-muted-foreground capitalize">{role}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-1">
          <Link
            to="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
