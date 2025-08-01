import { Instagram, Twitter, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import api from "../../api/axiosInstance.js";
import { toast } from "react-toastify";
import { useUser } from "../../store";

const ProfileSettings = () => {
  const { userData, updateAvatar, updateBasicProfile, loading } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    userData?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
  );
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    bio: "",
    username: "",
    socialLinks: {
      x: "",
      youtube: "",
      instagram: "",
    },
  });

  // Initialize profile data from context
  useEffect(() => {
    if (userData) {
      setProfileData({
        fullName: userData.fullName || "",
        bio: userData.bio || "",
        username: userData.username || "",
        socialLinks: {
          x: userData.socialLinks?.x || "",
          youtube: userData.socialLinks?.youtube || "",
          instagram: userData.socialLinks?.instagram || "",
        },
      });
      setPreviewUrl(userData?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400");
    }
  }, [userData]); // Re-run whenever userData changes

  // Force a re-sync after successful update
  useEffect(() => {
    if (userData && !loading) {
      // Small delay to ensure data is properly updated
      const timer = setTimeout(() => {
        setProfileData(prev => ({
          ...prev,
          fullName: userData.fullName || prev.fullName,
          bio: userData.bio || prev.bio,
          socialLinks: {
            x: userData.socialLinks?.x || prev.socialLinks.x,
            youtube: userData.socialLinks?.youtube || prev.socialLinks.youtube,
            instagram: userData.socialLinks?.instagram || prev.socialLinks.instagram,
          },
        }));
        
        // Update avatar preview when userData changes and no file is selected
        if (userData.avatar && !selectedFile) {
          setPreviewUrl(userData.avatar);
        }
      }, 50); // Reduced delay for faster response
      
      return () => clearTimeout(timer);
    }
  }, [userData, loading, selectedFile]); // Removed previewUrl from dependencies to avoid loops
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  const onChangeSocialHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };
  // --- Handlers for Photo Upload ---
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Only update preview locally, don't touch the global context
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a photo to upload.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        // NOW upload to server and update global context
        const response = await updateAvatar(reader.result);
        
        // Success - clear the selected file and reset input
        toast.success(response.message || "Profile photo updated!");
        setSelectedFile(null);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Force update preview with new avatar from global context
        // Small delay to ensure the global context has been updated
        setTimeout(() => {
          if (userData?.avatar) {
            setPreviewUrl(userData.avatar);
          }
        }, 200);
      } catch (error) {
        toast.error(error.message || "Upload failed.");
        console.error("Error in photo upload", error);
        
        // Reset preview to original avatar on error
        setPreviewUrl(userData?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400");
        setSelectedFile(null);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsDataURL(selectedFile);
  };
  const submitProfile = async () => {
    try {
      // Use the global store method to update profile
      const response = await updateBasicProfile(profileData);
      
      // The UserContext will handle updating the userData,
      // so we don't need to manually update local state here
      // The useEffect will automatically sync the form with updated userData
      
      toast.success(response.message || "Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log("Error in submit Profile", error);
    }
  };

  // Remove the old useEffect that fetched profile data since we're using global store
  useEffect(() => {
    console.log('ProfileSettings - Current profileData:', profileData);
    console.log('ProfileSettings - Current userData:', userData);
  }, [profileData, userData]);
  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Profile Picture
        </h2>
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full border-4 border-[var(--color-chef-peach)] object-cover cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-[var(--color-chef-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors"
                disabled={loading}
              >
                Choose Photo
              </button>
              {selectedFile && (
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  disabled={loading}
                  className="border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Uploading..." : "Upload & Save Photo"}
                </button>
              )}
              {selectedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(userData?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Recommended: Square image, 400x400px. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              name="fullName"
              value={profileData.fullName}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Username *{" "}
              <span className="text-xs text-gray-500">(Cannot be changed)</span>
            </label>
            <input
              type="text"
              id="username"
              value={profileData.username}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
            />
          </div>
        </div>
        <div className="mt-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Bio/About Me
          </label>
          <textarea
            id="bio"
            rows="4"
            placeholder="Tell us about your cooking journey..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            name="bio"
            value={profileData.bio}
            onChange={(e) => onChangeHandler(e)}
          ></textarea>
        </div>
      </div>
      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">
          Social Links
        </h2>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Instagram className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="instagram"
              placeholder="Instagram Profile URL"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              name="instagram"
              value={profileData.socialLinks.instagram}
              onChange={(e) => onChangeSocialHandler(e)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Twitter className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="twitter"
              placeholder="Twitter / X Profile URL"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              name="x"
              value={profileData.socialLinks.x}
              onChange={(e) => onChangeSocialHandler(e)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Youtube className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="youtube"
              placeholder="YouTube Channel URL"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-chef-orange)] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              name="youtube"
              value={profileData.socialLinks.youtube}
              onChange={(e) => onChangeSocialHandler(e)}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => submitProfile()}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
