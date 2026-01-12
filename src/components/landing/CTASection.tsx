import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  "Reduce grading time by 90%",
  "Personalized feedback for every student",
  "Real-time progress tracking",
  "Parent engagement tools included",
  "Free onboarding and training",
  "24/7 support for educators",
];

const CTASection = () => {
  return (
    <section id="for-schools" className="py-24 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Transform Your School's Math Program?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join hundreds of schools already using Neolearn to help students excel in mathematics.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="xl"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                asChild
              >
                <Link to="/login">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule Demo
              </Button>
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
              <div className="text-center mb-6">
                <div className="text-5xl font-display font-bold text-primary-foreground mb-2">Free</div>
                <div className="text-primary-foreground/70">for 30 days, no credit card required</div>
              </div>

              <div className="space-y-4 text-primary-foreground/90">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Unlimited answer sheet uploads</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>AI-powered error analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Parent report generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Up to 5 teacher accounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Priority email support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
