import React from "react";
import { Input } from "../components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin,registerUser } from "../store/Slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    const response = await dispatch(registerUser(data));
    if (response?.type === "register/fulfilled") {
        const email=data?.email;
        const password=data?.password;
        const loginResult=await dispatch(userLogin({email,password}));
        if(loginResult?.type==="login/fulfilled"){
            navigate("/")
        }
        else{
            navigate("/login")
        }
    
      
    } 
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(submit)}>
      {/* full Name input */}
      <div>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your Full Name"
          className="rounded-md bg-white text-black border-purple-500 focus:ring-2 focus:ring-purple-500"
          {...register("fullName", {
            required: "FullName is Required",
          })}
        />
        {errors.fullName && (
          <div className="text-red-500">{errors.fullName.message}</div>
        )}
      </div>
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

      {/* SignUp Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold text-lg rounded-md shadow-md transition-all duration-200"
      >
        SignUp
      </button>
    </form>
  );
};

export { Signup };
