import axiosInstance from "@/helpers/axiosinstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  userData: null,
  status: false,
  users:[],
};


export const registerUser=createAsyncThunk("register",async(data)=>{
    try {
        const response=await axiosInstance.post("/users/register",data);
        toast.success("Registered Succesfully");
        return response.data.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
        
    }
})

export const userLogin=createAsyncThunk("login",async(data)=>{
    try {
        const response=await axiosInstance.post("/users/login",data);
        toast.success("Login Succesfull");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
        
    }
})

export const userLogout=createAsyncThunk("logout",async()=>{
    try {
        const response=await axiosInstance.post("/users/logout");
        toast.success("Logged Out Succesfully");
        return response.data.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
        
    }
})

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
    try {
      const response = await axiosInstance.get("/users/getCurrentUser");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  });
  




  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.status = true;
      });
      builder.addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.userData = null;
        state.status = false;
      });
      builder.addCase(userLogin.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.status = true;
      });
      builder.addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.userData = null;
        state.status = false;
      });
      builder.addCase(userLogout.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.userData = null;
        state.status = false;
      });
      builder.addCase(userLogout.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(getCurrentUser.pending, (state) => {
        // state.loading = true;
      });
      builder.addCase(getCurrentUser.fulfilled, (state, action) => {
        // state.loading = false;
        state.userData = action.payload;
        state.status = true;
      });
      builder.addCase(getCurrentUser.rejected, (state) => {
        // state.loading = false;
        state.userData = null;
        state.status = false;
      });
      
    },
  });


export default authSlice.reducer;