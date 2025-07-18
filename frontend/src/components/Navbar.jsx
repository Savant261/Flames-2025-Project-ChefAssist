import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePopUp from './home/ProfilePopUp.jsx';
import Signin from './Signin.jsx';
import { Bell, PlusCircle, Search, Menu } from 'lucide-react';
import SideBar from './SideBar.jsx';

const Navbar = ({login,setLogin,setIsSideBarExpanded}) => {
    const navigate = useNavigate();

    const [popUp, setPopUp] = useState(false);
    const [signinPopUp, setSigninPopUp] = useState(false);
    const [what, setWhat] = useState("SignIn");

    const homeFunction = () => {
        if (login) {
            navigate("/explore");
        } else {
            navigate("/");
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.search.value;
        if (query) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 bg-[#FFF8E7] shadow-md sm:px-6" style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
            <div className="flex items-center gap-2">
                {login && (
                    <button className="p-2 rounded-full hover:bg-[#FFDAB9]/50" onClick={() => setIsSideBarExpanded((prev) => !prev)}>
                        <Menu className="w-6 h-6 text-[#D35400]" />
                    </button>
                )}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => homeFunction()}>
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-[#FF6F61] rounded-full shadow-md">
                        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="24" cy="18" rx="12" ry="8" fill="#FFF8E7" stroke="#D35400" strokeWidth="2" />
                            <ellipse cx="14" cy="26" rx="4" ry="3" fill="#FFF8E7" stroke="#D35400" strokeWidth="2" />
                            <ellipse cx="34" cy="26" rx="4" ry="3" fill="#FFF8E7" stroke="#D35400" strokeWidth="2" />
                            <rect x="18" y="26" width="12" height="8" rx="4" fill="#D35400" stroke="#D35400" strokeWidth="2" />
                            <rect x="18" y="34" width="12" height="4" rx="2" fill="#FF6F61" />
                        </svg>
                    </span>
                    <span className="hidden text-2xl font-extrabold tracking-tight sm:inline-block" style={{ color: "#D35400" }}>ChefAssist</span>
                </div>
            </div>

            {/* Center Section: YouTube-style Search Bar */}
            <div className="flex-1 hidden md:flex justify-center px-4">
                <form onSubmit={handleSearch} className="flex w-full max-w-lg">
                    <input
                        id="search"
                        type="text"
                        placeholder="Search for recipes..."
                        className="w-full px-5 py-2 text-base bg-white border border-r-0 border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-[#FF6F61] text-[#D35400] placeholder-gray-400"
                        autoComplete="off"
                    />
                    <button type="submit" className="flex items-center justify-center px-4 bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200">
                        <Search className="w-5 h-5 text-gray-600" />
                    </button>

                </form>
            </div>


            {/* Right Section: Actions and Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Logged In State */}
                {login && (
                    <>
                        {/* Search icon for mobile view */}
                        <button className="p-2 rounded-full md:hidden hover:bg-[#FFDAB9]/50">
                            <Search className="w-6 h-6 text-[#D35400]" />
                        </button>
                        <button className="hidden px-4 py-2 text-sm font-semibold text-white transition rounded-full sm:block bg-[#FF6F61] hover:bg-[#E55B4D]" onClick={() => navigate("/ai")}>
                            Cook With AI ✨
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#FFDAB9]/50">
                            <PlusCircle className="w-6 h-6 text-[#D35400]" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#FFDAB9]/50">
                            <Bell className="w-6 h-6 text-[#D35400]" />
                        </button>
                        <div className="relative">
                            <div id="user-profile-preview" className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-[#FFDAB9] border border-[#E5C6B0] shadow" onClick={() => setPopUp((prev) => !prev)}>
                                <svg width="26" height="26" fill="#D35400" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" /></svg>
                            </div>
                            {popUp && (<ProfilePopUp setSigninPopUp={setSigninPopUp} setLogin={setLogin} />)}
                        </div>
                    </>
                )}

                {/* Logged Out State */}
                {!login && (
                    <>
                        <button className="hidden px-4 py-2 text-sm font-semibold text-white transition rounded-full sm:block bg-[#FF6F61] hover:bg-[#E55B4D]" onClick={() => navigate("/ai")}>
                            Cook With AI ✨
                        </button>
                        <button className="hidden px-4 py-2 text-sm font-semibold text-gray-700 transition rounded-full sm:block hover:bg-[#FFDAB9]/50" onClick={() => navigate("/explore")}>
                            Explore
                        </button>
                        <button className="px-4 py-2 text-sm font-semibold text-white transition rounded-full bg-[#FF6F61] hover:bg-[#E55B4D]" onClick={() => setSigninPopUp(true)}>
                            Sign In
                        </button>
                    </>
                )}
            </div>

            {/* Sign In/Up Modal */}
            {signinPopUp && (<Signin setSigninPopUp={setSigninPopUp} what={what} setWhat={setWhat} setLogin={setLogin} />)}
        </nav>
    );
};

export default Navbar;
