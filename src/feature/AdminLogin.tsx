import React, { useState } from "react";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const dummyEmail = "123@gmail.com";
    const dummyPassword = "123";

    // Clear any previous messages
    setMessage(null);

    // Simulate login logic
    if (email === dummyEmail && password === dummyPassword) {
      // Simulate successful login
      localStorage.setItem("adminToken", "dummyToken");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      // Simulate failed login
      setMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-teal-300 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">
            Admin Sign In
          </h2>

          {message && (
            <p className="text-center text-red-600 text-sm mb-6">{message}</p>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
