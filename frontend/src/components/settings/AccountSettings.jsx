import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  getUserSettings, 
  updateEmail, 
  updatePhoneNumber, 
  changePassword, 
  togglePublicProfile, 
  deleteAccount 
} from '../../services/accountService';
import Modal from './Modal';

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    email: '',
    phoneNumber: '',
    isPublic: false,
  });
  const [loading, setLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    deletePassword: ''
  });
  const [errors, setErrors] = useState({});

  // Load user settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getUserSettings();
        setSettings({
          email: data.email || '',
          phoneNumber: data.phoneNumber || 'Not set',
          isPublic: data.isPublic || false
        });
        setFormData(prev => ({
          ...prev,
          email: data.email || '',
          phoneNumber: data.phoneNumber || ''
        }));
      } catch (error) {
        toast.error('Failed to load settings');
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleTogglePublicProfile = async () => {
    try {
      await togglePublicProfile();
      setSettings(prev => ({ ...prev, isPublic: !prev.isPublic }));
    } catch (error) {
      toast.error('Failed to toggle public profile');
      console.error('Error toggling public profile:', error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      if (!validateEmail(formData.email)) {
        setErrors(prev => ({ ...prev, email: 'Invalid email address' }));
        return;
      }
      await updateEmail(formData.email);
      setSettings(prev => ({ ...prev, email: formData.email }));
      setShowEmailModal(false);
    } catch (error) {
      toast.error('Failed to update email');
      console.error('Error updating email:', error);
    }
  };

  const handleUpdatePhone = async () => {
    try {
      await updatePhoneNumber(formData.phoneNumber);
      setSettings(prev => ({ ...prev, phoneNumber: formData.phoneNumber }));
      setShowPhoneModal(false);
    } catch (error) {
      toast.error('Failed to update phone number');
      console.error('Error updating phone number:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        return;
      }
      await changePassword(formData.currentPassword, formData.newPassword);
      setShowPasswordModal(false);
    } catch (error) {
      toast.error('Failed to change password');
      console.error('Error changing password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(formData.deletePassword);
      // Logout and redirect to login page
    } catch (error) {
      toast.error('Failed to delete account');
      console.error('Error deleting account:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-chef-orange)]"></div>
      </div>
    );
  }
  
  return (
    <div>
    <div>
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">Account Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Email Address</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your verified email is {settings.email}</p>
            </div>
            <button 
              onClick={() => setShowEmailModal(true)}
              className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold"
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Phone Number</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {settings.phoneNumber === 'Not set' ? 'Add a phone number for account recovery.' : settings.phoneNumber}
              </p>
            </div>
            <button 
              onClick={() => setShowPhoneModal(true)}
              className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold"
            >
              {settings.phoneNumber === 'Not set' ? 'Add' : 'Update'}
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password.</p>
            </div>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold"
            >
              Change
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Public Profile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {settings.isPublic ? 'Your profile is visible to other users' : 'Your profile is private'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="publicProfile"
                name="isPublic"
                checked={settings.isPublic}
                onChange={handleTogglePublicProfile}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-chef-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-chef-orange"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-4">Account Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Delete Account
        </button>
      </div>
    </div>


    <Modal 
      isOpen={showEmailModal} 
      onClose={() => setShowEmailModal(false)}
      title="Update Email Address"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your new email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setShowEmailModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdateEmail}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-chef-orange)] rounded-lg hover:bg-[var(--color-chef-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-chef-orange)]"
          >
            Update Email
          </button>
        </div>
      </div>
    </Modal>

    {/* Phone Number Update Modal */}
    <Modal 
      isOpen={showPhoneModal} 
      onClose={() => setShowPhoneModal(false)}
      title={settings.phoneNumber === 'Not set' ? 'Add Phone Number' : 'Update Phone Number'}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setShowPhoneModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdatePhone}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-chef-orange)] rounded-lg hover:bg-[var(--color-chef-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-chef-orange)]"
          >
            {settings.phoneNumber === 'Not set' ? 'Add Phone' : 'Update'}
          </button>
        </div>
      </div>
    </Modal>

    {/* Change Password Modal */}
    <Modal 
      isOpen={showPasswordModal} 
      onClose={() => setShowPasswordModal(false)}
      title="Change Password"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your current password"
          />
          {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your new password"
          />
          {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Confirm your new password"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setShowPasswordModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleChangePassword}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-chef-orange)] rounded-lg hover:bg-[var(--color-chef-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-chef-orange)]"
          >
            Update Password
          </button>
        </div>
      </div>
    </Modal>

    {/* Delete Account Modal */}
    <Modal 
      isOpen={showDeleteModal} 
      onClose={() => setShowDeleteModal(false)}
      title="Delete Your Account"
    >
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently removed.
        </p>
        <div>
          <label htmlFor="deletePassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter your password to confirm
          </label>
          <input
            type="password"
            id="deletePassword"
            name="deletePassword"
            value={formData.deletePassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
          />
          {errors.deletePassword && <p className="mt-1 text-sm text-red-600">{errors.deletePassword}</p>}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </Modal>
    </div>
    </div>
);
};

export default AccountSettings;