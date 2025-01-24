import React from 'react';
import { Login } from '../components';
import {Link} from "react-router-dom"

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Welcome </h1>
        </div>

        {/* Login Form */}
        <Login />

        {/* Signup Link */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { SignIn };