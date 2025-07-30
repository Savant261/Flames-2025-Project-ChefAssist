import { Recipe } from "../models/recipe.model.js";

const createRecipe = async (req,res)=>{
  try {
    const {image } = req.body;
    if (!image ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "recipe_pictures",
      resource_type: "image",
    });
    const recipe = await Recipe.create({
      
      imageUrl: uploadResponse.secure_url,
      author: req.user._id
    }); 
    return res.status(201).json({ recipeId: recipe._id, imageUrl: recipe.imageUrl });
  } catch (error) {
    console.log("Error in createRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateRecipe = async (req, res) => {
  try {
    const {title, description, cookTime, servings, ingredient, instructions, tags, visibility, allowComment} = req.body;

   
    const recipe = Recipe.create({authorId:req.user._id,imageUrl:uploadResponse.secure_url,title, description, cookTime, servings,ingredient, instructions, tags, visibility, allowComment});

    return res.status(200).json(recipe);
  } catch (error) {
    console.log("Error in add Recipe controller", error);
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

export {
  createRecipe,
  updateRecipe,
  getRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
};
