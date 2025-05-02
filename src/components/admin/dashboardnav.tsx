import { Outlet } from "react-router";
import { Link } from "react-router";
import { useNavigate } from "react-router";
const DashboardNav = ()=>{
  const isAuthenticated = localStorage.getItem('admintoken');
  const navigate = useNavigate()
  const LogoutFun = ()=>{
    localStorage.removeItem('admintoken');
    navigate("/")
  }
    return(
        <div>
              {/* Navigation Bar */}
  <nav className="bg-[#293A8A] text-white shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center">
       <Link to="/admin/dashboard">
       <div className="flex-shrink-0 font-bold text-xl">
          Nae Thit Dashboard
        </div>
       </Link>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="p-1 rounded-full text-white hover:text-[#FFC63C] focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Logout Button */}
        {isAuthenticated?(
          <button onClick={LogoutFun} className="bg-[#FFC63C] hover:bg-yellow-500 text-[#293A8A] px-3 py-1 rounded-md text-sm font-medium">
          Logout
        </button>
        ):
        <Link to="/admin/login">Login</Link>
        }
      </div>
    </div>
  </div>
</nav>
   {isAuthenticated?(
    <Outlet/>
   ):(
    <h1 className="text-center">Log in First</h1>
   )}
    </div>
 )
}

export default DashboardNav;
