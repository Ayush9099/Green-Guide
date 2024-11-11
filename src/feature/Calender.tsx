"use client";

import { useState, useEffect } from "react";
import Header from "../Layout/Header";
import { Search, X } from "lucide-react";
import axiosInstance from "../axios";
import Footer from "../Layout/Footer";
import { Plant , PlantSchedule } from "../types"

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function PlantCalendar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosInstance.get("/api/plants/list");
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const getSchedule = (plant: Plant): PlantSchedule => {
    const schedule: PlantSchedule = {
      startInside: [],
      transplant: [],
      sowOutside: [],
      beginHarvest: [],
    };

    const addToSchedule = (dateString: string, type: keyof PlantSchedule) => {
      const date = new Date(dateString);
      const month = date.getMonth();
      if (!schedule[type].includes(month + 1)) {
        schedule[type].push(month + 1);
      }
    };

    addToSchedule(plant.plantingTimes.springStartIndoors, "startInside");
    addToSchedule(plant.plantingTimes.fallStartIndoors, "startInside");
    addToSchedule(plant.plantingTimes.springTransplant, "transplant");
    addToSchedule(plant.plantingTimes.fallTransplant, "transplant");
    addToSchedule(plant.plantingTimes.springSowOutdoors, "sowOutside");
    addToSchedule(plant.plantingTimes.fallSowOutdoors, "sowOutside");

    return schedule;
  };

  const filteredPlants = plants.filter((plant) =>
    plant.generalInfo.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const buttonColors = {
    startInside: "bg-pink-600 text-white",
    transplant: "bg-orange-600 text-white",
    sowOutside: "bg-purple-600 text-white",
    beginHarvest: "bg-teal-600 text-white",
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 mt-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-teal-700">
            Plant Calendar
          </h2>

          <div className="flex items-center mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search plant name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => {
              const schedule = getSchedule(plant);
              return (
                <div
                  key={plant._id}
                  className="flex items-center bg-gray-100 rounded-lg shadow-md p-4 mb-4 transition-transform hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedPlant(plant)}
                >
                  <img
                    src={plant.generalInfo.img}
                    alt={plant.generalInfo.plantName}
                    className="w-16 h-16 mr-4 rounded-full shadow-md"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">
                      {plant.generalInfo.plantName}
                    </h3>
                    <div className="flex">
                      {months.map((month, index) => (
                        <div
                          key={month}
                          className="flex-grow text-center relative"
                        >
                          <span className="text-xs text-gray-600">{month}</span>
                          <div className="h-8 border-r border-gray-300 relative">
                            {schedule.startInside.includes(index + 1) && (
                              <div className="absolute inset-0 bg-pink-500 opacity-50"></div>
                            )}
                            {schedule.transplant.includes(index + 1) && (
                              <div className="absolute inset-0 bg-orange-500 opacity-50"></div>
                            )}
                            {schedule.sowOutside.includes(index + 1) && (
                              <div className="absolute inset-0 bg-purple-500 opacity-50"></div>
                            )}
                            {schedule.beginHarvest.includes(index + 1) && (
                              <div className="absolute inset-0 bg-teal-500 opacity-50"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center">No plants found.</p>
          )}

          <div className="flex justify-around mt-4 rounded-full p-2 space-x-4">
            <button
              className={`${buttonColors.startInside} px-6 py-2 rounded-full`}
            >
              Start Inside
            </button>
            <button
              className={`${buttonColors.transplant} px-6 py-2 rounded-full`}
            >
              Transplant
            </button>
            <button
              className={`${buttonColors.sowOutside} px-6 py-2 rounded-full`}
            >
              Sow Outside
            </button>
            <button
              className={`${buttonColors.beginHarvest} px-6 py-2 rounded-full`}
            >
              Begin Harvest
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Selected Plant */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedPlant.generalInfo.plantName} Planting Schedule
              </h3>
              <button
                onClick={() => setSelectedPlant(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Calendar Grid Layout */}
            <div className="grid grid-cols-4 gap-2">
              {months.map((month, index) => {
                const isSpringStartIndoors = [
                  new Date(
                    selectedPlant.plantingTimes.springStartIndoors
                  ).getMonth(),
                ].includes(index);
                const isSpringTransplant = [
                  new Date(
                    selectedPlant.plantingTimes.springTransplant
                  ).getMonth(),
                ].includes(index);
                const isSpringSowOutdoors = [
                  new Date(
                    selectedPlant.plantingTimes.springSowOutdoors
                  ).getMonth(),
                ].includes(index);
                const isFallStartIndoors = [
                  new Date(
                    selectedPlant.plantingTimes.fallStartIndoors
                  ).getMonth(),
                ].includes(index);
                const isFallTransplant = [
                  new Date(
                    selectedPlant.plantingTimes.fallTransplant
                  ).getMonth(),
                ].includes(index);
                const isFallSowOutdoors = [
                  new Date(
                    selectedPlant.plantingTimes.fallSowOutdoors
                  ).getMonth(),
                ].includes(index);

                return (
                  <div
                    key={month}
                    className="p-4 rounded-lg shadow-md border relative text-center bg-gray-100 hover:bg-gray-200"
                  >
                    <span className="text-sm font-semibold text-gray-800">{month}</span>
                    <div className="mt-2 space-y-1">
                      {isSpringStartIndoors && (
                        <p className="text-xs bg-pink-100 text-pink-600 rounded px-2">
                          Spring Start Indoors
                        </p>
                      )}
                      {isSpringTransplant && (
                        <p className="text-xs bg-orange-100 text-orange-600 rounded px-2">
                          Spring Transplant
                        </p>
                      )}
                      {isSpringSowOutdoors && (
                        <p className="text-xs bg-purple-100 text-purple-600 rounded px-2">
                          Spring Sow Outdoors
                        </p>
                      )}
                      {isFallStartIndoors && (
                        <p className="text-xs bg-teal-100 text-teal-600 rounded px-2">
                          Fall Start Indoors
                        </p>
                      )}
                      {isFallTransplant && (
                        <p className="text-xs bg-yellow-100 text-yellow-600 rounded px-2">
                          Fall Transplant
                        </p>
                      )}
                      {isFallSowOutdoors && (
                        <p className="text-xs bg-green-100 text-green-600 rounded px-2">
                          Fall Sow Outdoors
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
