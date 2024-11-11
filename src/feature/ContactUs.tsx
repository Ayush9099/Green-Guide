import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import axiosInstance from "../axios";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setFormStatus(null); 

    try {
      const response = await axiosInstance.post("/api/contact-us", formData);

      if (response.status === 200) {
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-[80%] bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            Have any questions? We'd love to hear from you! Please fill out the
            form below or reach out to us directly.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {formStatus && (
            <div className="mt-4 text-center text-gray-600">
              <p>{formStatus}</p>
            </div>
          )}
        </div>
        <div className="mt-12 max-w-7xl mx-auto w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaPhoneAlt className="text-black text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaEnvelope className="text-black text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600">support@company.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaMapMarkerAlt className="text-black text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">
              Our Location
            </h3>
            <p className="text-gray-600">123 Green Street, City, Country</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      <Footer />
    </>
  );
};
export default ContactUs;
