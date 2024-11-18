"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import type { FormData, TrefleData } from "../types";
import { useNavigate, useParams } from "react-router-dom";

type FormDataSection =
  | "generalInfo"
  | "quickInfo"
  | "plantingTimes"
  | "detailedInfo";

export default function EditPlant() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    generalInfo: {
      plantName: "",
      taxonomicName: "",
      description: "",
      category: "",
      icon: "",
      img: "",
    },
    quickInfo: {
      slideBarOption: "16/square",
      plantingDepth: "",
      waterPerWeek: "",
      sunRequirement: "",
      growingSeason: "",
      frostTolerance: "",
      germinationTime: {
        duration: 0,
        unit: "days",
      },
      maxHeight: {
        height: 0,
        unit: "in",
      },
      maturityTime: {
        duration: 0,
        unit: "days",
      },
      soilPH: "",
      transplantingNotes: "",
      springFrost: "",
      fallFrost: "",
    },
    plantingTimes: {
      springStartIndoors: "",
      springTransplant: "",
      springSowOutdoors: "",
      fallStartIndoors: "",
      fallTransplant: "",
      fallSowOutdoors: "",
    },
    detailedInfo: {
      growingFromSeed: "",
      plantingConsiderations: "",
      feeding: "",
      harvesting: "",
      storage: "",
      pruning: "",
      herbal: "",
    },
  });
  const [trefleData, setTrefleData] = useState<TrefleData[]>([]);
  const [selectedTreflePlant, setSelectedTreflePlant] = useState<string>("");
  const navigate = useNavigate();

  const slideBarOptions = [
    "16/square",
    "9/square",
    "8/square",
    "4/square",
    "2/square",
    "1/square",
    "2square",
    "4square",
    "3*3",
    "4*4",
    "5*5",
    "8*8",
    "10*10",
  ];

  const categories = [
    "Alliums",
    "Cole crops",
    "Flowers",
    "Fruit",
    "Greens",
    "Herbs",
    "Root",
  ];
  const sunRequirements = [
    "Full sun",
    "Part sun to full sun",
    "Part sun",
    "Shade to part sun",
    "Shade",
  ];
  const growingSeasons = ["Cool", "Warm", "Perennial"];
  const frostTolerances = ["Not", "Semi", "Tolerant"];
  const timeUnits = ["days", "weeks", "months", "years"];
  const heightUnits = ["in", "ft"];

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await axiosInstance.get(`/api/plants/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    const fetchTrefleData = async () => {
      try {
        const response = await axiosInstance.get("/api/trefle/list");
        setTrefleData(response.data || []);
      } catch (error) {
        console.error("Error fetching Trefle data:", error);
        setTrefleData([]);
      }
    };

    fetchPlantData();
    fetchTrefleData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section: FormDataSection,
    field: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: FormDataSection,
    field: string,
    nestedField: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...(prev[section] as any)[field],
          [nestedField]: value,
        },
      },
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "icon" | "img"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        generalInfo: {
          ...prev.generalInfo,
          [field]: file,
        },
      }));
    }
  };

  const handleTreflePlantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlantId = e.target.value;
    setSelectedTreflePlant(selectedPlantId);
    const selectedPlant = trefleData.find(
      (plant) => plant.id.toString() === selectedPlantId
    );

    if (selectedPlant) {
      setFormData((prev) => ({
        ...prev,
        generalInfo: {
          ...prev.generalInfo,
          plantName: selectedPlant.common_name || "",
          taxonomicName: selectedPlant.scientific_name || "",
          description: `${
            selectedPlant.family_common_name
              ? `Family: ${selectedPlant.family_common_name}. `
              : ""
          }${selectedPlant.bibliography}`,
          img: selectedPlant.image_url || "",
        },
        quickInfo: {
          ...prev.quickInfo,
        },
        detailedInfo: {
          ...prev.detailedInfo,
          growingFromSeed: `Author: ${selectedPlant.author}. Status: ${selectedPlant.status}. Rank: ${selectedPlant.rank}.`,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      Object.entries(formData.generalInfo).forEach(([key, value]) => {
        if (key === "icon" && value instanceof File) {
          formDataToSend.append(key, value, value.name);
        } else {
          formDataToSend.append(`generalInfo[${key}]`, value as string);
        }
      });

      Object.entries(formData.quickInfo).forEach(([key, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            formDataToSend.append(
              `quickInfo[${key}][${nestedKey}]`,
              nestedValue.toString()
            );
          });
        } else {
          formDataToSend.append(`quickInfo[${key}]`, value.toString());
        }
      });

      Object.entries(formData.plantingTimes).forEach(([key, value]) => {
        formDataToSend.append(`plantingTimes[${key}]`, value);
      });

      Object.entries(formData.detailedInfo).forEach(([key, value]) => {
        formDataToSend.append(`detailedInfo[${key}]`, value);
      });

      const response = await axiosInstance.put(
        `/api/plants/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-serif font-semibold text-teal-500 text-center mb-10">
          Edit Plant
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-4 p-4 border border-gray-300 rounded"
        >
          <h2 className="text-xl font-semibold mb-2">Select Trefle.io Plant</h2>
          <select
            value={selectedTreflePlant}
            onChange={handleTreflePlantSelect}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select a plant</option>
            {trefleData.map((plant) => (
              <option key={plant.id} value={plant.id}>
                {plant.common_name || plant.scientific_name}
              </option>
            ))}
          </select>

          <h2 className="text-xl font-semibold mb-2">General Information</h2>
          <input
            type="text"
            name="plantName"
            value={formData.generalInfo.plantName}
            onChange={(e) => handleChange(e, "generalInfo", "plantName")}
            placeholder="Plant Name"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="taxonomicName"
            value={formData.generalInfo.taxonomicName}
            onChange={(e) => handleChange(e, "generalInfo", "taxonomicName")}
            placeholder="Taxonomic Name"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.generalInfo.description}
            onChange={(e) => handleChange(e, "generalInfo", "description")}
            placeholder="Description"
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            name="category"
            value={formData.generalInfo.category}
            onChange={(e) => handleChange(e, "generalInfo", "category")}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label className="block mb-2">Icon:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "icon")}
            className="w-full p-2 mb-2 border rounded"
          />
          <label className="block mb-2">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "img")}
            className="w-full p-2 mb-2 border rounded"
          />
          {formData.generalInfo.img &&
            typeof formData.generalInfo.img === "string" && (
              <img
                src={formData.generalInfo.img}
                alt="Selected plant"
                className="w-[250px] h-[250px] align-items-centre mb-2 rounded"
              />
            )}

          <h2 className="text-xl font-semibold mb-2 mt-4">Quick Info</h2>
          <select
            name="slideBarOption"
            value={formData.quickInfo.slideBarOption}
            onChange={(e) => handleChange(e, "quickInfo", "slideBarOption")}
            className="w-full p-2 mb-2 border rounded"
          >
            {slideBarOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="plantingDepth"
            value={formData.quickInfo.plantingDepth}
            onChange={(e) => handleChange(e, "quickInfo", "plantingDepth")}
            placeholder="Planting Depth"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="waterPerWeek"
            value={formData.quickInfo.waterPerWeek}
            onChange={(e) => handleChange(e, "quickInfo", "waterPerWeek")}
            placeholder="Water Per Week"
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            name="sunRequirement"
            value={formData.quickInfo.sunRequirement}
            onChange={(e) => handleChange(e, "quickInfo", "sunRequirement")}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Select Sun Requirement</option>
            {sunRequirements.map((req) => (
              <option key={req} value={req}>
                {req}
              </option>
            ))}
          </select>
          <select
            name="growingSeason"
            value={formData.quickInfo.growingSeason}
            onChange={(e) => handleChange(e, "quickInfo", "growingSeason")}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select Growing Season</option>
            {growingSeasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          <select
            name="frostTolerance"
            value={formData.quickInfo.frostTolerance}
            onChange={(e) => handleChange(e, "quickInfo", "frostTolerance")}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select Frost Tolerance</option>
            {frostTolerances.map((tolerance) => (
              <option key={tolerance} value={tolerance}>
                {tolerance}
              </option>
            ))}
          </select>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              name="germinationTimeDuration"
              value={formData.quickInfo.germinationTime.duration}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  "quickInfo",
                  "germinationTime",
                  "duration"
                )
              }
              placeholder="Germination Time"
              className="w-1/2 p-2 border rounded"
            />
            <select
              name="germinationTimeUnit"
              value={formData.quickInfo.germinationTime.unit}
              onChange={(e) =>
                handleNestedChange(e, "quickInfo", "germinationTime", "unit")
              }
              className="w-1/2 p-2 border rounded"
            >
              {timeUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              name="maxHeightHeight"
              value={formData.quickInfo.maxHeight.height}
              onChange={(e) =>
                handleNestedChange(e, "quickInfo", "maxHeight", "height")
              }
              placeholder="Max Height"
              className="w-1/2 p-2 border rounded"
            />
            <select
              name="maxHeightUnit"
              value={formData.quickInfo.maxHeight.unit}
              onChange={(e) =>
                handleNestedChange(e, "quickInfo", "maxHeight", "unit")
              }
              className="w-1/2 p-2 border rounded"
            >
              {heightUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              name="maturityTimeDuration"
              value={formData.quickInfo.maturityTime.duration}
              onChange={(e) =>
                handleNestedChange(e, "quickInfo", "maturityTime", "duration")
              }
              placeholder="Maturity Time"
              className="w-1/2 p-2 border rounded"
            />
            <select
              name="maturityTimeUnit"
              value={formData.quickInfo.maturityTime.unit}
              onChange={(e) =>
                handleNestedChange(e, "quickInfo", "maturityTime", "unit")
              }
              className="w-1/2 p-2 border rounded"
              required
            >
              {timeUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            name="soilPH"
            value={formData.quickInfo.soilPH}
            onChange={(e) => handleChange(e, "quickInfo", "soilPH")}
            placeholder="Soil pH"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="transplantingNotes"
            value={formData.quickInfo.transplantingNotes}
            onChange={(e) => handleChange(e, "quickInfo", "transplantingNotes")}
            placeholder="Transplanting Notes"
            className="w-full p-2 mb-2 border rounded"
          />

          <h2 className="text-xl font-semibold mb-2 mt-4">Planting Times</h2>
          {Object.entries({
            springFrost: formData.quickInfo.springFrost,
            fallFrost: formData.quickInfo.fallFrost,
            springStartIndoors: formData.plantingTimes.springStartIndoors,
            springTransplant: formData.plantingTimes.springTransplant,
            springSowOutdoors: formData.plantingTimes.springSowOutdoors,
            fallStartIndoors: formData.plantingTimes.fallStartIndoors,
            fallTransplant: formData.plantingTimes.fallTransplant,
            fallSowOutdoors: formData.plantingTimes.fallSowOutdoors,
          }).map(([key, value]) => {
            const titleMap: { [key: string]: string } = {
              springFrost: "Spring Frost Date",
              fallFrost: "Fall Frost Date",
              springStartIndoors: "Spring Start Indoors",
              springTransplant: "Spring Transplant",
              springSowOutdoors: "Spring Sow Outdoors",
              fallStartIndoors: "Fall Start Indoors",
              fallTransplant: "Fall Transplant",
              fallSowOutdoors: "Fall Sow Outdoors",
            };

            // Convert the date value to 'yyyy-MM-dd' format
            const formattedDate = value
              ? new Date(value).toISOString().split("T")[0]
              : "";

            return (
              <div key={key} className="mb-2">
                <label className="block mb-1">{titleMap[key]}</label>
                <input
                  type="date"
                  name={key}
                  value={formattedDate}
                  onChange={(e) =>
                    handleChange(
                      e,
                      key.includes("Frost") ? "quickInfo" : "plantingTimes",
                      key
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            );
          })}

          <h2 className="text-xl font-semibold mb-2 mt-4">Detailed Info</h2>
          <textarea
            name="growingFromSeed"
            value={formData.detailedInfo.growingFromSeed}
            onChange={(e) => handleChange(e, "detailedInfo", "growingFromSeed")}
            placeholder="Growing From Seed"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="plantingConsiderations"
            value={formData.detailedInfo.plantingConsiderations}
            onChange={(e) =>
              handleChange(e, "detailedInfo", "plantingConsiderations")
            }
            placeholder="Planting Considerations"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="feeding"
            value={formData.detailedInfo.feeding}
            onChange={(e) => handleChange(e, "detailedInfo", "feeding")}
            placeholder="Feeding"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="harvesting"
            value={formData.detailedInfo.harvesting}
            onChange={(e) => handleChange(e, "detailedInfo", "harvesting")}
            placeholder="Harvesting"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="storage"
            value={formData.detailedInfo.storage}
            onChange={(e) => handleChange(e, "detailedInfo", "storage")}
            placeholder="Storage"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="pruning"
            value={formData.detailedInfo.pruning}
            onChange={(e) => handleChange(e, "detailedInfo", "pruning")}
            placeholder="Pruning"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="herbal"
            value={formData.detailedInfo.herbal}
            onChange={(e) => handleChange(e, "detailedInfo", "herbal")}
            placeholder="Herbal Use"
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Plant
          </button>
        </form>
      </div>
    </>
  );
}
