import React, { useEffect } from 'react';
import { Header } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../store/Slices/authSlice';
import { UserList } from '../components';

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-4">
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
              <span className="ml-2 text-gray-500">Loading users...</span>
            </div>
          ) : (
            <UserList users={users} />
          )}
        </main>
      </div>
    </>
  );
};

export { Home };
