const HeroSection = () => {
    return (
        <section className="w-full min-h-[80vh] bg-[#FFE6C7] flex flex-col md:flex-row justify-between items-center px-12 py-14 gap-14 md:gap-20">
            {/* Left: Text & Form */}
            <div className="flex-[1.1] flex flex-col gap-6 max-w-2xl w-full">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight" style={{ color: '#D35400', letterSpacing: '-1px' }}>
                    Create Delicious<br />
                    <span className="block text-[#FF6F61] drop-shadow-md">Recipes in Seconds!</span>
                </h1>
                <p className="text-lg md:text-xl font-semibold mb-2 text-[#B35C00]">
                    Enter your ingredients, choose your preferences, and let our AI create the perfect recipe for you.
                </p>
                <form className="flex gap-2 mt-6">
                    <input id="typing-input" type="text" placeholder="Egg" className="flex-1 px-6 py-4 rounded-full border border-[#FF6F61] text-base bg-white text-[#D35400] font-medium focus:outline-none" autoComplete="off" />
                    <button type="submit" className="px-8 py-4 rounded-full font-bold text-lg bg-[#FF6F61] text-white hover:bg-[#ff8c7a] transition">Get Started</button>
                </form>

                <div className="mt-8 bg-[#D3B89A] rounded-xl p-5">
                    <div className="font-bold text-base text-[#fff] mb-3">Example Prompts</div>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FFE6C7] text-[#FF6F61]">Eggs, spinach, and mushrooms</span>
                        <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FFE6C7] text-[#FF6F61]">I have tomatoes, onions, and pasta.</span>
                        <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FFE6C7] text-[#FF6F61]">Healthy recipe with lentils, kale, and carrots.</span>
                        <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FFE6C7] text-[#FF6F61]">Vegan recipe with quinoa, chickpeas, and bell peppers.</span>
                    </div>
                </div>
            </div>
            {/* Right: Static Image (Carousel placeholder) */}
            <div className="flex-[0.9] flex flex-col md:justify-center items-center w-full h-full">
                <div className="relative w-full max-w-xl h-[22rem] md:h-[25rem] flex items-center justify-center overflow-hidden rounded-3xl shadow-xl bg-[#FFE6C7]">
                    <img src="/Images/food1.jpg" alt="Delicious Indian Thali" className="object-cover w-full h-full rounded-3xl" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection
