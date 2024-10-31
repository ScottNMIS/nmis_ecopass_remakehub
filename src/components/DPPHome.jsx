import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRecycle, FaLightbulb, FaLeaf, FaChartLine, FaDatabase } from 'react-icons/fa';

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 space-y-12">
            {/* Header Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20 px-8 rounded-2xl shadow-2xl">
                <div className="relative">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/95 p-4 rounded-xl shadow-lg">
                            <img
                                src={"assets/nmis-logo_transparent.png"}
                                alt="National Manufacturing Institute Scotland Logo"
                                className="w-40 h-auto"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-center leading-tight">
                        Welcome to the ReMake Hub
                        <span className="block text-3xl md:text-4xl mt-4">
                            Powered by NMIS EcoPass
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-center font-light leading-relaxed text-blue-50">
                        Revolutionising manufacturing through our Digital Product Passport framework, enabling sustainable practices and data-driven innovation.
                    </p>
                </div>
            </section>

            {/* What is DPP Section */}
            <section className="py-12 px-4">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">What is a Digital Product Passport?</h2>
                <div className="flex justify-center mb-12">
                    <div className="text-center">
                        <FaDatabase className="text-6xl text-teal-600 mx-auto mb-6" />
                        <p className="text-xl max-w-3xl text-gray-600">
                            A revolutionary framework that empowers companies to track, manage, and optimise their products throughout the entire lifecycle, supporting sustainable manufacturing and remanufacturing processes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="py-12 px-4 bg-gray-50 rounded-xl">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    Transform Your Manufacturing with ReMake Hub
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ValueCard
                        icon={<FaDatabase className="text-purple-500 text-5xl" />}
                        title="Product Value"
                        description="Add value to your products through comprehensive digital tracking and lifecycle management."
                        color="purple"
                    />
                    <ValueCard
                        icon={<FaLightbulb className="text-yellow-500 text-5xl" />}
                        title="Innovation"
                        description="Drive innovation through data-driven insights and collaborative opportunities."
                        color="yellow"
                    />
                    <ValueCard
                        icon={<FaRecycle className="text-green-500 text-5xl" />}
                        title="Remanufacturing"
                        description="Enable efficient remanufacturing processes with complete product lifecycle data."
                        color="green"
                    />
                    <ValueCard
                        icon={<FaLeaf className="text-teal-500 text-5xl" />}
                        title="Sustainability"
                        description="Support your sustainability goals through optimised product lifecycle management."
                        color="teal"
                    />
                </div>
            </section>

            {/* Background Image Section */}
            <section
                className="relative bg-cover bg-center p-16 rounded-xl shadow-2xl text-white min-h-[500px] flex items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("assets/nmis-background.jpg")`
                }}

            >
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Grow with Us</h2>
                    <p className="text-xl mb-12">
                        Join the innovative ecosystem of manufacturers embracing sustainable practices through our ReMake Hub and NMIS EcoPass system.
                    </p>
                    <button
                        onClick={() => navigate('/about')}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition hover:-translate-y-1"
                    >
                        Learn About NMIS EcoPass
                    </button>
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon, title, description, color }) => {
    const getGradient = (color) => {
        const gradients = {
            purple: 'from-purple-50 to-white',
            yellow: 'from-yellow-50 to-white',
            green: 'from-green-50 to-white',
            teal: 'from-teal-50 to-white'
        };
        return gradients[color] || 'from-gray-50 to-white';
    };

    return (
        <div className={`bg-gradient-to-br ${getGradient(color)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="mb-6 flex justify-center">{icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default Homepage;