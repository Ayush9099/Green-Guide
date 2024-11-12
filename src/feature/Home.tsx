"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";
import type { Plant , Review} from "../types";

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [plantsData, setPlantsData] = useState<Plant[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const response = await axiosInstance.get("/api/plants/list");
      setPlantsData(response.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get("/api/reviews/list");
      setReviews(response.data.review);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchPlants();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewText) {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post(
          "/api/reviews",
          { review: reviewText },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews((prev) => [...prev, response.data.review]);
        setReviewText("");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleCategorySearch = async (searchTerm: string) => {
    if (searchTerm) {
      try {
        const response = await axiosInstance.post("/api/plants/search", {
          category: searchTerm,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching plants by category:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setCategory(searchTerm);
    handleCategorySearch(searchTerm);
  };

  const handlePlantClick = (plantId: string) => {
    navigate(`/plants/${plantId}`);
  };

  const displayedReviews = reviews.slice(0, 10);

  return (
    <>
      <Header />
      <div className="w-full max-w-screen-xl mx-auto px-6 py-8 bg-gray-100 min-h-screen flex flex-col mt-4">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center text-white py-24 shadow-xl h-[60vh] flex items-center justify-center"
          style={{ backgroundImage: "url('/6.avif')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="container text-center z-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight">
              Welcome to Green Guide
            </h1>
            <p className="text-lg sm:text-xl mb-6 text-gray-200">
              Discover plant care tips, seasonal guides, and connect with a
              vibrant community.
            </p>
            <Link
              to="/blog"
              className="bg-teal-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-teal-500 transition duration-300"
            >
              View Blog
            </Link>
          </div>
        </section>

        {/* Search Plants Section */}
        <section className="bg-white py-14">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Search Plants by Category
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Looking for a specific plant? Use the search bar to explore plants
              by family or category.
            </p>
            <input
              type="text"
              value={category}
              onChange={handleInputChange}
              placeholder="Enter plant family or category"
              className="block mx-auto w-full md:w-1/2 rounded-md border border-gray-300 px-5 py-3 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            />
          </div>
        </section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                Search Results
              </h2>
              <ul className="space-y-4">
                {searchResults.map((plant) => (
                  <li
                    key={plant._id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                    onClick={() => handlePlantClick(plant._id)}
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {plant.generalInfo.plantName}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Popular Plants Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Popular Plants
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover the most popular and easy-to-care-for plants.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantsData.slice(0, 6).map((plant) => (
                <div
                  key={plant._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                  onClick={() => handlePlantClick(plant._id)}
                >
                  <img
                    src={
                      typeof plant.generalInfo.img === "string"
                        ? plant.generalInfo.img
                        : URL.createObjectURL(plant.generalInfo.img)
                    }
                    alt={plant.generalInfo.plantName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {plant.generalInfo.plantName}
                  </h3>
                  <p className="text-gray-600">
                    {plant.generalInfo.taxonomicName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Reviews Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              User Reviews
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              See what our plant community has to say about their experiences!
            </p>
            <div className="max-w-xl mx-auto mb-8">
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  className="block w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-teal-500 transition duration-300"
                >
                  Submit Review
                </button>
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {displayedReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <p className="text-gray-800">{review.review}</p>
                  <p className="text-gray-500 text-right mt-2">
                    - {review.user.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Features Section */}
        <section className="bg-gray-100 py-7">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Explore More Features
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join our plant care journey with exclusive features!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Plant Care Calendar
                </h3>
                <p className="text-gray-600">
                  Stay on top of seasonal tasks and reminders for thriving
                  plants.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Plant Database
                </h3>
                <p className="text-gray-600">
                  Access detailed care guides and resources for every plant.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Community Forum
                </h3>
                <p className="text-gray-600">
                  Connect with plant lovers, share tips, and get expert advice.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
