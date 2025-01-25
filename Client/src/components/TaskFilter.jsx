import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterTask } from "../store/Slices/taskSlice";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleFilter = (status) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("status", status);
    navigate(`?${updatedParams.toString()}`);
    dispatch(filterTask({ status }));
  };

  return (
    <div className="mt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700 mb-4">
          Filter by Status
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
          {/* Pending */}
          <div
            onClick={() => handleFilter("pending")}
            className="w-full sm:w-auto bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-md cursor-pointer shadow-lg text-center transition duration-200"
          >
            Pending
          </div>

          {/* In Progress */}
          <div
            onClick={() => handleFilter("inprogress")}
            className="w-full sm:w-auto bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-md cursor-pointer shadow-lg text-center transition duration-200"
          >
            In Progress
          </div>

          {/* Completed */}
          <div
            onClick={() => handleFilter("completed")}
            className="w-full sm:w-auto bg-green-200 hover:bg-green-300 text-green-800 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-md cursor-pointer shadow-lg text-center transition duration-200"
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export { TaskFilter };
