import React, { useEffect, useState } from "react";
import signin from "/Images/signin.jpg";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";

const Signin = ({ setSigninPopUp, what, setWhat, setLogin }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const onChangeLoginHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const onChangeSignupHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signin", loginData);
      console.log(response);
      setSigninPopUp(false);
      navigate("/explore");
    } catch (error) {
      console.log("Error in submitLogin", error);
    }
  };
  const submitSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", signupData);
      console.log(response);
      setSigninPopUp(false);
      navigate("/explore");
    } catch (error) {
      console.log("Error in submitSiginup", error);
    }
  };
  useEffect(() => {
    console.log(loginData, signupData);
  }, [loginData, signupData]);
  return (
    <div
      id="auth-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm "
    >
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-2xl w-full relative">
        <div
          id="auth-form-container"
          className="flex-1 p-8 flex flex-col justify-center"
        >
          {what == "SignIn" && (
            <>
              {" "}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: "#D35400" }}
                >
                  ChefAssist
                </span>
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "#D35400" }}
              >
                Welcome Back
              </h2>
              <p className="text-[#6B4F3A] mb-6">
                Sign in with your email, username, and password.
              </p>
              <form id="signin-form" className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                  name="email"
                  onChange={(e) => onChangeLoginHandler(e)}
                  value={loginData.email}
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                  name="username"
                  onChange={(e) => onChangeLoginHandler(e)}
                  value={loginData.username}
                  required
                />
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] w-full"
                    name="password"
                    onChange={(e) => onChangeLoginHandler(e)}
                    value={loginData.password}
                    required
                  />
                  <a
                    href="#"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#FF6F61] hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="accent-[#FF6F61] mr-2"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-[#B35C00] text-sm"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#D35400] text-white font-bold rounded-lg py-3"
                  onClick={(e) => submitLogin(e)}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-[#FFDAB9] bg-white text-[#D35400] font-semibold rounded-lg py-3"
                  id="google-signin-btn"
                  onClick={() => loginFun()}
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />{" "}
                  Sign in with Google
                </button>
                <div className="text-center text-sm mt-2 text-[#6B4F3A]">
                  Don't have an account?{" "}
                  <span
                    href="#"
                    id="switch-to-signup"
                    className="text-[#FF6F61] font-bold"
                    onClick={() => setWhat("SignUp")}
                  >
                    Sign Up
                  </span>
                </div>
              </form>
            </>
          )}
          {what == "SignUp" && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: "#D35400" }}
                >
                  ChefAssist
                </span>
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "#D35400" }}
              >
                Create Your Account
              </h2>
              <p className="text-[#6B4F3A] mb-6">
                Sign up with your email, username, and password.
              </p>
              <form id="signup-form" className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                  name="email"
                  onChange={(e) => onChangeSignupHandler(e)}
                  value={signupData.email}
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                  name="username"
                  onChange={(e) => onChangeSignupHandler(e)}
                  value={signupData.username}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                  name="password"
                  onChange={(e) => onChangeSignupHandler(e)}
                  value={signupData.password}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                  name="confirmPassword"
                  onChange={(e) => onChangeSignupHandler(e)}
                  value={signupData.confirmPassword}
                  required
                />
                <button
                  type="submit"
                  className="bg-[#D35400] text-white font-bold rounded-lg py-3"
                  onClick={(e) => submitSignUp(e)}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-[#FFDAB9] bg-white text-[#D35400] font-semibold rounded-lg py-3"
                  id="google-signup-btn"
                  onClick={() => loginFun()}
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />{" "}
                  Sign up with Google
                </button>
                <div className="text-center text-sm mt-2 text-[#6B4F3A]">
                  Already have an account?{" "}
                  <span
                    href="#"
                    id="switch-to-signin"
                    className="text-[#FF6F61] font-bold"
                    onClick={() => setWhat("SignIn")}
                  >
                    Sign In
                  </span>
                </div>
              </form>
            </>
          )}
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
  );
};

export default Signin;
