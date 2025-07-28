import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All details are required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const user = await User.findOne({ email });

    if (user) res.status(400).json({ message: "User Already Exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in singup controllers", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const chechAuth = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(200).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, socialLinks } = req.body;
    if (!fullName || !bio || !socialLinks)
      return res.status(400).json({ message: "All fields are required" });
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, bio, socialLinks },
      { new: true }
    );

    return res.status(200).json({
      message: "Sucessfully updated profile",
      fullName: user.fullName,
      bio: user.bio,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    console.log("Error in update Profile", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePreference = async (req, res) => {
  try {
    const { dietaryPreferences, gender, cookingLevel } = req.body;
    if (!gender || !cookingLevel || !dietaryPreferences)
      return res.status(400).json({ message: "All fields are required" });
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, {
      dietaryPreferences,
      gender,
      cookingLevel,
    });

    return res.status(200).json(
      {
        message: "Sucessfully updated preference",
        dietaryPreferences: user.dietaryPreferences,
        gender: user.gender,
        cookingLevel: user.cookingLevel,
      },
      { new: true }
    );
  } catch (error) {
    console.log("Error in update Preference", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    console.log(user);
    return res.status(200).json({
      fullName: user.fullName,
      bio: user.bio,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    console.log("Error in get Profile Controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPreference = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    return res.status(200).json({
      dietaryPreferences: user.dietaryPreferences,
      gender: user.gender,
      cookingLevel: user.cookingLevel,
    });
  } catch (error) {
    console.log("Error in get Profile Controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {};

const updateEmail = async (req, res) => {};

const updatePhoneNumber = async (req, res) => {};

const tooglePublicProfile = async (req, res) => {};

const deleteAccount = async (req, res) => {};

export {
  signup,
  signin,
  logout,
  chechAuth,
  updateProfile,
  updatePreference,
  getProfile,
  getPreference,
  changePassword,
  updateEmail,
  updatePhoneNumber,
  tooglePublicProfile,
  deleteAccount,
};
