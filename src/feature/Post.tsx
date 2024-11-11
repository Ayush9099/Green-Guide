import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";
import type { Post } from "../types";

const Post = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState({ title: '', summary: '', image: '' });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newComment, setNewComment] = useState<string>('');
    const [activePostId, setActivePostId] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get("/api/post/all");
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
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

    const handleSubmitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("summary", newPost.summary);
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.post("/api/post/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setPosts((prev) => [...prev, response.data]);
            setNewPost({ title: "", summary: "", image: "" });
            setSelectedImage(null);
            setShowForm(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !activePostId) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.post(
                `/api/post/${activePostId}/comments`, 
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPosts((prev) =>
                prev.map(post =>
                    post._id === activePostId ? { ...post, comments: [...post.comments, response.data] } : post
                )
            );
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="relative max-w-6xl mx-auto p-6 bg-gray-50">
                <h1 className="text-4xl font-bold text-center mb-8 text-teal-700">Posts</h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-teal-700 text-white px-6 py-3 rounded-md mb-4 hover:bg-teal-800 transition-colors"
                >
                    Create New Post
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {post.image && (
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.summary}</p>

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Comments</h3>
                                    {post.comments.length === 0 ? (
                                        <p className="text-gray-500">No comments yet.</p>
                                    ) : (
                                        post.comments.map((comment) => (
                                            <div key={comment._id} className="mt-2 bg-gray-100 p-3 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-gray-600">{comment.content}</p>
                                                    <p className="font-semibold text-gray-800 text-sm text-right">
                                                        {comment.user.name}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-400">Posted on {new Date(comment.createdAt).toLocaleString()}</p>
                                            </div>
                                        ))
                                    )}
                                    {/* Comment form */}
                                    <button onClick={() => setActivePostId(post._id)} className="text-teal-700 mt-4 text-sm">
                                        Add a comment
                                    </button>
                                    {activePostId === post._id && (
                                        <form onSubmit={handleSubmitComment} className="mt-2">
                                            <textarea
                                                value={newComment}
                                                onChange={handleCommentChange}
                                                placeholder="Add your comment"
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-teal-700 text-white px-4 py-2 mt-2 rounded hover:bg-teal-800"
                                            >
                                                Submit Comment
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Form for creating post */}
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
                            <h2 className="text-2xl font-semibold text-teal-700">New Post</h2>

                            <form onSubmit={handleSubmitPost}>
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter post title"
                                        value={newPost.title}
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
                                        value={newPost.summary}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-700 transition duration-150"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-600 mb-2">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
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

export default Post;