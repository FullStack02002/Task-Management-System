import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/Slices/authSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleCreateTask = () => {
    navigate("/create-task"); 
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/">
        <h1 className="font-bold text-2xl cursor-pointer">Task Management </h1>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-4">
        <button
          onClick={handleCreateTask}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200 cursor-pointer"
        >
          Create Task
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200 cursor-pointer"
        >
          Logout
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white text-black shadow-lg p-4 md:hidden">
          <Link to="/create-task" className="block w-full mb-2">
            <button className="w-full text-left text-base font-semibold hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer">
              Create Task
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-base font-semibold hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export { Header };