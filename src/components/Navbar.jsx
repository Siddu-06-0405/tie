import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-black text-white px-6 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">ClassVerse</Link>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link to="/calculator" className="hover:text-gray-400">
              SGPA/CGPA Calculator
            </Link>
          </li>
          <li>
            <Link to="/recent-posts" className="hover:text-gray-400">
              Recent Posts
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-400">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/internships" className="hover:text-gray-400">
              Internships/Workshops
            </Link>
          </li>
          <li>
            <Link
              to="/category/vtu-updates/articles-vtu-updates/"
              className="hover:text-gray-400"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about/" className="hover:text-gray-400">
              About Us
            </Link>
          </li>
        </ul>

        {/* Burger Icon */}
        <button
          className={`md:hidden ${!sidebarOpen ? "block" : "hidden"}`}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed top-0 right-0 w- h-full bg-black opacity-90 z-40 transition-opacity duration-300 ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-100 bg-[#121519] opacity-95 text-white p-12 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-6">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-4 text-2xl font-medium text-nowrap">
          <li>
            <Link to="/calculator" onClick={() => setSidebarOpen(false)}>
              SGPA/CGPA Calculator
            </Link>
          </li>
          <li>
            <Link to="/recent-posts" onClick={() => setSidebarOpen(false)}>
              Recent Posts
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/internships" onClick={() => setSidebarOpen(false)}>
              Internships/Workshops
            </Link>
          </li>
          <li>
            <Link
              to="/category/vtu-updates/articles-vtu-updates/"
              onClick={() => setSidebarOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about/" onClick={() => setSidebarOpen(false)}>
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
