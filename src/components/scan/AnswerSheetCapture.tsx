import { useState, useRef } from "react";
import { Camera, Upload, X, Check, RotateCcw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AnswerSheetCaptureProps {
  onCapture: (images: File[]) => void;
  onBack: () => void;
  questionCount: number;
}

const AnswerSheetCapture = ({ onCapture, onBack, questionCount }: AnswerSheetCaptureProps) => {
  const [capturedImages, setCapturedImages] = useState<{ file: File; preview: string }[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCapturing(true);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Unable to access camera. Please upload an image instead.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `answer-sheet-${Date.now()}.jpg`, {
                type: "image/jpeg",
              });
              const preview = URL.createObjectURL(blob);
              setCapturedImages((prev) => [...prev, { file, preview }]);
              stopCamera();
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          setCapturedImages((prev) => [...prev, { file, preview }]);
        }
      });
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = () => {
    if (capturedImages.length > 0) {
      onCapture(capturedImages.map((img) => img.file));
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Capture Your Answer Sheet</h3>
        <p className="text-sm text-muted-foreground">
          Take a clear photo of your answer sheet ({questionCount} questions).
          Make sure all answers are visible and well-lit.
        </p>
      </div>

      {/* Camera view */}
      {isCapturing && (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] max-w-md mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <Button
              onClick={capturePhoto}
              size="lg"
              className="rounded-full w-16 h-16 p-0 bg-white hover:bg-white/90"
            >
              <div className="w-12 h-12 rounded-full border-4 border-accent" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={stopCamera}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Captured images preview */}
      {capturedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Captured Images ({capturedImages.length})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {capturedImages.map((img, index) => (
              <Card key={index} className="relative group overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={img.preview}
                    alt={`Answer sheet ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Page {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!isCapturing && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={startCamera} variant="outline" className="gap-2">
            <Camera className="w-4 h-4" />
            {capturedImages.length > 0 ? "Add Another Photo" : "Take Photo"}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Submit / Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Scan Different QR
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={capturedImages.length === 0}
          className="gap-2"
        >
          <Check className="w-4 h-4" />
          Submit for Grading
        </Button>
      </div>

      {/* Tips */}
      <div className="bg-muted/50 rounded-xl p-4">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-accent" />
          Tips for Best Results
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Ensure good lighting - avoid shadows on the paper</li>
          <li>• Keep the camera steady and parallel to the sheet</li>
          <li>• Make sure all answer bubbles are clearly visible</li>
          <li>• Capture the entire answer sheet including edges</li>
        </ul>
      </div>
    </div>
  );
};

export default AnswerSheetCapture;
