const HeroSection = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-16 flex-1">
            <div className="flex-[1.1] flex flex-col gap-8 max-w-3xl w-full">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg" style={{ color: '#D35400', letterSpacing: '-1px' }}>
                    Create Delicious<br />
                    <span style={{ color: "#FF6F61" }}>Recipes in Seconds!</span>
                </h1>
                <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#B35C00' }}>
                    Enter your ingredients, choose your preferences, and let our AI create the perfect recipe for you.
                </p>
                <form className="flex gap-2 mt-4 relative">
                    <input id="typing-input" type="text" placeholder="Enter your Recipes name, Ingredients..." className="flex-1 px-4 py-3 rounded-full focus:outline-none text-base shadow-md border-2 border-[#FF6F61] bg-[#FFF8E7] text-[#D35400] font-medium" autoComplete="off" />
                    <button type="submit" className="hero-btn px-6 py-3 rounded-full font-bold text-base transition shadow-md">Get Started</button>
                </form>

                <div className="mt-6 bg-[#4A5F4D]/20 rounded-xl p-4">
                    <div className="font-semibold mb-2" style={{ color: '#F5F1E9' }}>Example Prompts</div>
                    <div className="flex flex-wrap gap-2">
                        <span className="example-prompt px-3 py-1 rounded-lg text-sm">Eggs, spinach, and mushrooms</span>
                        <span className="example-prompt px-3 py-1 rounded-lg text-sm">I have tomatoes, onions, and pasta.</span>
                        <span className="example-prompt px-3 py-1 rounded-lg text-sm">Healthy recipe with lentils, kale, and carrots.</span>
                        <span className="example-prompt px-3 py-1 rounded-lg text-sm">Vegan recipe with quinoa, chickpeas, and bell peppers.</span>
                    </div>
                </div>
            </div>
            <div className="flex-[0.9] flex flex-col md:justify-center items-center w-full h-full">
                <div id="hero-carousel" className="relative w-full max-w-2xl h-[38rem] md:h-[44rem] flex items-center justify-center overflow-hidden rounded-3xl shadow-xl bg-white">
                    <div className={`carousel-track w-full h-full flex transition-transform duration-700 ease-in-out`}>
                        
                        <div src="images/food1.jpg"  className=" bg-[url('/Images/food1.jpg')] bg-cover carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                        <img src="images/food2.jpg" alt="Delicious Food 2" className="carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                        <img src="images/food5.jpg" alt="Delicious Food 5" className="carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                        <img src="images/food3.webp" alt="Delicious Food 3" className="carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                        <img src="images/food4.webp" alt="Delicious Food 4" className="carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                        <img src="images/food6.jpeg" alt="Delicious Food 6" className="carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                        <img src="images/food4.jpg" alt="Delicious Food 2b" className="carousel-image object-cover w-full h-full flex-shrink-0 rounded-3xl" />
                    </div>
                    {/* <button id="carousel-prev" className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#FFDAB9] text-[#D35400] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#FF6F61] hover:text-white transition z-20"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg></button>
                    <button id="carousel-next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFDAB9] text-[#D35400] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#FF6F61] hover:text-white transition z-20"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
                    <div id="carousel-dots" className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"></div> */}
                </div>
            </div>
        </section>
    )
}

export default HeroSection