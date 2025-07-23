import { useState, useEffect } from "react";
import Ai from "./pages/Ai.jsx";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
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
import api from "./api/axiosInstance.js"

function App() {
  const [isSidebarExpanded, setIsSideBarExpanded] = useState(false);
  const [login, setLogin] = useState(false);
  const [theme, setTheme] = useState("light");
  const [userData,setUserData] = useState({
    avatar:"",
    username:"",
    email:"",
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  useEffect(() => {
    const check = async ()=>{
      try {
        const response = await api.get("/auth/check");
        if(response){
          setLogin(true)
          setUserData(response.data)
        } 
        else setLogin(false);
      } catch (error) {
        console.log("Error in check Function in app.jsx",error)
      }
    }
    check();
  }, [userData]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        setIsSideBarExpanded={setIsSideBarExpanded}
        login={login}
        setLogin={setLogin}
        theme={theme}
        setTheme={setTheme}
        userData={userData}
        setUserData={setUserData}
      />
      <div className="flex flex-1 overflow-hidden">
        <SideBar isSidebarExpanded={isSidebarExpanded} login={login} />
        <div className="flex-1 relative">
          <main className="absolute inset-0 overflow-y-auto">
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
