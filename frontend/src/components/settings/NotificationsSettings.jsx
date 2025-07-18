import React from 'react'

const NotificationsSettings = () => {
    
  const NotificationToggle = ({ title, description, defaultChecked = false }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex-1 pr-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--color-chef-orange-light)]/30 dark:peer-focus:ring-[var(--color-chef-orange-dark)] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--color-chef-orange)]"></div>
      </label>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Email Notifications</h3>
          <div className="space-y-4">
            <NotificationToggle title="Weekly Newsletter" description="Get our weekly email with top recipes and cooking tips." defaultChecked={true} />
            <NotificationToggle title="Recipe Alerts" description="Get notified about new recipes from chefs you follow." defaultChecked={true} />
            <NotificationToggle title="Special Offers" description="Receive promotional offers and partnership news." />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Push Notifications</h3>
          <div className="space-y-4">
            <NotificationToggle title="Comments & Reviews" description="When someone comments on or reviews your recipes." defaultChecked={true} />
            <NotificationToggle title="New Follower" description="When a new user follows your profile." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings