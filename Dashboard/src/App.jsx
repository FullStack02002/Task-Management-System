import React,{useEffect} from 'react';
import { SignIn,Home, View } from './pages';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getCurrentUser } from './store/Slices/authSlice';
import { AuthLayout } from './components';



const App = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getCurrentUser());
  },[dispatch]);

  return (
    <>
    <Routes>
      <Route path='/login'
        element={
          <AuthLayout authentication={false}>
                    <SignIn/>
          </AuthLayout>
        }
      />
      <Route
        path="/"
        element={
          <AuthLayout authentication={true}>
            <Home/>
          </AuthLayout>
        }
      />
      <Route
        path='/view/:userId'
        element={
          <AuthLayout authentication={true}>
          <View/>
          </AuthLayout>
        }
      />
    </Routes>
       <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
      />{" "}
    </>
  )
}

export default App