import axiosInstance from "@/helpers/axiosinstance.js";
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify"


const initialState={
    loading:false,
    adminData:null,
    status:false,
    users:[],
    admin:false
}

export const adminLogin=createAsyncThunk("login",async(data)=>{
    try {
        const response=await axiosInstance.post("/users/login",data);
        if(response.data.data.role==="admin"){
            toast.success("Login Succesfull");
        }
        return response.data.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }

})

export const adminLogout=createAsyncThunk("logout",async(data)=>{
    try {
        const response=await axiosInstance.post("/users/logout");
        toast.success("Logged Out Succesfully");
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})




export const getCurrentUser=createAsyncThunk("getCurrentUser",async()=>{
    try {
        const response=await axiosInstance.get("/users/getcurrentuser");
        return response.data.data;
        
    } catch (error) {
        throw error;
        
    }
})

export const getAllUsers=createAsyncThunk("getAllUsers",async()=>{
    try {
        const response=await axiosInstance.get("users/admin/getall");
        return response.data.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})




const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading=false;
            const  {role}=action.payload;
            if(role==="admin"){
                state.admin=true;
            }
            state.adminData=action.payload;
            state.status=true;
        });
        builder.addCase(adminLogin.rejected,(state,action)=>{
            state.loading=false;
            state.adminData=null;
            state.status=false;
        });
        builder.addCase(getCurrentUser.pending,(state,action)=>{
            // state.loading=true;
        });
        builder.addCase(getCurrentUser.fulfilled,(state,action)=>{
            // state.loading=false;
            state.adminData=action.payload;
            state.status=true;
        });
        builder.addCase(getCurrentUser.rejected,(state)=>{
            // state.loading=false;
            state.adminData=null;
            state.status=false;
        });
        builder.addCase(getAllUsers.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
        });
        builder.addCase(getAllUsers.rejected,(state)=>{
            state.loading=false;
        });
        // builder.addCase(adminLogout.pending,(state)=>{
        //     state.loading=true;
        // })
        builder.addCase(adminLogout.fulfilled,(state)=>{
            state.loading=false;
            state.adminData=null;
            state.status=false;
        })
        // builder.addCase(adminLogout.rejected,(state)=>{
        //     state.loading=false;
        // })
        

    }

})


export default authSlice.reducer;