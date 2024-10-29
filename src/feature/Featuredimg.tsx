import React from 'react';

const Featuredimg: React.FC = () => {
  return (
    <div className="relative w-5/6 mx-auto h-60 md:h-80 mt-7">
      <img
        src="/6.avif"
        alt="Featured Banner"
        className="object-cover w-full h-full rounded-lg shadow-md"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
        <h2 className="text-white text-3xl font-bold">Welcome to Green Guide</h2>
      </div>
    </div>
  );
};

export default Featuredimg;
