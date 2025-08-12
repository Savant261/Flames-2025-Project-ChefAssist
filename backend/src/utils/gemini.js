import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getPromptForRecipeGeneration = (type, data, dietaryRestrictions = []) => {
  const dietaryText = dietaryRestrictions.length > 0 
    ? `\n\nDietary restrictions: ${dietaryRestrictions.join(', ')}.`
    : '';

  switch (type) {
    case 'generate_recipe':
      return `Create a recipe for "${data.recipeName}". Return ONLY valid JSON:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "ingredients": ["1 cup flour", "2 eggs"],
  "instructions": ["Step 1", "Step 2"],
  "prepTime": "15 minutes",
  "cookTime": "30 minutes",
  "difficulty": "Beginner",
  "servings": "4 people",
  "tips": ["Tip 1", "Tip 2"]
}${dietaryText}`;

    case 'generate_with_ingredients':
      return `Create a recipe using these ingredients: ${data.ingredients.join(', ')}. Return ONLY valid JSON:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "ingredients": ["ingredient with amount"],
  "instructions": ["Step 1", "Step 2"],
  "prepTime": "15 minutes",
  "cookTime": "30 minutes",
  "difficulty": "Beginner",
  "servings": "4 people",
  "usedIngredients": ["from provided list"],
  "tips": ["Cooking tip"]
}${dietaryText}`;

    case 'adapt_recipe':
      return `Adapt this recipe for dietary restrictions:
Original: ${data.originalRecipe.title}
Ingredients: ${data.originalRecipe.ingredients.slice(0, 5).join(', ')}...

Return ONLY valid JSON:
{
  "title": "Adapted Recipe Title",
  "description": "What was changed",
  "ingredients": ["adapted ingredient"],
  "instructions": ["Step 1", "Step 2"],
  "prepTime": "15 minutes",
  "cookTime": "30 minutes",
  "difficulty": "Beginner",
  "servings": "4 people",
  "adaptations": ["Key change made"],
  "tips": ["Adaptation tip"]
}${dietaryText}`;

    default:
      return `Create a recipe based on: ${JSON.stringify(data)}. Return only valid JSON with title, ingredients, instructions.${dietaryText}`;
  }
};

export const generateRecipeWithGemini = async (type, data, dietaryRestrictions = []) => {
  try {
    // Use the faster flash model for better performance
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, // Limit response size for faster generation
      }
    });
    
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

// New streaming function for real-time recipe generation
export const generateRecipeStreamWithGemini = async (type, data, dietaryRestrictions = [], onChunk) => {
  try {
    // Use gemini-1.5-flash for optimal streaming performance
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });
    
    const prompt = getPromptForRecipeGeneration(type, data, dietaryRestrictions);
    
    // Generate content with streaming
    const result = await model.generateContentStream(prompt);
    
    let fullText = '';
    let isFirstChunk = true;
    
    // Process each chunk as it comes
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      
      // Send chunk to callback function (for SSE)
      if (onChunk) {
        onChunk({
          chunk: chunkText,
          fullText: fullText,
          isComplete: false,
          isFirstChunk: isFirstChunk
        });
        isFirstChunk = false;
      }
    }
    
    // Try to parse the complete JSON response
    let finalData;
    try {
      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        finalData = JSON.parse(jsonMatch[0]);
      } else {
        finalData = {
          title: "Generated Recipe",
          content: fullText,
          type: type
        };
      }
    } catch (parseError) {
      finalData = {
        title: "Generated Recipe",
        content: fullText,
        type: type
      };
    }
    
    // Send final complete response
    if (onChunk) {
      onChunk({
        chunk: '',
        fullText: fullText,
        isComplete: true,
        finalData: finalData
      });
    }
    
    return {
      success: true,
      data: finalData,
      rawResponse: fullText
    };
    
  } catch (error) {
    console.error('Gemini Streaming Error:', error);
    
    if (onChunk) {
      onChunk({
        error: true,
        message: error.message || 'Failed to generate recipe with AI'
      });
    }
    
    return {
      success: false,
      error: error.message || 'Failed to generate recipe with AI'
    };
  }
};

export default { generateRecipeWithGemini };
