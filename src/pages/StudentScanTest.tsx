import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, CheckCircle2, ArrowLeft } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRScanner, { TestQRData } from "@/components/scan/QRScanner";
import AnswerSheetCapture from "@/components/scan/AnswerSheetCapture";
import ScanResultPreview from "@/components/scan/ScanResultPreview";
import { useToast } from "@/hooks/use-toast";

type ScanStep = "scan-qr" | "capture-sheet" | "processing" | "results";

// Mock grading function - in production, this would call the backend
const mockGradeAnswers = async (
  testData: TestQRData,
  _images: File[]
): Promise<{
  correctAnswers: number;
  results: { questionNumber: number; yourAnswer: string; correctAnswer: string; isCorrect: boolean }[];
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate mock results
  const results = [];
  let correctCount = 0;

  for (let i = 1; i <= testData.question_count; i++) {
    const answers = ["A", "B", "C", "D"];
    const correctAnswer = answers[Math.floor(Math.random() * 4)];
    const yourAnswer = answers[Math.floor(Math.random() * 4)];
    const isCorrect = Math.random() > 0.25; // 75% correct rate for demo

    results.push({
      questionNumber: i,
      yourAnswer: isCorrect ? correctAnswer : yourAnswer,
      correctAnswer,
      isCorrect,
    });

    if (isCorrect) correctCount++;
  }

  return { correctAnswers: correctCount, results };
};

const StudentScanTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<ScanStep>("scan-qr");
  const [testData, setTestData] = useState<TestQRData | null>(null);
  const [gradingResult, setGradingResult] = useState<{
    correctAnswers: number;
    results: { questionNumber: number; yourAnswer: string; correctAnswer: string; isCorrect: boolean }[];
  } | null>(null);

  const handleQRScanSuccess = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText) as TestQRData;
      setTestData(data);
      setStep("capture-sheet");
      toast({
        title: "QR Code Scanned!",
        description: `Test detected: ${data.question_count} questions${data.topic ? ` • ${data.topic}` : ""}`,
      });
    } catch {
      toast({
        title: "Invalid QR Code",
        description: "Please scan a valid Neolearn test QR code.",
        variant: "destructive",
      });
    }
  };

  const handleSheetCapture = async (images: File[]) => {
    if (!testData) return;

    setStep("processing");

    try {
      const result = await mockGradeAnswers(testData, images);
      setGradingResult(result);
      setStep("results");
      toast({
        title: "Grading Complete!",
        description: `You scored ${result.correctAnswers}/${testData.question_count}`,
      });
    } catch (error) {
      toast({
        title: "Grading Failed",
        description: "There was an error processing your answer sheet. Please try again.",
        variant: "destructive",
      });
      setStep("capture-sheet");
    }
  };

  const resetScan = () => {
    setStep("scan-qr");
    setTestData(null);
    setGradingResult(null);
  };

  const handleViewDetails = () => {
    // Navigate to detailed review page (to be implemented)
    navigate("/dashboard/student/review");
  };

  return (
    <DashboardLayout role="student" userName="Alex Chen">
      <div className="p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 gap-2"
            onClick={() => navigate("/dashboard/student")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <QrCode className="w-8 h-8 text-accent" />
            Scan Paper Test
          </h1>
          <p className="text-muted-foreground mt-1">
            Scan your test QR code and capture your answer sheet for instant grading
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { id: "scan-qr", label: "Scan QR" },
            { id: "capture-sheet", label: "Capture Sheet" },
            { id: "results", label: "View Results" },
          ].map((s, index) => {
            const stepOrder = ["scan-qr", "capture-sheet", "processing", "results"];
            const currentStepIndex = stepOrder.indexOf(step);
            const thisStepIndex = stepOrder.indexOf(s.id);
            const isActive = step === s.id || (s.id === "results" && step === "processing");
            const isComplete = thisStepIndex < currentStepIndex;

            return (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isComplete
                      ? "bg-success/10 text-success"
                      : isActive
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                  )}
                  {s.label}
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-2 ${isComplete ? "bg-success" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === "scan-qr" && "Step 1: Scan Test QR Code"}
              {step === "capture-sheet" && "Step 2: Capture Answer Sheet"}
              {step === "processing" && "Processing Your Answers..."}
              {step === "results" && "Your Results"}
            </CardTitle>
            <CardDescription>
              {step === "scan-qr" && "Point your camera at the QR code on your test paper"}
              {step === "capture-sheet" && "Take a clear photo of your completed answer sheet"}
              {step === "processing" && "Our AI is analyzing your answers. This may take a moment."}
              {step === "results" && "Here's how you did on this test"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "scan-qr" && (
              <QRScanner
                onScanSuccess={handleQRScanSuccess}
                onClose={() => navigate("/dashboard/student")}
              />
            )}

            {step === "capture-sheet" && testData && (
              <AnswerSheetCapture
                onCapture={handleSheetCapture}
                onBack={resetScan}
                questionCount={testData.question_count}
              />
            )}

            {step === "processing" && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <QrCode className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Analyzing your answers...</p>
                  <p className="text-sm text-muted-foreground">
                    Using AI to grade and generate explanations
                  </p>
                </div>
                <div className="mt-6 flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === "results" && testData && gradingResult && (
              <ScanResultPreview
                testId={testData.test_id}
                topic={testData.topic}
                totalQuestions={testData.question_count}
                correctAnswers={gradingResult.correctAnswers}
                results={gradingResult.results}
                onViewDetails={handleViewDetails}
                onScanAnother={resetScan}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentScanTest;
