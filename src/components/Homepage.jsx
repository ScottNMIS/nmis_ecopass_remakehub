// Homepage.jsx

import React from 'react';
import { FaRecycle, FaLightbulb, FaLeaf, FaChartLine } from 'react-icons/fa';

const Homepage = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-8 space-y-16">

            {/* Header Section */}
            <section className="text-center bg-gradient-to-r from-cyan-600 to-teal-700 text-white py-16 px-8 rounded-xl shadow-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
                    Discover the Power of the Digital Product Passport (DPP)
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    The DPP is a revolutionary framework empowering sustainable manufacturing and remanufacturing by enabling essential data sharing for high-value products.
                </p>
                <a href="#start-your-journey" className="bg-white text-teal-700 px-8 py-3 font-semibold rounded-md shadow hover:bg-gray-100 transition duration-300">
                    Start Your Journey
                </a>
            </section>

            {/* Value of ReMake Hub Section */}
            <section className="bg-gray-50 py-12 px-8 rounded-lg shadow-md">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    Why Join the ReMake Hub?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <ValueCard
                        icon={<FaLightbulb className="text-yellow-500 text-5xl" />}
                        title="Innovation"
                        description="Unlock opportunities for innovation through collaboration on a forward-thinking platform."
                    />
                    <ValueCard
                        icon={<FaRecycle className="text-green-500 text-5xl" />}
                        title="Remanufacturing"
                        description="Enable the remanufacturing of high-value products by sharing essential data securely."
                    />
                    <ValueCard
                        icon={<FaLeaf className="text-teal-500 text-5xl" />}
                        title="Sustainability"
                        description="Strengthen sustainability efforts by extending product lifecycles and reducing waste."
                    />
                    <ValueCard
                        icon={<FaChartLine className="text-blue-500 text-5xl" />}
                        title="Sector Growth"
                        description="Participate in and benefit from the expanding field of sustainable remanufacturing."
                    />
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-8">
                <a
                    href="#explore-nmis"
                    className="bg-teal-600 text-white px-10 py-4 font-semibold rounded-md shadow-lg hover:bg-teal-700 transition duration-300 text-lg"
                >
                    Learn More About NMIS & Begin Your Journey
                </a>
            </section>

        </div>
    );
};

// Reusable ValueCard Component
const ValueCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300 text-center">
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Homepage;