import React, { useEffect } from 'react'
import { Header } from '../components'
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsers } from '../store/Slices/authSlice'
import { UserList } from '../components'


const Home = () => {
  const dispatch=useDispatch();
  const users=useSelector((state)=>state.auth?.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  
  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <UserList users={users}/>
      </main>
    </div>
    </>
  )
}

export {Home}