import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { deleteTask, updateTask, updateStatus } from '../store/Slices/taskSlice';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.task.loading);
  const [isEditing, setIsEditing] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handleStatusChange = (taskId, status) => {
    dispatch(updateStatus({ status, id: taskId }));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task) => {
    setIsEditing(task._id);
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('dueDate', new Date(task.dueDate).toISOString().split('T')[0]);
  };

  const onSubmit = (data, taskId) => {
    dispatch(updateTask({ id: taskId, data }));
    setIsEditing(null);
  };

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
            className="animate-spin h-12 w-12 text-blue-500"
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
        </div>
      ) : tasks.length > 0 ? (
        <div className="flex flex-col">
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`bg-white p-4 rounded-lg shadow-md flex flex-col justify-between`}
                style={{ borderLeft: `5px solid ${getDueDateColor(task.dueDate)}` }}
              >
                {/* Task Content */}
                <div className="flex flex-col mb-4">
                  {isEditing === task._id ? (
                    <form
                      onSubmit={handleSubmit((data) => onSubmit(data, task._id))}
                      className="flex flex-col"
                    >
                      <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        className="border border-gray-300 rounded-md p-2 mb-2"
                      />
                      <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="border border-gray-300 rounded-md p-2 mb-2"
                      ></textarea>
                      <input
                        {...register('dueDate', { required: 'Due date is required' })}
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <div className="mt-2 flex space-x-2">
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(null)}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                      <p className="text-gray-700">
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">{task.description}</p>
                    </div>
                  )}
                </div>

                {/* Task Action Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  {isEditing !== task._id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 lg:py-2 lg:px-4 rounded cursor-pointer text-sm lg:text-base"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 lg:py-2 lg:px-4 rounded cursor-pointer text-sm lg:text-base"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export { TaskList };
