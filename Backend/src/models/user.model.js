import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"FullName is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false,
        minLength:[8,"Password must be of length 8"]
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }

},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJwtToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullName:this.fullName,
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn:process.env.JWT_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.isAdmin=function(){
    return this.role==="admin";
}


export const User=mongoose.model("User",userSchema);