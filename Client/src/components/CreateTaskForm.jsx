import React from "react";
import { createTask } from "../store/Slices/taskSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateTaskForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.task); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    const response = await dispatch(createTask(data));
    if (response?.type === "createTask/fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("title", {
              required: "title is required",
            })}
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters long",
              },
              maxLength: {
                value: 200,
                message: "Description cannot exceed 200 characters",
              },
            })}
          ></textarea>
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("dueDate", {
              required: "due date is required",
            })}
          />
          {errors.dueDate && (
            <div className="text-red-500">{errors.dueDate.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v9m0 0v9m0-9h9m-9 0H3"
                />
              </svg>
              <span className="ml-2">Creating Task...</span>
            </div>
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </div>
  );
};

export { CreateTaskForm };
