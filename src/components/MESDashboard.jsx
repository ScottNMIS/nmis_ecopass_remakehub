// MESDashboard.jsx
import React, { useState } from 'react';
import {
    CircleOff, CircleDot, Package, Clock,
    AlertCircle, CheckCircle2, Factory,
    Boxes, BarChart3, ArrowRight, PlusCircle,
    FileBarChart, Settings2, History, RefreshCcw,
    PenTool
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '@/components/ui/tabs';
import IndustrialLayout from './IndustrialLayout';

const MESDashboard = () => {
    // Sample data - In a real app, this would come from your backend
    const activeProducts = [
        {
            id: "DPP-2024-001",
            name: "Electric Motor Assembly",
            phase: "design",
            progress: 65,
            status: "in_progress",
            lastUpdated: "2024-03-15T10:30:00",
            assignedTo: "John Smith"
        },
        {
            id: "DPP-2024-002",
            name: "Battery Pack",
            phase: "manufacture",
            progress: 85,
            status: "pending_approval",
            lastUpdated: "2024-03-14T16:45:00",
            assignedTo: "Sarah Johnson"
        },
        {
            id: "DPP-2024-003",
            name: "Control Unit",
            phase: "remanufacture",
            progress: 25,
            status: "on_hold",
            lastUpdated: "2024-03-13T09:15:00",
            assignedTo: "Mike Wilson"
        }
    ];

    const productionMetrics = {
        design: { total: 15, completed: 8, inProgress: 5, blocked: 2 },
        manufacture: { total: 25, completed: 18, inProgress: 5, blocked: 2 },
        remanufacture: { total: 10, completed: 4, inProgress: 4, blocked: 2 }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'in_progress':
                return <CircleDot className="h-4 w-4 text-blue-500" />;
            case 'pending_approval':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'on_hold':
                return <CircleOff className="h-4 w-4 text-red-500" />;
            case 'completed':
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getPhaseIcon = (phase) => {
        switch (phase) {
            case 'design':
                return <PenTool className="h-4 w-4" />;
            case 'manufacture':
                return <Factory className="h-4 w-4" />;
            case 'remanufacture':
                return <RefreshCcw className="h-4 w-4" />;
            default:
                return <Package className="h-4 w-4" />;
        }
    };

    return (
        <IndustrialLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">MES Dashboard</h1>
                        <p className="text-gray-500">Manage and monitor Digital Product Passports</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="hidden md:flex">
                            <FileBarChart className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                        <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            New DPP
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(productionMetrics).map(([phase, metrics]) => (
                        <Card key={phase}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium capitalize">
                                    {phase} Phase
                                </CardTitle>
                                {getPhaseIcon(phase)}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metrics.total}</div>
                                <div className="text-xs text-muted-foreground">
                                    {metrics.completed} completed · {metrics.inProgress} in progress
                                </div>
                                <Progress
                                    value={(metrics.completed / metrics.total) * 100}
                                    className="mt-3"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Digital Product Passports</CardTitle>
                        <CardDescription>
                            Monitor and manage DPPs across different phases
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <TabsList>
                                    <TabsTrigger value="all">All Products</TabsTrigger>
                                    <TabsTrigger value="design">Design</TabsTrigger>
                                    <TabsTrigger value="manufacture">Manufacture</TabsTrigger>
                                    <TabsTrigger value="remanufacture">Remanufacture</TabsTrigger>
                                </TabsList>
                                <Select defaultValue="latest">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="latest">Latest Updated</SelectItem>
                                        <SelectItem value="oldest">Oldest Updated</SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <TabsContent value="all" className="space-y-4">
                                {activeProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(product.status)}
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>{product.id}</span>
                                                    <span>·</span>
                                                    <span>Assigned to {product.assignedTo}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <Badge variant="outline" className="capitalize">
                                                    {getPhaseIcon(product.phase)}
                                                    <span className="ml-1">{product.phase}</span>
                                                </Badge>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {new Date(product.lastUpdated).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>

                            {/* Other tab contents would filter the products based on phase */}
                            <TabsContent value="design">
                                {activeProducts
                                    .filter(product => product.phase === 'design')
                                    .map(product => (
                                        // Same product card structure as above
                                        <div key={product.id}>...</div>
                                    ))}
                            </TabsContent>
                            {/* Similar TabsContent for manufacture and remanufacture */}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Process Monitoring</CardTitle>
                            <CardDescription>Real-time production metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Boxes className="h-4 w-4 text-blue-500" />
                                        <span>Current WIP</span>
                                    </div>
                                    <span className="font-medium">14 units</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-green-500" />
                                        <span>Completion Rate</span>
                                    </div>
                                    <span className="font-medium">92%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <History className="h-4 w-4 text-yellow-500" />
                                        <span>Average Cycle Time</span>
                                    </div>
                                    <span className="font-medium">3.2 days</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>System Status</CardTitle>
                            <CardDescription>Manufacturing system health</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Factory className="h-4 w-4 text-green-500" />
                                        <span>Production Line Status</span>
                                    </div>
                                    <Badge variant="success">Operational</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Settings2 className="h-4 w-4 text-blue-500" />
                                        <span>Equipment Efficiency</span>
                                    </div>
                                    <span className="font-medium">96%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                                        <span>Active Alerts</span>
                                    </div>
                                    <span className="font-medium">2</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </IndustrialLayout>
    );
};

export default MESDashboard;