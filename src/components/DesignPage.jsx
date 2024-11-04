// DesignPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PenTool, ArrowRight, FileText, Ruler,
    Shapes, Upload, PackageSearch, Scale,
    TreeDeciduous, Recycle, AlertCircle,
    Plus, Trash2, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import IndustrialLayout from './IndustrialLayout';

const DesignPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState('specifications');
    const [specifications, setSpecifications] = useState([{ name: '', value: '', unit: '' }]);
    const [materials, setMaterials] = useState([{ name: '', percentage: '', recyclability: '', source: '' }]);

    const steps = [
        { id: 'specifications', label: 'Specifications' },
        { id: 'materials', label: 'Materials' },
        { id: 'documentation', label: 'Documentation' },
        { id: 'sustainability', label: 'Sustainability' }
    ];

    const handleAddSpecification = () => {
        setSpecifications([...specifications, { name: '', value: '', unit: '' }]);
    };

    const handleRemoveSpecification = (index) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const handleAddMaterial = () => {
        setMaterials([...materials, { name: '', percentage: '', recyclability: '', source: '' }]);
    };

    const handleRemoveMaterial = (index) => {
        setMaterials(materials.filter((_, i) => i !== index));
    };

    return (
        <IndustrialLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Design Phase</h1>
                        <p className="text-gray-500">Define product specifications, materials, and technical documentation</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/mes/manufacture')}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Proceed to Manufacturing
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between items-center mb-8">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <button
                                className={`flex items-center ${
                                    currentStep === step.id
                                        ? 'text-blue-600'
                                        : 'text-gray-500'
                                }`}
                                onClick={() => setCurrentStep(step.id)}
                            >
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center
                                    ${currentStep === step.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200'
                                }
                                `}>
                                    {index + 1}
                                </div>
                                <span className="ml-2">{step.label}</span>
                            </button>
                            {index < steps.length - 1 && (
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Form Section */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Design Details</CardTitle>
                                <CardDescription>
                                    Enter detailed design information for your product
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs value={currentStep} onValueChange={setCurrentStep}>
                                    {/* Specifications Tab */}
                                    <TabsContent value="specifications" className="space-y-4">
                                        {specifications.map((spec, index) => (
                                            <div key={index} className="flex gap-4 items-start">
                                                <div className="grid grid-cols-3 gap-4 flex-1">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Specification</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="e.g., Weight"
                                                            value={spec.name}
                                                            onChange={(e) => {
                                                                const newSpecs = [...specifications];
                                                                newSpecs[index].name = e.target.value;
                                                                setSpecifications(newSpecs);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Value</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="e.g., 100"
                                                            value={spec.value}
                                                            onChange={(e) => {
                                                                const newSpecs = [...specifications];
                                                                newSpecs[index].value = e.target.value;
                                                                setSpecifications(newSpecs);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Unit</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="e.g., kg"
                                                            value={spec.unit}
                                                            onChange={(e) => {
                                                                const newSpecs = [...specifications];
                                                                newSpecs[index].unit = e.target.value;
                                                                setSpecifications(newSpecs);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveSpecification(index)}
                                                    className="mt-8 p-1 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleAddSpecification}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Specification
                                        </button>
                                    </TabsContent>

                                    {/* Materials Tab */}
                                    <TabsContent value="materials" className="space-y-4">
                                        {materials.map((material, index) => (
                                            <div key={index} className="flex gap-4 items-start">
                                                <div className="grid grid-cols-4 gap-4 flex-1">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Material Name</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="e.g., Aluminum"
                                                            value={material.name}
                                                            onChange={(e) => {
                                                                const newMaterials = [...materials];
                                                                newMaterials[index].name = e.target.value;
                                                                setMaterials(newMaterials);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Percentage</label>
                                                        <input
                                                            type="number"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="e.g., 25"
                                                            value={material.percentage}
                                                            onChange={(e) => {
                                                                const newMaterials = [...materials];
                                                                newMaterials[index].percentage = e.target.value;
                                                                setMaterials(newMaterials);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Recyclability</label>
                                                        <select
                                                            className="w-full p-2 border rounded-md"
                                                            value={material.recyclability}
                                                            onChange={(e) => {
                                                                const newMaterials = [...materials];
                                                                newMaterials[index].recyclability = e.target.value;
                                                                setMaterials(newMaterials);
                                                            }}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="high">High</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="low">Low</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Source</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="e.g., Supplier X"
                                                            value={material.source}
                                                            onChange={(e) => {
                                                                const newMaterials = [...materials];
                                                                newMaterials[index].source = e.target.value;
                                                                setMaterials(newMaterials);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveMaterial(index)}
                                                    className="mt-8 p-1 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleAddMaterial}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Material
                                        </button>
                                    </TabsContent>
                                    {/* Documentation Tab */}
                                    <TabsContent value="documentation" className="space-y-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Technical Drawings</label>
                                                <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
                                                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                                                    <p className="text-sm text-gray-500">
                                                        Drop your CAD files or technical drawings here, or{' '}
                                                        <button className="text-blue-600 hover:text-blue-700">browse</button>
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Supports: .dwg, .dxf, .pdf, .step, .stp (max 50MB)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Assembly Instructions</label>
                                                <textarea
                                                    className="w-full p-2 border rounded-md min-h-[100px]"
                                                    placeholder="Enter detailed assembly instructions..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Quality Standards</label>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="iso9001" className="rounded" />
                                                        <label htmlFor="iso9001">ISO 9001:2015</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="iso14001" className="rounded" />
                                                        <label htmlFor="iso14001">ISO 14001:2015</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="ce" className="rounded" />
                                                        <label htmlFor="ce">CE Marking</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Sustainability Tab */}
                                    <TabsContent value="sustainability" className="space-y-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Carbon Footprint</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <input
                                                            type="number"
                                                            className="w-full p-2 border rounded-md"
                                                            placeholder="CO2 emissions (kg)"
                                                        />
                                                    </div>
                                                    <div>
                                                        <select className="w-full p-2 border rounded-md">
                                                            <option value="">Calculation Method...</option>
                                                            <option value="lca">Life Cycle Assessment</option>
                                                            <option value="pef">Product Environmental Footprint</option>
                                                            <option value="ghg">GHG Protocol</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">End-of-Life Instructions</label>
                                                <textarea
                                                    className="w-full p-2 border rounded-md min-h-[100px]"
                                                    placeholder="Describe the recommended disposal or recycling procedures..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Certifications</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="recyclable" className="rounded" />
                                                        <label htmlFor="recyclable">Recyclable Product</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="biodegradable" className="rounded" />
                                                        <label htmlFor="biodegradable">Biodegradable</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="energystar" className="rounded" />
                                                        <label htmlFor="energystar">Energy Star</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input type="checkbox" id="fairtrade" className="rounded" />
                                                        <label htmlFor="fairtrade">Fair Trade</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Section */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Quick Actions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <TooltipProvider>
                                    {[
                                        { icon: PenTool, label: 'Edit Design', desc: 'Modify design parameters' },
                                        { icon: FileText, label: 'Export Data', desc: 'Download as PDF/CSV' },
                                        { icon: PackageSearch, label: 'Material Analysis', desc: 'View detailed breakdown' },
                                        { icon: AlertCircle, label: 'Compliance Check', desc: 'Verify regulations' }
                                    ].map((action, index) => (
                                        <Tooltip key={index}>
                                            <TooltipTrigger asChild>
                                                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                                                    <action.icon className="h-5 w-5 text-gray-500" />
                                                    <span>{action.label}</span>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{action.desc}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </TooltipProvider>
                            </CardContent>
                        </Card>

                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Design Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Completion</span>
                                        <span className="text-sm font-medium">75%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
                                    </div>
                                </div>
                                <div className="pt-2 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Last Updated</span>
                                        <span>2 hours ago</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Version</span>
                                        <span>1.2.4</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </IndustrialLayout>
    );
};

export default DesignPage;