import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListOfPlants = () => {
    const [plants, setPlants] = useState([
        { id: 1, name: 'Rose', description: 'A beautiful flower with thorns.' },
        { id: 2, name: 'Tulip', description: 'A colorful spring flower.' },
        { id: 3, name: 'Sunflower', description: 'A tall plant with a large yellow flower.' },
    ]);

    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this plant?');
        if (confirmDelete) {
            const updatedPlants = plants.filter((plant) => plant.id !== id);
            setPlants(updatedPlants);
        }
    };

    const handleEdit = () => {
        navigate(`/admin/editplant`);
    };

    const handleAddPlant = () => {
        navigate('/admin/addplant');
    };

    return (
        <div className="overflow-x-auto sm:rounded-lg p-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-teal-600 ">List of Plants</h2>

                <button
                    onClick={handleAddPlant}
                    className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Plant
                </button>
            </div>

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
                            <tr key={plant.id} className="bg-white border-b hover:bg-teal-50">
                                <td className="px-6 py-4">{plant.name}</td>
                                <td className="px-6 py-4">{plant.description}</td>
                                <td className="px-6 py-4 text-center space-x-4">
                                    <button
                                        onClick={() => handleEdit()}
                                        className="text-teal-600 hover:text-teal-800 transition duration-300"
                                        aria-label={`Edit ${plant.name}`}
                                    >
                                        <FaEdit className="inline-block text-lg" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plant.id)}
                                        className="text-red-600 hover:text-red-800 transition duration-300"
                                        aria-label={`Delete ${plant.name}`}
                                    >
                                        <FaTrash className="inline-block text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListOfPlants;
