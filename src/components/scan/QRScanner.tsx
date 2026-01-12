import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export interface TestQRData {
  test_id: string;
  answer_key_id: string;
  question_count: number;
  topic?: string;
  difficulty?: string;
}

const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerElementId = "qr-reader";

  useEffect(() => {
    // Get available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          setCameras(devices);
          // Prefer back camera on mobile
          const backCamera = devices.find(
            (d) =>
              d.label.toLowerCase().includes("back") ||
              d.label.toLowerCase().includes("rear")
          );
          setCameraId(backCamera ? backCamera.id : devices[0].id);
        } else {
          setError("No cameras found on this device");
        }
      })
      .catch((err) => {
        setError("Unable to access camera. Please grant camera permissions.");
        console.error("Camera access error:", err);
      });

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!cameraId) return;

    setError(null);
    setIsScanning(true);

    try {
      const html5QrCode = new Html5Qrcode(scannerElementId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText) => {
          // Validate QR data structure
          try {
            const data = JSON.parse(decodedText) as TestQRData;
            if (data.test_id && data.answer_key_id && data.question_count) {
              stopScanning();
              onScanSuccess(decodedText);
            } else {
              setError("Invalid QR code format. Please scan a valid test QR code.");
            }
          } catch {
            setError("Invalid QR code. Please scan a Neolearn test QR code.");
          }
        },
        () => {
          // Ignore failed scans - they're normal during scanning
        }
      );
    } catch (err) {
      setError("Failed to start camera. Please try again.");
      setIsScanning(false);
      console.error("Scanner start error:", err);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const switchCamera = () => {
    if (cameras.length > 1) {
      const currentIndex = cameras.findIndex((c) => c.id === cameraId);
      const nextIndex = (currentIndex + 1) % cameras.length;
      stopScanning().then(() => {
        setCameraId(cameras[nextIndex].id);
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Scanner viewport */}
      <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
        <div id={scannerElementId} className="w-full h-full" />
        
        {!isScanning && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
              <Camera className="w-10 h-10 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground text-center px-4">
              Position the QR code within the frame to scan
            </p>
          </div>
        )}

        {/* Scanner overlay frame */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-[3px] border-accent/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
              {/* Corner indicators */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-lg" />
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center max-w-sm">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {!isScanning ? (
          <Button onClick={startScanning} disabled={!cameraId} className="gap-2">
            <Camera className="w-4 h-4" />
            Start Scanning
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={stopScanning} className="gap-2">
              <X className="w-4 h-4" />
              Stop
            </Button>
            {cameras.length > 1 && (
              <Button variant="outline" onClick={switchCamera} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Switch Camera
              </Button>
            )}
          </>
        )}
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>

      {/* Camera selector for desktop */}
      {cameras.length > 1 && !isScanning && (
        <div className="mt-4">
          <select
            value={cameraId || ""}
            onChange={(e) => setCameraId(e.target.value)}
            className="text-sm px-3 py-2 rounded-lg border border-border bg-background"
          >
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.label || `Camera ${camera.id}`}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
