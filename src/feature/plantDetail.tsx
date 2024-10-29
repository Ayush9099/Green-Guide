import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';
import Header from '../Layout/Header';
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
    if (!plant) return <p className="text-center text-lg">Loading...</p>;
    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
                <h1 className="text-4xl font-bold mb-4 text-green-600 text-center">{plant.generalInfo.plantName}</h1>
                {plant.generalInfo.img && (
                    <div className="flex justify-center mb-4 rounded-lg border border-gray-300 shadow-md    ">
                        <img
                            src={plant.generalInfo.img}
                            alt={plant.generalInfo.plantName}
                            className="w-auto h-auto rounded-lg "
                        />
                    </div>
                )}
                <p className="mb-4 text-gray-700 text-center">{plant.generalInfo.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-green-500">General Info</h2>
                        <p><strong>Taxonomic Name:</strong> {plant.generalInfo.taxonomicName}</p>
                        <p><strong>Category:</strong> {plant.generalInfo.category}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-green-500">Quick Info</h2>
                        <p><strong>Planting Depth:</strong> {plant.quickInfo.plantingDepth}</p>
                        <p><strong>Water Per Week:</strong> {plant.quickInfo.waterPerWeek}</p>
                        <p><strong>Sun Requirement:</strong> {plant.quickInfo.sunRequirement}</p>
                        <p><strong>Frost Tolerance:</strong> {plant.quickInfo.frostTolerance}</p>
                        <p><strong>Germination Time:</strong> {plant.quickInfo.germinationTime.duration} {plant.quickInfo.germinationTime.unit}</p>
                        <p><strong>Max Height:</strong> {plant.quickInfo.maxHeight.height} {plant.quickInfo.maxHeight.unit}</p>
                        <p><strong>Maturity Time:</strong> {plant.quickInfo.maturityTime.duration} {plant.quickInfo.maturityTime.unit}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-green-500 mb-4">Planting Times</h2>
                <ul className="list-disc pl-5 mb-6">
                    <li><strong>Spring Start Indoors:</strong> {plant.plantingTimes.springStartIndoors}</li>
                    <li><strong>Spring Transplant:</strong> {plant.plantingTimes.springTransplant}</li>
                    <li><strong>Fall Transplant:</strong> {plant.plantingTimes.fallTransplant}</li>
                </ul>
                <h2 className="text-2xl font-semibold text-green-500 mb-4">Detailed Info</h2>
                <ul className="list-disc pl-5">
                    <li><strong>Growing From Seed:</strong> {plant.detailedInfo.growingFromSeed}</li>
                    <li><strong>Feeding:</strong> {plant.detailedInfo.feeding}</li>
                    <li><strong>Harvesting:</strong> {plant.detailedInfo.harvesting}</li>
                    <li><strong>Storage:</strong> {plant.detailedInfo.storage}</li>
                    <li><strong>Pruning:</strong> {plant.detailedInfo.pruning}</li>
                    <li><strong>Herbal Use:</strong> {plant.detailedInfo.herbal}</li>
                </ul>
                {/* Optional Icon Section */}
                {/* {plant.generalInfo.icon && (
                    <div className="mt-6 flex justify-center">
                        <img src={plant.generalInfo.icon} alt={`${plant.generalInfo.plantName} icon`} className="w-16 h-auto border border-gray-300 rounded-full" />
                    </div>
                )} */}
            </div>
        </>
    );
};
export default PlantDetailed;