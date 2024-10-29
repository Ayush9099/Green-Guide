'use client';
import Header from '../Layout/Header';
import { useState } from 'react';
import { Search } from 'lucide-react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface PlantSchedule {
    startInside: number[];
    transplant: number[];
    sowOutside: number[];
    beginHarvest: number[];
}

interface Plant {
    name: string;
    imageUrl: string;
    schedule: PlantSchedule;
}

const plantData: Plant[] = [
    {
        name: 'Chives',
        imageUrl: '/1.jpg',
        schedule: {
            startInside: [8, 9],
            transplant: [9, 10],
            sowOutside: [10],
            beginHarvest: [],
        },
    },
    {
        name: 'Garlic',
        imageUrl: '/2.jpg',
        schedule: {
            startInside: [],
            transplant: [],
            sowOutside: [3],
            beginHarvest: [],
        },
    },
    {
        name: 'Leeks',
        imageUrl: '/3.jpg',
        schedule: {
            startInside: [8],
            transplant: [9, 10],
            sowOutside: [],
            beginHarvest: [],
        },
    },
    {
        name: 'Onions',
        imageUrl: '/4.jpg',
        schedule: {
            startInside: [8],
            transplant: [9],
            sowOutside: [],
            beginHarvest: [],
        },
    },
    {
        name: 'Red Onions',
        imageUrl: '/5.jpg',
        schedule: {
            startInside: [8, 9],
            transplant: [10, 11],
            sowOutside: [],
            beginHarvest: [],
        },
    },
];

export default function PlantCalendar() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPlants = plantData.filter((plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const buttonColors = {
        startInside: 'bg-pink-500 text-white',
        transplant: 'bg-orange-500 text-white',
        sowOutside: 'bg-purple-500 text-white',
        beginHarvest: 'bg-teal-500 text-white',
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 mt-8">
                <h2 className="text-4xl font-bold text-center mb-8 text-green-700">Plant Calendar</h2>

                    <div className="flex items-center mb-4">
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
                        filteredPlants.map((plant) => (
                            <div key={plant.name} className="flex items-center bg-gray-100 rounded-lg shadow-md p-4 mb-4 transition-transform hover:bg-gray-200">
                                <img src={plant.imageUrl} alt={plant.name} className="w-16 h-16 mr-4 rounded-full shadow" />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold mb-1">{plant.name}</h3>
                                    <div className="flex">
                                        {months.map((month, index) => (
                                            <div key={month} className="flex-grow text-center relative">
                                                <span className="text-xs">{month}</span>
                                                <div className="h-8 border-r border-gray-300 relative">
                                                    {plant.schedule.startInside.includes(index + 1) && (
                                                        <div className="absolute inset-0 bg-pink-500 opacity-50"></div>
                                                    )}
                                                    {plant.schedule.transplant.includes(index + 1) && (
                                                        <div className="absolute inset-0 bg-orange-500 opacity-50"></div>
                                                    )}
                                                    {plant.schedule.sowOutside.includes(index + 1) && (
                                                        <div className="absolute inset-0 bg-purple-500 opacity-50"></div>
                                                    )}
                                                    {plant.schedule.beginHarvest.includes(index + 1) && (
                                                        <div className="absolute inset-0 bg-teal-500 opacity-50"></div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No plants found.</p>
                    )}
                    <div className="flex justify-around mt-4 rounded-full p-2">
                        <button className={`${buttonColors.startInside} px-4 py-2 rounded-full`}>
                            Start Inside
                        </button>
                        <button className={`${buttonColors.transplant} px-4 py-2 rounded-full`}>
                            Transplant
                        </button>
                        <button className={`${buttonColors.sowOutside} px-4 py-2 rounded-full`}>
                            Sow Outside
                        </button>
                        <button className={`${buttonColors.beginHarvest} px-4 py-2 rounded-full`}>
                            Begin Harvest
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}