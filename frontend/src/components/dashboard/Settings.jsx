import React from 'react'

const Settings = () => {
    return (
        <div id="settings-section" className="dashboard-section ">
            <h2 className="text-2xl font-bold text-chef-orange mb-6">Settings & Preferences</h2>

            <div className="space-y-8">
                {/* <!-- Dietary Preferences --> */}
                {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">Dietary Preferences</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="text-chef-orange" />
                            <span>🥬 Vegetarian</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="text-chef-orange" />
                            <span>🌱 Vegan</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="text-chef-orange" />
                            <span>🌾 Gluten-Free</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="text-chef-orange" />
                            <span>🥛 Dairy-Free</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="text-chef-orange" />
                            <span>🥑 Keto</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="text-chef-orange" />
                            <span>🦴 Paleo</span>
                        </label>
                    </div>
                </div> */}

                {/* <!-- Allergies & Restrictions --> */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">Allergies & Restrictions</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <span className="text-red-500">⚠️</span>
                                <span className="font-medium">Nuts</span>
                            </div>
                            <button className="text-red-500 hover:text-red-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-chef-orange hover:text-chef-orange transition-colors">
                            + Add Allergy or Restriction
                        </button>
                    </div>
                </div>

                {/* <!-- Feedback & Support --> */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">Feedback & Support</h3>
                    <div className="space-y-4">
                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Send Feedback</div>
                                    <div className="text-sm text-gray-600">Help us improve ChefAssist</div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Contact Support</div>
                                    <div className="text-sm text-gray-600">Get help with your account</div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium mb-2">Support Tickets</div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Recipe upload issue</span>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In Progress</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Account settings help</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings