// MainLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Database, QrCode, Home, LineChart,
    FileBarChart, Settings2, History,
    Shield, Menu, X, User, LogIn,
    UserPlus, ChevronDown, AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from './auth/AuthContext.jsx';
import AuthDialog from './AuthDialog';
//import { AuthDialog } from './AuthDialog'; // Previous auth dialog component
import QRScanner from './QRScanner';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const MainLayout = ({ children }) => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    // Define all navigation items with their access levels
    const navigationItems = [
        {
            path: '/',
            label: 'Home',
            icon: <Home className="h-5 w-5" />,
            public: true
        },
        {
            path: '/basic-dashboard',
            label: 'Basic Data',
            icon: <FileBarChart className="h-5 w-5" />,
            public: true
        },
        {
            path: '/advanced-data',
            label: 'Advanced Analytics',
            icon: <LineChart className="h-5 w-5" />,
            public: false
        },
        {
            path: '/lifecycle',
            label: 'Lifecycle',
            icon: <History className="h-5 w-5" />,
            public: false
        },
        {
            path: '/compliance',
            label: 'Compliance',
            icon: <Shield className="h-5 w-5" />,
            public: false
        },
        {
            path: '/settings',
            label: 'Settings',
            icon: <Settings2 className="h-5 w-5" />,
            public: false
        },
        {
            path: '/scan',
            label: 'Scan Product',
            icon: <QrCode className="h-5 w-5" />,
            onClick: () => setIsQRScannerOpen(true),
            public: true
        }
    ];

    // Filter navigation items based on authentication status
    const visibleNavItems = navigationItems.filter(item =>
        item.public || isAuthenticated
    );

    const handleNavigation = (item) => {
        if (item.onClick) {
            item.onClick();
        }
        setIsMobileMenuOpen(false);
    };

    // Render a navigation item with optional login prompt
    const renderNavItem = (item, isMobile = false) => {
        const baseClassName = isMobile
            ? `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium
                ${location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
            : `flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors
                ${location.pathname === item.path
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                                <AlertCircle className="h-4 w-4 text-gray-400" />
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
                to={item.onClick ? '#' : item.path}
                onClick={() => handleNavigation(item)}
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
                <div className="max-w-7xl mx-auto">
                    {/* Top Banner */}
                    <div className="border-b border-gray-200">
                        <div className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <Database className="h-8 w-8 text-blue-600" />
                                <h1 className="text-xl font-semibold text-gray-900">
                                    NMIS Ecopass: Digital Product Passport
                                </h1>
                            </div>

                            <div className="flex items-center gap-2">
                                {isAuthenticated ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="flex items-center gap-2 h-10 pl-3 pr-2"
                                            >
                                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-blue-700">
                                                        {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-sm hidden md:inline-block">
                                                    {user.name || user.email.split('@')[0]}
                                                </span>
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <div className="px-2 py-1.5 text-sm font-medium">
                                                {user.email}
                                            </div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logout}>
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Sign Out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 rounded-full"
                                            >
                                                <User className="h-5 w-5" />
                                            </Button>
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
                                <Button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="h-5 w-5" />
                                    ) : (
                                        <Menu className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block px-4">
                        <div className="flex -mb-px">
                            {navigationItems.map(item => renderNavItem(item))}
                        </div>
                    </nav>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <nav className="md:hidden bg-white border-b border-gray-200">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigationItems.map(item => renderNavItem(item, true))}
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {children}
                </div>
            </main>

            {/* Auth Dialog */}
            <AuthDialog
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                mode={authMode}
            />

            {/* QR Scanner Dialog */}
            {isQRScannerOpen && (
                <QRScanner
                    isOpen={isQRScannerOpen}
                    onClose={() => setIsQRScannerOpen(false)}
                    onScan={(result) => {
                        console.log('Scanned result:', result);
                        setIsQRScannerOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default MainLayout;