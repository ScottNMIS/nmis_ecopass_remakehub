// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/AuthContext';
import DPPHome from './components/DPPHome';
import DPPHomepage from './components/DashboardHomepage.jsx';
import BasicDashboard from './components/BasicDashboard';
import AdvancedData from './components/AdvancedData';
import QRScannerPage from './components/QRScanner';
import AboutNMIS from './components/about_nmis';  // Import AboutNMIS component
import Marketplace from './components/marketplace.jsx';  // Import AboutNMIS component
import HowdenProfile from './components/companyprofile.jsx';  // Import AboutNMIS component
import MESDashboard from './components/MESDashboard.jsx';  // Import AboutNMIS component
import MESHome from './components/MESHome.jsx';  // Import AboutNMIS component
import DesignPage from './components/DesignPage.jsx';  // Import AboutNMIS component
import InitialisationPage from './components/Initialisation.jsx';  // Import AboutNMIS component
import ProductPassport from './components/ProductPassport.jsx';  // Import AboutNMIS component
import ScrollToTop from './ScrollToTop';

//                <Route path="/" element={<Navigate to="/InitialisationPage" replace />} />

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>


                {/* Public Routes */}
            <Route path="/" element={<DPPHome />} />
            <Route path="/basic-dashboard" element={<BasicDashboard />} />
            <Route path="/scan" element={<QRScannerPage />} />
            <Route path="/about" element={<AboutNMIS />} />
            <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/MESDashboard" element={<MESHome />} />
            <Route path="/MESDashboard" element={<MESDashboard />} />
            <Route path="/profile_howdencompressors" element={<HowdenProfile />} />
                <Route path="/DashboardHomepage" element={<DPPHomepage />} />
                <Route path="/InitialisationPage" element={<InitialisationPage />} />
                <Route path="/DesignPage" element={<DesignPage />} />
                <Route path="/product/:ai/:gtin/:qualifier/:serial" element={<ProductPassport />} />
            {/* Protected Routes */}
            <Route
                path="/advanced-data"
                element={
                    <ProtectedRoute>
                        <AdvancedData />
                    </ProtectedRoute>
                }
            />

            </Routes>
        </>
    );
};

export default AppRoutes;
