import Ai from "./pages/Ai.jsx"
import './App.css'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Home from "./pages/Home.jsx"
import { Routes, Route } from 'react-router-dom';
import Favorite from "./pages/Favorite.jsx"
import Explore from "./pages/Explore.jsx"
import Profile from "./pages/Profile.jsx"

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/ai" element={<Ai/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/favorite" element={<Favorite/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
