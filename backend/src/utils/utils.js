import jwt from "jsonwebtoken";

export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    console.log("🍪 Setting cookie - NODE_ENV:", process.env.NODE_ENV);
    console.log("🍪 Setting cookie - sameSite:", process.env.NODE_ENV === "development" ? "lax" : "none");
    console.log("🍪 Setting cookie - secure:", process.env.NODE_ENV !== "development");

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        // For cross-site requests (Vercel <-> Render), SameSite must be 'none'
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        // Secure must be true on HTTPS (Render)
        secure: process.env.NODE_ENV !== "development"
        // Note: Do NOT set domain unless you need to share across subdomains
    })

    console.log("🍪 Cookie set successfully for user:", userId);
    return token;
}