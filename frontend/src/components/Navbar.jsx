import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePopUp from './home/profilePopUp.jsx';
import Signin from './Signin.jsx';
const Navbar = () => {
    const navigate = useNavigate();
    const [popUp, setPopUp] = useState(false);
    const [signinPopUp, setSigninPopUp] = useState(false);
    const [what, setWhat] = useState("SignIn");
    return (
        <nav className="navbar flex items-center justify-between px-8 py-4 bg-[#FFF8E7] shadow-md rounded-b-3xl sticky top-0 z-50" style={{ fontfamily: "Poppins,Arial,sans-serif" }}>
            <div className="flex items-center gap-4 min-w-0">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full border-2 border-[#FF6F61] bg-white shadow-md mr-2">
                    {/* <!-- Chef hat SVG icon --> */}
                    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="24" cy="18" rx="12" ry="8" fill="#FFF8E7" stroke="#D35400" strokeWidth="2" />
                        <ellipse cx="14" cy="26" rx="4" ry="3" fill="#FFF8E7" stroke="#D35400" strokeWidth="2" />
                        <ellipse cx="34" cy="26" rx="4" ry="3" fill="#FFF8E7" stroke="#D35400" strokeWidth="2" />
                        <rect x="18" y="26" width="12" height="8" rx="4" fill="#D35400" stroke="#D35400" strokeWidth="2" />
                        <rect x="18" y="34" width="12" height="4" rx="2" fill="#FF6F61" />
                    </svg>
                </span>
                <span className="text-2xl font-extrabold tracking-tight whitespace-nowrap" style={{ color: "#D35400" }}>ChefAssist</span>
            </div>
            <div className="flex-1 flex items-center gap-6 justify-start md:justify-center min-w-0 overflow-x-auto">
                <div className="nav-link text-lg font-medium text-[#2C2C2C] hover:text-[#D35400] transition whitespace-nowrap" onClick={() => navigate("/")}>Home</div>
                <div className="nav-link text-lg font-medium text-[#2C2C2C] hover:text-[#D35400] transition whitespace-nowrap" onClick={() => navigate("/ai")}>Cook With Ai</div>
                <div className="nav-link text-lg font-medium text-[#2C2C2C] hover:text-[#D35400] transition whitespace-nowrap" onClick={() => navigate("/explore")}>Explore Recipes</div>
                <div className="nav-link text-lg font-medium text-[#2C2C2C] hover:text-[#D35400] transition whitespace-nowrap" onClick={() => navigate("/favorite")}>Favorite Recipe</div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
                <button id="dark-mode-toggle" aria-label="Toggle dark mode" className="w-10 h-10 rounded-full bg-[#FFDAB9] border border-[#E5C6B0] shadow hover:bg-[#FF6F61] transition flex items-center justify-center">
                    <span id="dark-mode-icon" className="text-xl" style={{ color: "#D35400" }}>🌙</span>
                </button>
                <div className="nav-link text-lg font-medium text-[#2C2C2C] hover:text-[#D35400] transition whitespace-nowrap"  onClick={()=> setSigninPopUp((prev)=> !prev)}>SignIn/SignUp</div>
                {signinPopUp && (<Signin setSigninPopUp={setSigninPopUp} what={what} setWhat={setWhat}/>)}
                <div id="user-profile-preview" className="w-10 h-10 rounded-full bg-[#FFDAB9] border border-[#E5C6B0] flex items-center justify-center shadow cursor-pointer" onClick={() => setPopUp((prev) => !prev)}>
                    <svg width="26" height="26" fill="#D35400" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" /></svg>
                    {popUp && (<ProfilePopUp/>)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar