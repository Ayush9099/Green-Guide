import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";

const BlogDetail = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const location = useLocation();
  const [blog, setBlog] = useState(location.state?.blog || null);
  const [loading, setLoading] = useState(!blog);

  useEffect(() => {
    if (!blog) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/api/blogs/${blogId}`);
          setBlog(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [blog, blogId]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Loading...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 mt-2">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-700">
          {blog.title}
        </h1>
        {blog.imageUrl && (
          <div className="mb-6 flex justify-center">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-[40%] h-auto rounded-lg transition-transform duration-300 transform hover:scale-110"
            />
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700">{blog.summary}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;