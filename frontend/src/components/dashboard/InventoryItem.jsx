import React from 'react'

const InventoryItem = ({ item, deleteIngredientFunction }) => {
    const now = Date.now();

    const expiryTime = new Date(item.expiry).getTime();

    const sixDays = 6 * 24 * 60 * 60 * 1000; // in ms

    const sixDaysfromNow = sixDays + now;

    if (now > expiryTime) item.status = "expired"
    else if (sixDaysfromNow > expiryTime) item.status = "expiring"
    else item.status = "fresh"

    return (
        <div className={`p-3 border border-gray-200 hover:border-chef-orange rounded-lg transition-all duration-300 ease-in-out hover:bg-chef-cream hover: ${item.status === "fresh" ? "bg-white" : item.status === 'expiring' ? "bg-chef-cream" : "bg-chef-peach"}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.quantity} {item.unit}</div>
                    <div className="text-xs text-gray-500">Expires: {new Date(item.expiry).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="status-badge ${item.status}">
                        {item.status === 'fresh' ? '✅' : item.status === 'expiring' ? '⚠️' : '❌'}
                    </span>
                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteIngredientFunction(item.id)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InventoryItem