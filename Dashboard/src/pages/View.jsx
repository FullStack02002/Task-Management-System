import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserTask, makeTasksEmpty } from '../store/Slices/taskSlice';

const View = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getUserTask({ userId }));

    return () => {
      dispatch(makeTasksEmpty());
    };
  }, [dispatch, userId]);

  const getDueDateColor = (dueDate) => {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj - today;
    const daysToDue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysToDue <= 0) {
      return 'red'; // Overdue
    } else if (daysToDue <= 3) {
      return 'orange'; // Due soon
    } else {
      return 'green'; // On time
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Tasks</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-500"
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
          <span className="ml-2 text-gray-500">Loading tasks...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading tasks: {error.message}</div>
      ) : tasks && tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-md"
              style={{ borderLeft: `5px solid ${getDueDateColor(task.dueDate)}` }}
            >
              <h3 className="text-xl font-bold mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-gray-500">
                Due Date: <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks found for this user.</p>
      )}
    </div>
  );
};

export { View };
