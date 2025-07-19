import { useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { User, Heart, KeyRound, Bell, Star } from 'lucide-react';

import ProfileSettings from '../components/settings/ProfileSettings.jsx';
import PreferencesSettings from '../components/settings/PreferencesSettings.jsx';
import AccountSettings from "../components/settings/AccountSettings.jsx"
import NotificationsSettings from '../components/settings/NotificationsSettings.jsx';
import SubscriptionSettings from '../components/settings/SubscriptionSettings.jsx';

const Settings = () => {
  const SettingsNavLink = ({ to, icon: Icon, children, end = false }) => {
    return (
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center shrink-0 gap-3 px-4 py-3 font-semibold border-b-2 transition-colors ${isActive
            ? 'border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]'
            : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`
        }
      >
        <Icon className="w-5 h-5" />
        <span>{children}</span>
      </NavLink>
    );
  };
  useEffect(() => {
    document.title = 'Settings / ChefAssit';
  }, []);
  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-chef-orange-dark)] dark:text-gray-100">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your profile, preferences, and account details.</p>
        </header>
        <div className="bg-white dark:bg-gray-800 rounded-t-xl shadow-sm border-b dark:border-gray-700 overflow-x-auto">
          <nav className="flex">
            <SettingsNavLink to="/settings" icon={User} end={true}>Profile</SettingsNavLink>
            <SettingsNavLink to="/settings/preferences" icon={Heart}>Preferences</SettingsNavLink>
            <SettingsNavLink to="/settings/account" icon={KeyRound}>Account</SettingsNavLink>
            <SettingsNavLink to="/settings/notifications" icon={Bell}>Notifications</SettingsNavLink>
            <SettingsNavLink to="/settings/subscription" icon={Star}>Subscription</SettingsNavLink>
          </nav>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-lg p-6 sm:p-8">
          <Routes>
            <Route index element={<ProfileSettings />} />
            <Route path="preferences" element={<PreferencesSettings />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="notifications" element={<NotificationsSettings />} />
            <Route path="subscription" element={<SubscriptionSettings />} />
          </Routes>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings