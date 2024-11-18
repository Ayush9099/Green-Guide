import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Plant } from "../types";

const ListOfPlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const response = await axiosInstance.get("/api/plants/list");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plant?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/plants/${id}`);
        const updatedPlants = plants.filter((plant) => plant._id !== id); // Use _id for filtering
        setPlants(updatedPlants);
      } catch (error) {
        console.error("Error deleting plant:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/editplant/${id}`);
  };

  const handleAddPlant = () => {
    navigate("/admin/addplant");
  };

  return (
    <div className="overflow-x-auto sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-teal-600">List of Plants</h2>
        <button
          onClick={handleAddPlant}
          className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Plant
        </button>
      </div>

      {loading ? (
        <p className="text-center text-teal-600">Loading plants...</p>
      ) : plants.length === 0 ? (
        <p className="text-center text-gray-500">No plants found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-teal-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Plant Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr
                  key={plant._id}
                  className="bg-white border-b hover:bg-teal-50"
                >
                  <td className="px-6 py-4">{plant.generalInfo.plantName}</td>
                  <td className="px-6 py-4">
                    {plant.generalInfo.description.split("\n")[0].slice(0, 50)}
                    {plant.generalInfo.description.split("\n")[0].length >
                      50 && "..."}
                  </td>

                  <td className="px-6 py-4 text-center space-x-4">
                    <button
                      onClick={() => handleEdit(plant._id)}
                      className="text-teal-600 hover:text-teal-800 transition duration-300"
                      aria-label={`Edit ${plant.generalInfo.plantName}`}
                    >
                      <FaEdit className="inline-block text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(plant._id)}
                      className="text-red-600 hover:text-red-800 transition duration-300"
                      aria-label={`Delete ${plant.generalInfo.plantName}`}
                    >
                      <FaTrash className="inline-block text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListOfPlants;
