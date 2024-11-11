import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

interface Plant {
    generalInfo: {
        plantName: string;
        taxonomicName: string;
        description: string;
        category: string;
        icon: string;
        img: string;
    };
    quickInfo: {
        slideBarOption: string;
        plantingDepth: string;
        waterPerWeek: string;
        sunRequirement: string;
        growingSeason: string;
        frostTolerance: string;
        germinationTime: {
            duration: number;
            unit: string;
        };
        maxHeight: {
            height: number;
            unit: string;
        };
        maturityTime: {
            duration: number;
            unit: string;
        };
        soilPH: string;
        transplantingNotes: string;
        springFrost: string;
        fallFrost: string;
    };
    plantingTimes: {
        springStartIndoors: string;
        springTransplant: string;
        springSowOutdoors: string;
        fallStartIndoors: string;
        fallTransplant: string;
        fallSowOutdoors: string;
    };
    detailedInfo: {
        growingFromSeed: string;
        plantingConsiderations: string;
        feeding: string;
        harvesting: string;
        storage: string;
        pruning: string;
        herbal: string;
    };
}

const PlantDetailed: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = React.useState<Plant | null>(null);

    React.useEffect(() => {
        const fetchPlantData = async () => {
            try {
                const response = await axiosInstance.get(`/api/plants/${id}`);
                setPlant(response.data);
            } catch (error) {
                console.error("Error fetching plant data:", error);
            }
        };
        fetchPlantData();
    }, [id]);

    if (!plant) return <p className="text-center text-lg text-gray-600">Loading...</p>;

    return (
        <>
            <Header />
            <div className="max-w-5xl mx-auto p-6 bg-white  rounded-lg mb-8 mt-2">
                <h1 className="text-4xl font-bold text-teal-600 mb-6 ">{plant.generalInfo.plantName}</h1>

                {plant.generalInfo.img && (
                    <div className="flex justify-center mb-8 rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={plant.generalInfo.img}
                            alt={plant.generalInfo.plantName}
                            className="w-[30%] h-auto rounded-lg transition-transform duration-300 transform hover:scale-110"
                        />
                    </div>
                )}

                <p className="mb-6 text-lg text-gray-700 text-center">{plant.generalInfo.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
                        <h2 className="text-2xl font-semibold text-teal-500 mb-4">General Info</h2>
                        <p><strong>Taxonomic Name:</strong> {plant.generalInfo.taxonomicName}</p>
                        <p><strong>Category:</strong> {plant.generalInfo.category}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
                        <h2 className="text-2xl font-semibold text-teal-500 mb-4">Quick Info</h2>
                        <p><strong>Planting Depth:</strong> {plant.quickInfo.plantingDepth}</p>
                        <p><strong>Water Per Week:</strong> {plant.quickInfo.waterPerWeek}</p>
                        <p><strong>Sun Requirement:</strong> {plant.quickInfo.sunRequirement}</p>
                        <p><strong>Frost Tolerance:</strong> {plant.quickInfo.frostTolerance}</p>
                        <p><strong>Germination Time:</strong> {plant.quickInfo.germinationTime.duration} {plant.quickInfo.germinationTime.unit}</p>
                        <p><strong>Max Height:</strong> {plant.quickInfo.maxHeight.height} {plant.quickInfo.maxHeight.unit}</p>
                        <p><strong>Maturity Time:</strong> {plant.quickInfo.maturityTime.duration} {plant.quickInfo.maturityTime.unit}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold text-teal-500 mb-4">Planting Times</h2>
                    <ul className="list-disc pl-6 space-y-2 text-lg">
                        <li><strong>Spring Start Indoors:</strong> {plant.plantingTimes.springStartIndoors}</li>
                        <li><strong>Spring Transplant:</strong> {plant.plantingTimes.springTransplant}</li>
                        <li><strong>Fall Transplant:</strong> {plant.plantingTimes.fallTransplant}</li>
                        <li><strong>Spring Sow Outdoors:</strong> {plant.plantingTimes.springSowOutdoors}</li>
                        <li><strong>Fall Start Indoors:</strong> {plant.plantingTimes.fallStartIndoors}</li>
                        <li><strong>Fall Sow Outdoors:</strong> {plant.plantingTimes.fallSowOutdoors}</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold text-teal-500 mb-4">Detailed Info</h2>
                    <ul className="list-disc pl-6 space-y-2 text-lg">
                        <li><strong>Growing From Seed:</strong> {plant.detailedInfo.growingFromSeed}</li>
                        <li><strong>Planting Considerations:</strong> {plant.detailedInfo.plantingConsiderations}</li>
                        <li><strong>Feeding:</strong> {plant.detailedInfo.feeding}</li>
                        <li><strong>Harvesting:</strong> {plant.detailedInfo.harvesting}</li>
                        <li><strong>Storage:</strong> {plant.detailedInfo.storage}</li>
                        <li><strong>Pruning:</strong> {plant.detailedInfo.pruning}</li>
                        <li><strong>Herbal Use:</strong> {plant.detailedInfo.herbal}</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PlantDetailed;
