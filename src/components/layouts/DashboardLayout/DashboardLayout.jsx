import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';
import { Bell, Search, ChevronRight } from 'lucide-react';
// import NotificationListener from '@/components/NotificationListener';

const DashboardLayout = () => {
    const user = useUserStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        // Log authentication status and user data
        console.log('Authentication status:', isAuthenticated);
        console.log('User details:', user);
        
        // Check if data loading is complete
        if (isAuthenticated) {
            if (user) {
                console.log('User data loaded successfully:', user);
                setIsLoading(false);
            } else {
                console.log('User is authenticated but user data is not available');
                // Fetch user data if needed
                import('@/stores/app-initializer').then(module => {
                    module.fetchUserData().then(() => {
                        setIsLoading(false);
                    }).catch(error => {
                        console.error('Failed to retrieve user data:', error);
                        setIsLoading(false);
                    });
                });
            }
        } else {
            console.log('User is not authenticated, redirecting to login page');
            setIsLoading(false);
        }
    }, [user, isAuthenticated]);

    // Handle screen resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Get current page title based on location
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Dashboard';
        if (path === '/profile') return 'Profile';
        if (path === '/reports') return 'Reports';
        if (path === '/users') return 'Users';
        if (path === '/analytics') return 'Analytics';
        if (path === '/settings') return 'Settings';
        return 'Dashboard';
    };

    // Display loading indicator while loading data
    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <span className="text-gray-600 font-medium">Loading user data...</span>
            </div>
        );
    }

    // Redirect user to login page if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-50">

            {/* Sidebar */}
            <DashboardSidebar 
                isOpen={isMobileMenuOpen}
                setIsOpen={setIsMobileMenuOpen}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />
            
            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {/* Top Navigation Bar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button 
                                    onClick={toggleSidebar}
                                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Sidebar collapse toggle - visible on desktop */}
                            <div className="hidden lg:flex lg:items-center">

                                <button 
                                    onClick={toggleSidebarCollapse}
                                    className="p-1 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                                >
                                    <ChevronRight className={`w-5 h-5 transform transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                                </button>
                                <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
                            </div>
                            
                            {/* Mobile only title */}
                            <div className="lg:hidden">
                                <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>

                            </div>
                            
                            {/* Search Bar - Hidden on mobile */}
                            <div className="hidden md:block flex-1 max-w-md mx-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                            </div>
                            
                            {/* Right Navigation */}
                            <div className="flex items-center space-x-4">
                                {/* Notification Button */}
                                {/* <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> */}
                                    <span className="sr-only">View notifications</span>
                                {/* <NotificationListener /> */}
                                {/* </button> */}
                                
                                {/* User Menu Button */}
                                <div className="relative">
                                    <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span className="sr-only">Open user menu</span>
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                
                {/* Main Content Area */}
                <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="bg-white shadow-inner py-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>© {new Date().getFullYear()} Your Company. All rights reserved.</div>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default DashboardLayout;