import Header from "../Layout/Header";

interface BlogPost {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
}

const blogPosts: BlogPost[] = [
    { id: 1, title: 'Post One', summary: 'Summary of post one. This is a brief description of what the post is about.', imageUrl: '/1.jpg' },
    { id: 2, title: 'Post Two', summary: 'Summary of post two. This is a brief description of what the post is about.', imageUrl: '/2.jpg' },
    { id: 3, title: 'Post Three', summary: 'Summary of post three. This is a brief description of what the post is about.', imageUrl: '/3.jpg' },
    { id: 4, title: 'Post Four', summary: 'Summary of post four. This is a brief description of what the post is about.', imageUrl: '/4.jpg' },
    { id: 5, title: 'Post Five', summary: 'Summary of post five. This is a brief description of what the post is about.', imageUrl: '/5.jpg' },
];

const Blog = () => {
    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto p-6 bg-gray-50">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-700">Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.summary}</p>
                               
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Blog;