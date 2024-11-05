"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";

interface Plant {
  _id: string;
  generalInfo: {
    plantName: string;
  };
}

interface Review {
  _id: string;
  review: string;
  user: { name: string };
}

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const navigate = useNavigate();

  const popularPlants = [
    { name: "Snake Plant", family: "Asparagaceae" },
    { name: "Spider Plant", family: "Asparagaceae" },
    { name: "Pothos", family: "Araceae" },
    { name: "Peace Lily", family: "Araceae" },
    { name: "Fiddle Leaf Fig", family: "Moraceae" },
  ];

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
      <div className="w-4/5 max-w-7xl mx-auto px-4 py-6 bg-gray-100 min-h-screen flex flex-col">
        <section
          className="bg-cover bg-center text-white py-24 shadow-xl h-[60vh] flex items-center"
          style={{ backgroundImage: "url('/6.avif')" }}
        >
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome to Green Guide
            </h1>
            <p className="text-lg sm:text-xl mb-6">
              Discover the ultimate plant care tips, seasonal calendars, and
              connect with a vibrant community of plant enthusiasts.
            </p>
            <Link
              to="/blog"
              className="bg-white text-teal-600 py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300"
            >
              View Blog
            </Link>
          </div>
        </section>
        <section className="bg-white py-14">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Search Plants by Category
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Looking for a specific type of plant? Use our search bar to find
              plants by their family or category and get tailored care advice.
            </p>
            <input
              type="text"
              value={category}
              onChange={handleInputChange}
              placeholder="Enter plant family or category"
              className="block mx-auto w-full md:w-1/2 rounded-md border border-gray-300 px-5 py-3 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </section>
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
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Popular Plants
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              These are some of the most popular and easy-to-care-for plants
              that will make your space look lively and fresh.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularPlants.map((plant, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {plant.name}
                  </h3>
                  <p className="text-gray-600">{plant.family}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              User Reviews & Testimonials
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              See what our community of plant lovers have to say about their
              experiences. Your feedback helps us grow!
            </p>
            <div className="max-w-xl mx-auto">
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
                  className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-teal-400 transition duration-300"
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
        <section className="bg-gray-100 py-7">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Explore More Features
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Check out these exclusive features to enhance your plant care
              journey and join our growing community of plant enthusiasts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Plant Care Calendar
                </h3>
                <p className="text-gray-600">
                  Stay on top of seasonal tasks and plant care reminders so your
                  plants thrive all year round.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Plant Database
                </h3>
                <p className="text-gray-600">
                  Access detailed care guides and resources for your favorite
                  plants to keep them healthy and beautiful.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Community Forum
                </h3>
                <p className="text-gray-600">
                  Engage with plant enthusiasts, share your experiences, and get
                  advice from experts in the field.
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