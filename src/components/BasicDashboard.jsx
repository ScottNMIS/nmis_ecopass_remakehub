import React from 'react';
import MainLayout from './MainLayout'; // Import MainLayout as in DPPHome
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, FileText, Box, Award, Leaf, Globe, RecycleIcon, Factory } from 'lucide-react';

const BasicDashboard = () => {
    const productInfo = {
        name: "Sample Product",
        manufacturer: "Example Manufacturing Co.",
        productionDate: "2024-01-15",
        serialNumber: "XYZ-123-456",
        materials: [
            { name: "Recycled Steel", percentage: 65 },
            { name: "Bio-based Plastic", percentage: 25 },
            { name: "Other Materials", percentage: 10 }
        ],
        certifications: [
            { name: "EU Ecopass Certified", date: "2024-02-01" },
            { name: "ISO 14001", date: "2023-12-15" },
            { name: "Cradle to Cradle", date: "2024-01-20" }
        ]
    };

    return (
        <MainLayout> {/* Wrapping content in MainLayout as in DPPHome */}
            {/* Product Header Card */}
            <Card className="border-none shadow-sm mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">{productInfo.name}</h1>
                                <p className="text-sm text-gray-500">Serial: {productInfo.serialNumber}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {productInfo.certifications.slice(0, 2).map((cert, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <Award className="h-3 w-3 mr-1" />
                                    {cert.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <Card className="border-none shadow-sm">
                    <CardContent className="p-1">
                        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                                <FileText className="h-4 w-4 mr-2" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="materials" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                                <Box className="h-4 w-4 mr-2" />
                                Materials
                            </TabsTrigger>
                            <TabsTrigger value="certifications" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                                <Award className="h-4 w-4 mr-2" />
                                Certifications
                            </TabsTrigger>
                            <TabsTrigger value="environmental" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                                <Leaf className="h-4 w-4 mr-2" />
                                Environmental
                            </TabsTrigger>
                        </TabsList>
                    </CardContent>
                </Card>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Product Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Manufacturer</span>
                                        <span className="font-medium">{productInfo.manufacturer}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Production Date</span>
                                        <span className="font-medium">{productInfo.productionDate}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Serial Number</span>
                                        <span className="font-medium">{productInfo.serialNumber}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <RecycleIcon className="h-5 w-5 text-green-600" />
                                            <span className="font-medium">Recyclable</span>
                                        </div>
                                        <p className="text-2xl font-semibold text-green-600">85%</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Globe className="h-5 w-5 text-blue-600" />
                                            <span className="font-medium">CO₂</span>
                                        </div>
                                        <p className="text-2xl font-semibold text-blue-600">12.5kg</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="materials">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Material Composition</CardTitle>
                            <CardDescription>Detailed breakdown of product materials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {productInfo.materials.map((material, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{material.name}</span>
                                            <span className="text-sm text-gray-500">{material.percentage}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full"
                                                style={{ width: `${material.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="certifications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Certifications & Compliance</CardTitle>
                            <CardDescription>Current product certifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {productInfo.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Award className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">{cert.name}</p>
                                                <p className="text-sm text-gray-500">Valid from {cert.date}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            Active
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="environmental">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Environmental Impact</CardTitle>
                                <CardDescription>Key sustainability metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Leaf className="h-5 w-5 text-green-600" />
                                            <h3 className="font-medium">Carbon Footprint</h3>
                                        </div>
                                        <p className="text-3xl font-semibold text-green-600">12.5</p>
                                        <p className="text-sm text-gray-600 mt-1">kg CO₂e per unit</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-3">
                                            <RecycleIcon className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-medium">Recyclability Score</h3>
                                        </div>
                                        <p className="text-3xl font-semibold text-blue-600">85%</p>
                                        <p className="text-sm text-gray-600 mt-1">recyclable materials</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Sustainability Features</CardTitle>
                                <CardDescription>Product environmental attributes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        { icon: <RecycleIcon className="h-4 w-4" />, text: "Made with 65% recycled materials" },
                                        { icon: <Leaf className="h-4 w-4" />, text: "Bio-based components used" },
                                        { icon: <Factory className="h-4 w-4" />, text: "Manufactured using renewable energy" },
                                        { icon: <Globe className="h-4 w-4" />, text: "Carbon-neutral shipping available" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-600">
                                            {item.icon}
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </MainLayout>
    );
};

export default BasicDashboard;
