// MESHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, PackagePlus, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from './auth/AuthContext';
import AuthDialog from './AuthDialog';
import QRScanner from './QRScanner';
import IndustrialLayout from './IndustrialLayout';

const MESHome = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showAuth, setShowAuth] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    const handleCreateDPP = () => {
        if (isAuthenticated) {
            navigate('/mes/initialize');
        } else {
            setShowAuth(true);
        }
    };

    const handleScanQR = () => {
        setShowScanner(true);
    };

    const handleScanResult = (result) => {
        // Handle the QR scan result
        console.log('Scanned:', result);
        setShowScanner(false);
        // Navigate to product details or handle the scanned data
        // navigate(`/product/${result}`);
    };

    return (
        <IndustrialLayout>
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Digital Product Passport System
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Create and manage digital product passports or scan existing products
                            to view their lifecycle information.
                        </p>
                    </div>

                    {/* Main Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Scan QR Code Card */}
                        <Card
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={handleScanQR}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <QrCode className="h-8 w-8 text-blue-600" />
                                    <CardTitle>Scan QR Code</CardTitle>
                                </div>
                                <CardDescription>
                                    Scan a product's QR code to view its digital passport
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">
                                            Click to open scanner
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Create New DPP Card */}
                        <Card
                            className={`cursor-pointer transition-shadow ${
                                isAuthenticated ? 'hover:shadow-lg' : 'opacity-75'
                            }`}
                            onClick={handleCreateDPP}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <PackagePlus className="h-8 w-8 text-blue-600" />
                                    <CardTitle>Create New DPP</CardTitle>
                                    {!isAuthenticated && (
                                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                                    )}
                                </div>
                                <CardDescription>
                                    Initialize a new Digital Product Passport
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                        {isAuthenticated ? (
                                            <p className="text-sm text-gray-600">
                                                Click to create a new DPP
                                            </p>
                                        ) : (
                                            <p className="text-sm text-yellow-600">
                                                Login required to create DPP
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* QR Scanner Dialog */}
            {showScanner && (
                <QRScanner
                    isOpen={showScanner}
                    onClose={() => setShowScanner(false)}
                    onScan={handleScanResult}
                />
            )}

            {/* Auth Dialog */}
            <AuthDialog
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                mode="login"
            />
        </IndustrialLayout>
    );
};

export default MESHome;