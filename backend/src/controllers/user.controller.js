import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
import cloudinary from "../utils/cloudinary.js";

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
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "development",
    });
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

const updateProfilePhoto = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    if (!avatar) {
      return res.status(400).json({ message: "No avatar data received." });
    }

    const uploadResponse = await cloudinary.uploader.upload(avatar, {
      folder: "profile_pictures",
      resource_type: "image",
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResponse.secure_url },
      { new: true }
    ).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile photo updated successfully!",
      ...user.toObject() // Return complete user object (includes avatar)
    });
  } catch (error) {
    console.log("Error in update Profile", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, socialLinks } = req.body;
    
    // Create update object with only provided fields
    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (bio !== undefined) updateData.bio = bio;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;

    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password'); // Exclude password from response

    return res.status(200).json({
      message: "Successfully updated profile",
      ...user.toObject() // Return the complete updated user object
    });
  } catch (error) {
    console.log("Error in update Profile", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePreference = async (req, res) => {
  try {
    const { dietaryPreferences, gender, cookingLevel } = req.body;
    
    // Create update object with only provided fields
    const updateData = {};
    if (dietaryPreferences !== undefined) updateData.dietaryPreferences = dietaryPreferences;
    if (gender !== undefined) updateData.gender = gender;
    if (cookingLevel !== undefined) updateData.cookingLevel = cookingLevel;

    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password'); // Exclude password from response
    
    return res.status(200).json({
      message: "Successfully updated preferences",
      ...user.toObject() // Return the complete updated user object
    });
  } catch (error) {
    console.log("Error in update Preference", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAccountSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('email phoneNo publicProfile');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      email: user.email,
      phoneNumber: user.phoneNo || "",
      isPublic: user.publicProfile
    });
  } catch (error) {
    console.error("Error in getAccountSettings:", error);
    return res.status(500).json({ 
      message: "Failed to fetch account settings",
      error: error.message 
    });
  }
};

const getSettingsProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      fullName: user.fullName || "",
      bio: user.bio || "",
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      isPublic: user.isPublic || false,
      socialLinks: user.socialLinks || { x: "", instagram: "", youtube: "" },
      avatar: user.avatar || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error("Error in getSettingsProfile:", error);
    return res.status(500).json({ 
      message: "Failed to fetch user settings",
      error: error.message 
    });
  }
};

const getPreference = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log(user)
    return res.status(200).json({
      dietaryPreferences: user.dietaryPreferences ?? [
        { name: "Vegetarian", value: false },
        { name: "Vegan", value: false },
        { name: "Gluten-Free", value: false },
        { name: "Dairy-Free", value: false },
        { name: "Keto", value: false },
        { name: "Paleo", value: false },
      ],
      gender: user.gender,
      cookingLevel: user.cookingLevel,
    });
  } catch (error) {
    console.log("Error in get Profile Controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Both old and new password required" });
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });
    if (newPassword.length < 6)
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    // Get updated user without password for consistency
    const updatedUser = await User.findById(userId).select('-password');
    
    return res.status(200).json({
      message: "Password changed successfully",
      ...updatedUser.toObject()
    });
  } catch (error) {
    console.log("Error in changePassword controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });
    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== userId.toString())
      return res.status(400).json({ message: "Email already in use" });
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { email }, 
      { new: true }
    ).select('-password');
    
    return res.status(200).json({
      message: "Email updated",
      ...user.toObject()
    });
  } catch (error) {
    console.log("Error in updateEmail controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePhoneNumber = async (req, res) => {
  try {
    const userId = req.user._id;
    const { phoneNo } = req.body;
    if (!phoneNo)
      return res.status(400).json({ message: "Phone number is required" });
    const existing = await User.findOne({ phoneNo });
    if (existing && existing._id.toString() !== userId.toString())
      return res.status(400).json({ message: "Phone number already in use" });
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { phoneNo }, 
      { new: true }
    ).select('-password');
    
    return res.status(200).json({
      message: "Phone number updated",
      ...user.toObject()
    });
  } catch (error) {
    console.log("Error in updatePhoneNumber controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const tooglePublicProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.publicProfile = !user.publicProfile;
    await user.save();
    
    // Get updated user without password
    const updatedUser = await User.findById(userId).select('-password');
    
    return res.status(200).json({
      message: "Public profile toggled",
      ...updatedUser.toObject()
    });
  } catch (error) {
    console.log("Error in tooglePublicProfile controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.log("Error in deleteAccount controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getProfile controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ username: userName }).select("-password -refreshToken");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.publicProfile) {
      return res.status(403).json({ message: "This profile is private" });
    }

    // Get user's recipe statistics
    const Recipe = (await import("../models/recipe.model.js")).Recipe;
    const userRecipes = await Recipe.find({ 
      author: user._id, 
      visibility: 'public' 
    }).select('_id views tags');

    // Calculate statistics
    const totalRecipes = userRecipes.length;
    const totalViews = userRecipes.reduce((sum, recipe) => sum + recipe.views, 0);
    const averageRating = 4.5; // TODO: Calculate from actual ratings when rating system is implemented
    
    // Get follower and following counts
    const Follow = (await import("../models/follow.model.js")).Follow;
    const followers = await Follow.countDocuments({ following: user._id });
    const following = await Follow.countDocuments({ follower: user._id });
    
    // Get favorite recipes count
    const favoriteRecipesCount = user.savedRecipes.length;

    // Check if current user is following this profile (if authenticated)
    let isFollowing = false;
    let isOwner = false;
    if (req.user) {
      isOwner = req.user._id.toString() === user._id.toString();
      if (!isOwner) {
        const followRelation = await Follow.findOne({
          follower: req.user._id,
          following: user._id
        });
        isFollowing = !!followRelation;
      }
    }

    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        bio: user.bio,
        avatar: user.avatar,
        socialLinks: user.socialLinks,
        cookingLevel: user.cookingLevel,
        createdAt: user.createdAt
      },
      stats: {
        totalRecipes,
        followers,
        following,
        favoriteRecipesCount,
        averageRating,
        totalViews
      },
      favoriteRecipes: user.savedRecipes || [],
      followData: {
        isFollowing,
        isOwner,
        canFollow: req.user && !isOwner
      }
    });
  } catch (error) {
    console.log("Error in getPublicProfile controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserRecipesByUsername = async (req, res) => {
  try {
    const { userName } = req.params;
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      difficulty = '', 
      cuisine = '',
      mealType = ''
    } = req.query;
    
    // Find user by username
    const user = await User.findOne({ username: userName }).select('_id publicProfile');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.publicProfile) {
      return res.status(403).json({ message: "This profile is private" });
    }

    // Build filter for recipes
    const Recipe = (await import("../models/recipe.model.js")).Recipe;
    let filter = { 
      author: user._id, 
      visibility: 'public' 
    };
    
    // Add search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add filters
    if (difficulty && difficulty !== 'All Difficulty') {
      filter.tags = { $in: [difficulty] };
    }
    
    if (cuisine && cuisine !== 'All Cuisines') {
      filter.tags = { $in: [cuisine] };
    }
    
    if (mealType && mealType !== 'All Meal Types') {
      filter.tags = { $in: [mealType] };
    }
    
    const recipes = await Recipe.find(filter)
      .populate("author", "username avatar fullName")
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Recipe.countDocuments(filter);
    
    return res.status(200).json({
      recipes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log("Error in getUserRecipesByUsername controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSavedRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    return res.status(200).json({ 
      message: "Saved recipes retrieved successfully",
      savedRecipes: user.savedRecipes || [] 
    });
  } catch (error) {
    console.log("Error in getSavedRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addSavedRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const recipe = req.body;
    if (!recipe.recipeId)
      return res.status(400).json({ message: "Recipe ID required" });
    const user = await User.findById(userId);
    if (user.savedRecipes.some(r => r.recipeId === recipe.recipeId)) {
      return res.status(400).json({ message: "Recipe already saved" });
    }
    user.savedRecipes.push(recipe);
    await user.save();
    return res.status(201).json({ message: "Recipe saved", savedRecipes: user.savedRecipes });
  } catch (error) {
    console.log("Error in addSavedRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSavedRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.params;
    const user = await User.findById(userId);
    user.savedRecipes = user.savedRecipes.filter(r => r.recipeId !== recipeId);
    await user.save();
    return res.status(200).json({ message: "Recipe removed", savedRecipes: user.savedRecipes });
  } catch (error) {
    console.log("Error in deleteSavedRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toggleSavedRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const recipe = req.body;
    
    if (!recipe.recipeId) {
      return res.status(400).json({ message: "Recipe ID required" });
    }

    const user = await User.findById(userId);
    const existingRecipeIndex = user.savedRecipes.findIndex(r => r.recipeId === recipe.recipeId);
    
    let message;
    let isSaved;
    
    if (existingRecipeIndex !== -1) {
      // Recipe is already saved, remove it
      user.savedRecipes.splice(existingRecipeIndex, 1);
      message = "Recipe removed from saved recipes";
      isSaved = false;
    } else {
      // Recipe is not saved, add it
      user.savedRecipes.push(recipe);
      message = "Recipe saved successfully";
      isSaved = true;
    }
    
    await user.save();
    
    return res.status(200).json({ 
      message, 
      isSaved,
      savedRecipes: user.savedRecipes 
    });
  } catch (error) {
    console.log("Error in toggleSavedRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkRecipeSaved = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.params;
    
    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID required" });
    }

    const user = await User.findById(userId);
    const isSaved = user.savedRecipes.some(r => r.recipeId === recipeId);
    
    return res.status(200).json({ 
      isSaved,
      recipeId
    });
  } catch (error) {
    console.log("Error in checkRecipeSaved controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleTheme = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    let nextTheme;
    if (user.theme === "light") nextTheme = "dark";
    else nextTheme = "light";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { theme: nextTheme },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "SuccessFully toogled the theme", theme: updatedUser.theme });
  } catch (error) {
    console.log("Error in toogle Theme controller", error);
    return res.status(200).json({ message: "Internal Server Error" });
  }
};

const getInventory = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update status for all items based on current date
    const now = new Date();
    const sixDaysFromNow = new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000));
    
    let updated = false;
    user.inventoryIngredient.forEach(item => {
      if (item.expiryDate) {
        const expiry = new Date(item.expiryDate);
        let newStatus = 'fresh';
        
        if (now > expiry) {
          newStatus = 'expired';
        } else if (sixDaysFromNow > expiry) {
          newStatus = 'expiring';
        }
        
        if (item.status !== newStatus) {
          item.status = newStatus;
          updated = true;
        }
      }
    });

    // Save if any status was updated
    if (updated) {
      await user.save();
    }

    return res.status(200).json({
      message: "Inventory retrieved successfully",
      inventory: user.inventoryIngredient || []
    });
  } catch (error) {
    console.log("Error in getInventory controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addInventoryItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, qty, qtyName, expiryDate } = req.body;
    
    if (!name || !qty || !qtyName) {
      return res.status(400).json({ 
        message: "Name, quantity, and unit are required" 
      });
    }

    if (qty <= 0) {
      return res.status(400).json({ 
        message: "Quantity must be a positive number" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate status based on expiry date
    let status = 'fresh';
    if (expiryDate) {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const sixDaysFromNow = new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000));
      
      if (now > expiry) {
        status = 'expired';
      } else if (sixDaysFromNow > expiry) {
        status = 'expiring';
      }
    }

    // Check if ingredient already exists
    const existingItemIndex = user.inventoryIngredient.findIndex(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (existingItemIndex !== -1) {
      // Update existing item - add quantities but use newer expiry date if provided
      user.inventoryIngredient[existingItemIndex].qty += qty;
      if (expiryDate) {
        user.inventoryIngredient[existingItemIndex].expiryDate = expiryDate;
        user.inventoryIngredient[existingItemIndex].status = status;
      }
    } else {
      // Add new item
      user.inventoryIngredient.push({ 
        name, 
        qty, 
        qtyName, 
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        status 
      });
    }

    await user.save();

    return res.status(201).json({
      message: "Inventory item added successfully",
      inventory: user.inventoryIngredient
    });
  } catch (error) {
    console.log("Error in addInventoryItem controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;
    const { name, qty, qtyName, expiryDate } = req.body;

    if (!name || !qty || !qtyName) {
      return res.status(400).json({ 
        message: "Name, quantity, and unit are required" 
      });
    }

    if (qty <= 0) {
      return res.status(400).json({ 
        message: "Quantity must be a positive number" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.inventoryIngredient.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Calculate status based on expiry date
    let status = 'fresh';
    if (expiryDate) {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const sixDaysFromNow = new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000));
      
      if (now > expiry) {
        status = 'expired';
      } else if (sixDaysFromNow > expiry) {
        status = 'expiring';
      }
    }

    user.inventoryIngredient[itemIndex] = { 
      ...user.inventoryIngredient[itemIndex].toObject(),
      name, 
      qty, 
      qtyName, 
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      status 
    };

    await user.save();

    return res.status(200).json({
      message: "Inventory item updated successfully",
      inventory: user.inventoryIngredient
    });
  } catch (error) {
    console.log("Error in updateInventoryItem controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.inventoryIngredient.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    user.inventoryIngredient.splice(itemIndex, 1);
    await user.save();

    return res.status(200).json({
      message: "Inventory item deleted successfully",
      inventory: user.inventoryIngredient
    });
  } catch (error) {
    console.log("Error in deleteInventoryItem controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const clearInventory = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { inventoryIngredient: [] },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Inventory cleared successfully",
      inventory: []
    });
  } catch (error) {
    console.log("Error in clearInventory controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  signup,
  signin,
  logout,
  chechAuth,
  updateProfile,
  updatePreference,
  getSettingsProfile,
  getAccountSettings,
  getPreference,
  changePassword,
  updateEmail,
  updatePhoneNumber,
  tooglePublicProfile,
  deleteAccount,
  getProfile,
  getPublicProfile,
  getUserRecipesByUsername,
  getSavedRecipe,
  addSavedRecipe,
  deleteSavedRecipe,
  toggleSavedRecipe,
  checkRecipeSaved,
  updateProfilePhoto,
  toogleTheme,
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  clearInventory,
};
