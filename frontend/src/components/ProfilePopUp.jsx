import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Settings, User, LayoutDashboard, LogOut, Star, Sun, Moon } from 'lucide-react';
import { useUser } from '../store';
import api from "../api/axiosInstance.js"

const profilePopUp = ({ theme, setTheme }) => {
    const navigate = useNavigate();
    const { userData, logout: contextLogout } = useUser();
    
    const logout = async () => {
        try {
            await api.post("/auth/logout")
            contextLogout(); // Use context logout
            navigate('/');
        } catch (error) {
            console.log("Error in Logout function",error)
        }
    };
    const toogletheme = async ()=>{
        setTheme(theme === 'light' ? 'dark' : 'light')
        try {
            const response = await api.get("/auth/toogle-theme");
            console.log(response.data);
        } catch (error) {
            console.log("Error in updateBackend in useEffect for updating them in backend",error);
    }}
    const MenuItem = ({ to, icon: Icon, children }) => (
        <Link to={to} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-white rounded-md hover:bg-[#FFDAB9] dark:hover:bg-gray-700">
            <Icon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <span>{children}</span>
        </Link>
    );
    const ThemeToggle = () => (
        <div className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-gray-700 rounded-md dark:text-gray-300">
            <div className="flex items-center gap-3">
                {theme === 'light' ? (<Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />) : (<Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />)}
                <span>Appearance</span>
            </div>
            <button onClick={() => toogletheme()} className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 dark:bg-gray-600">
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
    return (
        <div className="absolute right-0 w-60 top-full mt-2 bg-chef-cream dark:bg-gray-800 rounded-xl shadow-lg z-50 border border-gray-200 dark:border-gray-700 p-2">
            <div className="flex items-center gap-3 p-2 mb-2 border-b dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-[#FFDAB9] dark:bg-gray-700 flex items-center justify-center text-xl">🍳</div>
                <div>
                    <div className="font-bold text-sm text-gray-800 dark:text-gray-100">{userData.username=="" ? "ChefAssist User" : userData.username}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{userData.email=="" ? "user@email.com" : userData.email}</div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <MenuItem to={`/profile/${userData.username}`} icon={User}>View Public Profile</MenuItem>
                <MenuItem to="/dashboard" icon={LayoutDashboard}>Dashboard</MenuItem>
                <MenuItem to="/subscription" icon={Star}>Subscription</MenuItem>
                <MenuItem to="/settings" icon={Settings}>Settings</MenuItem>
            </div>
            <div className="pt-2 mt-2 border-t dark:border-gray-700">
                <ThemeToggle />
            </div>
            <div className="pt-2 mt-2 border-t dark:border-gray-700">
                <button onClick={()=>logout()} className="flex items-center w-full gap-3 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-[#FFDAB9] dark:hover:bg-red-500/10 dark:text-red-400">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default profilePopUp;