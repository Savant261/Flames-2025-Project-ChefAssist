import { useState } from "react"
import Ai from "./pages/Ai.jsx"
import './App.css'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Home from "./pages/Home.jsx"
import { Routes, Route } from 'react-router-dom';
import Favorite from "./pages/Favorite.jsx"
import Explore from "./pages/Explore.jsx"
import Profile from "./pages/Profile.jsx"
import EditProfile from "./pages/EditProfile.jsx"
import Subscription from "./pages/Subscription.jsx"
import DashBoard from "./pages/DashBoard.jsx"
import Feedback from "./pages/Feedback.jsx"
import Recipe from "./pages/Recipe.jsx"
import SideBar from "./components/SideBar.jsx"

function App() {
  const [isSidebarExpanded, setIsSideBarExpanded] = useState(false);
  const [login, setLogin] = useState(true);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setIsSideBarExpanded={setIsSideBarExpanded} login={login} setLogin={setLogin} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar isSidebarExpanded={isSidebarExpanded} login={login} />
        <div className="flex-1 relative">
          <main className="absolute inset-0 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai" element={<Ai />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/dashboard/*" element={<DashBoard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/recipe" element={<Recipe />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
