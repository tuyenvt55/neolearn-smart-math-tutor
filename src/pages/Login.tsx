import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, User, Users, School, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";

type UserRole = "teacher" | "student" | "parent" | null;

const roles = [
  {
    id: "teacher" as const,
    title: "Teacher",
    description: "Upload tests, view analytics, manage classes",
    icon: School,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "student" as const,
    title: "Student",
    description: "View scores, learn from explanations",
    icon: User,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "parent" as const,
    title: "Parent",
    description: "Track your child's progress",
    icon: Users,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="large" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        <Card variant="glass" className="animate-scale-in">
          <CardHeader>
            <CardTitle className="text-lg">Select Your Role</CardTitle>
            <CardDescription>Choose how you want to sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:-translate-y-1 ${
                    selectedRole === role.id
                      ? "border-accent bg-accent/10 shadow-glow"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${role.bgColor} flex items-center justify-center mx-auto mb-2`}>
                    <role.icon className={`w-5 h-5 ${role.color}`} />
                  </div>
                  <div className="text-sm font-medium">{role.title}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!selectedRole}
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-accent hover:underline font-medium">
                  Contact your school admin
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Demo mode: Click any role to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
