import { generateToken } from "../utils/utils.js";

// Google OAuth login
export const googleAuth = (req, res, next) => {
  // This will redirect to Google OAuth
  next();
};

// Google OAuth callback
export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
    }
    
    // Generate JWT token
    generateToken(req.user._id, res);
    
    // Redirect to frontend with success
    res.redirect(`${process.env.CLIENT_URL}/explore`);
  } catch (error) {
    console.log("Error in Google OAuth callback", error);
    res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
  }
};

// Get current user after Google auth
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = req.user;
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      authProvider: user.authProvider
    });
  } catch (error) {
    console.log("Error in getCurrentUser", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
