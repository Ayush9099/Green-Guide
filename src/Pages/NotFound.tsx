import React from "react";

const NotFound: React.FC = () => {
  const home = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <button
        onClick={home}
        className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;