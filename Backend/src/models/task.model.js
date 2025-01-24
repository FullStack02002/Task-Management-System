import mongoose from "mongoose";


const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    status:{
        type:String,
        enum:["pending","inprogress","completed"],
        default:"pending"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dueDate:{
        type:Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }

})


export const Task=mongoose.model("Task",taskSchema);