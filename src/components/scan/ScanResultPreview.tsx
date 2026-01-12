import { CheckCircle2, XCircle, Clock, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScanResultPreviewProps {
  testId: string;
  topic?: string;
  totalQuestions: number;
  correctAnswers: number;
  results: {
    questionNumber: number;
    yourAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  onViewDetails: () => void;
  onScanAnother: () => void;
}

const ScanResultPreview = ({
  testId,
  topic,
  totalQuestions,
  correctAnswers,
  results,
  onViewDetails,
  onScanAnother,
}: ScanResultPreviewProps) => {
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const incorrectCount = totalQuestions - correctAnswers;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent work! 🌟";
    if (score >= 80) return "Great job! Keep it up! 👏";
    if (score >= 70) return "Good effort! Room to improve 💪";
    if (score >= 60) return "Keep practicing! You've got this 📚";
    return "Don't give up! Let's review together 🤝";
  };

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <Card className="text-center overflow-hidden">
        <div className="bg-gradient-to-br from-accent/10 to-primary/10 pt-8 pb-6">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
            {score}%
          </div>
          <p className="text-lg font-medium">{getScoreMessage(score)}</p>
          {topic && (
            <p className="text-sm text-muted-foreground mt-1">Topic: {topic}</p>
          )}
        </div>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{correctAnswers}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">{incorrectCount}</div>
              <div className="text-xs text-muted-foreground">Incorrect</div>
            </div>
          </div>
          <Progress value={score} className="mt-4 h-3" />
        </CardContent>
      </Card>

      {/* Quick Summary of Incorrect */}
      {incorrectCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Questions to Review ({incorrectCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results
                .filter((r) => !r.isCorrect)
                .slice(0, 5)
                .map((result) => (
                  <div
                    key={result.questionNumber}
                    className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-sm font-medium text-destructive">
                        Q{result.questionNumber}
                      </span>
                      <div>
                        <span className="text-sm">
                          Your answer: <span className="font-medium text-destructive">{result.yourAnswer}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-sm">
                      Correct: <span className="font-medium text-success">{result.correctAnswer}</span>
                    </div>
                  </div>
                ))}
              {incorrectCount > 5 && (
                <p className="text-sm text-muted-foreground text-center pt-2">
                  +{incorrectCount - 5} more questions to review
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insight Preview */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-medium mb-1">AI Learning Insight</h4>
              <p className="text-sm text-muted-foreground">
                {incorrectCount === 0
                  ? "Perfect score! You've mastered this topic. Consider moving to more challenging problems."
                  : `Based on your answers, you may want to review ${incorrectCount > 3 ? "fundamental concepts" : "specific question types"} in this topic. View detailed explanations to understand your mistakes.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Test ID: {testId} • Graded just now</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onViewDetails} className="flex-1 gap-2">
          View Detailed Explanations
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button onClick={onScanAnother} variant="outline" className="flex-1">
          Scan Another Test
        </Button>
      </div>
    </div>
  );
};

export default ScanResultPreview;
