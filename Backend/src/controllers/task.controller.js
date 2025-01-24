import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "All Fields are required");
  }

  const taskData = {
    title,
    description,
    user: req.user?._id,
  };

  if (dueDate) {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      throw new ApiError(400, "Invalid dueDate format");
    }
    taskData.dueDate = parsedDate;
  }

  const task = await Task.create(taskData);

  if (!task) {
    throw new ApiError(500, "Failed to Create Task");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task Created Successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Task Id");
  }
  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task Fetched Succesfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Task Id");
  }

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task Not Found");
  }

  if (task.user.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this task");
  }

  const isDeleted = await Task.findByIdAndDelete(id);

  if (!isDeleted) {
    throw new ApiError(500, "Failed to Delete Task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, id, "Task Deleted Succesfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Task Id");
  }

  if (
    [title, description, dueDate].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task Not Found");
  }

  if (task.user.toString() !== req?.user?._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this task");
  }

  const updateTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        description,
        dueDate: new Date(dueDate),
      },
    },
    { new: true }
  );

  if (!updateTask) {
    throw new ApiError(500, "Failed to Update Task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateTask, "Task Updated Succesfully"));
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if(!status){
    throw new ApiError(400, "Please select a status");
  }

  if (!["pending", "inprogress", "completed"].includes(status)) {
    throw new ApiError(400, "Invalid Status");
  }

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Task Id");
  }
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(404, "Task Not Found");
  }

  if (task.user.toString() !== req?.user?._id.toString()) {
    throw new ApiError(403, "You are not authorized to update  status of this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
      },
    },
    { new: true }
  );

  if(!updatedTask){
    throw new ApiError(500, "Failed to Update Task Status");
  }

  return res.status(200).json(new ApiResponse(200,updatedTask,"Status Updated Succesfully"))


});

const getUserTask=asyncHandler(async(req,res)=>{
    const {userId}=req.params;

    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid User Id");
    }

   if(req.user._id.toString() !== userId && req.user.role !== 'admin') {
      throw new ApiError(403, "Forbidden: You are not authorized to view this user's tasks.");
    }

    const task=await Task.find({user:userId});



    return res.status(200).json(new ApiResponse(200,task,"User's All Tasks Fetched Succesfully"));
    
})

const filterTask=asyncHandler(async(req,res)=>{
    const {status}=req.query;

    if(!status){
        throw new ApiError(400, "Status is required");
    }

    if (!["pending", "inprogress", "completed"].includes(status)) {
        throw new ApiError(400, "Invalid Status");
      }


    const task=await Task.find({status,user:req.user?._id});


    return res.status(200).json(new ApiResponse(200,task,"Filtered Task Fetched Successfully"));


})


export { createTask, getTaskById, deleteTask, updateTask,updateStatus,getUserTask,filterTask };
