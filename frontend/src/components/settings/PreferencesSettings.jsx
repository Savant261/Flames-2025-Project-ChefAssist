import { useState, useEffect } from "react";
import api from "../../api/axiosInstance.js";
import {toast} from "react-toastify";
const PreferencesSettings = () => {
  const [preferencesData, setPreferencesData] = useState({
    dietaryPreferences: [
      { name: "Vegetarian", value: true },
      { name: "Vegan", value: false },
      { name: "Gluten-Free", value: false },
      { name: "Dairy-Free", value: false },
      { name: "Keto", value: false },
      { name: "Paleo", value: false },
    ],
    gender: "prefer not to say",
    cookingLevel: "Beginner",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPreferencesData((prev) => ({ ...prev, [name]: value }));
  };
  const onChangePreferenceHandler = (e) => {
    const { name, checked } = e.target;
    setPreferencesData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.map((diet) =>
        diet.name === name ? { ...diet, value: checked } : diet
      ),
    }));
  };
  const submitPreference = async () => {
    try {
      const response = await api.post("/auth/update-Preference", preferencesData);
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      toast.error("Something went Wrong");
      console.log("Error in submit preference");
    }
  };
  useEffect(() => {
    console.log(preferencesData);
  }, [preferencesData]);
  useEffect(() => {
    const func = async ()=>{
      try {
        const response = await api.get("/auth/update-Preference");
        console.log(response.data);
        setPreferencesData(response.data)
      } catch (error) {
        console.log("Error in get Preference function in useEffect",error);
      }
    }
    func();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Dietary Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Select your dietary needs. This will help us tailor recipes for you.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {preferencesData.dietaryPreferences.map((diet) => (
            <label
              key={diet.name}
              className="flex items-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[var(--color-chef-orange)] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={diet.value}
                name={diet.name}
                checked={diet.value}
                onChange={(e) => onChangePreferenceHandler(e)}
                className="mr-3 h-4 w-4 rounded text-[var(--color-chef-orange)] focus:ring-[var(--color-chef-orange)]"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {diet.name.toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Personalization
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Providing these details (optional) helps us with nutritional
          information and recipe recommendations.
        </p>
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
              onChange={(e) => onChangeHandler(e)}
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
              onChange={(e) => onChangeHandler(e)}
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
            <button className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors" onClick={()=> submitPreference()}>
              Save All Changes
            </button>
          </div>
    </div>
  );
};

export default PreferencesSettings;
