// Format recipe data for display
export const formatRecipeDisplay = (recipeData, mode) => {
  if (!recipeData) return "Recipe generated successfully!";

  let formatted = "";

  if (mode === "idea") {
    formatted += `✨ Recipe Idea: ${
      recipeData.title || "Delicious Recipe"
    }\n\n`;
  } else if (mode === "ingredients") {
    formatted += `🍳 Recipe with Your Ingredients: ${
      recipeData.title || "Delicious Recipe"
    }\n\n`;
  } else if (mode === "adapt") {
    formatted += `🔄 Adapted Recipe: ${
      recipeData.title || "Improved Recipe"
    }\n\n`;
  }

  if (recipeData.description) {
    formatted += `📝 Description: ${recipeData.description}\n\n`;
  }

  if (recipeData.prepTime) {
    formatted += `⏱️ Time: Prep ${recipeData.prepTime} | Cook ${recipeData.cookTime} | Total ${recipeData.totalTime}\n`;
  }

  if (recipeData.servings) {
    formatted += `👥 Serves: ${recipeData.servings}\n`;
  }

  if (recipeData.difficulty) {
    formatted += `📊 Difficulty: ${recipeData.difficulty}\n\n`;
  }

  if (recipeData.ingredients && recipeData.ingredients.length > 0) {
    formatted += `🛒 Ingredients:\n`;
    recipeData.ingredients.forEach((ingredient, index) => {
      formatted += `${index + 1}. ${ingredient}\n`;
    });
    formatted += "\n";
  }

  if (recipeData.instructions && recipeData.instructions.length > 0) {
    formatted += `👨‍🍳 Instructions:\n`;
    recipeData.instructions.forEach((step, index) => {
      formatted += `${index + 1}. ${step}\n`;
    });
    formatted += "\n";
  }

  if (recipeData.tips && recipeData.tips.length > 0) {
    formatted += `💡 Tips:\n`;
    recipeData.tips.forEach((tip, index) => {
      formatted += `• ${tip}\n`;
    });
    formatted += "\n";
  }

  if (recipeData.nutritionalBenefits) {
    formatted += `🌱 Nutritional Benefits: ${recipeData.nutritionalBenefits}\n\n`;
  }

  // Add special indicators for ingredients mode
  if (mode === "ingredients") {
    if (recipeData.usedIngredients && recipeData.usedIngredients.length > 0) {
      formatted += `✅ Used Your Ingredients: ${recipeData.usedIngredients.join(
        ", "
      )}\n`;
    }
    if (
      recipeData.additionalIngredients &&
      recipeData.additionalIngredients.length > 0
    ) {
      formatted += `➕ Additional Ingredients Needed: ${recipeData.additionalIngredients.join(
        ", "
      )}\n`;
    }
  }

  // Add special indicators for adapt mode
  if (mode === "adapt") {
    if (recipeData.adaptations && recipeData.adaptations.length > 0) {
      formatted += `🔧 Adaptations Made:\n`;
      recipeData.adaptations.forEach((adaptation, index) => {
        formatted += `• ${adaptation}\n`;
      });
      formatted += "\n";
    }
    if (recipeData.originalVsAdapted) {
      formatted += `📊 Original vs Adapted: ${recipeData.originalVsAdapted}\n`;
    }
  }

  return formatted;
};

// Helper to group history by day
export const getHistoryByDay = (history) => {
  const groups = {};
  history.forEach((item, idx) => {
    const date = new Date(item.timestamp);
    const day = date.toLocaleDateString();
    if (!groups[day]) groups[day] = [];
    groups[day].push({ ...item, idx });
  });
  // Sort days descending (most recent first)
  return Object.entries(groups).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );
};
