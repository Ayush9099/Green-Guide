import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        const response = await axiosInstance.get<Garden>(`/api/${id}`);
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
        `/api/${id}`,
        editedGarden,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-gray-50">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          {isEditing ? "Edit Garden" : garden.name}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {isEditing ? (
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Garden Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={editedGarden?.name}
                  onChange={(e) => setEditedGarden({ ...editedGarden!, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="plants" className="block text-sm font-medium text-gray-700">
                  Plants
                </label>
                <select
                  multiple
                  id="plants"
                  value={editedGarden?.plants.map(plant => plant._id)}
                  onChange={(e) => {
                    const selectedPlants = Array.from(e.target.selectedOptions, option => plantOptions.find(plant => plant._id === option.value)!);
                    setEditedGarden({ ...editedGarden!, plants: selectedPlants });
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  {plantOptions.map((plant) => (
                    <option key={plant._id} value={plant._id}>
                      {plant.generalInfo.plantName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="last_watered" className="block text-sm font-medium text-gray-700">
                  Last Watered
                </label>
                <input
                  type="date"
                  id="last_watered"
                  value={editedGarden?.last_watered}
                  onChange={(e) => setEditedGarden({ ...editedGarden!, last_watered: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="fertilized_schedule" className="block text-sm font-medium text-gray-700">
                  Fertilization Schedule
                </label>
                <select
                  id="fertilized_schedule"
                  value={editedGarden?.fertilized_schedule}
                  onChange={(e) => setEditedGarden({ ...editedGarden!, fertilized_schedule: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Every 2 weeks">Every 2 weeks</option>
                  <option value="Every 3 weeks">Every 3 weeks</option>
                  <option value="Every 4 weeks">Every 4 weeks</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label htmlFor="growth_notes" className="block text-sm font-medium text-gray-700">
                  Growth Notes
                </label>
                <textarea
                  id="growth_notes"
                  value={editedGarden?.growth_notes}
                  onChange={(e) => setEditedGarden({ ...editedGarden!, growth_notes: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={4}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Plants</h2>
                <ul className="list-disc list-inside">
                  {garden.plants.map((plant) => (
                    <li key={plant._id}>{plant.generalInfo.plantName}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Last Watered</h2>
                <p>{new Date(garden.last_watered).toLocaleDateString()}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Fertilization Schedule</h2>
                <p>{garden.fertilized_schedule}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Growth Notes</h2>
                <p>{garden.growth_notes}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Growth Images</h2>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {garden.growth_images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Growth image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Edit Garden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GardenDetail;