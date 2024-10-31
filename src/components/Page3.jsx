import React from 'react';
import {
    Building2, Ruler, Scan, Database,
    History, FileText, Box, Hammer,
    AlertTriangle, CheckCircle, Camera
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

const materialInventory = [
    {
        type: "Glulam Timber",
        source: "Certified sustainable forests, FSC certified",
        properties: "High strength-to-weight ratio, low thermal conductivity",
        recyclability: "Recyclable and biodegradable"
    },
    {
        type: "Recycled Concrete",
        source: "Local suppliers, 30% recycled content",
        properties: "Durable, energy-efficient production",
        recyclability: "100% recyclable after crushing"
    },
    {
        type: "Structural Steel",
        source: "UK steel manufacturers, 25% recycled content",
        properties: "High tensile strength, corrosion-resistant",
        recyclability: "Fully recyclable"
    }
];

const buildingScans = [
    {
        type: "Point Cloud Data",
        description: "High-resolution 3D scans of interior and exterior spaces",
        icon: <Scan className="h-5 w-5" />
    },
    {
        type: "BIM Model",
        description: "Complete digital representation, updated 2023",
        icon: <Building2 className="h-5 w-5" />
    },
    {
        type: "Thermal Imaging",
        description: "Thermal scans for insulation efficiency analysis",
        icon: <Camera className="h-5 w-5" />
    },
    {
        type: "Drone Surveys",
        description: "External structure assessment and maintenance planning",
        icon: <Camera className="h-5 w-5" />
    }
];

const renovationHistory = [
    {
        year: "2021",
        description: "Upgraded HVAC systems to high-efficiency units",
        type: "Major System Upgrade"
    },
    {
        year: "2020",
        description: "Retrofit of existing lighting systems to LED for energy efficiency",
        type: "Energy Efficiency"
    },
    {
        year: "2019",
        description: "Installation of new solar panels, increasing capacity by 200 kW",
        type: "Renewable Energy"
    }
];

const RenovationDataPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Digital Building Passport Status */}
            <Alert className="mb-6">
                <Database className="h-4 w-4" />
                <AlertTitle>Digital Building Passport</AlertTitle>
                <AlertDescription>
                    All building data is up to date as of January 2024. Access complete structural blueprints and material specifications below.
                </AlertDescription>
            </Alert>

            {/* Building Scans and Digital Data */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Digital Building Analysis</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {buildingScans.map((scan, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {scan.type}
                                </CardTitle>
                                {scan.icon}
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">{scan.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Material Inventory */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Box className="h-5 w-5" />
                        Material Specifications
                    </CardTitle>
                    <CardDescription>
                        Detailed information about building materials for renovation planning
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {materialInventory.map((material, index) => (
                            <div key={index} className="border-b pb-4">
                                <h3 className="font-medium mb-2">{material.type}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Source:</span>
                                        <p>{material.source}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Properties:</span>
                                        <p>{material.properties}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Recyclability:</span>
                                        <p>{material.recyclability}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Renovation History */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Renovation History
                    </CardTitle>
                    <CardDescription>
                        Previous renovations and maintenance records
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {renovationHistory.map((renovation, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="bg-gray-100 px-3 py-1 rounded">
                                    {renovation.year}
                                </div>
                                <div>
                                    <p className="font-medium">{renovation.type}</p>
                                    <p className="text-sm text-gray-500">{renovation.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RenovationDataPage;