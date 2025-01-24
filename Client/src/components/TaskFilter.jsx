import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { filterTask } from '../store/Slices/taskSlice';

const TaskFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleFilter = (status) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('status', status);
    navigate(`?${updatedParams.toString()}`);

    dispatch(filterTask({ status }));
  };

  return (
    <div className="mt-6">
      {/* Heading */}
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
        Filter by Status
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-around items-center">
        {/* Pending */}
        <div
          onClick={() => handleFilter('pending')}
          className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-bold py-4 px-8 rounded-md cursor-pointer shadow-lg text-center"
        >
          Pending
        </div>

        {/* In Progress */}
        <div
          onClick={() => handleFilter('inprogress')}
          className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-4 px-8 rounded-md cursor-pointer shadow-lg text-center"
        >
          In Progress
        </div>

        {/* Completed */}
        <div
          onClick={() => handleFilter('completed')}
          className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-4 px-8 rounded-md cursor-pointer shadow-lg text-center"
        >
          Completed
        </div>
      </div>
    </div>
  );
};

export { TaskFilter };
