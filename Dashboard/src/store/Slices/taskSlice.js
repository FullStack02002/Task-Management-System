import axiosInstance from "@/helpers/axiosinstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tasks: [],
  task: null,
};

export const getUserTask = createAsyncThunk(
  "getUserTask",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`/tasks/getall/${userId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    makeTasksEmpty: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getUserTask.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { makeTasksEmpty } = taskSlice.actions;

export default taskSlice.reducer;
