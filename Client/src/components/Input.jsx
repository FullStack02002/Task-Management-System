import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", placeholder, className = "", ...props }, ref) => {
    const id = useId(); 
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 pl-1 text-purple-700">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref} 
          type={type}
          placeholder={placeholder}
          className={`px-3 py-2 bg-white text-black placeholder-gray-500 outline-none focus:bg-purple-50 duration-200 border border-purple-500 w-full ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export { Input };
