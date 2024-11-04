// InitializationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText, PackagePlus, ArrowRight, Users,
    Building, Calendar, Tags, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import IndustrialLayout from './IndustrialLayout';

const InitialisationPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState('basic');

    const steps = [
        { id: 'basic', label: 'Basic Information' },
        { id: 'stakeholders', label: 'Stakeholders' },
        { id: 'classification', label: 'Classification' },
    ];

    return (
        <IndustrialLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Initialize Digital Product Passport</h1>
                        <p className="text-gray-500">Create a new DPP and set up basic product information</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/mes/design')}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Proceed to Design
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
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>
                                    Enter the basic information about your product
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs value={currentStep} onValueChange={setCurrentStep}>
                                    <TabsContent value="basic" className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Basic Info Form Fields */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Product Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter product name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Product ID</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter product ID"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Version</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter version"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Initial Creation Date</label>
                                                <input
                                                    type="date"
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="stakeholders" className="space-y-4">
                                        <div className="space-y-4">
                                            {/* Stakeholder Form Fields */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Manufacturer</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter manufacturer name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Designer</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter designer name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Owner</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter owner name"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="classification" className="space-y-4">
                                        <div className="space-y-4">
                                            {/* Classification Form Fields */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Product Category</label>
                                                <select className="w-full p-2 border rounded-md">
                                                    <option>Select category</option>
                                                    <option>Electronics</option>
                                                    <option>Mechanical</option>
                                                    <option>Hybrid</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Industry Sector</label>
                                                <select className="w-full p-2 border rounded-md">
                                                    <option>Select sector</option>
                                                    <option>Automotive</option>
                                                    <option>Aerospace</option>
                                                    <option>Consumer Goods</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Product Tags</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter tags separated by commas"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Guide</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Basic Information</h4>
                                            <p className="text-sm text-gray-500">Start with the core product details</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Stakeholders</h4>
                                            <p className="text-sm text-gray-500">Define key responsible parties</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Tags className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Classification</h4>
                                            <p className="text-sm text-gray-500">Categorize your product</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">
                                    After initialization, proceed to the Design phase to:
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-xs text-blue-600">1</span>
                                        </div>
                                        <span>Define product specifications</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-xs text-blue-600">2</span>
                                        </div>
                                        <span>Upload technical drawings</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-xs text-blue-600">3</span>
                                        </div>
                                        <span>Set design requirements</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </IndustrialLayout>
    );
};

export default InitialisationPage;