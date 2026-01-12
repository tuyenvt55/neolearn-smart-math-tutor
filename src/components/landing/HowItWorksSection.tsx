import { Upload, Brain, Send, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Answer Sheets",
    description: "Teachers scan and upload multiple-choice answer sheets. Our system accepts images and PDFs.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Processes & Grades",
    description: "Advanced OCR extracts answers, compares with answer keys, and calculates scores instantly.",
  },
  {
    icon: Send,
    step: "03",
    title: "Generate Insights",
    description: "AI analyzes mistakes, creates explanations, and generates personalized learning recommendations.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Share & Improve",
    description: "Students and parents receive detailed reports with actionable steps to improve performance.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            How <span className="gradient-text">Neolearn</span> Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple four-step process that transforms how schools approach math education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-accent/10" />
              )}

              <div className="relative bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lifted transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent text-accent-foreground font-display font-bold text-sm flex items-center justify-center shadow-glow">
                  {step.step}
                </div>

                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
