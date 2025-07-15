
const Testimonials = () => {
    return (
        <section id="testimonials" className="max-w-7xl mx-auto mb-16 px-6 py-16 bg-[#FEF2D7] dark:bg-[#FEF2D7] rounded-[2.5rem] shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#D35400", fontfamily: "Poppins,Arial,sans-serif" }}>What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="testimonial-card  translate-y-8 transition-all duration-700 rounded-2xl bg-white p-8 shadow-md border border-[#E5C6B0] flex flex-col items-center text-center">
                    <img src="./Images/priya.webp" alt="Priya Sharma" className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6F61] mb-4 bg-[#FFDAB9] shadow" />
                    <div className="font-bold text-lg text-[#2C2C2C]">Priya Sharma</div>
                    <div className="text-[#6B4F3A] text-base mb-3">“ChefAssist made dinner so much easier! I love how quick and healthy the recipes are.”</div>
                    <div className="flex gap-1 justify-center mb-1">
                        <span className="text-[#FF6F61]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    </div>
                </div>
                <div className="testimonial-card  translate-y-8 transition-all duration-700 rounded-2xl bg-white p-8 shadow-md border border-[#E5C6B0] flex flex-col items-center text-center">
                    <img src="./Images/alex.webp" alt="Alex Johnson" className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6F61] mb-4 bg-[#FFDAB9] shadow" />
                    <div className="font-bold text-lg text-[#2C2C2C]">Alex Johnson</div>
                    <div className="text-[#6B4F3A] text-base mb-3">“The step-by-step flow is so intuitive. ChefAI is my new kitchen buddy!”</div>
                    <div className="flex gap-1 justify-center mb-1">
                        <span className="text-[#FF6F61]">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    </div>
                </div>
                <div className="testimonial-card translate-y-8 transition-all duration-700 rounded-2xl bg-white p-8 shadow-md border border-[#E5C6B0] flex flex-col items-center text-center">
                    <img src="./Images/meera.webp" alt="Meera Patel" className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6F61] mb-4 bg-[#FFDAB9] shadow" />
                    <div className="font-bold text-lg text-[#2C2C2C]">Meera Patel</div>
                    <div className="text-[#6B4F3A] text-base mb-3">“I never run out of ideas now. ChefAI is a lifesaver for busy weeks!”</div>
                    <div className="flex gap-1 justify-center mb-1">
                        <span className="text-[#FF6F61]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials