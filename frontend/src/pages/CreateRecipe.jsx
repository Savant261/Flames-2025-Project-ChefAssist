import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  UploadCloud,
  Plus,
  Trash2,
  Image,
  Book,
  Utensils,
  CheckCircle,
  Globe,
} from "lucide-react";

const CreateRecipe = () => {
  const sampleRecipes = [
    {
      id: 1,
      title: "Creamy Garlic Parmesan Pasta",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      rating: 4.8,
      reviews: 124,
      cookTime: "25 min",
      difficulty: "Easy",
      description: "Rich and creamy pasta with garlic and parmesan cheese",
      author: "Priya Malhotra",
      status: "published",
      publishedDate: "2 days ago",
      views: 2340,
      likes: 89,
      ingredients: ["pasta", "garlic", "parmesan", "cream"],
      calories: 450,
      protein: 18,
      carbs: 52,
      fat: 16,
    },
    {
      id: 2,
      title: "Spicy Thai Basil Stir Fry",
      image:
        "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Thai",
      rating: 4.6,
      reviews: 89,
      cookTime: "15 min",
      difficulty: "Medium",
      description: "Authentic Thai stir fry with fresh basil and chilies",
      author: "Priya Malhotra",
      status: "published",
      publishedDate: "1 week ago",
      views: 1890,
      likes: 67,
      ingredients: ["chicken", "basil", "chilies", "soy sauce"],
      calories: 380,
      protein: 25,
      carbs: 28,
      fat: 18,
    },
    {
      id: 3,
      title: "Mediterranean Quinoa Bowl",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Mediterranean",
      rating: 4.5,
      reviews: 45,
      cookTime: "25 min",
      difficulty: "Easy",
      description: "Healthy quinoa bowl with fresh vegetables and feta",
      author: "Priya Malhotra",
      status: "draft",
      publishedDate: null,
      views: 0,
      likes: 0,
      ingredients: ["quinoa", "vegetables", "feta", "olives"],
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 10,
    },
  ];
  const { recipeId } = useParams();
  const isEditMode = Boolean(recipeId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", quantity: "" },
  ]);
  const [instructions, setInstructions] = useState([{ id: 1, step: "" }]);

  useEffect(() => {
    if (isEditMode) {
      const recipeToEdit = sampleRecipes.find(
        (r) => r.id.toString() === recipeId
      );
      if (recipeToEdit) {
        setTitle(recipeToEdit.title);
        setDescription(recipeToEdit.description);
      }
    }
  }, [isEditMode, recipeId, sampleRecipes]);

  useEffect(() => {
    document.title = "Create Recipe / ChefAssit";
  }, []);
  const [step, setStep] = useState(1);
  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: "", quantity: "" },
    ]);
  const addInstruction = () =>
    setInstructions([...instructions, { id: Date.now(), step: "" }]);

  const Step = ({ currentStep, stepNumber, title, icon: Icon }) => (
    <button
      type="button"
      onClick={() => setStep(stepNumber)}
      className="flex items-center disabled:cursor-not-allowed"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
          currentStep >= stepNumber
            ? "bg-[var(--color-chef-orange)] text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span
        className={`ml-3 font-semibold hidden sm:inline ${
          currentStep >= stepNumber
            ? "text-[var(--color-chef-orange-dark)] dark:text-gray-100"
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
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
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
                    className="w-full input-field p-3 border border-gray-200 rounded-lg "
                    placeholder="e.g., Creamy Tomato Pasta"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium p-3 border border-gray-200 rounded-lg text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className="w-full input-field"
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
                      type="number"
                      id="cookTime"
                      className="w-full input-field p-3 border border-gray-200 rounded-lg"
                      placeholder="e.g., 30"
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
                      type="number"
                      id="servings"
                      className="w-full input-field p-3 border border-gray-200 rounded-lg"
                      placeholder="e.g., 4"
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
                      placeholder="e.g., 2 cups"
                      className="w-1/3 input-field  p-3 border border-gray-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="e.g., All-purpose flour"
                      className="w-2/3 input-field p-3 border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      className=" text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50  p-3 border border-gray-200 rounded-lg"
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
                    <span className="font-bold text-lg text-[var(--color-chef-orange)] pt-2 p-3 border border-gray-200 rounded-lg">
                      {index + 1}.
                    </span>
                    <textarea
                      rows="2"
                      placeholder="Describe this step..."
                      className="flex-1 input-field p-3 border border-gray-200 rounded-lg"
                    ></textarea>
                    <button
                      type="button"
                      className=" text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50  mt-1 p-3 border border-gray-200 rounded-lg"
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
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 "
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  className="w-full input-field p-3 border border-gray-200 rounded-lg"
                  placeholder="e.g., vegan, quickdinner, italian"
                />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Visibility
                  </h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--color-chef-orange)] text-white"
                    >
                      Public
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    >
                      Draft
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Allow Comments
                  </h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--color-chef-orange)] text-white"
                    >
                      On
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    >
                      Off
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors"
              >
                Next Step
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
                >
                  Preview Recipe
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors"
                >
                  {isEditMode ? "Update Recipe" : "Publish Recipe"}
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
