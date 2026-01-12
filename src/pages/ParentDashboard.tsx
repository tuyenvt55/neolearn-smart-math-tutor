import { TrendingUp, Award, Calendar, Bell, Download, ChevronRight, Star, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Current Average",
    value: "82%",
    subtitle: "Class avg: 76%",
    icon: Award,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Tests This Month",
    value: "4",
    subtitle: "All completed",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Improvement",
    value: "+12%",
    subtitle: "Since September",
    icon: TrendingUp,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const recentReports = [
  { name: "Weekly Progress Report", date: "Jan 10, 2026", type: "Weekly" },
  { name: "December Summary", date: "Jan 1, 2026", type: "Monthly" },
  { name: "Semester 1 Report Card", date: "Dec 20, 2025", type: "Semester" },
];

const keyInsights = [
  {
    type: "strength",
    title: "Strong in Linear Equations",
    description: "Alex consistently scores above 90% in this topic. Keep encouraging this!",
    icon: Star,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "attention",
    title: "Needs Help with Word Problems",
    description: "Practice reading and understanding word problems together at home.",
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const recommendations = [
  "Practice 10-15 minutes of math daily for best results",
  "Review incorrect questions together using the explanations provided",
  "Celebrate improvements, no matter how small!",
  "Consider extra practice worksheets for geometry topics",
];

const ParentDashboard = () => {
  return (
    <DashboardLayout role="parent" userName="Mrs. Chen">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Alex's Learning Journey</h1>
            <p className="text-muted-foreground mt-1">Stay informed about your child's progress in mathematics.</p>
          </div>
          <Button variant="accent">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} variant="stat">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Key Insights */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-display font-semibold">Key Insights</h2>
            {keyInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <insight.icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Download detailed progress reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                  >
                    <div>
                      <div className="text-sm font-medium">{report.name}</div>
                      <div className="text-xs text-muted-foreground">{report.date}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              How You Can Help at Home
            </CardTitle>
            <CardDescription>Personalized recommendations based on Alex's performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10"
                >
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Encouraging Note */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🌟</div>
            <div>
              <h3 className="font-display font-bold text-xl mb-2">Alex is on the right track!</h3>
              <p className="text-primary-foreground/80">
                With consistent practice and your support, Alex is showing steady improvement. 
                Keep celebrating the small wins – they add up to big achievements!
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
