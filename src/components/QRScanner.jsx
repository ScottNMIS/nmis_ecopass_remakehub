import React, { useState, useEffect } from 'react';
import { QrCode, X, Camera } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const QRScanner = ({ isOpen, onClose, onScan }) => {
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        if (isOpen) {
            startScanning();
        } else {
            stopScanning();
        }
        return () => stopScanning();
    }, [isOpen]);

    const startScanning = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setStream(mediaStream);
            setScanning(true);
            setError(null);

            // In a real implementation, you would initialize a QR code scanning library here
            // For example, using jsQR or zxing
            // This is a mock implementation that simulates scanning after 2 seconds
            setTimeout(() => {
                const mockResult = {
                    productId: "12345",
                    timestamp: new Date().toISOString()
                };
                onScan(mockResult);
            }, 2000);

        } catch (err) {
            setError("Unable to access camera. Please ensure you have granted camera permissions.");
            console.error('Camera access error:', err);
        }
    };

    const stopScanning = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setScanning(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            stopScanning();
            onClose();
        }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Scan Product QR Code
                    </DialogTitle>
                    <DialogDescription>
                        Position the QR code within the frame to scan automatically.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Camera Preview */}
                    <div className="w-full aspect-square bg-black rounded-lg relative overflow-hidden">
                        {stream ? (
                            <video
                                autoPlay
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Camera className="h-16 w-16 text-gray-400" />
                            </div>
                        )}

                        {/* Scanning Overlay */}
                        {scanning && (
                            <div className="absolute inset-0 border-2 border-blue-500 animate-pulse">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-scan" />
                            </div>
                        )}
                    </div>

                    <div className="text-sm text-gray-500 text-center">
                        {scanning ? (
                            "Scanning... Please hold steady"
                        ) : (
                            "Camera access required for scanning"
                        )}
                    </div>

                    <div className="flex justify-end w-full">
                        <Button
                            variant="outline"
                            onClick={() => {
                                stopScanning();
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QRScanner;