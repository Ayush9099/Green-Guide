import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Layout/Header";
import axiosInstance from "../axios";
import { FaEdit, FaSave, FaTimesCircle } from "react-icons/fa";

interface Plant {
  _id: string;
  generalInfo: {
    plantName: string;
  };
}

interface Garden {
  _id: string;
  name: string;
  plants: Plant[];
  last_watered: string;
  fertilized_schedule: string;
  growth_notes: string;
  growth_images: string[];
}

const GardenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [garden, setGarden] = useState<Garden | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGarden, setEditedGarden] = useState<Garden | null>(null);
  const [plantOptions, setPlantOptions] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchGardenDetail = async () => {
      try {
        const response = await axiosInstance.get<Garden>(`/api/gardens/${id}`);
        setGarden(response.data);
        setEditedGarden(response.data);
      } catch (error) {
        console.error("Error fetching garden details:", error);
      }
    };

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

    fetchGardenDetail();
    fetchPlants();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedGarden(garden);
  };

  const handleSave = async () => {
    if (!editedGarden) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put<{ garden: Garden }>(
        `/api/gardens/${id}`,
        editedGarden,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );
      setGarden(response.data.garden);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating garden:", error);
      alert("An error occurred while updating the garden. Please try again.");
    }
  };

  if (!garden) {
    return <div className="text-gray-800">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-gray-100 via-white to-teal-100 rounded-xl shadow-lg mt-8">
        {/* Garden Title and Edit Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-teal-600">{isEditing ? "Edit Garden" : garden.name}</h1>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-700 transition duration-300 flex items-center space-x-2"
            >
              <FaEdit className="text-lg" />
              <span>Edit Garden</span>
            </button>
          )}
        </div>

        {/* Garden Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Plants */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Plants</h2>
            {isEditing ? (
              <select
                multiple
                id="plants"
                value={editedGarden?.plants.map((plant) => plant._id)}
                onChange={(e) => {
                  const selectedPlants = Array.from(e.target.selectedOptions, (option) =>
                    plantOptions.find((plant) => plant._id === option.value)!
                  );
                  setEditedGarden({ ...editedGarden!, plants: selectedPlants });
                }}
                className="mt-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 p-3"
              >
                {plantOptions.map((plant) => (
                  <option key={plant._id} value={plant._id}>
                    {plant.generalInfo.plantName}
                  </option>
                ))}
              </select>
            ) : (
              <ul className="list-disc list-inside text-gray-600">
                {garden.plants.map((plant) => (
                  <li key={plant._id} className="text-lg">{plant.generalInfo.plantName}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Last Watered */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Last Watered</h2>
            {isEditing ? (
              <input
                type="date"
                id="last_watered"
                value={editedGarden?.last_watered}
                onChange={(e) => setEditedGarden({ ...editedGarden!, last_watered: e.target.value })}
                className="mt-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 p-3"
              />
            ) : (
              <p className="text-gray-600">{new Date(garden.last_watered).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Fertilization Schedule */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Fertilization Schedule</h2>
            {isEditing ? (
              <select
                id="fertilized_schedule"
                value={editedGarden?.fertilized_schedule}
                onChange={(e) => setEditedGarden({ ...editedGarden!, fertilized_schedule: e.target.value })}
                className="mt-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 p-3"
              >
                <option value="Weekly">Weekly</option>
                <option value="Every 2 weeks">Every 2 weeks</option>
                <option value="Every 3 weeks">Every 3 weeks</option>
                <option value="Every 4 weeks">Every 4 weeks</option>
                <option value="Monthly">Monthly</option>
              </select>
            ) : (
              <p className="text-gray-600">{garden.fertilized_schedule}</p>
            )}
          </div>

          {/* Growth Notes */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Growth Notes</h2>
            {isEditing ? (
              <textarea
                id="growth_notes"
                value={editedGarden?.growth_notes}
                onChange={(e) => setEditedGarden({ ...editedGarden!, growth_notes: e.target.value })}
                className="mt-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 p-3"
                rows={4}
              />
            ) : (
              <p className="text-gray-600">{garden.growth_notes}</p>
            )}
          </div>
        </div>

        {/* Growth Images */}
        {garden.growth_images.length > 0 && (
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Growth Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {garden.growth_images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-lg group hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={image}
                    alt={`Growth image ${index + 1}`}
                    className="w-full h-80 object-cover rounded-xl transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-6 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300"
            >
              <FaTimesCircle className="mr-2" /> Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GardenDetail;
