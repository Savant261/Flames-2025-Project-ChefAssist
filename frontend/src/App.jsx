import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
// The direct CSS import is removed as it's not supported in this environment.
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import Ai from "./pages/Ai.jsx";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Explore from "./pages/Explore.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Subscription from "./pages/Subscription.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import Feedback from "./pages/Feedback.jsx";
import Recipe from "./pages/Recipe.jsx";
import SideBar from "./components/SideBar.jsx";
import Search from "./pages/Search.jsx";
import Trending from "./pages/Trending.jsx";
import MyFeed from "./pages/MyFeed.jsx";
import SavedRecipes from "./pages/SavedRecipes.jsx";
import Settings from "./pages/Settings.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import api from "./api/axiosInstance.js";

const StyledToastContainer = ({theme}) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme} // We will control dark mode with CSS
      style={{
        // Using your custom color variables
        "--toastify-color-light": "var(--color-chef-cream)",
        "--toastify-color-dark": "#1F2937", // A dark gray for the container
        "--toastify-text-color-light": "var(--color-chef-orange-dark)",
        "--toastify-text-color-dark": "var(--color-chef-peach)",

        // Progress bar color
        "--toastify-color-progress-light": "var(--color-chef-orange)",
        "--toastify-color-progress-dark": "var(--color-chef-orange-light)",

        // Icon colors for different types
        "--toastify-color-success": "#28a745",
        "--toastify-color-warning": "#F59E0B", // Using your orange-light
        "--toastify-color-error": "#dc3545",
        "--toastify-color-info": "#3B82F6",

        "--toastify-font-family": "Poppins, Arial, sans-serif",
      }}
    />
  );
};

function App() {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSideBarExpanded] = useState(false);
  const [login, setLogin] = useState(false);
  const [theme, setTheme] = useState("light");
  const [userData, setUserData] = useState({
    avatar: "",
    username: "",
    email: "",
  });
  const [popUp, setPopUp] = useState(false);
  const [signinPopUp, setSigninPopUp] = useState(false);
  const [oAuth, setOAuth] = useState(false);
  const handleSucessAuth = (data) => {
    console.log("sucessfully signin or signup");
    toast.success("Logged in successfully!");
    setUserData(data);
    setLogin(true);
    setPopUp(false);
    setSigninPopUp(false);
    setOAuth(true);
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  useEffect(() => {
    const check = async () => {
      try {
        const response = await api.get("/auth/check");
        if (response.status==200) {
          setLogin(true);
          setUserData(response.data);
          setLogin(true);
          setPopUp(false);
          setSigninPopUp(false);
          if (window.location.pathname=='/') {
            navigate("/explore");
          }
        } else {
          setLogin(false);
          navigate("/");
        }
      } catch (error) {
        console.log("Error in check Function in app.jsx", error);
      }
    };
    check();
    console.log("check function");
  }, []);
  useEffect(() => {
    if (oAuth) {
      navigate("/explore");
    }
    setOAuth(false);
  }, [oAuth]);
  //  const showSuccessToast = () => toast.success("Recipe saved successfully!");
  //   const showErrorToast = () => toast.error("Failed to upload image. Please try again.");
  //   const showInfoToast = () => toast.info("Your profile has been updated.");
  //   const showWarningToast = () => toast.warning("Your session is about to expire.");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        setIsSideBarExpanded={setIsSideBarExpanded}
        login={login}
        setLogin={setLogin}
        theme={theme}
        setTheme={setTheme}
        popUp={popUp}
        setPopUp={setPopUp}
        userData={userData}
        setUserData={setUserData}
        handleSucessAuth={handleSucessAuth}
        signinPopUp={signinPopUp}
        setSigninPopUp={setSigninPopUp}
      />
      <div className="flex flex-1 overflow-hidden">
        <SideBar isSidebarExpanded={isSidebarExpanded} login={login} />
        <div className="flex-1 relative">
          <main className="absolute inset-0 overflow-y-auto">
            <StyledToastContainer theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai" element={<Ai />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/dashboard/*" element={<DashBoard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/recipe" element={<Recipe />} />
              <Route path="/recipe/create" element={<CreateRecipe />} />
              <Route path="/recipe/edit/:recipeId" element={<CreateRecipe />} />
              <Route path="/search" element={<Search />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/myFeed" element={<MyFeed />} />
              <Route path="/savedRecipes" element={<SavedRecipes />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="/trending/*" element={<Trending />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
