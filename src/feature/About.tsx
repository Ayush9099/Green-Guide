import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const About: React.FC = () => {
    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-6 bg-gray-50">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-700">About Green Guide</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Welcome to Green Guide, your ultimate companion for indoor and outdoor gardening. Our app is designed to help gardening enthusiasts of all levels—from beginners to experts—create and maintain beautiful gardens with ease. Whether you have a small balcony or a sprawling backyard, Green Guide is here to guide you on your gardening journey.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Key Features</h2>
                <ul className="list-disc list-inside mb-6 text-gray-700">
                    <li>🌱 <strong>Garden Management:</strong> Easily create and manage multiple gardens, keeping track of your plants, their needs, and growth progress.</li>
                    <li>🌿 <strong>Plant Library:</strong> Access a comprehensive library of plants with detailed care instructions, ideal growing conditions, and pest management tips.</li>
                    <li>💧 <strong>Watering Scheduler:</strong> Never forget to water your plants! Set reminders and schedules for watering and fertilizing your plants.</li>
                    <li>🌞 <strong>Lighting Recommendations:</strong> Get personalized lighting tips based on your specific plant types and their requirements.</li>
                    <li>📅 <strong>Seasonal Tips:</strong> Receive tailored advice for seasonal gardening tasks, ensuring your garden thrives year-round.</li>
                </ul>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Green Guide?</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Our app is not just a tool; it’s a community for garden lovers. We believe that everyone should have the opportunity to enjoy the beauty and benefits of gardening. Green Guide offers:
                </p>
                <ul className="list-disc list-inside mb-6 text-gray-700">
                    <li>✅ User-friendly interface that makes gardening enjoyable.</li>
                    <li>✅ Regular updates with new features and plant information.</li>
                    <li>✅ Community support through forums and sharing your gardening experiences.</li>
                    <li>✅ Resources for sustainable gardening practices to help you create an eco-friendly garden.</li>
                </ul>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Get Started!</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Join us in nurturing your green thumb! Download Green Guide today and start creating your dream garden. Together, we can cultivate a world where every space is lush, vibrant, and full of life.
                </p>
            </div>
            <Footer/>
        </>
    );
};

export default About;