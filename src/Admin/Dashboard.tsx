import { useState } from 'react';
import { FaLeaf, FaSeedling } from 'react-icons/fa';
import ListOfPlants from './ListOfPlants';
import AddPlant from './AddPlant';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('list');

    const renderContent = () => {
        switch (activeTab) {
            case 'list':
                return <ListOfPlants />;
            case 'add':
                return <AddPlant />;
            default:
                return <ListOfPlants />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-teal-100 via-white to-teal-100">
            <nav className="w-64 bg-gradient-to-b from-teal-600 via-teal-700 to-teal-800 text-white p-6 space-y-6 rounded-r-xl shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-300">Dashboard</h2>
                </div>
                <ul className="space-y-4">
                    <li>
                        <button
                            className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'list' ? 'bg-teal-500' : ''}`}
                            onClick={() => setActiveTab('list')}
                        >
                            <FaLeaf className="mr-3 text-xl" /> List of Plants
                        </button>
                    </li>
                    <li>
                        <button
                            className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'add' ? 'bg-teal-500' : ''}`}
                            onClick={() => setActiveTab('add')}
                        >
                            <FaSeedling className="mr-3 text-xl" /> Add Plant
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="flex-1 p-8 bg-gray-100 overflow-auto">
                <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform ">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
