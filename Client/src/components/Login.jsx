import React from "react";
import { Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/Slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    const response = await dispatch(userLogin(data));
    if (response?.type === "login/fulfilled") {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(submit)}>
      {/* Email Input */}
      <div>
        <Input
          label="Email Address"
          type="text"
          placeholder="Enter your email"
          className="rounded-md bg-white text-black border-purple-500 focus:ring-2 focus:ring-purple-500"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>

      {/* Password Input */}
      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          className="rounded-md bg-white text-black border-purple-500 focus:ring-2 focus:ring-purple-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 20,
              message: "Password must not exceed 20 characters",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "Password must contain at least one letter, one number, and one special character",
            },
          })}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-semibold text-lg rounded-md shadow-md transition-all duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>Signing in...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export { Login };
