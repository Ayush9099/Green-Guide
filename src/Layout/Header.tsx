import React, { useEffect, useState } from 'react';

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
          <a href="/" className="hover:text-green transition px-4 py-2">Home</a>
          <a href="/gardens" className="hover:text-green transition px-4 py-2">Gardens</a>
          <a href="/plant" className="hover:text-green transition px-4 py-2">Plant</a>
          <a href="/calender" className="hover:text-green transition px-4 py-2">Calender</a>
          <a href="/blog" className="hover:text-green transition px-4 py-2">Blog</a>
          <a href="/about" className="hover:text-green transition px-4 py-2">About</a>
        </nav>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <a
                href="/signin"
                className="bg-white text-black py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition"
              >
                Register
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
