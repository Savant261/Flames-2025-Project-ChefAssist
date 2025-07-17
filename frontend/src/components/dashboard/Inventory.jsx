import React, { useState } from 'react'
import InventoryItem from './InventoryItem.jsx';
import SmallRecipeCard from '../SmallRecipeCard.jsx';

const Inventory = ({ sampleRecipes }) => {
    const [inventoryItems, setInventoryItems] = useState([
        { name: "Tomatoes", quantity: 3, unit: "lbs", expiry: "2024-12-20", status: "fresh", id: "1" },
        { name: "Pasta", quantity: 2, unit: "boxes", expiry: "2025-06-15", status: "fresh", id: "2" },
        { name: "Garlic", quantity: 1, unit: "bulb", expiry: "2024-12-18", status: "expiring", id: "3" },
        { name: "Parmesan", quantity: 1, unit: "block", expiry: "2024-12-15", status: "expired", id: "4" },
        { name: "Basil", quantity: 1, unit: "bunch", expiry: "2024-12-16", status: "expiring", id: "5" }
    ]);
    const availableIngredients = inventoryItems.filter(item => item.status !== 'expired').map(item => item.name.toLowerCase());
    const possibleRecipes = sampleRecipes.filter(recipe =>
        recipe.ingredients.some(ingredient => availableIngredients.includes(ingredient))
    );
    // use every() instead of some() if want to select recipe of which we have all ingredient
    const [addIngredientBox, setAddIngredientBox] = useState(false);
    const [addIngredient, setAddIngredient] = useState({ name: "", quantity: "", expiry: "", status: "" });
    const ingredientHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value)
        console.log(addIngredient)
        setAddIngredient((prev) => ({ ...prev, [name]: value }));
    }
    const deleteIngredientFunction = (id) => {
        console.log("delete ", id);
        setInventoryItems((prev) => { return prev.filter((item) => item.id !== id) });
    }
    const addIngredientFunction = (e) => {
        e.preventDefault();
        setInventoryItems((prev) => [...prev, { id: Date.now(), ...addIngredient }]);
        setAddIngredient({ name: "", quantity: "", expiry: "", status: "" })
        setAddIngredientBox(false)
    }
    const cancelIngredientFunction = () => {
        setAddIngredient({ name: "", quantity: "", expiry: "", status: "" })
        setAddIngredientBox(false)
    }
    return (
        <div id="inventory-section" className="dashboard-section ">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-chef-orange">Ingredient Inventory</h2>
                <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
                    onClick={() => setAddIngredientBox(true)}
                >
                    + Add Ingredient
                </button>
            </div>

            {/* <!-- Inventory Stats --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-chef-orange">47</div>
                    <div className="text-sm text-gray-600">Total Ingredients</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-red-500">5</div>
                    <div className="text-sm text-gray-600">Expiring Soon</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-green-500">12</div>
                    <div className="text-sm text-gray-600">Recipes Available</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* <!-- Current Inventory --> */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">Current Inventory</h3>
                    <div className="space-y-3" id="inventoryList">
                        {inventoryItems.map((item, index) => (<div key={index}><InventoryItem item={item} deleteIngredientFunction={deleteIngredientFunction} /></div>))}
                    </div>
                </div>

                {/* <!-- Recipe Suggestions --> */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">What You Can Cook</h3>
                    <div className="space-y-4" id="inventoryRecipes">
                        {possibleRecipes.map((recipe, index) => (<div key={index}> <SmallRecipeCard recipe={recipe} /> </div>))}
                    </div>
                </div>
            </div>
            {addIngredientBox && (<div id="addIngredientModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-chef-orange">Add Ingredient</h3>
                        <button
                            onClick={() => cancelIngredientFunction()}
                            className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form id="addIngredientForm" className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient Name</label>
                            <input type="text" id="ingredientName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" placeholder="e.g., Tomatoes" name="name" value={addIngredient.name} onChange={(e) => ingredientHandler(e)} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input type="number" id="ingredientQuantity" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" placeholder="3" name="quantity" value={addIngredient.quantity} onChange={ingredientHandler} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                <select id="ingredientUnit" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" value={addIngredient.unit} name="unit" onChange={ingredientHandler}>
                                    <option>lbs</option>
                                    <option>kg</option>
                                    <option>pieces</option>
                                    <option>cups</option>
                                    <option>tbsp</option>
                                    <option>tsp</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input type="date" id="ingredientExpiry" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" name="expiry" value={addIngredient.expiry} onChange={ingredientHandler} />
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button type="button"
                                onClick={() => cancelIngredientFunction()}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-4 py-2 bg-chef-orange text-white rounded-lg hover:bg-chef-orange-dark transition-colors" onClick={(e) => addIngredientFunction(e)}>
                                Add Ingredient
                            </button>
                        </div>
                    </form>
                </div>
            </div>)}

        </div>

    )
}

export default Inventory