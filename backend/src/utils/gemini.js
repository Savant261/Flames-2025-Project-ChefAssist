import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getPromptForRecipeGeneration = (type, data, dietaryRestrictions = []) => {
  const dietaryText = dietaryRestrictions.length > 0 
    ? `\n\nIMPORTANT: The recipe must comply with these dietary restrictions: ${dietaryRestrictions.join(', ')}.`
    : '';

  switch (type) {
    case 'generate_recipe':
      return `Create a detailed recipe for "${data.recipeName}". 
      
Please provide a comprehensive recipe with:
1. A catchy title
2. Brief description (2-3 sentences)
3. Detailed ingredients list with exact measurements
4. Step-by-step cooking instructions
5. Cooking time and prep time
6. Difficulty level (Beginner/Intermediate/Advanced)
7. Serves how many people
8. Nutritional benefits (if any)
9. Cooking tips

Format the response as a JSON object with these exact keys:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "ingredients": ["ingredient 1 with measurement", "ingredient 2 with measurement"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "totalTime": "X minutes",
  "difficulty": "Beginner/Intermediate/Advanced",
  "servings": "X people",
  "nutritionalBenefits": "Benefits description",
  "tips": ["Tip 1", "Tip 2"]
}${dietaryText}`;

    case 'generate_with_ingredients':
      return `Create a recipe using these available ingredients: ${data.ingredients.join(', ')}.
      
Please create a recipe that:
- Uses as many of the provided ingredients as possible
- Can be made with common kitchen staples for any missing ingredients
- Is practical and delicious

Format the response as a JSON object with these exact keys:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "ingredients": ["ingredient 1 with measurement", "ingredient 2 with measurement"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "totalTime": "X minutes",
  "difficulty": "Beginner/Intermediate/Advanced",
  "servings": "X people",
  "nutritionalBenefits": "Benefits description",
  "tips": ["Tip 1", "Tip 2"],
  "usedIngredients": ["ingredients from provided list that were used"],
  "additionalIngredients": ["ingredients needed that weren't in the provided list"]
}${dietaryText}`;

    case 'adapt_recipe':
      return `Adapt this existing recipe to better suit dietary restrictions and preferences:

Original Recipe:
Title: ${data.originalRecipe.title}
Ingredients: ${data.originalRecipe.ingredients.join(', ')}
Instructions: ${data.originalRecipe.instructions.join(' ')}

Please modify this recipe to:
- Make it healthier if possible
- Adapt it for the dietary restrictions
- Improve cooking techniques if needed
- Maintain the essence of the original recipe

Format the response as a JSON object with these exact keys:
{
  "title": "Adapted Recipe Title",
  "description": "Brief description of adaptations made",
  "ingredients": ["adapted ingredient 1 with measurement", "adapted ingredient 2 with measurement"],
  "instructions": ["Adapted Step 1", "Adapted Step 2", "Adapted Step 3"],
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "totalTime": "X minutes",
  "difficulty": "Beginner/Intermediate/Advanced",
  "servings": "X people",
  "nutritionalBenefits": "Benefits description",
  "tips": ["Tip 1", "Tip 2"],
  "adaptations": ["Change 1: reason", "Change 2: reason"],
  "originalVsAdapted": "Brief comparison with original recipe"
}${dietaryText}`;

    default:
      return `Create a recipe based on the request: ${JSON.stringify(data)}${dietaryText}`;
  }
};

export const generateRecipeWithGemini = async (type, data, dietaryRestrictions = []) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = getPromptForRecipeGeneration(type, data, dietaryRestrictions);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON response
    try {
      // Extract JSON from the response (remove markdown formatting if present)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedRecipe = JSON.parse(jsonMatch[0]);
        return {
          success: true,
          data: parsedRecipe,
          rawResponse: text
        };
      } else {
        // If no JSON found, return text as is
        return {
          success: true,
          data: {
            title: "Generated Recipe",
            content: text,
            type: type
          },
          rawResponse: text
        };
      }
    } catch (parseError) {
      // If JSON parsing fails, return the text response
      return {
        success: true,
        data: {
          title: "Generated Recipe",
          content: text,
          type: type
        },
        rawResponse: text
      };
    }
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate recipe with AI'
    };
  }
};

export default { generateRecipeWithGemini };
