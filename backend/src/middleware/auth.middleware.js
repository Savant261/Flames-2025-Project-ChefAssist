import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        
        if(!token) return res.status(400).json({message:"Unauthorized - No Token Provided"});
        
        const decoded = jwt.verify(token,process.env.JWT_SECRECT)

        if(!decoded) return res.status(400).json({message:"Unauthorized - Invalid Token"});

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.status(400).json({message:"User not found"});

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in Protect Route",error);
        return res.status(400).json({message:"Internal Server Error"})
    }
}