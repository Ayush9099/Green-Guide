import React from 'react';
import Header from '../Layout/Header';

const Signup: React.FC = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition w-full"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
