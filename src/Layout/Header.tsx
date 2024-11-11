import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaBloggerB, FaInfoCircle, FaLeaf, FaPhone } from 'react-icons/fa';
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaSeedling, FaUserShield } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming the role is saved in localStorage
    
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === 'admin'); // Check if the user is an admin
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Clear the role as well
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  return (
    <header className="bg-gradient-to-r from-teal-100 via-white to-teal-100 text-gray-800 shadow-md py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-3 md:mb-0">
          <h1 className="text-3xl font-semibold text-teal-600 tracking-wider">Green Guide</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <a
            href="/"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaHome className="mr-1 text-lg" /> Home
          </a>
          <a
            href="/gardens"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaLeaf className="mr-1 text-lg" /> Gardens
          </a>
          <a
            href="/plant"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaSeedling className="mr-1 text-lg" /> Plant
          </a>
          <a
            href="/calender"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaCalendarAlt className="mr-1 text-lg" /> Calendar
          </a>
          <a
            href="/post"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaBloggerB className="mr-1 text-lg" /> Post
          </a>
          <a
            href="/blog"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaBloggerB className="mr-1 text-lg" /> Blog
          </a>
          <a
            href="/about"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaInfoCircle className="mr-1 text-lg" /> About
          </a>
          <a
            href="/contact"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 hover:underline transition duration-300 px-3 py-1"
          >
            <FaPhone className="mr-1 text-lg" /> Contact Us
          </a>
        </nav>

        {/* Authentication Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center bg-teal-600 text-white py-1.5 px-5 rounded-full hover:bg-teal-700 transition duration-300 text-sm"
            >
              <FaSignOutAlt className="mr-1 text-lg" /> Logout
            </button>
          ) : (
            <>
              <a
                href="/signin"
                className="flex items-center bg-white text-teal-600 py-1.5 px-5 border-2 border-teal-600 rounded-full hover:bg-teal-50 hover:text-teal-700 transition duration-300 text-sm"
              >
                <FaSignInAlt className="mr-1 text-lg" /> Sign In
              </a>
              <a
                href="/register"
                className="flex items-center bg-teal-600 text-white py-1.5 px-5 rounded-full hover:bg-teal-700 transition duration-300 text-sm"
              >
                <FaUserPlus className="mr-1 text-lg" /> Register
              </a>
              {!isAdmin && (
                <a
                  href="/adminlogin"
                  className="flex items-center bg-red-600 text-white py-1.5 px-5 rounded-full hover:bg-red-700 transition duration-300 text-sm"
                >
                  <FaUserShield className="mr-1 text-lg" /> Admin Login
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-4 md:mt-6"></div>
    </header>
  );
};
export default Header;