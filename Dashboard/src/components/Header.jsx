import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../store/Slices/authSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  

  const handleLogout = () => {
    dispatch(adminLogout());

   
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
      
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>

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

      {/* Desktop Logout Button */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white text-black shadow-lg p-4 md:hidden">
          <button
            onClick={handleLogout}
            className="w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export {Header};
