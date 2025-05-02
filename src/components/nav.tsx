import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react"; // Icon for toggle button

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container px-5 md:px-1 bg-yellow-400 mx-auto py-3">
      <nav className="flex justify-between items-center">
        {/* Home Page (Always Visible) */}
        <Link to="/" className="font-bold text-lg">
          Home
        </Link>

        {/* Toggle Button (Visible on Small Screens) */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
     {isOpen ? <X size={24} /> : <Menu size={24} />}  
           
        </button>

        {/* Navbar Links (Hidden on small screens, shown on large screens) */}
        <div
          className={`absolute top-14 left-0 w-full bg-yellow-400 md:static md:flex md:gap-5 md:w-auto md:bg-transparent transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/addblog" className="block md:inline p-2 md:p-0">
            Blogs
          </Link>
          <Link to="/about" className="block md:inline p-2 md:p-0">
            About
          </Link>
          <Link to="/other" className="block md:inline p-2 md:p-0">
            Other
          </Link>
          <Link to="/contact" className="block md:inline p-2 md:p-0">
            Contact
          </Link>
          <button className="text-white">Language</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;