import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const protectRoute = async (req,res,next)=>{
    try {
        console.log("🛡️ ProtectRoute - Cookies:", req.cookies ? Object.keys(req.cookies) : "No cookies");
        console.log("🛡️ ProtectRoute - Cookie header:", req.headers.cookie ? "Present" : "Missing");
        
        const token = req.cookies.jwt;
        console.log("🛡️ ProtectRoute - JWT token:", token ? "Present" : "Missing");

        if(!token) {
            console.log("❌ ProtectRoute - No token provided");
            return res.status(401).json({message:"Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("🛡️ ProtectRoute - Token decoded:", decoded ? "Success" : "Failed");

        if(!decoded) {
            console.log("❌ ProtectRoute - Invalid token");
            return res.status(401).json({message:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        console.log("🛡️ ProtectRoute - User found:", user ? user._id : "Not found");

        if(!user) {
            console.log("❌ ProtectRoute - User not found in database");
            return res.status(401).json({message:"User not found"});
        }

        req.user = user;
        console.log("✅ ProtectRoute - Authentication successful");
        next();
    } catch (error) {
        console.log("Error in Protect Route",error);
        return res.status(401).json({message:"Internal Server Error"})
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