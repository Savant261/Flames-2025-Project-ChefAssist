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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserProvider, useUser } from "./store";
import useAuthValidation from "./hooks/useAuthValidation.js";
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

// App Content component that uses the UserContext
function AppContent() {
  const navigate = useNavigate();
  const { 
    userData, 
    isAuthenticated, 
    loading, 
    setUserData, 
    setLoading,
    checkAuth 
  } = useUser();
  
  // Use auth validation hook for periodic token checking
  useAuthValidation();
  
  const [isSidebarExpanded, setIsSideBarExpanded] = useState(false);
  const [theme, setTheme] = useState("light");
  const [popUp, setPopUp] = useState(false);
  const [signinPopUp, setSigninPopUp] = useState(false);
  
  // Handle theme updates from user data
  useEffect(() => {
    if (userData?.theme) {
      setTheme(userData.theme);
    }
  }, [userData]);

  // Close modals when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setPopUp(false);
      setSigninPopUp(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800 dark:border-gray-700/50">
      <Navbar
        setIsSideBarExpanded={setIsSideBarExpanded}
        theme={theme}
        setTheme={setTheme}
        popUp={popUp}
        setPopUp={setPopUp}
        signinPopUp={signinPopUp}
        setSigninPopUp={setSigninPopUp}
      />
      <div className="flex flex-1 overflow-hidden">
        <SideBar isSidebarExpanded={isSidebarExpanded} />
        <div className="flex-1 relative">
          <main className="absolute inset-0 overflow-y-auto">
            <StyledToastContainer theme={theme} />
            <Routes>
              {/* Public route - Home page */}
              <Route path="/" element={
                <ProtectedRoute requireAuth={false}>
                  <Home />
                </ProtectedRoute>
              } />
              
              {/* Protected routes - require authentication */}
              <Route path="/ai" element={
                <ProtectedRoute>
                  <Ai />
                </ProtectedRoute>
              } />
              <Route path="/ai/:chatId" element={
                <ProtectedRoute>
                  <Ai />
                </ProtectedRoute>
              } />
              <Route path="/explore" element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              } />
              <Route path="/profile/:userName" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/editProfile" element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />
              <Route path="/subscription" element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              } />
              <Route path="/recipe" element={
                <ProtectedRoute>
                  <Recipe />
                </ProtectedRoute>
              } />
              <Route path="/recipe/:recipeId" element={
                <ProtectedRoute>
                  <Recipe />
                </ProtectedRoute>
              } />
              <Route path="/recipe/create" element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              } />
              <Route path="/recipe/create/:recipeId" element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              } />
              <Route path="/recipe/edit/:recipeId" element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              } />
              <Route path="/search" element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              } />
              <Route path="/trending" element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              } />
              <Route path="/myFeed" element={
                <ProtectedRoute>
                  <MyFeed />
                </ProtectedRoute>
              } />
              <Route path="/savedRecipes" element={
                <ProtectedRoute>
                  <SavedRecipes />
                </ProtectedRoute>
              } />
              <Route path="/settings/*" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/trending/*" element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

// Main App component that provides the UserContext
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
