import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        trim:true, 
        lowercase:true,
        required: [true,"Email is required"],
        match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please provide a valid email",
            ],
    },
    username:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required: [true,"UserName is required"],
    },
    password:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Password is required"],
    },
    avatar:{
        type:String,
        trim:true,
        default: "default-avatar.png"
    },
    refreshToken: {
      type: String,
    },
},{timestamps:true})

export const User = mongoose.model("User",userSchema);