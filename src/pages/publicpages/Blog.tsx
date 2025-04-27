import { useEffect } from "react";
import { useBlogStore } from "../../Zustand_Store/blogstore.ts";
import { Link } from "react-router"; 
import { useLanguageStore } from "../../Zustand_Store/languagestore.ts";
// Define TypeScript interfaces

const api = "https://naethitasanv2.onrender.com"
interface Admin {
    adminname: string;
    // Add other admin properties as needed
  }
  
  interface Blog {
    _id: string;
    img?: string;
    title: string;
    description: string;
    catagory: string;
    postdate: string;
    timelength: string;
    admin: Admin;
    // Add other blog properties as needed
  }
const Blog = () => {
    const { blogs, fetchBlogs } = useBlogStore();
   const {language} = useLanguageStore()
    useEffect(() => {
      fetchBlogs(language); // or "en" if you need English
    }, [language]); // Removed fetchBlogs from dependencies to prevent infinite loops
  
    if (!blogs || blogs.length === 0) {
      return <p className="text-center mt-10 text-gray-600">No blogs available.</p>;
    }
  
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog:Blog) => (
            <Link 
              to={`/blog/${blog._id}`} 
              key={blog._id} 
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-full flex flex-col">
                {/* Blog Image with fallback */}
                <div className="w-full h-56 bg-gray-200 overflow-hidden">
                  {blog.img ? (
                    <img
                      src={`${api}${blog.img}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
  
                {/* Blog Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold mb-1">
                      {blog.catagory}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
  
                  {/* Footer: Author, Date, Read Time */}
                  <div className="mt-4 flex items-center justify-between text-gray-500 text-xs">
                    <p>👤 {blog.admin?.adminname || 'Unknown'}</p>
                    <p>🗓️ {new Date(blog.postdate).toLocaleDateString()}</p>
                    <p>⏱️ {blog.timelength}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default Blog;

