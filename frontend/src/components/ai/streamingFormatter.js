// Real-time streaming formatter for recipe JSON
export class StreamingRecipeFormatter {
  constructor() {
    this.buffer = '';
    this.currentObject = {};
    this.formattedOutput = '';
  }

  // Add new chunk and return formatted output
  addChunk(chunk) {
    this.buffer += chunk;
    this.parseBuffer();
    return this.getFormattedOutput();
  }

  // Try to parse JSON from buffer
  parseBuffer() {
    // Try to extract JSON object from buffer
    const jsonMatch = this.buffer.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      try {
        // Try to parse complete JSON
        const jsonStr = jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        this.currentObject = { ...this.currentObject, ...parsed };
      } catch (e) {
        // If complete JSON fails, try to parse partial JSON
        this.parsePartialJSON();
      }
    } else {
      // Try to parse partial JSON
      this.parsePartialJSON();
    }
  }

  // Parse partial JSON fields as they come in
  parsePartialJSON() {
    const buffer = this.buffer;
    
    // Extract title
    const titleMatch = buffer.match(/"title"\s*:\s*"([^"]*)/);
    if (titleMatch) {
      this.currentObject.title = titleMatch[1];
    }

    // Extract description
    const descMatch = buffer.match(/"description"\s*:\s*"([^"]*)/);
    if (descMatch) {
      this.currentObject.description = descMatch[1];
    }

    // Extract ingredients array
    const ingredientsMatch = buffer.match(/"ingredients"\s*:\s*\[(.*?)\]/s);
    if (ingredientsMatch) {
      try {
        const ingredientsStr = `[${ingredientsMatch[1]}]`;
        this.currentObject.ingredients = JSON.parse(ingredientsStr);
      } catch (e) {
        // Parse partial ingredients
        const partialIngredients = buffer.match(/"ingredients"\s*:\s*\[([^\]]*)/s);
        if (partialIngredients) {
          const items = partialIngredients[1].split(',').map(item => 
            item.trim().replace(/^"|"$/g, '')
          ).filter(item => item.length > 0);
          this.currentObject.ingredients = items;
        }
      }
    }

    // Extract instructions array
    const instructionsMatch = buffer.match(/"instructions"\s*:\s*\[(.*?)\]/s);
    if (instructionsMatch) {
      try {
        const instructionsStr = `[${instructionsMatch[1]}]`;
        this.currentObject.instructions = JSON.parse(instructionsStr);
      } catch (e) {
        // Parse partial instructions
        const partialInstructions = buffer.match(/"instructions"\s*:\s*\[([^\]]*)/s);
        if (partialInstructions) {
          const items = partialInstructions[1].split(',').map(item => 
            item.trim().replace(/^"|"$/g, '')
          ).filter(item => item.length > 0);
          this.currentObject.instructions = items;
        }
      }
    }

    // Extract other fields
    const fieldsToExtract = ['prepTime', 'cookTime', 'difficulty', 'servings'];
    fieldsToExtract.forEach(field => {
      const regex = new RegExp(`"${field}"\\s*:\\s*"([^"]*)`);
      const match = buffer.match(regex);
      if (match) {
        this.currentObject[field] = match[1];
      }
    });

    // Extract tips array
    const tipsMatch = buffer.match(/"tips"\s*:\s*\[(.*?)\]/s);
    if (tipsMatch) {
      try {
        const tipsStr = `[${tipsMatch[1]}]`;
        this.currentObject.tips = JSON.parse(tipsStr);
      } catch (e) {
        const partialTips = buffer.match(/"tips"\s*:\s*\[([^\]]*)/s);
        if (partialTips) {
          const items = partialTips[1].split(',').map(item => 
            item.trim().replace(/^"|"$/g, '')
          ).filter(item => item.length > 0);
          this.currentObject.tips = items;
        }
      }
    }
  }

  // Format the current object into readable recipe
  getFormattedOutput() {
    let output = '';
    
    if (this.currentObject.title) {
      output += `🍽️ **${this.currentObject.title}**\n\n`;
    }

    if (this.currentObject.description) {
      output += `📝 ${this.currentObject.description}\n\n`;
    }

    // Cooking details
    const details = [];
    if (this.currentObject.prepTime) details.push(`⏱️ Prep: ${this.currentObject.prepTime}`);
    if (this.currentObject.cookTime) details.push(`🔥 Cook: ${this.currentObject.cookTime}`);
    if (this.currentObject.difficulty) details.push(`📊 Difficulty: ${this.currentObject.difficulty}`);
    if (this.currentObject.servings) details.push(`👥 Serves: ${this.currentObject.servings}`);
    
    if (details.length > 0) {
      output += details.join(' | ') + '\n\n';
    }

    // Ingredients
    if (this.currentObject.ingredients && this.currentObject.ingredients.length > 0) {
      output += `🛒 **Ingredients:**\n`;
      this.currentObject.ingredients.forEach((ingredient, index) => {
        if (ingredient.trim()) {
          output += `${index + 1}. ${ingredient}\n`;
        }
      });
      output += '\n';
    }

    // Instructions
    if (this.currentObject.instructions && this.currentObject.instructions.length > 0) {
      output += `👨‍🍳 **Instructions:**\n`;
      this.currentObject.instructions.forEach((instruction, index) => {
        if (instruction.trim()) {
          output += `${index + 1}. ${instruction}\n`;
        }
      });
      output += '\n';
    }

    // Tips
    if (this.currentObject.tips && this.currentObject.tips.length > 0) {
      output += `💡 **Tips:**\n`;
      this.currentObject.tips.forEach((tip, index) => {
        if (tip.trim()) {
          output += `• ${tip}\n`;
        }
      });
    }

    return output;
  }

  // Get the final formatted recipe
  getFinalOutput() {
    return this.getFormattedOutput();
  }

  // Reset for new recipe
  reset() {
    this.buffer = '';
    this.currentObject = {};
    this.formattedOutput = '';
  }
}
