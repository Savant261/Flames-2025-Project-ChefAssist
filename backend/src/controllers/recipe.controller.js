import { Recipe } from "../models/recipe.model.js";
import cloudinary from "../utils/cloudinary.js";

const createRecipe = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "recipe_pictures",
      resource_type: "image",
    });
    
    const recipe = await Recipe.create({
      imageUrl: uploadResponse.secure_url,
      author: req.user._id,
      visibility: 'draft' // Always start as draft
    }); 
    
    return res.status(201).json({ 
      recipeId: recipe._id, 
      imageUrl: recipe.imageUrl,
      message: "Recipe created successfully. Please complete the details." 
    });
  } catch (error) {
    console.log("Error in createRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { title, description, cookTime, servings, ingredients, instructions, tags, allowComments } = req.body;

    // Find the recipe and verify ownership
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update recipe fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (cookTime !== undefined) updateData.cookTime = cookTime;
    if (servings !== undefined) updateData.servings = servings;
    if (ingredients !== undefined) updateData.ingredients = ingredients;
    if (instructions !== undefined) updateData.instructions = instructions;
    if (tags !== undefined) updateData.tags = tags;
    if (allowComments !== undefined) updateData.allowComments = allowComments;

    // Always keep as draft during updates - can only be published via publishRecipe
    updateData.visibility = 'draft';

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId, 
      updateData, 
      { new: true, runValidators: true }
    );

    return res.status(200).json({ 
      message: "Recipe updated successfully", 
      recipe: updatedRecipe 
    });
  } catch (error) {
    console.log("Error in updateRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId).populate("author", "username avatar");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    recipe.views += 1;
    await recipe.save();
    return res.status(200).json(recipe);
  } catch (error) {
    console.log("Error in get Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const editRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const update = req.body;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Object.assign(recipe, update);
    await recipe.save();
    return res.status(200).json({ message: "Recipe updated", recipe });
  } catch (error) {
    console.log("Error in edit Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Recipe.findByIdAndDelete(recipeId);
    return res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    console.log("Error in delete Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    recipe.visibility = recipe.visibility === "public" ? "draft" : "public";
    await recipe.save();
    return res.status(200).json({ message: "Recipe visibility toggled", visibility: recipe.visibility });
  } catch (error) {
    console.log("Error in toogle Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleRecipeComment = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    recipe.allowComments = !recipe.allowComments;
    await recipe.save();
    return res.status(200).json({ message: "Recipe comments toggled", allowComments: recipe.allowComments });
  } catch (error) {
    console.log("Error in toogle Recipe comment controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
const getRecipeAnalytics = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    // Example analytics: views, comments allowed, created/updated
    return res.status(200).json({
      views: recipe.views,
      allowComments: recipe.allowComments,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      visibility: recipe.visibility
    });
  } catch (error) {
    console.log("Error in get Recipe Analytics controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Validation function to check if recipe is ready for publishing
const validateRecipeForPublishing = (recipe) => {
  const errors = [];
  
  // Check title (minimum 3 words)
  if (!recipe.title || recipe.title.trim().split(/\s+/).length < 3) {
    errors.push("Title must contain at least 3 words");
  }
  
  // Check description (minimum 10 characters)
  if (!recipe.description || recipe.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long");
  }
  
  // Check ingredients (minimum 3 ingredients)
  if (!recipe.ingredients || recipe.ingredients.length < 3) {
    errors.push("Recipe must have at least 3 ingredients");
  }
  
  // Check instructions (minimum 3 steps)
  if (!recipe.instructions || recipe.instructions.length < 3) {
    errors.push("Recipe must have at least 3 instruction steps");
  }
  
  // Check if all instruction steps have content
  if (recipe.instructions) {
    const emptySteps = recipe.instructions.filter(inst => !inst.step || inst.step.trim().length === 0);
    if (emptySteps.length > 0) {
      errors.push("All instruction steps must have content");
    }
  }
  
  // Check if all ingredients have required fields
  if (recipe.ingredients) {
    const invalidIngredients = recipe.ingredients.filter(ing => 
      !ing.name || !ing.quantity || ing.name.trim().length === 0 || ing.quantity.trim().length === 0
    );
    if (invalidIngredients.length > 0) {
      errors.push("All ingredients must have name and quantity");
    }
  }
  
  // Check cook time
  if (!recipe.cookTime || recipe.cookTime.trim().length === 0) {
    errors.push("Cook time is required");
  }
  
  // Check servings
  if (!recipe.servings || recipe.servings.trim().length === 0) {
    errors.push("Number of servings is required");
  }
  
  return errors;
};

const publishRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Validate recipe before publishing
    const validationErrors = validateRecipeForPublishing(recipe);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: "Recipe cannot be published. Please fix the following issues:", 
        errors: validationErrors 
      });
    }
    
    // If validation passes, publish the recipe
    recipe.visibility = 'public';
    await recipe.save();
    
    return res.status(200).json({ 
      message: "Recipe published successfully!", 
      recipe: recipe 
    });
  } catch (error) {
    console.log("Error in publishRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    const validationErrors = validateRecipeForPublishing(recipe);
    
    return res.status(200).json({ 
      isValid: validationErrors.length === 0,
      errors: validationErrors,
      canPublish: validationErrors.length === 0
    });
  } catch (error) {
    console.log("Error in validateRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserRecipes = async (req, res) => {
  try {
    const { status } = req.query; // 'draft', 'public', or 'all'
    
    let filter = { author: req.user._id };
    
    if (status && status !== 'all') {
      filter.visibility = status;
    }
    
    const recipes = await Recipe.find(filter)
      .populate("author", "username avatar")
      .sort({ updatedAt: -1 });
    
    return res.status(200).json({
      recipes,
      total: recipes.length
    });
  } catch (error) {
    console.log("Error in getUserRecipes controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPublicRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', tags = '' } = req.query;
    
    let filter = { visibility: 'public' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    const recipes = await Recipe.find(filter)
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
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
    console.log("Error in getAllPublicRecipes controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export all controllers
export {
  createRecipe,
  updateRecipe,
  getRecipe,
  editRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
  publishRecipe,
  validateRecipe,
  getUserRecipes,
  getAllPublicRecipes,
  getTrendingRecipes,
  getHighestViewsRecipes,
  getHighestLikesRecipes,
};
// Get trending recipes (recent, most viewed, most liked)
// Returns trendingToday, trendingWeek, trendingMonth, allTimeFavorites
const getTrendingRecipes = async (req, res) => {
  try {
    // Trending Today: last 24h, sorted by views
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const trendingToday = await Recipe.find({
      visibility: 'public',
      createdAt: { $gte: today }
    })
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    // Trending This Week: last 7 days, sorted by views
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const trendingWeek = await Recipe.find({
      visibility: 'public',
      createdAt: { $gte: weekAgo }
    })
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    // Trending This Month: last 30 days, sorted by views
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const trendingMonth = await Recipe.find({
      visibility: 'public',
      createdAt: { $gte: monthAgo }
    })
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    // All-Time Favorites: highest likes
    const allTimeFavorites = await Recipe.find({ visibility: 'public' })
      .sort({ likes: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    return res.status(200).json({
      trendingToday,
      trendingWeek,
      trendingMonth,
      allTimeFavorites
    });
  } catch (error) {
    console.log('Error in getTrendingRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get recipes with highest views
const getHighestViewsRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ visibility: 'public' })
      .sort({ views: -1 })
      .limit(10)
      .populate('author', 'username avatar');
    return res.status(200).json({ recipes });
  } catch (error) {
    console.log('Error in getHighestViewsRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get recipes with highest likes
const getHighestLikesRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ visibility: 'public' })
      .sort({ likes: -1 })
      .limit(10)
      .populate('author', 'username avatar');
    return res.status(200).json({ recipes });
  } catch (error) {
    console.log('Error in getHighestLikesRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
