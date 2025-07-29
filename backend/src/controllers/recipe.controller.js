const addRecipe = async (req, res) => {
  try {
    const {} = req.body;
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
  addRecipe,
  getRecipe,
  editRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
};
