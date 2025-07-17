import React from 'react'

const Nutrition = () => {
    return (
        <div id="nutrition-section" className="dashboard-section  ">
            <h2 className="text-2xl font-bold text-chef-orange mb-6">Nutritional Insights</h2>

            {/* <!-- Nutrition Overview --> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-blue-500">1,847</div>
                    <div className="text-sm text-gray-600">Avg Daily Calories</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-green-500">45%</div>
                    <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-red-500">25%</div>
                    <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                    <div className="text-2xl font-bold text-yellow-500">30%</div>
                    <div className="text-sm text-gray-600">Fat</div>
                </div>
            </div>

            {/* <!-- Charts --> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">Weekly Nutrition Breakdown</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-chef-orange to-chef-orange-light flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="text-2xl font-bold">1,847</div>
                                    <div className="text-sm">Avg Calories</div>
                                </div>
                            </div>
                            <div className="flex justify-center space-x-4 text-sm">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span>Carbs 45%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                    <span>Protein 25%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                    <span>Fat 30%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <h3 className="text-xl font-bold text-chef-orange mb-4">Nutrition Goals</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Daily Calories</span>
                                <span className="text-sm text-gray-600">1,847 / 2,000</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-chef-orange h-2 rounded-full" style={{ width: "92%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Protein</span>
                                <span className="text-sm text-gray-600">115g / 150g</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: "77%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Fiber</span>
                                <span className="text-sm text-gray-600">28g / 35g</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nutrition