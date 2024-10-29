import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import axiosInstance from "../axios";

interface Plant {
  _id: string;
  generalInfo: {
    plantName: string;
  };
}

interface Garden {
  _id: string;
  name: string;
  plants: string[];
  last_watered: string;
  fertilized_schedule: string;
  growth_notes: string;
  growth_images: File[];
}

const Garden: React.FC = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [newGarden, setNewGarden] = useState<Omit<Garden, "_id">>({
    name: "",
    plants: [],
    last_watered: "",
    fertilized_schedule: "Weekly",
    growth_notes: "",
    growth_images: [],
  });
  const [plantOptions, setPlantOptions] = useState<Plant[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get<Plant[]>("/api/plants/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlantOptions(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    const fetchGardens = async () => {
      try {
        const response = await axiosInstance.get<Garden[]>("/api/garden/list");
        setGardens(response.data);
      } catch (error) {
        console.error("Error fetching gardens:", error);
      }
    };

    fetchPlants();
    fetchGardens();
  }, []);

  const handleAddGarden = async () => {
    if (!newGarden.name || !newGarden.last_watered) {
      alert("Garden Name and Last Watered Date are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newGarden.name);
    formData.append("last_watered", newGarden.last_watered);
    formData.append("fertilized_schedule", newGarden.fertilized_schedule);
    formData.append("growth_notes", newGarden.growth_notes);

    newGarden.plants.forEach((plantId) => formData.append("plants", plantId));
    newGarden.growth_images.forEach((image) => {
      formData.append("growth_images", image);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post<{ garden: Garden }>(
        "/api/garden",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;
      setGardens([...gardens, result.garden]);
      setNewGarden({
        name: "",
        plants: [],
        last_watered: "",
        fertilized_schedule: "Weekly",
        growth_notes: "",
        growth_images: [],
      });
      setIsAdding(false);
      alert("Garden added successfully!");
    } catch (error) {
      console.error("Error adding garden:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setNewGarden({
      name: "",
      plants: [],
      last_watered: "",
      fertilized_schedule: "Weekly",
      growth_notes: "",
      growth_images: [],
    });
    setIsAdding(false);
  };

  const handleDeleteGarden = async (index: number, gardenId: string) => {
    if (window.confirm("Are you sure you want to delete this garden?")) {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`/api/garden/${gardenId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGardens(gardens.filter((_, i) => i !== index));
        alert("Garden deleted successfully!");
      } catch (error) {
        console.error("Error deleting garden:", error);
        alert("An error occurred while deleting the garden. Please try again.");
      }
    }
  };

  const handleGardenClick = (gardenId: string) => {
    navigate(`/garden/${gardenId}`);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-gray-50">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          Your Gardens
        </h1>
        {gardens.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              No gardens yet. Start by adding one!
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
            >
              + New Garden
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Gardens</h2>
            <ul className="space-y-4">
              {gardens.map((garden, index) => (
                <li
                  key={garden._id}
                  className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105 flex justify-between items-center cursor-pointer"
                  onClick={() => handleGardenClick(garden._id)}
                >
                  <span>{garden.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGarden(index, garden._id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsAdding(true)}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
            >
              + New Garden
            </button>
          </div>
        )}
        {isAdding && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Add New Garden</h3>
            <input
              type="text"
              value={newGarden.name}
              onChange={(e) =>
                setNewGarden({ ...newGarden, name: e.target.value })
              }
              placeholder="Enter garden name"
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
            />
            <select
              multiple
              value={newGarden.plants}
              onChange={(e) =>
                setNewGarden({
                  ...newGarden,
                  plants: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="border border-gray-300 p-3 rounded w-full mb-4"
            >
              {plantOptions.map((plant) => (
                <option key={plant._id} value={plant._id}>
                  {plant.generalInfo.plantName}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newGarden.last_watered}
              onChange={(e) =>
                setNewGarden({ ...newGarden, last_watered: e.target.value })
              }
              className="border border-gray-300 p-3 rounded w-full mb-4"
            />
            <select
              value={newGarden.fertilized_schedule}
              onChange={(e) =>
                setNewGarden({
                  ...newGarden,
                  fertilized_schedule: e.target.value,
                })
              }
              className="border border-gray-300 p-3 rounded w-full mb-4"
            >
              <option value="Weekly">Weekly</option>
              <option value="Every 2 weeks">Every 2 weeks</option>
              <option value="Every 3 weeks">Every 3 weeks</option>
              <option value="Every 4 weeks">Every 4 weeks</option>
              <option value="Monthly">Monthly</option>
            </select>
            <textarea
              value={newGarden.growth_notes}
              onChange={(e) =>
                setNewGarden({ ...newGarden, growth_notes: e.target.value })
              }
              placeholder="Growth notes"
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
            ></textarea>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setNewGarden({
                  ...newGarden,
                  growth_images: Array.from(e.target.files || []),
                })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddGarden}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
              >
                Continue
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Garden;