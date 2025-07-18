import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { Home, Flame, Users, BookOpen, Bookmark, History, Settings, HelpCircle } from 'lucide-react';

const SideBar = ({ isSidebarExpanded, login }) => {
    const location = useLocation();

    if (!login) return null;

    const NavLink = ({ to, icon: Icon, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} title={children} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-chef-orange text-white shadow-md' : 'text-gray-600 hover:bg-[#FFDAB9]/50 hover:text-[#D35400]'}`}>
                <Icon className="w-6 h-6 flex-shrink-0" />
                <span className={`font-semibold whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>{children}</span>
            </Link>
        );
    };

    const SectionTitle = ({ children }) => (
        <h3 className={`px-4 mt-6 mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>{children}</h3>
    );

    return (
        <aside className={`bg-[#FFF8E7] border-r border-gray-200/50 flex-shrink-0 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'w-64' : 'w-20'}`}>
            <div className="flex flex-col h-full p-3">
                <SectionTitle>Discovery</SectionTitle>
                <NavLink to="/explore" icon={Home}>Home</NavLink>
                <NavLink to="/trending" icon={Flame}>Trending</NavLink>
                <NavLink to="/myFeed" icon={Users}>My Feed</NavLink>
                <SectionTitle>My Library</SectionTitle>
                <NavLink to="/dashboard/myRecipes" icon={BookOpen}>My Recipes</NavLink>
                <NavLink to="/savedRecipes" icon={Bookmark}>Saved Recipes</NavLink>
                <NavLink to="/ai" icon={History}>AI History</NavLink>
                <div className="mt-auto">
                    <SectionTitle>Account</SectionTitle>
                    <NavLink to="/settings" icon={Settings}>Settings</NavLink>
                    <NavLink to="/feedback" icon={HelpCircle}>Help & Feedback</NavLink>
                </div>
            </div>
        </aside>
    );
}

export default SideBar