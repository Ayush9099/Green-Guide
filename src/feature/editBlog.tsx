import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    summary: "",
    imageUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setErrorMessage("Failed to load blog details.");
      }
    };
    fetchBlog();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); 
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("summary", blog.summary);
    if (selectedImage) {
      formData.append("imageUrl", selectedImage);
    }

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/api/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/blog");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while updating the blog.");
      }
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Edit Blog</h1>
      {errorMessage && ( 
        <div className="mb-6 p-4 text-red-600 bg-red-100 border border-red-200 rounded-md">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleUpdateBlog}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={blog.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            value={blog.summary}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Image
          </label>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-700 text-white px-6 py-3 rounded-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;