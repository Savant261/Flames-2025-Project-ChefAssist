import React from 'react'

const InventoryItem = ({ item, deleteIngredientFunction }) => {
    const now = Date.now();

    // Handle expiry calculation only if expiry date exists
    let status = item.status || "fresh";
    let daysUntilExpiry = null;
    
    if (item.expiry) {
        const expiryTime = new Date(item.expiry).getTime();
        const sixDays = 6 * 24 * 60 * 60 * 1000; // in ms
        const sixDaysfromNow = sixDays + now;
        
        // Calculate days until expiry
        daysUntilExpiry = Math.ceil((expiryTime - now) / (24 * 60 * 60 * 1000));

        if (now > expiryTime) status = "expired"
        else if (sixDaysfromNow > expiryTime) status = "expiring"
        else status = "fresh"
    }

    const getExpiryText = () => {
        if (!item.expiry) return "No expiry date set";
        
        if (status === 'expired') {
            return `Expired ${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) === 1 ? '' : 's'} ago`;
        } else if (status === 'expiring') {
            return `Expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}`;
        } else {
            return `Expires: ${new Date(item.expiry).toLocaleDateString()}`;
        }
    };

    return (
        <div className={`p-3 border border-gray-200 hover:border-chef-orange rounded-lg transition-all duration-300 ease-in-out hover:bg-chef-cream dark:bg-gray-800 dark:border-gray-700 ${status === "fresh" ? "bg-white dark:bg-gray-800" : status === 'expiring' ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item.quantity} {item.unit}</div>
                    <div className={`text-xs ${status === 'expired' ? 'text-red-600 dark:text-red-400 font-medium' : status === 'expiring' ? 'text-yellow-600 dark:text-yellow-400 font-medium' : 'text-gray-500 dark:text-gray-500'}`}>
                        {getExpiryText()}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-lg">
                        {status === 'fresh' ? '✅' : status === 'expiring' ? '⚠️' : '❌'}
                    </span>
                    <button 
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" 
                        onClick={() => deleteIngredientFunction(item.id)}
                        title="Delete ingredient"
                    >
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
