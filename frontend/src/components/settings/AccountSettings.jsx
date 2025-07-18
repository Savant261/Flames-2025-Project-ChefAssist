import React from 'react'

const AccountSettings = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">Account Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Email Address</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your verified email is user@email.com</p>
            </div>
            <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold">Update</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Phone Number</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add a phone number for account recovery.</p>
            </div>
            <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold">Add</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password.</p>
            </div>
            <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold">Change</button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-4">Account Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">Delete Account</button>
      </div>
    </div>
  );
};

export default AccountSettings