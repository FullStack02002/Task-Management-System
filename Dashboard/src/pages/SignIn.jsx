import React from 'react'
import { Login } from '../components';

const SignIn = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Welcome Back</h1>
          <p className="text-gray-600 text-sm">
            Login to access your admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <Login />

        
      </div>
    </div>

      );
}

export {SignIn}