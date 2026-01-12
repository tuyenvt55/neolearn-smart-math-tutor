import { Upload, Users, TrendingUp, FileText, ArrowUpRight, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Tests Graded",
    value: "234",
    change: "+12%",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Students",
    value: "89",
    change: "+3",
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Avg. Score",
    value: "78%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Reports Sent",
    value: "156",
    change: "+8",
    icon: Upload,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const recentTests = [
  { name: "Algebra Quiz - Chapter 5", class: "Grade 8A", date: "Today", students: 28, avgScore: 82 },
  { name: "Geometry Test", class: "Grade 7B", date: "Yesterday", students: 25, avgScore: 76 },
  { name: "Fractions Practice", class: "Grade 6A", date: "2 days ago", students: 30, avgScore: 71 },
];

const topStruggling = [
  { topic: "Quadratic Equations", percentage: 45 },
  { topic: "Word Problems", percentage: 38 },
  { topic: "Geometry Proofs", percentage: 32 },
];

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher" userName="Ms. Johnson">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Welcome back, Ms. Johnson!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your classes today.</p>
          </div>
          <Button variant="accent" size="lg">
            <Upload className="w-5 h-5 mr-2" />
            Upload Test
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} variant="stat">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-success mt-1 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change} this week
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Tests */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
              <CardDescription>Tests graded in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{test.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <span>{test.class}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {test.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{test.avgScore}%</div>
                      <div className="text-sm text-muted-foreground">{test.students} students</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Tests
              </Button>
            </CardContent>
          </Card>

          {/* Struggling Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Topics Needing Attention</CardTitle>
              <CardDescription>Based on class-wide error analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topStruggling.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{topic.topic}</span>
                      <span className="text-muted-foreground">{topic.percentage}% struggling</span>
                    </div>
                    <Progress value={topic.percentage} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-accent font-medium">💡 AI Suggestion</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider reviewing quadratic equations with visual examples before the next test.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
