import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(400).json({message:"Unauthorized - No Token Provided"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

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

// Optional authentication - doesn't block if no token provided
export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            req.user = null;
            return next();
        }

        const user = await User.findById(decoded.userId).select("-password");

        req.user = user || null;
        next();
    } catch (error) {
        console.log("Error in optional auth middleware", error);
        req.user = null;
        next();
    }
};