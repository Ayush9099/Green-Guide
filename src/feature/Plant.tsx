"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

export default function PlantManagement() {
  const [plantsData, setPlantsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlantsData = async () => {
      try {
        const response = await axiosInstance.get("/api/plants/list");
        setPlantsData(response.data || []);
      } catch (error) {
        console.error("Error fetching plants data:", error);
        setPlantsData([]);
      }
    };
    fetchPlantsData();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-serif font-semibold text-teal-500 text-center mb-10">
          Plants
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantsData && plantsData.length > 0 ? (
            plantsData.map((plant) => (
              <div
                key={plant._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <div className="relative">
                  <Link to={`/plants/${plant._id}`} className="block">
                    <img
                      src={plant.generalInfo.img}
                      alt={plant.generalInfo?.plantName || "Plant image"}
                      className="w-full h-64 object-cover rounded-lg transition-all duration-300 transform hover:scale-110"
                    />
                  </Link>

                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                  <Link
                    to={`/plants/${plant._id}`}
                    className="text-gray-800 hover:text-teal-600 transition duration-300"
                  >
                    {plant.generalInfo?.plantName || "Unnamed Plant"}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-3">
                  {plant.generalInfo?.description || "No description available"}
                </p>

                <div className="mt-4 text-center">
                  <Link
                    to={`/plants/${plant._id}`}
                    className="bg-teal-500 text-white py-3 px-6 rounded-lg text-md font-medium shadow-lg hover:bg-teal-600 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-3 flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-gray-500 mb-6"></div>
              <p className="text-xl mb-4">No plants found. Start growing!</p>
              <button
                onClick={() => { }}
                className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
              >
                + Add Your First Plant
              </button>
            </div>
          )}
        </div>


      </div>
      <Footer />
    </>
  );
}
