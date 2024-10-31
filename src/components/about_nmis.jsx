import React, { useState, useEffect } from 'react';
import {
    Database,
    Factory,
    Network,
    ArrowRight,
    FileJson,
    Shield,
    ArrowRightCircle,
    CheckCircle2,
    Recycle,
    LineChart,
    Settings,
    RefreshCw,
    Box,
    Cpu,
    Gauge,
    Binary,
    ThermometerSun,
    BarChart3,
    Leaf,
    ArrowRightFromLine,
    Loader
} from 'lucide-react';

const DataMappingVisual = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedMapping, setSelectedMapping] = useState(null);
    const [processingAnimation, setProcessingAnimation] = useState(false);

    const manufacturingData = [
        {
            id: 1,
            label: "Product Design & Engineering",
            icon: <Cpu size={24} />,
            details: ["CAD Models", "Material Specifications", "Engineering Calculations"],
            mapsTo: [1, 3],
            color: "blue"
        },
        {
            id: 2,
            label: "Production Data",
            icon: <Gauge size={24} />,
            details: ["Manufacturing Parameters", "Quality Control Data", "Process Metrics"],
            mapsTo: [2, 3],
            color: "emerald"
        },
        {
            id: 3,
            label: "Supply Chain & Logistics",
            icon: <Binary size={24} />,
            details: ["Supplier Information", "Transportation Data", "Storage Conditions"],
            mapsTo: [1, 4],
            color: "indigo"
        },
        {
            id: 4,
            label: "Sustainability Metrics",
            icon: <ThermometerSun size={24} />,
            details: ["Energy Usage", "Carbon Emissions", "Resource Consumption"],
            mapsTo: [2, 4],
            color: "teal"
        }
    ];

    const passportFields = [
        {
            id: 1,
            label: "Product Identity",
            icon: <Shield size={24} />,
            details: ["Unique Identifiers", "Material Composition", "Manufacturing Origin"],
            mappedFrom: [1, 3]
        },
        {
            id: 2,
            label: "Environmental Impact",
            icon: <Leaf size={24} />,
            details: ["Carbon Footprint", "Resource Usage", "Environmental Certifications"],
            mappedFrom: [2, 4]
        },
        {
            id: 3,
            label: "Quality & Performance",
            icon: <BarChart3 size={24} />,
            details: ["Quality Metrics", "Performance Data", "Compliance Records"],
            mappedFrom: [1, 2]
        },
        {
            id: 4,
            label: "Circular Economy Data",
            icon: <Recycle size={24} />,
            details: ["Recyclability Info", "Disassembly Guide", "Material Recovery"],
            mappedFrom: [3, 4]
        }
    ];

    useEffect(() => {
        if (selectedMapping) {
            setProcessingAnimation(true);
            const timer = setTimeout(() => {
                setProcessingAnimation(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [selectedMapping]);

    const renderMappingLines = () => {
        if (!selectedMapping) return null;

        const sourceData = manufacturingData.find(d => d.id === selectedMapping);
        if (!sourceData) return null;

        return sourceData.mapsTo.map(targetId => {
            const sourceElement = document.getElementById(`source-${sourceData.id}`);
            const targetElement = document.getElementById(`target-${targetId}`);

            if (!sourceElement || !targetElement) return null;

            const sourceRect = sourceElement.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            const containerRect = document.getElementById('mapping-container').getBoundingClientRect();

            const start = {
                x: sourceRect.right - containerRect.left,
                y: sourceRect.top + sourceRect.height / 2 - containerRect.top
            };

            const end = {
                x: targetRect.left - containerRect.left,
                y: targetRect.top + targetRect.height / 2 - containerRect.top
            };

            const controlPoint = (start.x + end.x) / 2;

            return (
                <svg
                    key={`mapping-${sourceData.id}-${targetId}`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                >
                    <defs>
                        <linearGradient id={`gradient-${sourceData.id}-${targetId}`}>
                            <stop offset="0%" stopColor={`rgb(var(--color-${sourceData.color}-500))`} />
                            <stop offset="100%" stopColor="rgb(var(--color-teal-500))" />
                        </linearGradient>
                    </defs>
                    <path
                        d={`M ${start.x} ${start.y} C ${controlPoint} ${start.y}, ${controlPoint} ${end.y}, ${end.x} ${end.y}`}
                        stroke={`url(#gradient-${sourceData.id}-${targetId})`}
                        strokeWidth="3"
                        fill="none"
                        className={`transition-all duration-500 ${processingAnimation ? 'stroke-dasharray-animated' : ''}`}
                        strokeDasharray="8 4"
                    />
                    <circle
                        cx={end.x}
                        cy={end.y}
                        r="4"
                        fill="rgb(var(--color-teal-500))"
                        className={`${processingAnimation ? 'animate-pulse' : ''}`}
                    />
                </svg>
            );
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-xl p-12 my-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
                NMIS EcoPass Data Transformation
            </h3>
            <div id="mapping-container" className="flex items-stretch justify-between gap-12 relative min-h-[600px]">
                {/* Manufacturing Data Section */}
                <div className="space-y-6 flex-1">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg mb-8">
                        <h4 className="font-semibold text-gray-700 mb-2 text-xl">Company Manufacturing Data</h4>
                        <p className="text-gray-600 text-sm">Source data across product lifecycle</p>
                    </div>
                    {manufacturingData.map((item) => (
                        <div
                            id={`source-${item.id}`}
                            key={item.id}
                            className={`relative z-10 flex flex-col gap-2 p-4 rounded-lg cursor-pointer
                                transition-all duration-300 transform
                                ${hoveredItem === `input-${item.id}` || selectedMapping === item.id
                                ? `bg-${item.color}-50 scale-105 shadow-lg`
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedMapping(item.id === selectedMapping ? null : item.id)}
                            onMouseEnter={() => setHoveredItem(`input-${item.id}`)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`text-${item.color}-600 transition-transform duration-300 
                                    ${selectedMapping === item.id ? 'transform scale-110' : ''}`}>
                                    {item.icon}
                                </div>
                                <span className="font-medium text-gray-900">{item.label}</span>
                                <ArrowRightFromLine className={`ml-auto h-4 w-4 text-${item.color}-500
                                    transition-all duration-300
                                    ${selectedMapping === item.id ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
                            </div>
                            <div className="pl-8 text-sm text-gray-600">
                                {item.details.map((detail, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                                            ${selectedMapping === item.id ? `bg-${item.color}-400` : 'bg-gray-400'}`} />
                                        {detail}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Central Processing Section */}
                <div className="flex flex-col items-center justify-center px-12 relative z-20">
                    <div className={`bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-8 shadow-xl
                    transition-all duration-500 transform
                    ${processingAnimation ? 'scale-110 shadow-2xl' : 'hover:scale-105'}`}>

                        {/* NMIS Logo with White Background */}
                        <div className="bg-white rounded-md p-2 mb-4">
                            <img
                                src="src/assets/nmis-logo_transparent.png"
                                alt="NMIS Logo"
                                className="w-24 h-auto"
                            />
                        </div>

                        <h4 className="text-white font-bold text-xl mb-3">NMIS EcoPass</h4>
                        <div className="space-y-2 text-white text-sm opacity-90">
                            <p>• Data Standardisation</p>
                            <p>• Schema Validation</p>
                            <p>• Compliance Checking</p>
                            <p>• Quality Assurance</p>
                        </div>
                        <div className="mt-6 flex justify-center">
                            {processingAnimation ? (
                                <Loader className="h-10 w-10 text-white animate-spin" />
                            ) : (
                                <Settings className="h-10 w-10 text-white animate-spin-slow" />
                            )}
                        </div>
                    </div>
                </div>


                {/* Digital Product Passport Section */}
                <div className="space-y-6 flex-1">
                    <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 rounded-lg mb-8">
                        <h4 className="font-semibold text-gray-700 mb-2 text-xl">Digital Product Passport</h4>
                        <p className="text-gray-600 text-sm">Standardised format following international requirements</p>
                    </div>
                    {passportFields.map((item) => {
                        const isHighlighted = selectedMapping && item.mappedFrom.includes(selectedMapping);
                        return (
                            <div
                                id={`target-${item.id}`}
                                key={item.id}
                                className={`relative z-10 flex flex-col gap-2 p-4 rounded-lg
                                    transition-all duration-500
                                    ${isHighlighted
                                    ? 'bg-teal-50 scale-105 shadow-lg'
                                    : selectedMapping
                                        ? 'opacity-50 bg-gray-50'
                                        : 'bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`text-teal-600 transition-transform duration-300
                                        ${isHighlighted ? 'transform scale-110' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-medium text-gray-900">{item.label}</span>
                                </div>
                                <div className="pl-8 text-sm text-gray-600">
                                    {item.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                                                ${isHighlighted ? 'bg-teal-400' : 'bg-gray-400'}`} />
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {renderMappingLines()}
            </div>

            <style jsx>{`
                @keyframes stroke-dash {
                    to {
                        stroke-dashoffset: -24;
                    }
                }
                .stroke-dasharray-animated {
                    animation: stroke-dash 1s linear infinite;
                }
            `}</style>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-2">How It Works</h5>
                <p className="text-gray-600">
                    Click on any manufacturing data source to see how NMIS EcoPass transforms and maps your existing data
                    into standardised Digital Product Passport formats. Our system handles the complexity of data
                    transformation, ensuring compliance with international standards while maintaining data integrity
                    throughout the product lifecycle.
                </p>
            </div>
        </div>
    );
};

const AboutNMIS = () => {
    const handleMarketplaceClick = () => {
        window.location.href = '/marketplace';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-8">
                            Transforming Manufacturing
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                                Through Digital Product Passports
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            The National Manufacturing Institute Scotland (NMIS) is pioneering the future of
                            sustainable manufacturing through our ReMake Hub and EcoPass framework, enabling
                            standardised data transformation and comprehensive product lifecycle tracking.
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <DataMappingVisual />
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Network className="h-8 w-8 text-blue-500" />}
                        title="Digital Thread Innovation"
                        description="Comprehensive cradle-to-gate data capture enabling complete product lifecycle visibility and traceability through standardised formats."
                    />
                    <FeatureCard
                        icon={<Recycle className="h-8 w-8 text-teal-500" />}
                        title="Remanufacturing Excellence"
                        description="Supporting sustainable product lifecycles through detailed documentation and standardised remanufacturing guidelines."
                    />
                    <FeatureCard
                        icon={<Shield className="h-8 w-8 text-indigo-500" />}
                        title="Open Platform Architecture"
                        description="Fostering industry collaboration through our open-source platform and standardised Digital Product Passport framework."
                    />
                </div>
            </section>

            <section className="bg-gradient-to-r from-blue-600 to-teal-500 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Join the Future of Sustainable Manufacturing
                    </h2>
                    <p className="text-white text-lg mb-8 opacity-90">
                        Discover how the ReMake Hub can transform your manufacturing processes
                    </p>
                    <button
                        onClick={handleMarketplaceClick}
                        className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg">
                        Explore Digital Product Passport ReMake Hub Marketplace
                        <ArrowRightCircle className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="mb-5">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Add style tag to the component for custom animations and backgrounds
const StyleTag = () => (
    <style>{`
        @keyframes spin-slow {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }

        .bg-grid-slate-100 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.1)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
        }

        .bg-grid-white\\/10 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
        }
    `}</style>
);


export default AboutNMIS;