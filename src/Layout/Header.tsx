import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaBloggerB,
  FaInfoCircle,
  FaLeaf,
  FaPhone,
} from "react-icons/fa";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaSeedling,
  FaUserShield,
} from "react-icons/fa";
import greenPlants from "../assets/greenPlants.png";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <header className="bg-gradient-to-r from-teal-100 via-white to-teal-100 text-gray-800 shadow-lg py-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img src={greenPlants} alt="Green Guide Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-semibold text-teal-600 tracking-wide">
            Green Guide
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap space-x-4 mt-4 md:mt-0">
          <a
            href="/"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaHome className="mr-2 text-lg" /> Home
          </a>
          <a
            href="/gardens"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaLeaf className="mr-2 text-lg" /> Gardens
          </a>
          <a
            href="/plant"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaSeedling className="mr-2 text-lg" /> Plant
          </a>
          <a
            href="/calender"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaCalendarAlt className="mr-2 text-lg" /> Calendar
          </a>
          <a
            href="/post"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaBloggerB className="mr-2 text-lg" /> Post
          </a>
          <a
            href="/blog"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaBloggerB className="mr-2 text-lg" /> Blog
          </a>
          <a
            href="/about"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaInfoCircle className="mr-2 text-lg" /> About
          </a>
          <a
            href="/contact"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
          >
            <FaPhone className="mr-2 text-lg" /> Contact Us
          </a>
        </nav>

        {/* Authentication Links */}
        <div className="flex space-x-3 mt-4 md:mt-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition text-sm"
            >
              <FaSignOutAlt className="mr-2 text-lg" /> Logout
            </button>
          ) : (
            <>
              <a
                href="/"
                className="flex items-center bg-white text-teal-600 py-2 px-4 border border-teal-600 rounded-full hover:bg-teal-50 transition text-sm"
              >
                <FaSignInAlt className="mr-2 text-lg" /> Sign In
              </a>
              <a
                href="/register"
                className="flex items-center bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition text-sm"
              >
                <FaUserPlus className="mr-2 text-lg" /> Register
              </a>
              {!isAdmin && (
                <a
                  href="/adminlogin"
                  className="flex items-center bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition text-sm"
                >
                  <FaUserShield className="mr-2 text-lg" /> Admin Login
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-4"></div>
    </header>
  );
};

export default Header;
