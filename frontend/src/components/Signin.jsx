import React, { useEffect } from 'react'
import signin from "/Images/signin.jpg"
import { useNavigate } from 'react-router-dom'
const Signin = ({ setSigninPopUp, what, setWhat, setLogin }) => {
    const navigate = useNavigate();
    // useEffect(()=>{},[what,setWhat])
    const loginFun = () => {
        setLogin(true);
        setSigninPopUp(false);
        navigate("/explore")
    }
    return (
        <div
            id="auth-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm "
        >
            <div
                className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-2xl w-full relative"
            >
                <div
                    id="auth-form-container"
                    className="flex-1 p-8 flex flex-col justify-center"
                >
                    {what == "SignIn" && (<> <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-extrabold tracking-tight" style={{ color: "#D35400" }}>ChefAssist</span>
                    </div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "#D35400" }}>Welcome Back</h2>
                        <p className="text-[#6B4F3A] mb-6">Sign in with your email, username, and password.</p>
                        <form id="signin-form" className="flex flex-col gap-4">
                            <input type="email" placeholder="Email Address" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required />
                            <input type="text" placeholder="Username" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required />
                            <div className="relative">
                                <input type="password" placeholder="Password" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] w-full" required />
                                <a href="#" className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#FF6F61] hover:underline">Forgot?</a>
                            </div>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" id="remember-me" className="accent-[#FF6F61] mr-2" />
                                <label htmlFor="remember-me" className="text-[#B35C00] text-sm">Remember me</label>
                            </div>
                            <button type="submit" className="bg-[#D35400] text-white font-bold rounded-lg py-3" onClick={() => loginFun()}>Sign In</button>
                            <button type="button" className="flex items-center justify-center gap-2 border border-[#FFDAB9] bg-white text-[#D35400] font-semibold rounded-lg py-3" id="google-signin-btn" onClick={() => loginFun()}>
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" /> Sign in with Google
                            </button>
                            <div className="text-center text-sm mt-2 text-[#6B4F3A]">Don't have an account? <span href="#" id="switch-to-signup" className="text-[#FF6F61] font-bold" onClick={() => setWhat("SignUp")}>Sign Up</span></div>
                        </form></>)}
                    {what == "SignUp" && (<>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-extrabold tracking-tight" style={{ color: "#D35400" }}>ChefAssist</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "#D35400" }}>Create Your Account</h2>
                        <p className="text-[#6B4F3A] mb-6">Sign up with your email, username, and password.</p>
                        <form id="signup-form" className="flex flex-col gap-4">
                            <input type="email" placeholder="Email Address" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required />
                            <input type="text" placeholder="Username" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required />
                            <input type="password" placeholder="Password" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required />
                            <input type="password" placeholder="Confirm Password" className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required />
                            <button type="submit" className="bg-[#D35400] text-white font-bold rounded-lg py-3" onClick={() => loginFun()}>Sign Up</button>
                            <button type="button" className="flex items-center justify-center gap-2 border border-[#FFDAB9] bg-white text-[#D35400] font-semibold rounded-lg py-3" id="google-signup-btn" onClick={() => loginFun()}>
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" /> Sign up with Google
                            </button>
                            <div className="text-center text-sm mt-2 text-[#6B4F3A]" >Already have an account? <span href="#" id="switch-to-signin" className="text-[#FF6F61] font-bold" onClick={() => setWhat("SignIn")}>Sign In</span></div>
                        </form></>)}

                </div>
                <div
                    className="hidden md:block flex-1 bg-cover bg-center"
                    style={{ backgroundImage: `url(${signin})`, minHeight: "28rem" }}
                ></div>
                <button
                    className="absolute top-4 right-6 text-3xl text-[#FF6F61] hover:text-[#D35400]"
                    id="close-auth-modal"
                    onClick={() => setSigninPopUp((prev) => !prev)}
                >
                    x
                </button>
            </div>
        </div>
    )
}

export default Signin