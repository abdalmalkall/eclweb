import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Courses', href: '/courses' },
    { name: 'Team', href: '#' },
    { name: 'Achievement', href: '/achievement' },
    { name: 'About Us', href: '#' },
    { name: 'Testimonial', href: '/testimonial' },
  ];

  // Function to check if a link is active
  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="w-full">
      {/* Top info bar */}
      <div className="w-full bg-white py-2 border-b border-black-200">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="text-gray-700">Phone Number: 956 742 455 678</span>
            <span className="mx-2 hidden sm:block text-gray-300">|</span>
            <span className="text-gray-700 hidden sm:block">Email:info@ddsgnr.com</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.044.976.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.044 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.504-.344-1.857a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058z" />
                <path d="M12 6.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm6.538-8.669a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/src/assets/images/DdsgnrLibrary.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`text-gray-700 hover:text-gray-900 pb-1 ${
                    isActive(link.href) 
                      ? 'border-b-2 border-black-500 font-medium' 
                      : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Login and Sign Up Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md py-2 px-4"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className={`text-gray-700 hover:text-gray-900 py-1 ${
                      isActive(link.href) 
                        ? 'border-l-4 border-teal-500 text-teal-500 font-medium pl-2' 
                        : 'pl-3'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                  <Link 
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md py-2 px-4 text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}