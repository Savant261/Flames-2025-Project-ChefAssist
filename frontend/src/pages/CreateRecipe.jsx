import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UploadCloud,
  Plus,
  Trash2,
  Image,
  Book,
  Utensils,
  CheckCircle,
  Globe,
  AlertCircle,
  Loader,
} from "lucide-react";
import { recipeService, convertFileToBase64 } from "../api/recipeService";

const CreateRecipe = () => {
  // const sampleRecipes = [
  //   {
  //     id: 1,
  //     title: "Creamy Garlic Parmesan Pasta",
  //     image:
  //       "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     cuisine: "Italian",
  //     rating: 4.8,
  //     reviews: 124,
  //     cookTime: "25 min",
  //     difficulty: "Easy",
  //     description: "Rich and creamy pasta with garlic and parmesan cheese",
  //     author: "Priya Malhotra",
  //     status: "published",
  //     publishedDate: "2 days ago",
  //     views: 2340,
  //     likes: 89,
  //     ingredients: ["pasta", "garlic", "parmesan", "cream"],
  //     calories: 450,
  //     protein: 18,
  //     carbs: 52,
  //     fat: 16,
  //   },
  //   {
  //     id: 2,
  //     title: "Spicy Thai Basil Stir Fry",
  //     image:
  //       "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     cuisine: "Thai",
  //     rating: 4.6,
  //     reviews: 89,
  //     cookTime: "15 min",
  //     difficulty: "Medium",
  //     description: "Authentic Thai stir fry with fresh basil and chilies",
  //     author: "Priya Malhotra",
  //     status: "published",
  //     publishedDate: "1 week ago",
  //     views: 1890,
  //     likes: 67,
  //     ingredients: ["chicken", "basil", "chilies", "soy sauce"],
  //     calories: 380,
  //     protein: 25,
  //     carbs: 28,
  //     fat: 18,
  //   },
  //   {
  //     id: 3,
  //     title: "Mediterranean Quinoa Bowl",
  //     image:
  //       "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     cuisine: "Mediterranean",
  //     rating: 4.5,
  //     reviews: 45,
  //     cookTime: "25 min",
  //     difficulty: "Easy",
  //     description: "Healthy quinoa bowl with fresh vegetables and feta",
  //     author: "Priya Malhotra",
  //     status: "draft",
  //     publishedDate: null,
  //     views: 0,
  //     likes: 0,
  //     ingredients: ["quinoa", "vegetables", "feta", "olives"],
  //     calories: 320,
  //     protein: 12,
  //     carbs: 45,
  //     fat: 10,
  //   },
  // ];
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(recipeId);

  // Form states
  const [currentRecipeId, setCurrentRecipeId] = useState(recipeId || null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [canPublish, setCanPublish] = useState(false);

  // Image upload states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Recipe form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookTime: '',
    servings: '',
    tags: '',
    allowComments: true
  });

  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([{ id: 1, step: "" }]);

  // Load existing recipe data if in edit mode
  useEffect(() => {
    if (isEditMode && recipeId) {
      loadRecipeData(recipeId);
    } else {
      // Reset all states to default when not in edit mode
      setCurrentRecipeId(null);
      setStep(1);
      setLoading(false);
      setError('');
      setValidationErrors([]);
      setCanPublish(false);
      
      // Reset image states
      setSelectedImage(null);
      setImagePreview('');
      
      // Reset form data to default
      setFormData({
        title: '',
        description: '',
        cookTime: '',
        servings: '',
        tags: '',
        allowComments: true
      });
      
      // Reset ingredients to default
      setIngredients([
        { id: 1, name: "", quantity: "", unit: "" },
      ]);
      
      // Reset instructions to default
      setInstructions([{ id: 1, step: "" }]);
    }
  }, [isEditMode, recipeId]);

  useEffect(() => {
    document.title = "Create Recipe / ChefAssit";
  }, []);

  // Load recipe data for editing
  const loadRecipeData = async (id) => {
    try {
      setLoading(true);
      const recipe = await recipeService.getRecipe(id);
      
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        cookTime: recipe.cookTime || '',
        servings: recipe.servings || '',
        tags: recipe.tags ? recipe.tags.join(', ') : '',
        allowComments: recipe.allowComments !== undefined ? recipe.allowComments : true
      });

      if (recipe.ingredients && recipe.ingredients.length > 0) {
        setIngredients(recipe.ingredients.map((ing, index) => ({
          id: index + 1,
          name: ing.name || '',
          quantity: ing.quantity || '',
          unit: ing.unit || ''
        })));
      }

      if (recipe.instructions && recipe.instructions.length > 0) {
        setInstructions(recipe.instructions.map((inst, index) => ({
          id: index + 1,
          step: inst.step || ''
        })));
      }

      if (recipe.imageUrl) {
        setImagePreview(recipe.imageUrl);
      }

      // If recipe exists, start from step 2
      setStep(2);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  // Step 1: Create recipe with image
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const base64Image = await convertFileToBase64(selectedImage);
      const response = await recipeService.createRecipe(base64Image);
      
      setCurrentRecipeId(response.recipeId);
      
      // Navigate to the recipe creation page with the new ID
      navigate(`/recipe/create/${response.recipeId}`, { replace: true });
      
      setStep(2); // Move to next step
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update recipe data (Steps 2-4)
  const handleUpdateRecipe = async () => {
    if (!currentRecipeId) {
      setError('Recipe ID not found');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const updateData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
        instructions: instructions.filter(inst => inst.step.trim())
      };

      await recipeService.updateRecipe(currentRecipeId, updateData);
      
      // Move to next step or show success message
      if (step < 5) {
        setStep(step + 1);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Validate recipe before publishing
  const validateRecipeForPublish = async () => {
    if (!currentRecipeId) return;

    try {
      const validation = await recipeService.validateRecipe(currentRecipeId);
      setValidationErrors(validation.errors || []);
      setCanPublish(validation.canPublish || false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Publish recipe
  const handlePublishRecipe = async () => {
    if (!currentRecipeId || !canPublish) return;

    try {
      setLoading(true);
      setError('');
      
      await recipeService.publishRecipe(currentRecipeId);
      
      // Redirect to the published recipe or dashboard
      navigate(`/recipe/${currentRecipeId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update form data
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (step === 1) {
      handleImageUpload();
    } else if (step < 5) {
      // For steps 2-4, save progress and move to next step
      handleUpdateRecipe();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Save current step progress without moving to next step
  const saveCurrentStep = async () => {
    if (currentRecipeId && step > 1) {
      try {
        setLoading(true);
        const updateData = {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
          instructions: instructions.filter(inst => inst.step.trim())
        };
        await recipeService.updateRecipe(currentRecipeId, updateData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Load validation when reaching step 5
  useEffect(() => {
    if (step === 5 && currentRecipeId) {
      validateRecipeForPublish();
    }
  }, [step, currentRecipeId]);
  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: "", quantity: "", unit: "" },
    ]);
  
  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const addInstruction = () =>
    setInstructions([...instructions, { id: Date.now(), step: "" }]);
  
  const removeInstruction = (id) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter(inst => inst.id !== id));
    }
  };

  const updateInstruction = (id, value) => {
    setInstructions(instructions.map(inst => 
      inst.id === id ? { ...inst, step: value } : inst
    ));
  };

  const Step = ({ currentStep, stepNumber, title, icon: Icon }) => (
    <button
      type="button"
      onClick={() => {
        // Only allow navigation to completed steps or the next step
        if (stepNumber <= currentStep || 
            (stepNumber === currentStep + 1 && currentRecipeId)) {
          setStep(stepNumber);
        }
      }}
      disabled={stepNumber > currentStep + 1 || (stepNumber > 1 && !currentRecipeId)}
      className="flex items-center disabled:cursor-not-allowed"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
          currentStep >= stepNumber
            ? "bg-[var(--color-chef-orange)] text-white"
            : stepNumber === currentStep + 1 && currentRecipeId
            ? "bg-[var(--color-chef-orange)]/20 text-[var(--color-chef-orange)]"
            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span
        className={`ml-3 font-semibold hidden sm:inline ${
          currentStep >= stepNumber
            ? "text-[var(--color-chef-orange-dark)] dark:text-gray-100"
            : stepNumber === currentStep + 1 && currentRecipeId
            ? "text-[var(--color-chef-orange)]"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {title}
      </span>
    </button>
  );

  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-chef-orange-dark)] dark:text-gray-100">
            {isEditMode ? "Edit Your Recipe" : "Create a New Recipe"}
          </h1>
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}
        </header>

        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex justify-between items-center">
          <Step currentStep={step} stepNumber={1} title="Media" icon={Image} />
          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2 sm:mx-4"></div>
          <Step currentStep={step} stepNumber={2} title="Details" icon={Book} />
          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2 sm:mx-4"></div>
          <Step
            currentStep={step}
            stepNumber={3}
            title="Ingredients"
            icon={Utensils}
          />
          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2 sm:mx-4"></div>
          <Step
            currentStep={step}
            stepNumber={4}
            title="Instructions"
            icon={CheckCircle}
          />
          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2 sm:mx-4"></div>
          <Step
            currentStep={step}
            stepNumber={5}
            title="Publish"
            icon={Globe}
          />
        </div> 

        <form className="space-y-8">
          {step === 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-chef-orange-dark dark:text-color-chef-orange-light mb-6">
                Media
              </h2>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={imagePreview} 
                        alt="Recipe preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-semibold">Click to change image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </div>
                  )}
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
                Basic Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    className="w-full input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                    placeholder="e.g., Creamy Tomato Pasta"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    className="w-full input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                    placeholder="A short and enticing description of your recipe..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cookTime"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Cook Time (minutes)
                    </label>
                    <input
                      type="text"
                      id="cookTime"
                      value={formData.cookTime}
                      onChange={(e) => handleFormChange('cookTime', e.target.value)}
                      className="w-full input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder="e.g., 30 minutes"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="servings"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Servings
                    </label>
                    <input
                      type="text"
                      id="servings"
                      value={formData.servings}
                      onChange={(e) => handleFormChange('servings', e.target.value)}
                      className="w-full input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder="e.g., 4 people"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
                Ingredients
              </h2>
              <div className="space-y-3">
                {ingredients.map((ing, index) => (
                  <div key={ing.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g., 2"
                      value={ing.quantity}
                      onChange={(e) => updateIngredient(ing.id, 'quantity', e.target.value)}
                      className="w-1/4 input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="e.g., cups"
                      value={ing.unit}
                      onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                      className="w-1/4 input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="e.g., All-purpose flour"
                      value={ing.name}
                      onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                      className="w-1/2 input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(ing.id)}
                      disabled={ingredients.length === 1}
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIngredient}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange-dark)]"
              >
                <Plus className="w-4 h-4" /> Add Ingredient
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
                Instructions
              </h2>
              <div className="space-y-4">
                {instructions.map((inst, index) => (
                  <div key={inst.id} className="flex items-start gap-3">
                    <span className="font-bold text-lg text-[var(--color-chef-orange)] pt-2 min-w-[2rem]">
                      {index + 1}.
                    </span>
                    <textarea
                      rows="2"
                      placeholder="Describe this step..."
                      value={inst.step}
                      onChange={(e) => updateInstruction(inst.id, e.target.value)}
                      className="flex-1 input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                    ></textarea>
                    <button
                      type="button"
                      onClick={() => removeInstruction(inst.id)}
                      disabled={instructions.length === 1}
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 mt-1 p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addInstruction}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange-dark)]"
              >
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </div>
          )}
          {step === 5 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
                Publish Settings
              </h2>
              
              <div className="mb-6">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleFormChange('tags', e.target.value)}
                  className="w-full input-field p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700"
                  placeholder="e.g., vegan, quick dinner, italian"
                />
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Allow Comments
                  </h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleFormChange('allowComments', true)}
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        formData.allowComments
                          ? 'bg-[var(--color-chef-orange)] text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      On
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFormChange('allowComments', false)}
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        !formData.allowComments
                          ? 'bg-[var(--color-chef-orange)] text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      Off
                    </button>
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              {validationErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Recipe validation issues:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {canPublish && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Your recipe is ready to be published!
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={loading}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={loading || (step === 1 && !selectedImage)}
                className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {step === 1 ? 'Upload & Continue' : 'Next Step'}
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => validateRecipeForPublish()}
                  disabled={loading}
                  className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  Check Recipe
                </button>
                <button
                  type="button"
                  onClick={handlePublishRecipe}
                  disabled={loading || !canPublish}
                  className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {canPublish ? 'Publish Recipe' : 'Fix Issues to Publish'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
