import { DivideCircleIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const profilePopUp = ({ setLogin, setSigninPopUp }) => {
    const navigate = useNavigate();
    const logout = () => {
        setSigninPopUp(false);
        setLogin(false);
    }
    return (
        <>
            <div
                id="profile-dropdown"
                className=" absolute right-0 top-full mt-1 w-64 bg-[#23201d] rounded-xl shadow-lg z-50 border border-[#FFDAB9] p-3"
            >
                <div className="flex flex-col items-center gap-2 mb-3">
                    <div
                        className="w-12 h-12 rounded-full border-2 border-[#FF6F61] flex items-center justify-center text-2xl bg-[#FFDAB9]"
                        style={{ color: '#ff6f61' }}
                    >
                        🍳
                    </div>
                    <div className="font-bold text-base" style={{ color: '#ffdab9' }}>
                        ChefAssist User
                    </div>
                    <div className="text-xs opacity-80 mb-1" style={{ color: '#fff' }}>
                        user@email.com
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-2">
                    <div
                        onClick={() => navigate("/profile")}
                        className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95 block"
                    >
                        View Public Profile
                    </div>
                    <div
                        onClick={() => navigate("/dashboard")}
                        className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95 block"
                    >
                        Dashboard
                    </div>
                    {/* <button className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95">
                        Community
                    </button> */}
                    <div
                        className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95 block"
                        onClick={() => navigate("/subscription")}
                    >
                        Subscriptions
                    </div>
                    <div className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95 block">
                        Appearance:  Light theme
                        {/* <button id="dark-mode-toggle" aria-label="Toggle dark mode" className="w-10 h-8 rounded-full bg-[#FFDAB9] border border-[#E5C6B0] shadow hover:bg-[#FF6F61] transition flex items-center justify-center">
                        <span id="dark-mode-icon" className="text-xl" style={{ color: "#D35400" }}>🌙</span>
                        </button> */}
                    </div>
                    <div className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95 block">
                        Language:  English
                    </div>
                    <div
                        className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95 block"
                        onClick={() => navigate("/settings")}
                    >
                        Settings
                    </div>
                    <button className="w-full text-center py-2.5 rounded-lg font-semibold text-sm bg-[#FF6F61] text-white transition-all duration-200 hover:bg-[#E65A4D] hover:shadow-md hover:scale-[1.02] active:scale-95"
                        onClick={() => navigate("/feedback")}>

                        Give Feedback
                    </button>
                </div>
                <div className="pt-1.5 border-t border-[#FFDAB9] mt-2">
                    <button
                        id="auth-action"
                        className="w-full text-center py-2.5 rounded-lg font-bold text-sm bg-[#3a291b] text-[#FFDAB9] transition-all duration-200 hover:bg-[#4a3a2b] hover:shadow-md hover:scale-[1.02] active:scale-95"
                        onClick={() => logout()}
                    >Logout </button>
                </div>
            </div>
        </>
    )
}

export default profilePopUp;