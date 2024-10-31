import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRightCircle, Building2, Info, Gauge, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const companies = [
    {
        id: 1,
        name: "Howden Compressors",
        description: "Global leader in the design and manufacture of industrial compressors, based in Glasgow, UK. Howden is committed to sustainable manufacturing and providing innovative solutions for the energy, industrial, and environmental sectors.",
        category: "Industrial Equipment",
        remanufacturableProducts: 12,
        sustainabilityScore: 92,
        image: "src/assets/howden-logo.jpg",
        isReal: true
    },
    ...Array(1).fill(null).map((_, index) => ({
        id: index + 2,
        name: `Manufacturing Company ${index + 1}`,
        description: "Innovative manufacturer committed to sustainable practices and circular economy principles through remanufacturing initiatives.",
        category: ["Industrial Equipment", "Automotive", "Energy Systems", "Machinery"][index % 4],
        remanufacturableProducts: Math.floor(Math.random() * 20) + 1,
        sustainabilityScore: Math.floor(Math.random() * 30) + 70,
        image: "src/assets/nmis-background.jpg",
        isReal: false
    }))
];

const CompanyCard = ({ company, onViewProfile }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden transform ${
                isHovered ? 'scale-102 shadow-xl' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <img
                    src={company.image}
                    alt={company.name}
                    className="object-cover w-full h-48 transition-transform duration-300"
                    style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />
                {company.isReal && (
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium shadow-lg">
                            Verified Partner
                        </span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{company.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{company.description}</p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 transition-all duration-200 hover:text-blue-600">
                        <Building2 className="text-blue-500" size={20} />
                        <span className="text-sm">{company.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gauge className="text-teal-500" size={20} />
                        <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000"
                                    style={{
                                        width: isHovered ? `${company.sustainabilityScore}%` : '0%'
                                    }}
                                />
                            </div>
                            <span className="text-sm text-gray-600 mt-1">
                                {company.sustainabilityScore}% Sustainability Score
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Info size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-500">
                            {company.remanufacturableProducts} Products
                        </span>
                    </div>
                    {company.isReal ? (
                        <button
                            onClick={onViewProfile}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
                        >
                            View Profile
                            <ArrowRightCircle className="ml-2" size={18} />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                            <Lock size={18} />
                            <span className="text-sm">Coming Soon</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Marketplace = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const categories = ['All', 'Industrial Equipment', 'Automotive', 'Energy Systems', 'Machinery'];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsSearchVisible(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                            ReMake Hub Marketplace
                        </h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto animate-fade-in-up">
                            Discover innovative companies committed to sustainable manufacturing through
                            digital product passports and remanufacturing excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Floating Search Bar */}
            <div className={`sticky top-0 z-50 transition-all duration-300 ${
                isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
            }`}>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-white/95 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search companies..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="py-2 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </section>
            </div>

            {/* Initial Search and Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Filter className="text-gray-400" />
                        <select
                            className="py-3 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Companies Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCompanies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            onViewProfile={() => navigate('/profile_howdencompressors')}
                        />
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            {/*
            <section className="bg-gray-50 border-t border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Join the ReMake Hub Community
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Transform your manufacturing processes and contribute to a sustainable future
                        through digital product passports and remanufacturing excellence.
                    </p>
                    <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200">
                        Get Started
                        <ArrowRightCircle className="ml-2" />
                    </button>
                </div>
            </section>
            */}
        </div>
    );
};

export default Marketplace;
