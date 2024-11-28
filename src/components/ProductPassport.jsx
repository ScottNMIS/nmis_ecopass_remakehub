import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package2, Leaf, Calendar, Factory, Apple, ShieldCheck, Backpack, Scale, Clock } from 'lucide-react';

const productDatabase = {
    '5000156459832': {
        name: "NMIS Baked Beans in Tomato Sauce",
        manufacturer: "National Manufacturing Industrial Scotland",
        serialNumbers: {
            '789123456': {
                productionDate: '2024-10-15',
                batchNumber: 'BB241015A',
                weight: '400', // in grams
                sustainabilityScore: 82,
                recyclability: '95%',
                carbonFootprint: '0.8kg CO2e',
                materials: [
                    { name: 'Steel Can', percentage: 28 },
                    { name: 'Navy Beans', percentage: 51 },
                    { name: 'Tomato Sauce', percentage: 18 },
                    { name: 'Other Ingredients', percentage: 3 }
                ],
                certifications: [
                    'HACCP Certified',
                    'ISO 22000',
                    'Halal Certified',
                    'BRC Grade A'
                ],
                nutritionalInfo: {
                    servingSize: '100g',
                    calories: 155,
                    protein: '5.2g',
                    carbohydrates: '25.3g',
                    sugar: '9.8g',
                    fat: '0.5g',
                    fiber: '5.1g',
                    sodium: '480mg'
                },
                shelfLife: '730 days',
                storageInstructions: 'Store in a cool, dry place. Once opened, transfer unused portion to a non-metallic container and refrigerate. Use within 2 days.'
            }
        }
    }
};

const ProductPassport = () => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const pathParts = url.pathname.split('/');
        const gtin = pathParts[3];
        const serialNumber = pathParts[5];

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
                        <Apple className="h-12 w-12 text-green-500" />
                    </div>

                    {/* Product Identifiers */}
                    <div className="mt-4 flex gap-4">
                        <div className="flex items-center">
                            <Backpack className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">GTIN: {productData.gtin}</span>
                        </div>
                        <div className="flex items-center">
                            <Package2 className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Batch: {productData.batchNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Product Weight and Serving */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Product Information</CardTitle>
                            <Scale className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">Net Weight: {productData.weight}g</div>
                            <div className="text-sm">Serving Size: {productData.nutritionalInfo.servingSize}</div>
                            <div className="text-xs text-gray-500">Calories per serving: {productData.nutritionalInfo.calories}</div>
                        </CardContent>
                    </Card>

                    {/* Production Information */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Production Details</CardTitle>
                            <Factory className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">Production Date: {productData.productionDate}</div>
                            <div className="text-sm">Batch: {productData.batchNumber}</div>
                            <div className="text-xs text-gray-500">Shelf Life: {productData.shelfLife}</div>
                        </CardContent>
                    </Card>

                    {/* Environmental Impact */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sustainability</CardTitle>
                            <Leaf className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">Recyclable Packaging: {productData.recyclability}</div>
                            <div className="text-sm">Carbon Footprint: {productData.carbonFootprint}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Nutritional Information */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Nutritional Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(productData.nutritionalInfo).map(([key, value], index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                    <div className="text-lg font-bold">{value}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Ingredients */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Ingredients Composition</CardTitle>
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
                                            className="bg-green-600 rounded-full h-2"
                                            style={{ width: `${material.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Storage Instructions */}
                <Card className="mt-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Storage Instructions</CardTitle>
                        <Clock className="h-5 w-5 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">{productData.storageInstructions}</p>
                    </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Food Safety & Quality Certifications</CardTitle>
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