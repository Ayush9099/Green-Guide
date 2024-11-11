import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";
import type { Blogs } from "../types";

const Blog = () => {
    const [blogs, setBlog] = useState<Blogs[]>([]);
    const [newBlogs, setNewBlogs] = useState({ title: '', summary: '', imageUrl: '' });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axiosInstance.get("/api/blogs/list", {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBlogs(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmitBlogs = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", newBlogs.title);
        formData.append("summary", newBlogs.summary);
        if (selectedImage) {
            formData.append("imageUrl", selectedImage); 
        }
        
        try {
            const response = await axiosInstance.post("/api/blogs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", 
                },
            });
            setBlog((prev) => [...prev, response.data]);
            setNewBlogs({ title: "", summary: "", imageUrl: "" });
            setSelectedImage(null);
            setShowForm(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };        

    return (
        <>
            <Header />
            <div className="relative max-w-6xl mx-auto p-6 bg-gray-50">
                <h1 className="text-4xl font-bold text-center mb-8 text-teal-700">Blogs</h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-teal-700 text-white px-6 py-3 rounded-md mb-4 hover:bg-teal-800 transition-colors"
                >
                    Create New Blog
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {blog.imageUrl && (
                                <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                                <p className="text-gray-600 mt-2">{blog.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {showForm && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full space-y-6">
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-2xl font-semibold text-teal-700">New Blog</h2>

                            <form onSubmit={handleSubmitBlogs}>
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter post title"
                                        value={newBlogs.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-700 transition duration-150"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="summary" className="block text-sm font-medium text-gray-600 mb-2">Summary</label>
                                    <textarea
                                        name="summary"
                                        id="summary"
                                        placeholder="Enter post summary"
                                        value={newBlogs.summary}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-700 transition duration-150"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600 mb-2">Image</label>
                                    <input
                                        type="file"
                                        name="imageUrl"
                                        id="imageUrl"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-700 file:text-white hover:file:bg-teal-800"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-teal-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-800 transition-colors"
                                >
                                    Submit Post
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Blog;