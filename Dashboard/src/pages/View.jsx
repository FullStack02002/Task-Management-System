import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserTask, makeTasksEmpty } from '../store/Slices/taskSlice';

const View = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task?.tasks);

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
      {tasks && tasks.length > 0 ? (
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
