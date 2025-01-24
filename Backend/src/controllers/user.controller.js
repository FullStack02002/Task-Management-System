import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser=asyncHandler(async(req,res)=>{
    const {fullName,email,password}=req.body;

    if([fullName,email,password].some((field)=>!field || field.trim()==="")){
        throw new ApiError(400,"Please fill in all fields");
    }

    const existedUser=await User.findOne({email});

    if(existedUser){
        throw new ApiError(400,"User with email already exists");
    }

    const user=await User.create({
        fullName,
        email,
        password
    })

    const createdUser=await User.findById(user?._id);
    if(!createdUser){
        throw new ApiError(500,"Failed to Create User");
    }

    return res.status(201).json(new ApiResponse(201,createdUser,"Registered Succesfully"))

})


const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if([email,password].some((field)=>!field || field.trim()==="")){
        throw new ApiError(400,"Email and Password are required");
        }

        const user= await User.findOne({email}).select("+password");
        if(!user){
            throw new ApiError(404,"User not found");
        }
        const isPasswordValid=await user.comparePassword(password);
        if(!isPasswordValid){
            throw new ApiError(401,"Invalid Password");
        }

        const jwtToken=await user.generateJwtToken();
        
        const options={
            httpOnly:true,
            secure:true,
            sameSite:"None",
            path:"/"
        }

        return res.status(200).cookie("jwtToken",jwtToken,options).json(new ApiResponse(200,user,"User Logged in Succesfully"))

})

const logoutUser=asyncHandler(async(req,res)=>{
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"None",
        expires:new Date(0),
        path:"/"
    }

    return res.status(200).cookie("jwtToken","",options).json(new ApiResponse(200,{},"User Logged Out Succesfully"))
})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req?.user,"Current User Fetched Succesfully"));
})

const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({}).select("-password");
    return res.status(200).json(new ApiResponse(200,users,"Users Fetched Succesfully"));
})



export {registerUser,loginUser,logoutUser,getCurrentUser,getAllUsers}
