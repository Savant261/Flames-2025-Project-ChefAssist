import React from 'react'

const FeaturesChefai = () => {
    return (
        <section id="features-chefai" className="relative max-w-7xl mx-auto mt-12 mb-16 px-12 py-20 bg-[#FFF8E7] rounded-[2.5rem] shadow-lg">
            <div className="absolute top-6 right-8 z-10">
                <span className="inline-flex items-center justify-center rounded-full bg-[#FFDAB9] border-2 border-[#FF6F61] shadow-lg" style={{ width: "60px", height: "60px" }}>
                    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="24" cy="16" rx="13" ry="9" fill="#FFF8E7" stroke="#FF6F61" strokeWidth="2" />
                        <ellipse cx="14" cy="24" rx="4" ry="3" fill="#FFF8E7" stroke="#FF6F61" strokeWidth="2" />
                        <ellipse cx="34" cy="24" rx="4" ry="3" fill="#FFF8E7" stroke="#FF6F61" strokeWidth="2" />
                        <rect x="18" y="24" width="12" height="9" rx="4" fill="#FF6F61" stroke="#D35400" strokeWidth="2" />
                        <rect x="18" y="33" width="12" height="4" rx="2" fill="#D35400" />
                    </svg>
                </span>
            </div>
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: "#2C2C2C", fontfamily: "Poppins,Arial,sans-serif" }}>Features of ChefAI</h2>
                <p className="text-lg text-[#6B4F3A] font-medium" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>Strong features to assist you in creating dishes that are both healthy and tasty.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="features-card rounded-2xl bg-white p-7 shadow-md border border-[#E5C6B0] flex flex-col gap-3 hover:shadow-lg transition-all" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
                    <span className="features-icon inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAB9] text-[#D35400] mb-2 animate-jump"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M7 10c0-3.314 2.686-6 6-6s6 2.686 6 6c0 2.21-1.79 4-4 4h-4c-2.21 0-4-1.79-4-4zm6 8h-2v-2h2v2zm-4 0h2v2H9v-2zm8 0h-2v2h2v-2z" fill="#D35400" /></svg></span>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Dynamic Recipe Creation</h3>
                    <p className="text-[#6B4F3A] text-base">Our AI instantly generates personalized recipes based on the ingredients you have at hand. Whether it's a single ingredient or a pantry full, you'll get a delicious meal idea within seconds!</p>
                </div>
                <div className="features-card rounded-2xl bg-white p-7 shadow-md border border-[#E5C6B0] flex flex-col gap-3 hover:shadow-lg transition-all" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
                    <span className="features-icon inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAB9] text-[#D35400] mb-2"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2a6 6 0 016 6c0 3.314-2.686 6-6 6s-6-2.686-6-6a6 6 0 016-6zm0 16c-4.418 0-8-2.239-8-5v3c0 2.761 3.582 5 8 5s8-2.239 8-5v-3c0 2.761-3.582 5-8 5z" fill="#D35400" /></svg></span>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Personalized to Your Dietary Needs</h3>
                    <p className="text-[#6B4F3A] text-base">Choose recipes that fit your lifestyle. Whether you're vegan, vegetarian, gluten-free, keto, or looking for low-carb options, our AI accommodates your dietary preferences with ease.</p>
                </div>
                <div className="features-card rounded-2xl bg-white p-7 shadow-md border border-[#E5C6B0] flex flex-col gap-3 hover:shadow-lg transition-all" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
                    <span className="features-icon inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAB9] text-[#D35400] mb-2"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2zm0 2v2H7V5h10zm0 4v10H7V9h10z" fill="#D35400" /></svg></span>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Accurate Nutritional Breakdown</h3>
                    <p className="text-[#6B4F3A] text-base">Each recipe comes with a detailed nutritional profile. From calories to macronutrients, know exactly what's going into your meals for better meal planning and health tracking.</p>
                </div>
                <div className="features-card rounded-2xl bg-white p-7 shadow-md border border-[#E5C6B0] flex flex-col gap-3 hover:shadow-lg transition-all" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
                    <span className="features-icon inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAB9] text-[#D35400] mb-2"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M21 6.5a2.5 2.5 0 00-5 0v1a2.5 2.5 0 005 0v-1zm-5 9.5a2.5 2.5 0 01-5 0v-1a2.5 2.5 0 015 0v1zM6 6.5a2.5 2.5 0 00-5 0v1a2.5 2.5 0 005 0v-1zm8 6.5a2.5 2.5 0 01-5 0v-1a2.5 2.5 0 015 0v1z" fill="#D35400" /></svg></span>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Plan Meals and Shop Efficiently</h3>
                    <p className="text-[#6B4F3A] text-base">Create weekly meal plans or use our AI to generate a full shopping list for your recipes. Save time at the store and always have what you need to cook amazing meals.</p>
                </div>
                <div className="features-card rounded-2xl bg-white p-7 shadow-md border border-[#E5C6B0] flex flex-col gap-3 hover:shadow-lg transition-all" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
                    <span className="features-icon inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAB9] text-[#D35400] mb-2"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M20 17.17V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.83A3 3 0 016.17 16H17.83A3 3 0 0120 17.17zm-8-1.17a4 4 0 100-8 4 4 0 000 8z" fill="#D35400" /></svg></span>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Save Your Favorites & Share with Friends</h3>
                    <p className="text-[#6B4F3A] text-base">Easily save your favorite recipes for future use or share them with family and friends via social media, email, or text.</p>
                </div>
                <div className="features-card rounded-2xl bg-white p-7 shadow-md border border-[#E5C6B0] flex flex-col gap-3 hover:shadow-lg transition-all" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
                    <span className="features-icon inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAB9] text-[#D35400] mb-2"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-5.514-4.486-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#D35400" /></svg></span>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Explore Global Flavors</h3>
                    <p className="text-[#6B4F3A] text-base">From Italian pasta to Mexican tacos and Indian curries, our AI brings a world of cuisines to your kitchen. Discover new flavors and cooking techniques every time you generate a recipe.</p>
                </div>
            </div>
        </section>
    )
}

export default FeaturesChefai