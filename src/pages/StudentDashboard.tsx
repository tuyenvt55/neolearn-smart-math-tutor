import { BookOpen, TrendingUp, Award, Target, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Overall Score",
    value: "82%",
    subtitle: "Above class average",
    icon: Award,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Tests Completed",
    value: "12",
    subtitle: "This semester",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Improvement",
    value: "+8%",
    subtitle: "From last month",
    icon: TrendingUp,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Mastered Topics",
    value: "7/12",
    subtitle: "Topics completed",
    icon: Target,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const recentMistakes = [
  {
    question: "Solve for x: 2x² + 5x - 3 = 0",
    yourAnswer: "x = 1, x = -3",
    correctAnswer: "x = 0.5, x = -3",
    explanation: "When using the quadratic formula, remember to divide the entire expression by 2a, not just the numerator.",
    topic: "Quadratic Equations",
  },
  {
    question: "Find the area of a triangle with base 8cm and height 5cm",
    yourAnswer: "40 cm²",
    correctAnswer: "20 cm²",
    explanation: "The area of a triangle is (base × height) / 2. Don't forget to divide by 2!",
    topic: "Geometry",
  },
];

const strengths = [
  { topic: "Linear Equations", score: 95 },
  { topic: "Basic Algebra", score: 92 },
  { topic: "Number Operations", score: 88 },
];

const weaknesses = [
  { topic: "Quadratic Equations", score: 65 },
  { topic: "Word Problems", score: 70 },
  { topic: "Geometry Proofs", score: 72 },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" userName="Alex Chen">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Hey Alex! 👋</h1>
          <p className="text-muted-foreground mt-1">Keep up the great work! You're improving every day.</p>
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

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Your Strengths
              </CardTitle>
              <CardDescription>Topics you're doing great in!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strengths.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.topic}</span>
                      <span className="text-success font-semibold">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas to Improve */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-warning" />
                Areas to Improve
              </CardTitle>
              <CardDescription>Focus on these topics to boost your score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weaknesses.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.topic}</span>
                      <span className="text-warning font-semibold">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Mistakes with Explanations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              Learn from Your Mistakes
            </CardTitle>
            <CardDescription>AI-powered explanations to help you understand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentMistakes.map((mistake, index) => (
                <div key={index} className="p-5 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">{mistake.topic}</div>
                      <div className="font-medium mb-3">{mistake.question}</div>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="text-xs text-destructive font-medium mb-1">Your Answer</div>
                          <div className="text-sm">{mistake.yourAnswer}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                          <div className="text-xs text-success font-medium mb-1">Correct Answer</div>
                          <div className="text-sm">{mistake.correctAnswer}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                        <div className="flex items-center gap-2 text-accent font-medium text-sm mb-2">
                          <Lightbulb className="w-4 h-4" />
                          AI Explanation
                        </div>
                        <p className="text-sm text-muted-foreground">{mistake.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
