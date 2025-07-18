const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];
const PreferencesSettings = () => {
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">Dietary Preferences</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Select your dietary needs. This will help us tailor recipes for you.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dietaryOptions.map(diet => (
                        <label key={diet} className="flex items-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[var(--color-chef-orange)] cursor-pointer transition-colors">
                            <input type="checkbox" name="dietary" value={diet.toLowerCase()} className="mr-3 h-4 w-4 rounded text-[var(--color-chef-orange)] focus:ring-[var(--color-chef-orange)]" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{diet}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">Personalization</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Providing these details (optional) helps us with nutritional information and recipe recommendations.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="cookingSkill" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cooking Skill Level</label>
                        <select id="cookingSkill" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                        <select id="gender" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option>Prefer not to say</option>
                            <option>Female</option>
                            <option>Male</option>
                            <option>Non-binary</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesSettings