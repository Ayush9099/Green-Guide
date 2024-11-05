import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaBloggerB, FaInfoCircle, FaLeaf, FaPhone } from 'react-icons/fa'; // Importing FaPhone
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaSeedling } from 'react-icons/fa';
const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  return (
    <header className="bg-white text-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1">
          <a href="/" className="flex items-center hover:text-green transition px-4 py-2">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="/gardens" className="flex items-center hover:text-green transition px-4 py-2">
            <FaLeaf className="mr-2" /> Gardens {/* Replaced FaTree with FaLeaf */}
          </a>
          <a href="/plant" className="flex items-center hover:text-green transition px-4 py-2">
            <FaSeedling className="mr-2" /> Plant
          </a>
          <a href="/calender" className="flex items-center hover:text-green transition px-4 py-2">
            <FaCalendarAlt className="mr-2" /> Calendar
          </a>
          <a href="/blog" className="flex items-center hover:text-green transition px-4 py-2">
            <FaBloggerB className="mr-2" /> Blog
          </a>
          <a href="/about" className="flex items-center hover:text-green transition px-4 py-2">
            <FaInfoCircle className="mr-2" /> About
          </a>
          {/* New Contact Us Link */}
          <a href="/contact" className="flex items-center hover:text-green transition px-4 py-2">
            <FaPhone className="mr-2" /> Contact Us
          </a>
        </nav>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <>
              <a
                href="/signin"
                className="flex items-center bg-white text-black py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
              >
                <FaSignInAlt className="mr-2" /> Sign In
              </a>
              <a
                href="/register"
                className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition"
              >
                <FaUserPlus className="mr-2" /> Register
              </a>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-gray-300 mt-2"></div>
    </header>
  );
};
export default Header;