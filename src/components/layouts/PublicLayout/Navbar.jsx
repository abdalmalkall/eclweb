import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSpecialButton, setActiveSpecialButton] = useState(null);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Course Selector', path: '/course-selector' },
    { name: 'pricing', path: '/pricing' },
    { name: 'Courses', path: '/courses' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About US', path: '/about' },
    { name: 'Contact US', path: '/contact' },
  ];

  const specialButtons = ['FAQ', 'Contact US'];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (itemName) => {
    if (specialButtons.includes(itemName)) {
      setActiveSpecialButton(itemName === activeSpecialButton ? null : itemName);
    } else {
      setActiveSpecialButton(null);
    }
  };

  const isSpecialActive = activeSpecialButton !== null;

  return (
    <nav className={`${isSpecialActive ? 'bg-orange-500' : 'bg-white'} shadow-sm py-8 px-4 md:px-6 p-5 transition-colors duration-300`}>
      <div className="w-full max-w-[1700px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/src/assets/images/LogoNavbar.png"
              alt="Logo"
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-15">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-medium ${
                activeSpecialButton === item.name 
                  ? 'text-white font-bold' 
                  : location.pathname === item.path
                    ? 'text-orange-500'
                    : isSpecialActive && !specialButtons.includes(item.name)
                      ? 'text-gray-100 hover:text-white'
                      : 'text-gray-500 hover:text-orange-500'
              }`}
              onClick={() => handleNavItemClick(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-9">
          <Link
            to="/login"
            className={` 
              border px-12 py-2 rounded text-center transition-colors duration-300
              ${isSpecialActive 
                ? 'border-white text-white bg-transparent' 
                : 'text-orange-500 border-orange-500 hover:bg-orange-50'}
            `}
            
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className={`
              ${isSpecialActive 
                ? 'bg-white text-black' 
                : 'bg-orange-500 text-white hover:bg-orange-600'} 
              px-6 py-2 rounded text-base font-medium transition-colors duration-300
            `}
          >
            Create Account
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`${isSpecialActive ? 'text-white' : 'text-gray-500'} hover:text-orange-300 focus:outline-none`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 px-4">
          <div className="flex flex-col space-y-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSpecialButton === item.name 
                    ? 'text-white font-bold' 
                    : location.pathname === item.path
                      ? 'text-orange-500'
                      : isSpecialActive && !specialButtons.includes(item.name)
                        ? 'text-gray-100 hover:text-white'
                        : 'text-gray-500 hover:text-orange-500'
                }`}
                onClick={() => {
                  handleNavItemClick(item.name);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                to="/login"
                className={` 
                  border px-4 py-2 rounded text-center transition-colors duration-300
                  ${isSpecialActive 
                    ? 'border-white text-black bg-transparent' 
                    : 'text-orange-500 border-orange-500 hover:bg-orange-50'}
                `}
                
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className={`
                  ${isSpecialActive 
                    ? 'bg-white text-black' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'} 
                  px-4 py-2 rounded text-center transition-colors duration-300
                `}
                onClick={() => setIsOpen(false)}
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;