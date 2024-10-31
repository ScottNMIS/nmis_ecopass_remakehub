// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import MainLayout from './components/MainLayout';
import AppRoutes from './AppRoutes';  // Changed name to AppRoutes
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                    <AppRoutes />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);