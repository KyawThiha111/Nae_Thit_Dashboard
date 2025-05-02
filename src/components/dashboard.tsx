import { Link } from 'react-router';
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[#293A8A] mb-8">Dashboard Overview</h1>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Landing Page Card */}
          <Link to="/admin/dashboard/landingpage" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#FFC63C]">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#293A8A] bg-opacity-10">
                    <svg className="h-8 w-8 text-[#293A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-xl font-semibold text-[#293A8A]">Landing Page</h2>
                </div>
                <p className="mt-4 text-gray-600">Manage your homepage content and featured sections</p>
              </div>
            </div>
          </Link>

          {/* About Us Page Card */}
          <Link to="/admin/dashboard/aboutus" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#FFC63C]">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#293A8A] bg-opacity-10">
                    <svg className="h-8 w-8 text-[#293A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-xl font-semibold text-[#293A8A]">About Us Page</h2>
                </div>
                <p className="mt-4 text-gray-600">Update organization information and team details</p>
              </div>
            </div>
          </Link>

          {/* Blog Page Card */}
          <Link to="/admin/dashboard/blogs" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#FFC63C]">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#293A8A] bg-opacity-10">
                    <svg className="h-8 w-8 text-[#293A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-xl font-semibold text-[#293A8A]">Blog Page</h2>
                </div>
                <p className="mt-4 text-gray-600">Create and manage blog posts and articles</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;