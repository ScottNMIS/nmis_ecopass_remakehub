import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package2, Recycle, Calendar, Factory, CircleDollarSign, ShieldCheck, Backpack } from 'lucide-react';

// Mock database of products
const productDatabase = {
    '5061072990007': {
        name: "Eco-Friendly Smart Watch",
        manufacturer: "GreenTech Electronics",
        serialNumbers: {
            '854876486': {
                productionDate: '2024-10-15',
                batchNumber: 'BatchA',
                weight: '100', // in grams
                sustainabilityScore: 85,
                recyclability: '94%',
                carbonFootprint: '12.5kg CO2e',
                materials: [
                    { name: 'Recycled Aluminum', percentage: 75 },
                    { name: 'Bio-based Plastic', percentage: 15 },
                    { name: 'Glass', percentage: 8 },
                    { name: 'Other', percentage: 2 }
                ],
                certifications: ['ISO 14001', 'Energy Star', 'RoHS Compliant'],
                repairability: 8.5,
                estimatedLifespan: '5 years'
            }
        }
    },

    '5061072990014': {
        name: "Industrial Air Compressor X1000",
        manufacturer: "Howden Compressors",
        serialNumbers: {
            '987654321': {
                productionDate: '2024-09-20',
                batchNumber: 'HC2024Q3',
                weight: '75000', // in grams (75kg)
                sustainabilityScore: 78,
                recyclability: '89%',
                carbonFootprint: '450kg CO2e',
                materials: [
                    { name: 'Steel', percentage: 65 },
                    { name: 'Copper', percentage: 20 },
                    { name: 'Aluminum', percentage: 10 },
                    { name: 'Other', percentage: 5 }
                ],
                certifications: ['ISO 9001', 'CE Mark', 'Energy Efficiency A+++'],
                repairability: 9.0,
                estimatedLifespan: '15 years'
            }
        }
    },

    '5061072990021': {
        name: "Circular Economy Laptop",
        manufacturer: "Sustainable Computing Ltd",
        serialNumbers: {
            '123456789': {
                productionDate: '2024-11-01',
                batchNumber: 'SCL24Q4',
                weight: '1200', // in grams
                sustainabilityScore: 92,
                recyclability: '97%',
                carbonFootprint: '25kg CO2e',
                materials: [
                    { name: 'Recycled Metals', percentage: 60 },
                    { name: 'Recycled Plastics', percentage: 30 },
                    { name: 'Bio-materials', percentage: 8 },
                    { name: 'Other', percentage: 2 }
                ],
                certifications: ['TCO Certified', 'EPEAT Gold', 'Blue Angel'],
                repairability: 9.5,
                estimatedLifespan: '7 years'
            }
        }
    },

    '5061072990038': {
        name: "Electric Vehicle Battery Pack",
        manufacturer: "EcoMotive Solutions",
        serialNumbers: {
            '456789123': {
                productionDate: '2024-08-15',
                batchNumber: 'EVB2024',
                weight: '350000', // in grams (350kg)
                sustainabilityScore: 82,
                recyclability: '91%',
                carbonFootprint: '850kg CO2e',
                materials: [
                    { name: 'Lithium Cells', percentage: 55 },
                    { name: 'Aluminum Housing', percentage: 25 },
                    { name: 'Copper Wiring', percentage: 15 },
                    { name: 'Other', percentage: 5 }
                ],
                certifications: ['UN 38.3', 'IEC 62619', 'CE Mark'],
                repairability: 7.5,
                estimatedLifespan: '10 years'
            }
        }
    },

    '5061072990045': {
        name: "Smart Wind Turbine Controller",
        manufacturer: "WindTech Innovations",
        serialNumbers: {
            '789123456': {
                productionDate: '2024-07-01',
                batchNumber: 'WTC24Q3',
                weight: '5000', // in grams (5kg)
                sustainabilityScore: 88,
                recyclability: '93%',
                carbonFootprint: '120kg CO2e',
                materials: [
                    { name: 'Recyclable Steel', percentage: 45 },
                    { name: 'Electronic Components', percentage: 30 },
                    { name: 'Protective Casing', percentage: 20 },
                    { name: 'Other', percentage: 5 }
                ],
                certifications: ['IEC 61400-1', 'DNV-GL', 'UL Certification'],
                repairability: 8.0,
                estimatedLifespan: '12 years'
            }
        }
    }
};

const ProductPassport = () => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        // Parse URL parameters
        const url = new URL(window.location.href);
        const pathParts = url.pathname.split('/');
        const gtin = pathParts[3]; // Get GTIN from URL
        const serialNumber = pathParts[5]; // Get Serial Number from URL

        // Fetch mock data
        if (productDatabase[gtin]?.serialNumbers[serialNumber]) {
            setProductData({
                ...productDatabase[gtin],
                ...productDatabase[gtin].serialNumbers[serialNumber],
                gtin,
                serialNumber
            });
        }
    }, []);

    if (!productData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-600">Loading product information...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
                            <p className="text-gray-500 mt-2">{productData.manufacturer}</p>
                        </div>
                        <ShieldCheck className="h-12 w-12 text-green-500" />
                    </div>

                    {/* Product Identifiers */}
                    <div className="mt-4 flex gap-4">
                        <div className="flex items-center">
                            <Backpack className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">GTIN: {productData.gtin}</span>
                        </div>
                        <div className="flex items-center">
                            <Package2 className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">S/N: {productData.serialNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sustainability Score */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
                            <Recycle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{productData.sustainabilityScore}/100</div>
                            <div className="text-xs text-gray-500">Recyclability: {productData.recyclability}</div>
                        </CardContent>
                    </Card>

                    {/* Production Information */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Production Details</CardTitle>
                            <Factory className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">Batch: {productData.batchNumber}</div>
                            <div className="text-sm">Date: {productData.productionDate}</div>
                            <div className="text-xs text-gray-500">Weight: {productData.weight}g</div>
                        </CardContent>
                    </Card>

                    {/* Environmental Impact */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
                            <CircleDollarSign className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">Carbon Footprint: {productData.carbonFootprint}</div>
                            <div className="text-xs text-gray-500">Estimated Lifespan: {productData.estimatedLifespan}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Materials Breakdown */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Materials Composition</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {productData.materials.map((material, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>{material.name}</span>
                                        <span>{material.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 rounded-full h-2"
                                            style={{ width: `${material.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {productData.certifications.map((cert, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                >
                  {cert}
                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProductPassport;