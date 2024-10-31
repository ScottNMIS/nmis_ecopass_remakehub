// auth/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../api_calls';

const AuthContext = createContext(null);

export const PROTECTED_ROUTES = [
    '/advanced-data',
    '/lifecycle',
    '/compliance',
    '/settings'
];

export const PUBLIC_ROUTES = [
    '/',
    '/basic-dashboard',
    '/scan'
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Check authentication status on mount and after login/logout
    const checkAuth = async () => {
        try {
            const userData = await authApi.getCurrentUser();
            setUser(userData);
            // If we're on a protected route and there's no user, redirect to login
            if (!userData && PROTECTED_ROUTES.includes(location.pathname)) {
                navigate('/', { replace: true });
            }
        } catch (err) {
            setUser(null);
            if (PROTECTED_ROUTES.includes(location.pathname)) {
                navigate('/', { replace: true });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [location.pathname]);

    const login = async (email, password) => {
        try {
            const response = await authApi.login(email, password);
            setUser(response.user);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await authApi.register(email, password, name);
            setUser(response.user);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const value = {
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated && PROTECTED_ROUTES.includes(location.pathname)) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, loading, location.pathname, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return children;
};