import React, { useState } from 'react';
import Header from '../Layout/Header';
import axios from 'axios';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/auth/register', {
                name: username,
                email,
                password,
            });

            setMessage(response.data.message);
            navigate("/signin");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center ">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center tracking-tight">Create Account</h2>

                    {message && <p className="text-center text-red-600 text-sm mb-6">{message}</p>}

                    <form onSubmit={handleRegister}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-60 transition duration-300"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-60 transition duration-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-60 transition duration-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/signin" className="text-teal-600 hover:underline">Sign in</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
