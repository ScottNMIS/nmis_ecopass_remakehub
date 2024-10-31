import React, { useState } from 'react';
import {
    Building2,
    Waves,
    Leaf,
    Zap,
    Shield,
    Award,
    BarChart3,
    Clock,
    Users,
    Search,
    Menu,
    Bell,
    ChevronDown,
    Settings
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const BuildingPassportDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Building2 className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold">NMIS Building Passport</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
                                    <Bell className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="/api/placeholder/32/32"
                                        alt="User"
                                    />
                                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Search building information..."
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

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

                {/* Building Overview */}
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

                {/* Sustainability Features */}
                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sustainability Features</CardTitle>
                            <CardDescription>Environmental impact and green technologies</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <Leaf className="h-6 w-6 text-green-600 mb-2" />
                                    <h3 className="font-medium">Green Roof</h3>
                                    <p className="text-sm text-gray-600">2,000 m² of native Scottish species</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <Zap className="h-6 w-6 text-blue-600 mb-2" />
                                    <h3 className="font-medium">Solar Power</h3>
                                    <p className="text-sm text-gray-600">500 kW peak power capacity</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <Waves className="h-6 w-6 text-purple-600 mb-2" />
                                    <h3 className="font-medium">Water Management</h3>
                                    <p className="text-sm text-gray-600">30,000L rainwater harvesting</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                        <h3 className="font-medium">View Reports</h3>
                    </button>
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <Clock className="h-6 w-6 text-blue-600 mb-2" />
                        <h3 className="font-medium">Maintenance Log</h3>
                    </button>
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <Users className="h-6 w-6 text-blue-600 mb-2" />
                        <h3 className="font-medium">Access Control</h3>
                    </button>
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <Settings className="h-6 w-6 text-blue-600 mb-2" />
                        <h3 className="font-medium">Settings</h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuildingPassportDashboard;