import React, { useState } from 'react';
import {
    Building2, Waves, Leaf, Zap, Shield, Award,
    BarChart3, Clock, Users, Search, Menu, Bell,
    ChevronDown, Settings, AlertTriangle,
    CheckCircle, FileText, Camera, Database,
    Box, Hammer, Scan, Ruler
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

// Metrics data
const metrics = [
    { title: "Energy Usage", value: "750 kW", change: "-12%", icon: <Zap className="h-4 w-4" /> },
    { title: "Water Savings", value: "30,000L", change: "+24%", icon: <Waves className="h-4 w-4" /> },
    { title: "CO2 Reduction", value: "99%", change: "+15%", icon: <Leaf className="h-4 w-4" /> },
    { title: "Safety Score", value: "98/100", change: "+5%", icon: <Shield className="h-4 w-4" /> },
];

// Awards data
const awards = [
    { name: "BREEAM Outstanding", year: "2023", category: "Building Sustainability" },
    { name: "Scottish Green Energy Awards", year: "2024", category: "Best Renewable Energy Initiative" },
    { name: "World Architecture Festival", year: "2023", category: "Industrial Design" },
];


const AnotherPage = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {metric.title}
                                </CardTitle>
                                {metric.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.change} from last month
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Building Overview and Awards */}
                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Building Information</CardTitle>
                            <CardDescription>Key details about NMIS Netherton Building</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium">AMIDS, Renfrewshire, Scotland</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Size</span>
                                    <span className="font-medium">11,500 m²</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Year Completed</span>
                                    <span className="font-medium">2023</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Primary Functions</span>
                                    <span className="font-medium">Research, Skills Academy, Manufacturing</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Awards</CardTitle>
                            <CardDescription>Recognition and certifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {awards.map((award, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <Award className="h-5 w-5 text-yellow-500 mt-1" />
                                        <div>
                                            <p className="font-medium">{award.name}</p>
                                            <p className="text-sm text-gray-500">{award.category} ({award.year})</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnotherPage;
