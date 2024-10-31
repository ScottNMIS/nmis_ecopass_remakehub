import React, { useState } from 'react';
import {
    Scan, Database, Wrench, Ruler,
    Microscope, Printer, Radiation,
    Server, Camera, Cpu, History,
    ThermometerSun, Archive, Binary,
    AlarmCheck, Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const PodConfigurator = () => {
    // Pod configuration state
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    // Equipment categories based on NMIS capabilities
    const equipmentCategories = {
        scanning: [
            { id: 'laser3d', name: '3D Laser Scanner', icon: <Scan />, size: 2 },
            { id: 'thermal', name: 'Thermal Imaging', icon: <ThermometerSun />, size: 1 },
            { id: 'photogram', name: 'Photogrammetry Unit', icon: <Camera />, size: 2 }
        ],
        analysis: [
            { id: 'material', name: 'Material Analyzer', icon: <Microscope />, size: 2 },
            { id: 'structural', name: 'Structural Assessment', icon: <Building2 />, size: 2 },
            { id: 'nde', name: 'Non-Destructive Testing', icon: <Radiation />, size: 3 }
        ],
        processing: [
            { id: 'computer', name: 'Data Processing Unit', icon: <Cpu />, size: 1 },
            { id: 'server', name: 'Edge Server', icon: <Server />, size: 2 },
            { id: 'ai', name: 'AI Analysis System', icon: <Binary />, size: 2 }
        ],
        manufacturing: [
            { id: '3dprint', name: '3D Printer', icon: <Printer />, size: 3 },
            { id: 'tools', name: 'Smart Tools Station', icon: <Wrench />, size: 2 },
            { id: 'measurement', name: 'Metrology Station', icon: <Ruler />, size: 2 }
        ]
    };

    // Pod capacity (in units)
    const POD_CAPACITY = 8;

    // Calculate remaining capacity
    const usedCapacity = selectedEquipment.reduce((sum, item) => sum + item.size, 0);
    const remainingCapacity = POD_CAPACITY - usedCapacity;

    // Handle equipment selection
    const handleEquipmentSelect = (equipment) => {
        if (usedCapacity + equipment.size <= POD_CAPACITY) {
            setSelectedEquipment([...selectedEquipment, equipment]);
        }
    };

    // Handle equipment removal
    const handleEquipmentRemove = (equipmentId) => {
        setSelectedEquipment(selectedEquipment.filter(item => item.id !== equipmentId));
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Equipment Selection Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Equipment Selection</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(equipmentCategories).map(([category, items]) => (
                                    <div key={category}>
                                        <h3 className="text-sm font-medium mb-2 capitalize">{category}</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {items.map((equipment) => (
                                                <button
                                                    key={equipment.id}
                                                    onClick={() => handleEquipmentSelect(equipment)}
                                                    disabled={usedCapacity + equipment.size > POD_CAPACITY}
                                                    className="flex items-center p-2 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {equipment.icon}
                                                    <span className="ml-2">{equipment.name}</span>
                                                    <span className="ml-auto text-sm text-gray-500">
                            Size: {equipment.size}
                          </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pod Visualization */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Digital Building Pod Configuration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed p-4 rounded-lg min-h-[400px] relative">
                                <div className="absolute top-2 right-2 bg-gray-100 rounded px-2 py-1 text-sm">
                                    Capacity: {usedCapacity}/{POD_CAPACITY} units
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {selectedEquipment.map((equipment, index) => (
                                        <div
                                            key={index}
                                            className={`bg-blue-100 p-2 rounded flex flex-col items-center justify-center text-center col-span-${equipment.size} relative`}
                                            style={{ minHeight: '100px' }}
                                        >
                                            {equipment.icon}
                                            <span className="text-xs mt-1">{equipment.name}</span>
                                            <button
                                                onClick={() => handleEquipmentRemove(equipment.id)}
                                                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {selectedEquipment.length === 0 && (
                                    <div className="text-center text-gray-500 mt-20">
                                        Select equipment from the panel to configure your pod
                                    </div>
                                )}
                            </div>

                            {/* Configuration Summary */}
                            {selectedEquipment.length > 0 && (
                                <Alert className="mt-4">
                                    <AlertTitle>Pod Configuration Summary</AlertTitle>
                                    <AlertDescription>
                                        <ul className="list-disc list-inside">
                                            <li>Total Equipment: {selectedEquipment.length} items</li>
                                            <li>Space Utilised: {(usedCapacity/POD_CAPACITY * 100).toFixed(0)}%</li>
                                            <li>Available Space: {remainingCapacity} units</li>
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PodConfigurator;
