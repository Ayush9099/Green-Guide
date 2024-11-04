import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";

interface BlogPost {
    _id: number;
    title: string;
    summary: string;
    imageUrl: string[];
    user: string;
}

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [newPost, setNewPost] = useState({ title: '', summary: '', imageUrl: [] as string[] });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axiosInstance.get("/api/blogs/list", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBlogPosts(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("summary", newPost.summary);
        if (selectedImage) {
            formData.append("imageUrl", selectedImage);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.post("/api/blogs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setBlogPosts((prev) => [...prev, response.data]);
            setNewPost({ title: "", summary: "", imageUrl: [] });
            setSelectedImage(null);
            setShowForm(false);
        } catch (error) {
            console.error("Error creating blog post:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto p-6 bg-gray-50">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-700">Blog</h1>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-700 text-white px-4 py-2 rounded-md mb-4"
                >
                    {showForm ? "Cancel" : "Create New Post"}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">New Blog Post</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newPost.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <textarea
                            name="summary"
                            placeholder="Summary"
                            value={newPost.summary}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md">
                            Submit Post
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                            {post.imageUrl.map((url, index) => (
                                <img key={index} src={url} alt={post.title} className="w-full h-48 object-cover" />
                            ))}
                            <div className="p-6">
                                <h2 className="text-lg font-semibold">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Blog;
