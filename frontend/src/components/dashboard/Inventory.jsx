import React, { useState, useEffect } from "react";
import InventoryItem from "./InventoryItem.jsx";
import SmallRecipeCard from "../SmallRecipeCard.jsx";
import userService from "../../api/userService.js";
import { toast } from 'react-toastify';

const Inventory = ({ sampleRecipes }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load inventory items on component mount
  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getInventory();
      
      // Transform backend data to match frontend format
      const transformedItems = response.inventory.map(item => ({
        name: item.name,
        quantity: item.qty,
        unit: item.qtyName,
        expiry: item.expiryDate ? item.expiryDate.split('T')[0] : null, // Format date for input
        status: item.status || "fresh",
        id: item._id,
      }));
      
      setInventoryItems(transformedItems);
    } catch (error) {
      console.error("Error loading inventory:", error);
      setError(error.message || "Failed to load inventory");
      toast.error("Failed to load inventory items");
    } finally {
      setLoading(false);
    }
  };
  const availableIngredients = inventoryItems
    .filter((item) => item.status !== "expired")
    .map((item) => item.name.toLowerCase());
  const possibleRecipes = sampleRecipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      availableIngredients.includes(ingredient)
    )
  );
  // use every() instead of some() if want to select recipe of which we have all ingredient
  const [addIngredientBox, setAddIngredientBox] = useState(false);
  const [addIngredient, setAddIngredient] = useState({
    name: "",
    qty: "",
    qtyName: "lbs",
    expiryDate: "",
  });
  const ingredientHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddIngredient((prev) => ({ ...prev, [name]: value }));
  };
  const deleteIngredientFunction = async (id) => {
    try {
      await userService.deleteInventoryItem(id);
      
      // Update local state
      setInventoryItems((prev) => {
        return prev.filter((item) => item.id !== id);
      });
      
      toast.success("Ingredient deleted successfully");
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      toast.error(error.message || "Failed to delete ingredient");
    }
  };
  const addIngredientFunction = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!addIngredient.name || !addIngredient.qty || !addIngredient.qtyName) {
      toast.error("Please fill in name, quantity, and unit");
      return;
    }

    if (addIngredient.qty <= 0) {
      toast.error("Quantity must be a positive number");
      return;
    }

    try {
      const response = await userService.addInventoryItem({
        name: addIngredient.name,
        qty: parseInt(addIngredient.qty),
        qtyName: addIngredient.qtyName,
        expiryDate: addIngredient.expiryDate || null
      });

      // Reload inventory to get updated data
      await loadInventory();
      
      // Reset form and close modal
      setAddIngredient({ name: "", qty: "", qtyName: "lbs", expiryDate: "" });
      setAddIngredientBox(false);
      
      toast.success("Ingredient added successfully");
    } catch (error) {
      console.error("Error adding ingredient:", error);
      toast.error(error.message || "Failed to add ingredient");
    }
  };

  const clearAllInventory = async () => {
    if (window.confirm("Are you sure you want to clear all inventory items? This action cannot be undone.")) {
      try {
        await userService.clearInventory();
        setInventoryItems([]);
        toast.success("Inventory cleared successfully");
      } catch (error) {
        console.error("Error clearing inventory:", error);
        toast.error(error.message || "Failed to clear inventory");
      }
    }
  };
  const cancelIngredientFunction = () => {
    setAddIngredient({ name: "", qty: "", qtyName: "lbs", expiryDate: "" });
    setAddIngredientBox(false);
  };
  return (
    <div id="inventory-section" className="dashboard-section">
      {addIngredientBox && (
        <div
          id="addIngredientModal"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-chef-orange">
                Add Ingredient
              </h3>
              <button
                onClick={() => cancelIngredientFunction()}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form id="addIngredientForm" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  id="ingredientName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  placeholder="e.g., Tomatoes"
                  name="name"
                  value={addIngredient.name}
                  onChange={(e) => ingredientHandler(e)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="ingredientQuantity"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                    placeholder="3"
                    name="qty"
                    value={addIngredient.qty}
                    onChange={ingredientHandler}
                    min="1"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    id="ingredientUnit"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                    value={addIngredient.qtyName}
                    name="qtyName"
                    onChange={ingredientHandler}
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                    <option value="pieces">pieces</option>
                    <option value="cups">cups</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="grams">grams</option>
                    <option value="ounces">ounces</option>
                    <option value="liters">liters</option>
                    <option value="milliliters">ml</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  id="ingredientExpiry"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  name="expiryDate"
                  value={addIngredient.expiryDate}
                  onChange={ingredientHandler}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => cancelIngredientFunction()}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-chef-orange text-white rounded-lg hover:bg-chef-orange-dark transition-colors"
                  onClick={(e) => addIngredientFunction(e)}
                >
                  Add Ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)]">
          Ingredient Inventory
        </h2>
        <div className="flex gap-2">
          {inventoryItems.length > 0 && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              onClick={clearAllInventory}
            >
              Clear All
            </button>
          )}
          <button
            className="bg-[var(--color-chef-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors"
            onClick={() => setAddIngredientBox(true)}
          >
            + Add Ingredient
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-2xl font-bold text-[var(--color-chef-orange)]">
            {inventoryItems.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Ingredients
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-2xl font-bold text-red-500">
            {inventoryItems.filter(item => item.status === 'expiring').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Expiring Soon
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-2xl font-bold text-green-500">
            {possibleRecipes.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Recipes Available
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">
            Current Inventory
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-chef-orange)]"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Loading inventory...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              <button 
                onClick={loadInventory}
                className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : inventoryItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Your inventory is empty</p>
              <button
                onClick={() => setAddIngredientBox(true)}
                className="bg-[var(--color-chef-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors"
              >
                Add Your First Ingredient
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {inventoryItems.map((item, index) => (
                <div key={item.id || index}>
                  <InventoryItem
                    item={item}
                    deleteIngredientFunction={deleteIngredientFunction}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">
            What You Can Cook
          </h3>
          <div className="space-y-4">
            {possibleRecipes.map((recipe, index) => (
              <div key={index}>
                {" "}
                <SmallRecipeCard recipe={recipe} />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
