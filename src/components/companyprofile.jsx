import React, { useState } from 'react';
import {
    ArrowRightCircle,
    Building2,
    Globe,
    Users,
    RecycleIcon,
    ChevronDown,
    ExternalLink,
    Award,
    Factory
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowdenProfile = () => {
    const [showPortal, setShowPortal] = useState(false);
    const navigate = useNavigate();

    const companyStats = [
        { icon: Building2, text: 'Glasgow, United Kingdom', colour: 'text-blue-500' },
        { icon: Globe, text: 'Global Operations', colour: 'text-blue-500' },
        { icon: Users, text: '6,000+ Employees', colour: 'text-blue-500' },
        { icon: RecycleIcon, text: '12 Remanufacturable Products', colour: 'text-blue-500' },
        { icon: Award, text: 'ISO 14001 Certified', colour: 'text-blue-500' },
        { icon: Factory, text: '35+ Manufacturing Centres', colour: 'text-blue-500' }
    ];

    const scrollToPortal = () => {
        if (!showPortal) setShowPortal(true);
        setTimeout(() => {
            const portalSection = document.getElementById('portal-section');
            portalSection?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <img
                            src="../../public/assets/howden-logo.jpg"
                            alt="Howden Compressors Logo"
                            className="w-32 h-32 rounded-xl bg-white p-4 shadow-lg transition-transform hover:scale-105"
                        />
                        <div className="text-white text-center sm:text-left">
                            <h1 className="text-4xl font-bold mb-4">Howden Compressors</h1>
                            <p className="text-xl opacity-90 max-w-3xl">
                                Global leader in the design and manufacture of industrial compressors,
                                specialising in sustainable manufacturing and innovative solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Company Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-6">
                                    Howden is committed to sustainable manufacturing and providing innovative
                                    solutions for the energy, industrial, and environmental sectors. Our
                                    state-of-the-art facilities in Glasgow, UK, specialise in designing and
                                    manufacturing industrial compressors that meet the highest standards of
                                    quality and efficiency whilst minimising environmental impact.
                                </p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {companyStats.map((stat, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <stat.icon className={stat.colour} />
                                            <span className="text-gray-700">{stat.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sustainability Commitment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Sustainability Score</span>
                                            <span className="text-blue-600 font-semibold">92%</span>
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000"
                                                style={{ width: '92%' }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-gray-600">
                                        Our commitment to sustainability is reflected in our innovative
                                        approaches to product design, manufacturing processes, and our
                                        dedication to the circular economy through our remanufacturing
                                        initiatives. We prioritise environmental stewardship in every
                                        aspect of our operations.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold mb-4">Ready to Explore?</h3>
                                <p className="text-gray-600 mb-6">
                                    Access Howden's ReMake portal to explore remanufacturing opportunities
                                    and digital product passports.
                                </p>
                                <button
                                    onClick={() => setShowPortal(true)}
                                    className="w-full mb-4 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 hover:shadow-lg"
                                >
                                    Go to Company ReMake Portal
                                    <ExternalLink className="ml-2" size={18} />
                                </button>
                                <button
                                    onClick={scrollToPortal}
                                    className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Learn More
                                    <ChevronDown className="ml-1" size={18} />
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Portal Section */}
                {showPortal && (
                    <section
                        id="portal-section"
                        className="mt-12 animate-fadeIn"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Howden ReMake Portal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                                    <img
                                        src="../../public/assets/howden-portal.png"
                                        alt="Howden ReMake Portal Interface"
                                        className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                                    />
                                </div>
                                <div className="prose max-w-none">
                                    <p>
                                        The Howden ReMake Portal provides access to:
                                    </p>
                                    <ul className="space-y-2">
                                        <li>Detailed product specifications and remanufacturing requirements</li>
                                        <li>Digital Product Passport information</li>
                                        <li>Real-time data access for authorised partners</li>
                                        <li>Collaboration tools for remanufacturing projects</li>
                                    </ul>
                                    <p className="text-gray-600 mt-4">
                                        Contact Howden directly through the portal to request access to
                                        industrial data and begin your remanufacturing journey.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Continue Journey Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/basic-dashboard')}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 hover:shadow-lg"
                    >
                        Continue to DPP Dashboard Demo
                        <ArrowRightCircle className="ml-2" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowdenProfile;