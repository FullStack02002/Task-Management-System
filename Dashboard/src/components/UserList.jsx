import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
  const filteredUsers = users.filter((user) => user.role !== 'admin');

  return (
    <div className="container mx-auto p-4">
      <h2 className='text-center text-3xl font-bold'>Users</h2>
      {filteredUsers.length > 0 && ( 
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li key={user._id} className="flex justify-between items-center">
              <span className="text-lg font-bold">{user.fullName}</span>
             <Link to={`/view/${user?._id}`}>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                View Tasks
              </button>
             </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredUsers.length === 0 && (
        <p className="text-center">No Users Found</p>
      )}
    </div>
  );
};

export { UserList };