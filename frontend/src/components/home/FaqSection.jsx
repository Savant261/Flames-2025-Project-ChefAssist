const FaqSection = () => {
    return (
        <section id="faq-section" className="w-full flex justify-center my-16 px-4">
            <div className="faq-card w-full max-w-5xl rounded-[2.5rem] shadow-2xl bg-[#FFF8E7] border-2 border-[#FFDAB9] py-12 px-8 md:px-16 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center" style={{ color: "#D35400", fontfamily: "Poppins,Arial,sans-serif" }}>Frequently Asked Questions</h2>
                <div className="faq-list w-full divide-y divide-[#FFDAB9]">
                    <div className="faq-item py-5 cursor-pointer">
                        <div className="faq-question flex items-center justify-between text-lg md:text-xl font-semibold" style={{ color: "#D35400" }}>
                            How does ChefAI generate recipes?
                            <span className="faq-toggle text-2xl">+</span>
                        </div>
                        <div className="faq-answer text-[#6B4F3A] mt-2 hidden md:text-base text-sm">
                            ChefAI uses advanced AI models trained on thousands of recipes and culinary rules to generate creative, delicious, and personalized recipes based on your input.
                        </div>
                    </div>
                    <div className="faq-item py-5 cursor-pointer">
                        <div className="faq-question flex items-center justify-between text-lg md:text-xl font-semibold" style={{ color: "#D35400" }}>
                            Can I specify dietary restrictions or allergies?
                            <span className="faq-toggle text-2xl">+</span>
                        </div>
                        <div className="faq-answer text-[#6B4F3A] mt-2 hidden md:text-base text-sm">
                            Yes! You can enter dietary preferences and allergies, and ChefAI will ensure your recipes avoid those ingredients or cuisines.
                        </div>
                    </div>
                    <div className="faq-item py-5 cursor-pointer">
                        <div className="faq-question flex items-center justify-between text-lg md:text-xl font-semibold" style={{ color: "#D35400" }}>
                            Is ChefAI free to use?
                            <span className="faq-toggle text-2xl">+</span>
                        </div>
                        <div className="faq-answer text-[#6B4F3A] mt-2 hidden md:text-base text-sm">
                            ChefAI is free for basic use. Premium features such as advanced analytics, meal planning, and shopping lists may require a subscription in the future.
                        </div>
                    </div>
                    <div className="faq-item py-5 cursor-pointer">
                        <div className="faq-question flex items-center justify-between text-lg md:text-xl font-semibold" style={{ color: "#D35400" }}>
                            Can I save or share my recipes?
                            <span className="faq-toggle text-2xl">+</span>
                        </div>
                        <div className="faq-answer text-[#6B4F3A] mt-2 hidden md:text-base text-sm">
                            Absolutely! You can save your favorite recipes and share them via social media, email, or text.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqSection