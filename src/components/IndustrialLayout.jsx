// IndustrialLayout.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Database, QrCode, Home, Menu, X,
    User, LogIn, UserPlus, ChevronDown,
    PackagePlus, AlertCircle, PenTool,
    Factory, RefreshCcw, FileText
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from './auth/AuthContext.jsx';
import AuthDialog from './AuthDialog';
import QRScanner from './QRScanner';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const IndustrialLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    // Main navigation items
    const navigationItems = [
        {
            path: '/',
            label: 'Home',
            icon: <Home className="h-5 w-5" />,
            public: true
        },
        {
            path: '/create-dpp',
            label: 'Create DPP',
            icon: <PackagePlus className="h-5 w-5" />,
            onClick: () => {
                if (isAuthenticated) {
                    navigate('/mes/initialize');
                } else {
                    setAuthMode('login');
                    setShowAuth(true);
                }
            },
            public: false
        },
        {
            path: '/scan',
            label: 'Scan Product',
            icon: <QrCode className="h-5 w-5" />,
            onClick: () => setShowScanner(true),
            public: true
        }
    ];

    // Phase navigation items
    const phaseItems = [
        {
            path: '/mes/initialize',
            label: 'Initialization',
            icon: <FileText className="h-5 w-5" />,
        },
        {
            path: '/mes/design',
            label: 'Design',
            icon: <PenTool className="h-5 w-5" />,
        },
        {
            path: '/mes/manufacture',
            label: 'Manufacture',
            icon: <Factory className="h-5 w-5" />,
        },
        {
            path: '/mes/remanufacture',
            label: 'Remanufacture',
            icon: <RefreshCcw className="h-5 w-5" />,
        }
    ];

    const handleScanResult = (result) => {
        console.log('Scanned:', result);
        setShowScanner(false);
        // Navigate to product details or handle the scanned data
        // navigate(`/product/${result}`);
    };

    const renderNavItem = (item, isMobile = false) => {
        const baseClassName = isMobile
            ? `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium
                ${location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
            : `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                ${location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`;

        if (!item.public && !isAuthenticated) {
            return (
                <TooltipProvider key={item.path}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => {
                                    setAuthMode('login');
                                    setShowAuth(true);
                                }}
                                className={`${baseClassName} opacity-50`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                                <AlertCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Login required to access {item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return (
            <div
                key={item.path}
                onClick={item.onClick || (() => navigate(item.path))}
                className={`${baseClassName} cursor-pointer`}
            >
                {item.icon}
                <span>{item.label}</span>
            </div>
        );
    };

    const renderPhaseNavItem = (item) => {
        const isActive = location.pathname === item.path;
        const baseClassName = `flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors
            ${isActive
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;

        if (!isAuthenticated) {
            return (
                <TooltipProvider key={item.path}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                className={`${baseClassName} opacity-50`}
                                onClick={() => {
                                    setAuthMode('login');
                                    setShowAuth(true);
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                                <AlertCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Login required to access {item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return (
            <Link
                key={item.path}
                to={item.path}
                className={baseClassName}
            >
                {item.icon}
                <span>{item.label}</span>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                {/* Top Navigation */}
                <div className="border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Link to="/" className="flex items-center space-x-3">
                                    <Database className="h-8 w-8 text-blue-600" />
                                    <div>
                                        <h1 className="text-xl font-semibold text-gray-900">
                                            NMIS Ecopass
                                        </h1>
                                        <p className="text-sm text-gray-500">
                                            Digital Product Passport
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-4">
                                {navigationItems.map(item => renderNavItem(item))}
                            </div>

                            <div className="flex items-center gap-2">
                                {isAuthenticated ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-sm font-medium text-blue-700">
                                                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                                                </span>
                                            </div>
                                            <ChevronDown className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <div className="px-2 py-1.5 text-sm font-medium">
                                                {user.email}
                                            </div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logout}>
                                                Sign Out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="p-2 rounded-md hover:bg-gray-100">
                                            <User className="h-5 w-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setAuthMode('login');
                                                    setShowAuth(true);
                                                }}
                                            >
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Sign In
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setAuthMode('register');
                                                    setShowAuth(true);
                                                }}
                                            >
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Create Account
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}

                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="md:hidden p-2 rounded-md hover:bg-gray-100"
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="h-5 w-5" />
                                    ) : (
                                        <Menu className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phase Navigation */}
                <div className="border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex -mb-px space-x-8">
                            {phaseItems.map(renderPhaseNavItem)}
                        </nav>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-b border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map(item => renderNavItem(item, true))}
                            <div className="border-t border-gray-200 mt-2 pt-2">
                                {phaseItems.map(item => renderPhaseNavItem(item))}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>

            {/* QR Scanner Dialog */}
            {showScanner && (
                <QRScanner
                    isOpen={showScanner}
                    onClose={() => setShowScanner(false)}
                    onScan={handleScanResult}
                />
            )}

            {/* Auth Dialog */}
            <AuthDialog
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                mode={authMode}
            />
        </div>
    );
};

export default IndustrialLayout;