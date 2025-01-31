import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicLinks = [
    { to: '/faq', label: 'FAQ' },
    { to: '/tips', label: 'Tips' },
    { to: '/about', label: 'About' },
  ];

  const privateLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/carbon-tracking', label: 'Track Emission' },
    { to: '/stats-dashboard', label: 'Emission Stats' },
    { to: '/game', label: 'EcoGame' },
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">EcoTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && privateLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-green-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-green-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-white hover:text-green-200">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-white hover:text-green-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {user && privateLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 hover:text-green-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 hover:text-green-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-green-600 my-2"></div>
            {!user ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block py-2 hover:text-green-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 hover:text-green-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
