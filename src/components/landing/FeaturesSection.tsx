import { Brain, BarChart3, FileText, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Instant Grading",
    description: "Upload scanned answer sheets and get instant, accurate grades. Our OCR technology processes multiple-choice answers in seconds.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Brain,
    title: "AI Error Analysis",
    description: "Understand why students make mistakes. Our AI identifies conceptual gaps, calculation errors, and careless mistakes.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: FileText,
    title: "Smart Explanations",
    description: "Generate step-by-step solutions with clear, student-friendly explanations for every incorrect answer.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Users,
    title: "Parent Reports",
    description: "Automatically generate easy-to-understand reports that help parents support their child's learning journey.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Track performance over time with beautiful visualizations. Identify trends and celebrate improvements.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Student data is protected with enterprise-grade security. FERPA and GDPR compliant.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Empower Learning</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From instant grading to personalized insights, Neolearn provides the tools educators need to help every student succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="feature"
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
