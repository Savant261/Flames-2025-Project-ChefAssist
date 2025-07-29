import { Recipe } from "../models/recipe.model.js";

const createRecipe = async (req,res)=>{
  const {image} = req.body;
  if(!image){
    return res.status(400).json({message:"All fields are required"});
  }
  const uploadResponse = await cloudinary.uploader.upload(image, {
    folder: "recipe_pictures",
    resource_type: "image",
  });
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
  } catch (error) {
    console.log("Error in get Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const editRecipe = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in edit Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in delete Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleRecipe = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in toogle Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleRecipeComment = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in toogle Recipe comment controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
const getRecipeAnalytics = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in get Recipe Analytics controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  // addRecipe,
  getRecipe,
  editRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
};
