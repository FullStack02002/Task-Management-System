import axiosInstance from "@/helpers/axiosinstance";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tasks: [],
  task: null,
};

export const createTask = createAsyncThunk("createTask", async (data) => {
  try {
    const response = await axiosInstance.post("/tasks/create", data);
    toast.success("Task Created Succesfully");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const getUserTask = createAsyncThunk(
  "getUserTask",
  async ({userId}) => {
    try {
     const response=await axiosInstance.get(`/tasks/getall/${userId}`)
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  try {
    const response = await axiosInstance.delete(`tasks/delete/${id}`);
    toast.success("Task Deleted Succesfully");
    return id;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const getTaskById = createAsyncThunk("getTaskById", async (id) => {
  try {
    const response = await axiosInstance.get(`tasks/getById/${id}`);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});


export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ id, data }) => {
    try {
      console.log(data);
      const response = await axiosInstance.patch(`tasks/update/${id}`, data);
      toast.success("Task Updated Succesfully");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const filterTask=createAsyncThunk(
  "filterTask",
  async({status})=>{
    try {
      const response=await axiosInstance.get(`/tasks/filter`,{
        params:{status},
      })
      return response.data.data;
      
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
      
    }
  }
)

export const updateStatus=createAsyncThunk(
  "updateStatus",
  async({status,id})=>{
    try {
      const response=await axiosInstance.patch(`/tasks/updateStatus/${id}`,{status});
      toast.success("Status Updated Succesfully");
      return response.data.data;
      
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
      
    }
  }
)




const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    makeTasksEmpty: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false;
      })

      // Get User Tasks
      .addCase(getUserTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getUserTask.rejected, (state) => {
        state.loading = false;
      })

      // Get Task By ID
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTaskById.rejected, (state) => {
        state.loading = false;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = { ...action.payload };
        }
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
      })

      // Filter Task
      .addCase(filterTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(filterTask.rejected, (state) => {
        state.loading = false;
      })

      // Update Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = { ...action.payload };
        }
      })
      .addCase(updateStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { makeTasksEmpty } = taskSlice.actions;
export default taskSlice.reducer;


