import React from 'react'

const Footer = () => {
    return (
        <footer id="footer-chefai" className="z-50 w-full bg-[#FFDAB9] dark:bg-gray-900 border-t border-[#E5C6B0] dark:border-gray-800 py-12 px-6 md:px-16 mt-8 rounded-t-3xl shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
                {/* <!-- Logo & Description --> */}
                <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center rounded-full bg-[#FF6F61]/20 border-2 border-[#FF6F61] dark:border-orange-400 p-2" style={{ boxshadow: "0 2px 8px #FF6F6130" }}>
                            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="24" cy="16" rx="13" ry="9" fill="#FFF8E7" stroke="#FF6F61" strokeWidth="2" />
                                <ellipse cx="14" cy="24" rx="4" ry="3" fill="#FFF8E7" stroke="#FF6F61" strokeWidth="2" />
                                <ellipse cx="34" cy="24" rx="4" ry="3" fill="#FFF8E7" stroke="#FF6F61" strokeWidth="2" />
                                <rect x="18" y="24" width="12" height="9" rx="4" fill="#FF6F61" stroke="#D35400" strokeWidth="2" />
                                <rect x="18" y="33" width="12" height="4" rx="2" fill="#D35400" />
                            </svg>
                        </span>
                        <span className="text-2xl font-bold dark:text-orange-400" style={{ color: "#FF6F61", fontfamily: "Poppins,Arial,sans-serif" }}>ChefAI</span>
                    </div>
                    <p className="text-[#6B4F3A] dark:text-orange-200 text-base font-medium mb-4" style={{ color: "#FF6F61", fontfamily: "Poppins,Arial,sans-serif" }}>ChefAI helps you create delicious, healthy recipes in seconds using AI. Plan meals, get nutritional info, and explore cuisines—all in one elegant app.</p>
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="group"><span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-[#E5C6B0] dark:border-orange-400 text-[#FF6F61] dark:text-orange-400 shadow-md transition hover:bg-[#FF6F61] hover:text-white dark:hover:bg-orange-400 dark:hover:text-white animate-jump" style={{ fontsize: "1.3rem" }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm.75 3A2.25 2.25 0 0 0 6.25 7.25v9.5A2.25 2.25 0 0 0 8.75 19h6.5A2.25 2.25 0 0 0 17.75 16.75v-9.5A2.25 2.25 0 0 0 15.25 5h-6.5z" /></svg></span></a>
                        <a href="#" className="group"><span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-[#E5C6B0] dark:border-orange-400 text-[#FF6F61] dark:text-orange-400 shadow-md transition hover:bg-[#FF6F61] hover:text-white dark:hover:bg-orange-400 dark:hover:text-white animate-jump" style={{ fontsize: "1.3rem" }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.68.1 1A12.13 12.13 0 0 1 3.1 4.7a4.29 4.29 0 0 0 1.33 5.72c-.7-.02-1.36-.21-1.93-.53v.05c0 2.13 1.51 3.91 3.53 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.55 1.73 2.15 2.99 4.05 3.02A8.6 8.6 0 0 1 2 19.54 12.16 12.16 0 0 0 8.29 21.5c7.55 0 11.69-6.26 11.69-11.69 0-.18 0-.36-.01-.54A8.5 8.5 0 0 0 22.46 6z" /></svg></span></a>
                        <a href="#" className="group"><span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-[#E5C6B0] dark:border-orange-400 text-[#FF6F61] dark:text-orange-400 shadow-md transition hover:bg-[#FF6F61] hover:text-white dark:hover:bg-orange-400 dark:hover:text-white animate-jump" style={{ fontsize: "1.3rem" }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.22 8.93v-6.32h-2.47v-2.61h2.47v-2c0-2.44 1.49-3.78 3.68-3.78 1.07 0 2.19.19 2.19.19v2.41h-1.24c-1.22 0-1.6.76-1.6 1.54v1.64h2.72l-.44 2.61h-2.28v6.32c4.62-.86 8.22-4.52 8.22-8.93 0-5.5-4.46-9.96-9.96-9.96z" /></svg></span></a>
                        <a href="#" className="group"><span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-[#E5C6B0] dark:border-orange-400 text-[#FF6F61] dark:text-orange-400 shadow-md transition hover:bg-[#FF6F61] hover:text-white dark:hover:bg-orange-400 dark:hover:text-white animate-jump" style={{ fontsize: "1.3rem" }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-2.5 6c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-4.5 2c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm8 11c0 1.1-.9 2-2 2h-12c-1.1 0-2-.9-2-2v-7h16v7z" /></svg></span></a>
                    </div>
                </div>
                {/* <!-- Links --> */}
                <div className="flex-1 min-w-[160px] mb-8 md:mb-0">
                    <h4 className="font-bold text-lg mb-3 text-[#D35400] dark:text-orange-400">Quick Links</h4>
                    <ul className="flex flex-col gap-1 text-[#6B4F3A] dark:text-orange-200">
                        <li><a href="#flow-usage" className="hover:text-[#FF6F61] dark:hover:text-orange-400 transition" onclick="event.preventDefault();document.getElementById('flow-usage').scrollIntoView({behavior: 'smooth'});">Instructions</a></li>
                        <li><a href="#features-chefai" className="hover:text-[#FF6F61] dark:hover:text-orange-400 transition" onclick="event.preventDefault();document.getElementById('features-chefai').scrollIntoView({behavior: 'smooth'});">Features</a></li>
                        <li><a href="#footer-chefai" className="hover:text-[#FF6F61] dark:hover:text-orange-400 transition">Contact Us</a></li>
                    </ul>
                </div>
                {/* <!-- Contact Info --> */}
                <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
                    <h4 className="font-bold text-lg mb-3 text-[#D35400] dark:text-orange-400">Contact</h4>
                    <ul className="text-[#6B4F3A] dark:text-orange-200 text-base flex flex-col gap-2">
                        <li><span className="font-semibold">Email:</span> hello@chefai.com</li>
                        <li><span className="font-semibold">Phone:</span> +1 (800) 123-4567</li>
                        <li><span className="font-semibold">Address:</span> 123 Foodie Lane, Flavor Town, USA</li>
                    </ul>
                </div>
                {/* <!-- Newsletter --> */}
                <div className="flex-1 min-w-[220px]">
                    <h4 className="font-bold text-lg mb-3 text-[#D35400] dark:text-orange-400">Stay Updated</h4>
                    <form className="flex gap-2">
                        <input type="email" placeholder="Your email" className="px-4 py-2 rounded-lg border border-[#E5C6B0] dark:border-orange-400 bg-white dark:bg-gray-800 text-[#D35400] dark:text-orange-200 focus:outline-none focus:ring-2 focus:ring-[#FF6F61] dark:focus:ring-orange-400 flex-1" />
                        <button type="submit" className="px-5 py-2 rounded-lg bg-[#FF6F61] dark:bg-orange-400 text-white font-bold hover:bg-[#D35400] dark:hover:bg-orange-500 transition">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="w-full text-center mt-10 text-[#B35C00] dark:text-orange-400 text-sm opacity-70" style={{ color: "#FF6F61", fontfamily: "Poppins,Arial,sans-serif" }}>
                &copy; 2025 ChefAI. Designed with <span style={{ color: "#FF6F61" }}>&#10084;</span> by the ChefAI Team.
            </div>
        </footer>
    )
}

export default Footer