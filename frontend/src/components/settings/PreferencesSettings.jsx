import { useState, useEffect } from "react";
import api from "../../api/axiosInstance.js";
import { toast } from "react-toastify";

const COMMON_DIETS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
];

const PreferencesSettings = () => {
  const [preferencesData, setPreferencesData] = useState({
    dietaryPreferences: [],
    gender: "prefer not to say",
    cookingLevel: "Beginner",
  });

  // Separate state for the custom preference input field
  const [customPreference, setCustomPreference] = useState("");

  // --- Data Fetching ---
  useEffect(() => {
    const getUserPreferences = async () => {
      try {
        const response = await api.get("/auth/update-Preference");
        // Ensure that the fetched data structure is handled correctly
        if (response.data) {
          setPreferencesData({
            dietaryPreferences: response.data.dietaryPreferences || [],
            gender: response.data.gender || "prefer not to say",
            cookingLevel: response.data.cookingLevel || "Beginner",
          });
        }
      } catch (error) {
        console.log("Error in get Preference function in useEffect", error);
        toast.error("Could not load your saved preferences.");
      }
    };
    getUserPreferences();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPreferencesData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles toggling the checkboxes for common diets
  const onCheckboxChangeHandler = (e) => {
    const { name, checked } = e.target;
    setPreferencesData((prev) => {
      const currentPrefs = prev.dietaryPreferences;
      if (checked) {
        // Add the preference if it's not already there
        return { ...prev, dietaryPreferences: [...currentPrefs, name] };
      } else {
        // Remove the preference
        return {
          ...prev,
          dietaryPreferences: currentPrefs.filter((diet) => diet !== name),
        };
      }
    });
  };

  // Handles adding a new custom preference from the input field
  const addCustomPreference = () => {
    const newPref = customPreference.trim();
    if (newPref && !preferencesData.dietaryPreferences.includes(newPref)) {
      setPreferencesData((prev) => ({
        ...prev,
        dietaryPreferences: [...prev.dietaryPreferences, newPref],
      }));
      setCustomPreference(""); // Clear the input field
    }
  };

  // Handles removing a preference by clicking the 'x' on the tag
  const removePreference = (preferenceToRemove) => {
    setPreferencesData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.filter(
        (pref) => pref !== preferenceToRemove
      ),
    }));
  };

  // --- Form Submission ---
  const submitPreference = async () => {
    try {
      // The preferencesData state is already in the correct format to be sent
      const response = await api.post(
        "/auth/update-Preference",
        preferencesData
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Something went wrong while saving.");
      console.log("Error in submit preference", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Dietary Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Select your dietary needs. This will help us tailor recipes for you.
        </p>
        {/* Checkboxes for common diets */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {COMMON_DIETS.map((dietName) => (
            <label
              key={dietName}
              className="flex items-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[var(--color-chef-orange)] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                name={dietName}
                // Check if the diet name is in our state array
                checked={preferencesData.dietaryPreferences.includes(dietName)}
                onChange={onCheckboxChangeHandler}
                className="mr-3 h-4 w-4 rounded text-[var(--color-chef-orange)] focus:ring-[var(--color-chef-orange)]"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {dietName}
              </span>
            </label>
          ))}
        </div>

        {/* Input for adding custom preferences */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={customPreference}
            onChange={(e) => setCustomPreference(e.target.value)}
            placeholder="Add a custom preference (e.g., No Nuts)"
            className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={addCustomPreference}
            className="px-5 py-3 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Display currently selected preferences as tags */}
        <div className="flex flex-wrap gap-2">
          {preferencesData.dietaryPreferences.map((pref) => (
            <div
              key={pref}
              className="flex items-center bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 text-sm font-medium px-3 py-1 rounded-full"
            >
              <span>{pref}</span>
              <button
                onClick={() => removePreference(pref)}
                className="ml-2 text-orange-600 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-100"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Personalization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="cookingSkill"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Cooking Skill Level
            </label>
            <select
              name="cookingLevel"
              value={preferencesData.cookingLevel}
              onChange={onChangeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Gender
            </label>
            <select
              name="gender"
              value={preferencesData.gender}
              onChange={onChangeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Prefer not to say</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={submitPreference}
          className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default PreferencesSettings;
