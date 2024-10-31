import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Scan, Database, FileText,
    AlertTriangle, BarChart3,
    History, Shield, Leaf, RecycleIcon,
    Clock, ChevronRight
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import MainLayout from './MainLayout';
import QRScanner from './QRScanner';

const DPPHomepage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

    useEffect(() => {
        // Only redirect if we're exactly on the root path
        if (location.pathname === '/') {
            navigate('/basic-dashboard');
        }
    }, [location.pathname, navigate]);

    const productMetrics = [
        { title: "Carbon Footprint", value: "12.5 kg CO2e", change: "-8%", icon: <Leaf className="h-4 w-4" /> },
        { title: "Recycled Content", value: "85%", change: "+15%", icon: <RecycleIcon className="h-4 w-4" /> },
        { title: "Lifecycle Stage", value: "Production", icon: <Clock className="h-4 w-4" /> },
        { title: "Compliance Score", value: "95/100", change: "+3%", icon: <Shield className="h-4 w-4" /> },
    ];

    const handleQRScan = (result) => {
        console.log('QR Code scanned:', result);
        // Handle the scanned QR code result here
    };

    // If we're on the root path, don't render anything while redirecting
    if (location.pathname === '/') {
        return null;
    }

    return (
        <MainLayout>
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* EU Compliance Alert */}
                <Alert className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>EU Digital Product Passport Compliant</AlertTitle>
                    <AlertDescription>
                        This system follows NMIS Ecopass guidelines for digital product passports.
                    </AlertDescription>
                </Alert>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                    {[
                        {
                            title: "Basic Product Data",
                            description: "View essential product information",
                            icon: <BarChart3 className="h-5 w-5" />,
                            path: "/basic-dashboard"
                        },
                        {
                            title: "Advanced Analytics",
                            description: "Detailed sustainability metrics",
                            icon: <Database className="h-5 w-5" />,
                            path: "/advanced-data"
                        },
                        {
                            title: "Lifecycle Tracking",
                            description: "Monitor product lifecycle stages",
                            icon: <History className="h-5 w-5" />,
                            path: "/lifecycle"
                        }
                    ].map((action, index) => (
                        <Card
                            key={index}
                            className="hover:bg-gray-50 cursor-pointer transition-colors group"
                            onClick={() => navigate(action.path)}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {action.icon}
                                        <span className="ml-2">{action.title}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                                </CardTitle>
                                <CardDescription>{action.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Metrics Overview
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {productMetrics.map((metric, index) => (
                        <Card key={index} className="hover:bg-gray-50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {metric.title}
                                </CardTitle>
                                {metric.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                {metric.change && (
                                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                        {metric.change} from last month
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                */}

                {/* QR Scanner Dialog */}
                <QRScanner
                    isOpen={isQRScannerOpen}
                    onClose={() => setIsQRScannerOpen(false)}
                    onScan={handleQRScan}
                />
            </main>
        </MainLayout>
    );
};

export default DPPHomepage;