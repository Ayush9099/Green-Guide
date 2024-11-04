import { useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const Home: React.FC = () => {
    const [reviews, setReviews] = useState<{ id: number; text: string; author: string }[]>([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewAuthor, setReviewAuthor] = useState('');
    const [category, setCategory] = useState('');

    const popularPlants = [
        { name: 'Snake Plant', family: 'Asparagaceae' },
        { name: 'Spider Plant', family: 'Asparagaceae' },
        { name: 'Pothos', family: 'Araceae' },
        { name: 'Peace Lily', family: 'Araceae' },
        { name: 'Fiddle Leaf Fig', family: 'Moraceae' },
    ];

    const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (reviewText && reviewAuthor) {
            const newReview = {
                id: reviews.length + 1,
                text: reviewText,
                author: reviewAuthor,
            };
            setReviews([...reviews, newReview]);
            setReviewText('');
            setReviewAuthor('');
        }
    };

    const handleCategorySearch = () => {
        // Placeholder for category search functionality
        alert(`Searching for plants in the category: ${category}`);
    };

    return (
        <>
            <Header />
            <div className="w-full max-w-3xl mx-auto p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Welcome to Green Guide</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Your Guide to Plants</h2>
                    <p className="text-gray-700">
                        Discover plant care tips, seasonal calendars, and a vibrant community of plant lovers. Join us to share your experiences and learn from others!
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Search by Category</h2>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter plant family or category"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <button
                        onClick={handleCategorySearch}
                        className="mt-2 rounded-md bg-green-500 py-2 px-4 text-sm font-semibold text-white hover:bg-green-400"
                    >
                        Search
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">User Reviews & Testimonials</h2>
                    <form onSubmit={handleReviewSubmit} className="mb-4">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            value={reviewAuthor}
                            onChange={(e) => setReviewAuthor(e.target.value)}
                            placeholder="Your name"
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                        <button
                            type="submit"
                            className="mt-2 rounded-md bg-green-500 py-2 px-4 text-sm font-semibold text-white hover:bg-green-400"
                        >
                            Submit Review
                        </button>
                    </form>

                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="border p-4 rounded-md">
                                <p className="text-gray-800">{review.text}</p>
                                <p className="text-gray-500 text-sm">- {review.author}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Popular Plants</h2>
                    <ul className="list-disc ml-5">
                        {popularPlants.map((plant, index) => (
                            <li key={index}>
                                {plant.name} ({plant.family})
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Explore More Features</h2>
                    <ul className="list-disc ml-5">
                        <li>Plant Care Calendar</li>
                        <li>Plant Database with Care Guides</li>
                        <li>Community Forum for Plant Enthusiasts</li>
                        <li>Personal Plant Journal</li>
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Home;
