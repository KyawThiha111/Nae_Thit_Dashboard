import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const BLOG_API =
  "https://naethitasanv2.onrender.com/api/pages/bloggetallupdate";
const DELETE_API = "https://naethitasanv2.onrender.com/api/pages/blog"; //add id
interface Blog {
  id: string;
  titleen: string;
  titlemy: string;
  image: string;
  // Other fields you might want to use
}

const BlogCards = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(BLOG_API);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.blogs);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error fetching blogs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* Delete */
  const DeleteBlog = async (id: string) => {
    // Set your API endpoint - replace with your actual delete endpoint
    try {
      const response = await fetch(`${DELETE_API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        return { success: true, message: "Blog deleted successfully" };
      } else {
        return {
          success: false,
          message: data.message || "Failed to delete blog",
        };
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/blog/${blog.id}`)} // Add navigation to blog detail
          >
            <div className="h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.titleen}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.titleen}
              </h2>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                {blog.titlemy}
              </h3>
              <div className="flex justify-between">
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/dashboard/blogs/update/${blog.id}`);
                  }}
                >
                  Update
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    DeleteBlog(blog.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;
