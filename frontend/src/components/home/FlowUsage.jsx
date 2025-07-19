import React from 'react'

const FlowUsage = () => {
    return ( // just removed  opacity-0
        <section id="flow-usage" className={"w-full py-16 px-4 md:px-16 bg-[#FFDAB9]"}>
            <h2 className={"text-3xl md:text-4xl font-bold text-center mb-12"} style={{ color: "#D35400" }}>How ChefAssist Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="flow-card  transform -translate-x-16 transition-all duration-700 bg-[#FFF8E7] rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
                    <div className="flex justify-between items-center w-full mb-4">
                        <span className="font-semibold text-lg text-[#FF6F61]">Prompt</span>
                        <button className="text-[#FF6F61] font-bold text-lg">X</button>
                    </div>
                    <textarea className="w-full rounded-xl border-2 border-[#FFDAB9] p-3 mb-3 text-[#D35400] bg-white resize-none" placeholder="Enter your ingredients.." rows="2"></textarea>
                    <button className="w-full py-3 rounded-xl bg-[#D35400] text-[#FFF8E7] font-bold shadow">Generate</button>
                    <h3 className="mt-6 text-lg font-bold text-[#D35400]">1. Enter Your Ingredients</h3>
                    <p className="mt-2 text-[#B35C00] text-sm">Type the ingredients you have in your kitchen. ChefAssist can work with whatever you've got, from a few items to a full pantry!</p>
                </div>
                <div className="flow-card  transform translate-x-16 transition-all duration-700 bg-[#FFF8E7] rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
                    <div className="flex justify-center items-center w-full mb-4">
                        <span className="font-semibold text-lg text-[#FF6F61]">We are making your recipe...</span>
                    </div>
                    <div className="flex items-center justify-center w-full h-24 mb-3">
                        <svg className="animate-spin" width="38" height="38" viewBox="0 0 38 38"><circle cx="19" cy="19" r="16" stroke="#FF6F61" strokeWidth="4" fill="none" strokeDasharray="80" strokeDashoffset="60"></circle></svg>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-[#D35400]">2. AI Processing</h3>
                    <p className="mt-2 text-[#B35C00] text-sm">ChefAssist whips up your personalized recipe based on your input. In moments, you'll have a delicious dish ready to cook!</p>
                </div>
                <div className="flow-card  transform -translate-x-16 transition-all duration-700 bg-[#FFF8E7] rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
                    <div className="flex justify-between items-center w-full mb-4">
                        <span className="font-semibold text-lg text-[#FF6F61]">Dietary</span>
                        <button className="text-[#FF6F61] font-bold text-lg">⚙️</button>
                    </div>
                    <div className="w-full mb-3">
                        <input type="text" className="w-full rounded-xl border-2 border-[#FFDAB9] p-3 mb-2 text-[#D35400] bg-white" placeholder="E.g. Vegan, Gluten-Free, Nut-Free..." />
                        <div className="flex flex-wrap gap-2 justify-center">
                            <span className="px-3 py-1 rounded-lg bg-[#FF6F61] text-[#FFF8E7] text-xs font-semibold">Vegan</span>
                            <span className="px-3 py-1 rounded-lg bg-[#FF6F61] text-[#FFF8E7] text-xs font-semibold">Gluten-Free</span>
                            <span className="px-3 py-1 rounded-lg bg-[#FF6F61] text-[#FFF8E7] text-xs font-semibold">Nut-Free</span>
                            <span className="px-3 py-1 rounded-lg bg-[#FF6F61] text-[#FFF8E7] text-xs font-semibold">Dairy-Free</span>
                        </div>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-[#D35400]">3. Set Dietary Restrictions</h3>
                    <p className="mt-2 text-[#B35C00] text-sm">Choose dietary preferences, allergens, or cuisines to avoid. ChefAssist tailors recipes to your needs!</p>
                </div>
                <div className="flow-card  transform translate-x-16 transition-all duration-700 bg-[#FFF8E7] rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
                    <div className="flex justify-between items-center w-full mb-4">
                        <span className="font-semibold text-lg text-[#FF6F61]">Re-Generate</span>
                        <button className="text-[#FF6F61] font-bold text-lg">⟳</button>
                    </div>
                    <img src="../Images/image3.jpg" alt="Dish" className="rounded-2xl w-32 h-24 object-cover mx-auto mb-3 shadow" />
                    <h3 className="mt-6 text-lg font-bold text-[#D35400]">4. Cook, Save, or Share</h3>
                    <p className="mt-2 text-[#B35C00] text-sm">Get cooking, save your AI recipe, or share it with friends and family at the touch of a button!</p>
                </div>
            </div>
        </section>
    )
}

export default FlowUsage