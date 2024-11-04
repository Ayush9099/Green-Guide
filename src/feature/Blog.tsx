

import React, { useState } from 'react';
import Header from "../Layout/Header";
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';

interface BlogPost {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
}

const initialBlogPosts: BlogPost[] = [
    { id: 1, title: 'Post One', summary: 'Summary of post one. This is a brief description of what the post is about.', imageUrl: '/1.jpg' },
    { id: 2, title: 'Post Two', summary: 'Summary of post two. This is a brief description of what the post is about.', imageUrl: '/2.jpg' },
    { id: 3, title: 'Post Three', summary: 'Summary of post three. This is a brief description of what the post is about.', imageUrl: '/3.jpg' },
    { id: 4, title: 'Post Four', summary: 'Summary of post four. This is a brief description of what the post is about.', imageUrl: '/4.jpg' },
    { id: 5, title: 'Post Five', summary: 'Summary of post five. This is a brief description of what the post is about.', imageUrl: '/5.jpg' },
];

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [newPost, setNewPost] = useState({ title: '', summary: '', imageUrl: '' });
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = blogPosts.length + 1; // Simple ID generation
        setBlogPosts([...blogPosts, { ...newPost, id: newId }]);
        setNewPost({ title: '', summary: '', imageUrl: '' });
        setShowForm(false);
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
                            type="text" 
                            name="imageUrl" 
                            placeholder="Image URL" 
                            value={newPost.imageUrl} 
                            onChange={handleInputChange} 
                            required
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md">
                            Submit Post
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-lg font-semibold">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.summary}</p>
                                {/* Link to view details can be added here */}
                                <Link to={`/blog/${post.id}`} className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Blog;