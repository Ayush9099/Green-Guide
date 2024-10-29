"use client";

import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import axiosInstance from "../axios";
import {Link , useNavigate } from "react-router-dom";

type FormDataSection =
  | "generalInfo"
  | "quickInfo"
  | "plantingTimes"
  | "detailedInfo";

interface FormData {
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

export default function Component() {
  const [showAddPlant, setShowAddPlant] = useState(false);
  const navigate = useNavigate();
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

  const [plantsData, setPlantsData] = useState<any[]>([]);

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
    const fetchPlantsData = async () => {
      try {
        const response = await axiosInstance.get("/api/plants/list");
        setPlantsData(response.data);
      } catch (error) {
        console.error("Error fetching plants data:", error);
      }
    };

    fetchPlantsData();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append general info
      Object.entries(formData.generalInfo).forEach(([key, value]) => {
        if (key === "icon" || key === "img") {
          if (value && typeof value !== 'string') {
            formDataToSend.append(key, value as Blob, (value as File).name);
          }
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

      const response = await axiosInstance.post("/api/plants", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPlantsData((prev) => [...prev, response.data]);
      setShowAddPlant(false);
      setFormData({
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
          germinationTime: { duration: 0, unit: "days" },
          maxHeight: { height: 0, unit: "in" },
          maturityTime: { duration: 0, unit: "days" },
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
      navigate("/plant");
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          Plants
        </h1>
        <button
          onClick={() => setShowAddPlant(!showAddPlant)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {showAddPlant ? "Cancel" : "Add Plant"}
        </button>

        {showAddPlant && (
          <form
            onSubmit={handleSubmit}
            className="mb-4 p-4 border border-gray-300 rounded"
          >
            <h2 className="text-xl font-semibold mb-2">General Information</h2>
            <input
              name="plantName"
              value={formData.generalInfo.plantName}
              onChange={(e) => handleChange(e, "generalInfo", "plantName")}
              type="text"
              placeholder="Plant Name"
              className="border mb-2 w-full p-2"
              required
            />
            <input
              name="taxonomicName"
              value={formData.generalInfo.taxonomicName}
              onChange={(e) => handleChange(e, "generalInfo", "taxonomicName")}
              type="text"
              placeholder="Taxonomic Name"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="description"
              value={formData.generalInfo.description}
              onChange={(e) => handleChange(e, "generalInfo", "description")}
              placeholder="Description"
              className="border mb-2 w-full p-2"
            />
            <select
              name="category"
              value={formData.generalInfo.category}
              onChange={(e) => handleChange(e, "generalInfo", "category")}
              className="border mb-2 w-full p-2"
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
              className="border mb-2 w-full p-2"
            />
            <label className="block mb-2">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "img")}
              className="border mb-2 w-full p-2"
            />
            <h2 className="text-xl font-semibold mb-2">Quick Info</h2>
            <select
              name="slideBarOption"
              value={formData.quickInfo.slideBarOption}
              onChange={(e) => handleChange(e, "quickInfo", "slideBarOption")}
              className="border mb-2 w-full p-2"
            >
              {slideBarOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              name="plantingDepth"
              value={formData.quickInfo.plantingDepth}
              onChange={(e) => handleChange(e, "quickInfo", "plantingDepth")}
              type="text"
              placeholder="Planting Depth"
              className="border mb-2 w-full p-2"
            />
            <input
              name="waterPerWeek"
              value={formData.quickInfo.waterPerWeek}
              onChange={(e) => handleChange(e, "quickInfo", "waterPerWeek")}
              type="text"
              placeholder="Water Per Week"
              className="border mb-2 w-full p-2"
            />
            <select
              name="sunRequirement"
              value={formData.quickInfo.sunRequirement}
              onChange={(e) => handleChange(e, "quickInfo", "sunRequirement")}
              className="border mb-2 w-full p-2"
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
              className="border mb-2 w-full p-2"
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
              className="border mb-2 w-full p-2"
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
                type="number"
                placeholder="Germination Time"
                className="border w-1/2 p-2"
              />
              <select
                name="germinationTimeUnit"
                value={formData.quickInfo.germinationTime.unit}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "germinationTime", "unit")
                }
                className="border w-1/2 p-2"
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
                name="maxHeightHeight"
                value={formData.quickInfo.maxHeight.height}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "maxHeight", "height")
                }
                type="number"
                placeholder="Max Height"
                className="border w-1/2 p-2"
              />
              <select
                name="maxHeightUnit"
                value={formData.quickInfo.maxHeight.unit}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "maxHeight", "unit")
                }
                className="border w-1/2 p-2"
              >
                {heightUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            Maturity Time Input
            <div className="flex gap-2 mb-2">
              <input
                name="maturityTimeDuration"
                value={formData.quickInfo.maturityTime.duration}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "maturityTime", "duration")
                }
                type="number"
                placeholder="Maturity Time"
                className="border w-1/2 p-2"
              />
              <select
                name="maturityTimeUnit"
                value={formData.quickInfo.maturityTime.unit}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "maturityTime", "unit")
                }
                className="border w-1/2 p-2"
                required
              >
                {timeUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            Max Height Input
            <div className="flex gap-2 mb-2">
              <input
                name="maxHeightHeight"
                value={formData.quickInfo.maxHeight.height}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "maxHeight", "height")
                }
                type="number"
                placeholder="Max Height"
                className="border w-1/2 p-2"
              />
              <select
                name="maxHeightUnit"
                value={formData.quickInfo.maxHeight.unit}
                onChange={(e) =>
                  handleNestedChange(e, "quickInfo", "maxHeight", "unit")
                }
                className="border w-1/2 p-2"
                required
              >
                {heightUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <input
              name="soilPH"
              value={formData.quickInfo.soilPH}
              onChange={(e) => handleChange(e, "quickInfo", "soilPH")}
              type="text"
              placeholder="Soil pH"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="transplantingNotes"
              value={formData.quickInfo.transplantingNotes}
              onChange={(e) =>
                handleChange(e, "quickInfo", "transplantingNotes")
              }
              placeholder="Transplanting Notes"
              className="border mb-2 w-full p-2"
            />
            <input
              name="springFrost"
              value={formData.quickInfo.springFrost}
              onChange={(e) => handleChange(e, "quickInfo", "springFrost")}
              type="date"
              placeholder="Spring Frost Date"
              className="border mb-2 w-full p-2"
            />
            <input
              name="fallFrost"
              value={formData.quickInfo.fallFrost}
              onChange={(e) => handleChange(e, "quickInfo", "fallFrost")}
              type="date"
              placeholder="Fall Frost Date"
              className="border mb-2 w-full p-2"
            />
            <h2 className="text-xl font-semibold mb-2">Planting Times</h2>
            <input
              name="springStartIndoors"
              value={formData.plantingTimes.springStartIndoors}
              onChange={(e) =>
                handleChange(e, "plantingTimes", "springStartIndoors")
              }
              type="date"
              placeholder="Spring Start Indoors"
              className="border mb-2 w-full p-2"
            />
            <input
              name="springTransplant"
              value={formData.plantingTimes.springTransplant}
              onChange={(e) =>
                handleChange(e, "plantingTimes", "springTransplant")
              }
              type="date"
              placeholder="Spring Transplant"
              className="border mb-2 w-full p-2"
            />
            <input
              name="springSowOutdoors"
              value={formData.plantingTimes.springSowOutdoors}
              onChange={(e) =>
                handleChange(e, "plantingTimes", "springSowOutdoors")
              }
              type="date"
              placeholder="Spring Sow Outdoors"
              className="border mb-2 w-full p-2"
            />
            <input
              name="fallStartIndoors"
              value={formData.plantingTimes.fallStartIndoors}
              onChange={(e) =>
                handleChange(e, "plantingTimes", "fallStartIndoors")
              }
              type="date"
              placeholder="Fall Start Indoors"
              className="border mb-2 w-full p-2"
            />
            <input
              name="fallTransplant"
              value={formData.plantingTimes.fallTransplant}
              onChange={(e) =>
                handleChange(e, "plantingTimes", "fallTransplant")
              }
              type="date"
              placeholder="Fall Transplant"
              className="border mb-2 w-full p-2"
            />
            <input
              name="fallSowOutdoors"
              value={formData.plantingTimes.fallSowOutdoors}
              onChange={(e) =>
                handleChange(e, "plantingTimes", "fallSowOutdoors")
              }
              type="date"
              placeholder="Fall Sow Outdoors"
              className="border mb-2 w-full p-2"
            />
            <h2 className="text-xl font-semibold mb-2">Detailed Info</h2>
            <textarea
              name="growingFromSeed"
              value={formData.detailedInfo.growingFromSeed}
              onChange={(e) =>
                handleChange(e, "detailedInfo", "growingFromSeed")
              }
              placeholder="Growing From Seed"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="plantingConsiderations"
              value={formData.detailedInfo.plantingConsiderations}
              onChange={(e) =>
                handleChange(e, "detailedInfo", "plantingConsiderations")
              }
              placeholder="Planting Considerations"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="feeding"
              value={formData.detailedInfo.feeding}
              onChange={(e) => handleChange(e, "detailedInfo", "feeding")}
              placeholder="Feeding"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="harvesting"
              value={formData.detailedInfo.harvesting}
              onChange={(e) => handleChange(e, "detailedInfo", "harvesting")}
              placeholder="Harvesting"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="storage"
              value={formData.detailedInfo.storage}
              onChange={(e) => handleChange(e, "detailedInfo", "storage")}
              placeholder="Storage"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="pruning"
              value={formData.detailedInfo.pruning}
              onChange={(e) => handleChange(e, "detailedInfo", "pruning")}
              placeholder="Pruning"
              className="border mb-2 w-full p-2"
            />
            <textarea
              name="herbal"
              value={formData.detailedInfo.herbal}
              onChange={(e) => handleChange(e, "detailedInfo", "herbal")}
              placeholder="Herbal Use"
              className="border mb-2 w-full p-2"
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        )}

        <h2 className="text-2xl font-semibold mb-4">Existing Plants</h2>
        {plantsData.length > 0 ? (
          plantsData.map((plant) => (
            <div
              key={plant._id}
              className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  to={`/plants/${plant._id}`}
                  className="text-green-600 hover:underline"
                >
                  {plant.generalInfo.plantName}
                </Link>
              </h3>
              <p className="text-gray-700 mb-2">
                {plant.generalInfo.description}
              </p>
              {plant.generalInfo.img && (
                <div className="flex justify-center mb-4">
                  <Link to={`/plants/${plant._id}`}>
                    <img
                      src={plant.generalInfo.img}
                      alt={plant.generalInfo.plantName}
                      className="w-full h-auto rounded-md cursor-pointer"
                    />
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No plants found.</p>
        )}
      </div>
    </>
  );
}
