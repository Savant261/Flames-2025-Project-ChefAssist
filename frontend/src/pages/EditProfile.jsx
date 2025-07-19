import React from 'react'

const EditProfile = () => {
    return (
        <div className="bg-chef-cream min-h-screen">
            <div className="bg-white shadow-sm border-b border-chef-peach/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick="goBack()"
                                className="p-2 text-gray-600 hover:text-chef-orange transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <div className="w-10 h-10 bg-chef-orange rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-chef-orange">Edit Profile</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick="cancelChanges()"
                                className="px-4 py-2 text-gray-600 hover:text-chef-orange transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick="saveProfile()"
                                className="bg-chef-orange text-white px-6 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form id="editProfileForm" className="space-y-8">
                    {/* Profile Picture Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-chef-peach/30">
                        <h2 className="text-2xl font-bold text-chef-orange mb-6">
                            Profile Picture
                        </h2>
                        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                            <div className="relative group">
                                <img
                                    id="profileImage"
                                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                                    alt="Profile Picture"
                                    className="w-32 h-32 rounded-full border-4 border-chef-peach object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick="document.getElementById('imageUpload').click()"
                                        className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
                                    >
                                        Upload New Photo
                                    </button>
                                    <button
                                        type="button"
                                        onClick="removeProfilePicture()"
                                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-chef-orange hover:text-chef-orange transition-colors"
                                    >
                                        Remove Photo
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Recommended: Square image, at least 400x400px. Max file size:
                                    5MB.
                                </p>
                                <div id="uploadProgress" className="hidden mt-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            id="progressBar"
                                            className="bg-chef-orange h-2 rounded-full transition-all duration-300"
                                            style={{ width: '0%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-chef-peach/30">
                        <h2 className="text-2xl font-bold text-chef-orange mb-6">
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value="Priya Malhotra"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent transition-colors"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Username *
                                    <span className="text-xs text-gray-500">(Cannot be changed)</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value="priya_chef"
                                    readOnly
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address *
                                    <span className="inline-flex items-center ml-2">
                                        <svg
                                            className="w-4 h-4 text-green-500"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-xs text-green-600 ml-1">Verified</span>
                                    </span>
                                </label>
                                <div className="flex">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value="priya.malhotra@email.com"
                                        readOnly
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-500"
                                    />
                                    <button
                                        type="button"
                                        onClick="resendVerification()"
                                        className="px-4 py-3 bg-chef-orange text-white rounded-r-lg hover:bg-chef-orange-dark transition-colors"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Phone Number
                                </label>
                                <div className="flex">
                                    <select
                                        id="countryCode"
                                        name="countryCode"
                                        className="px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                    >
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+91" selected>
                                            🇮🇳 +91
                                        </option>
                                        <option value="+44">🇬🇧 +44</option>
                                        <option value="+86">🇨🇳 +86</option>
                                        <option value="+81">🇯🇵 +81</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value="9876543210"
                                        placeholder="Enter phone number"
                                        className="flex-1 px-4 py-3 border-l-0 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-chef-peach/30">
                        <h2 className="text-2xl font-bold text-chef-orange mb-6">
                            Personal Details
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Bio/About Me
                                    <span id="bioCounter" className="text-xs text-gray-500 ml-2">
                                        (0/200)
                                    </span>
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows="4"
                                    maxLength="200"
                                    placeholder="Tell us about yourself and your cooking journey..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent resize-none"
                                    defaultValue="Passionate home chef & recipe creator. Lover of all things pasta & spice! Sharing my culinary adventures one recipe at a time."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value="Mumbai, India"
                                        placeholder="City, Country"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="website"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Website/Blog
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        placeholder="https://your-website.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="birthday"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Date of Birth
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="birthday"
                                            name="birthday"
                                            value="1990-05-15"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                        />
                                        <div className="flex items-center mt-2">
                                            <input
                                                type="checkbox"
                                                id="hideAge"
                                                name="hideAge"
                                                className="mr-2 text-chef-orange focus:ring-chef-orange"
                                            />
                                            <label htmlFor="hideAge" className="text-sm text-gray-600">
                                                Hide my age from public profile
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="female" selected>
                                            Female
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="non-binary">Non-binary</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                    <input
                                        type="text"
                                        id="customGender"
                                        name="customGender"
                                        placeholder="Please specify"
                                        className="hidden w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-chef-peach/30">
                        <h2 className="text-2xl font-bold text-chef-orange mb-6">
                            Social Links
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                    </svg>
                                </div>
                                <input
                                    type="url"
                                    id="instagram"
                                    name="instagram"
                                    placeholder="https://instagram.com/username"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </div>
                                <input
                                    type="url"
                                    id="twitter"
                                    name="twitter"
                                    placeholder="https://twitter.com/username"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </div>
                                <input
                                    type="url"
                                    id="youtube"
                                    name="youtube"
                                    placeholder="https://youtube.com/channel/..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cooking Preferences */}
                

                    {/* Security & Privacy */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-chef-peach/30">
                        <h2 className="text-2xl font-bold text-chef-orange mb-6">
                            Security & Privacy
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">Public Profile</h3>
                                    <p className="text-sm text-gray-500">
                                        Make your profile visible to other users
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="publicProfile"
                                        name="publicProfile"
                                        defaultChecked
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-chef-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-chef-orange"></div>
                                </label>
                            </div>

                            <div className="border-t pt-6">
                                <button
                                    type="button"
                                    onClick="openPasswordModal()"
                                    className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 text-gray-600 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Change Password
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Update your account password
                                            </p>
                                        </div>
                                    </div>
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick="cancelChanges()"
                            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-chef-orange text-white font-semibold hover:bg-chef-orange-dark transition-colors"
                        >
                            Save All Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile