import React from 'react'

const Alert = ({alert}) => {
    return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 text-blue-800 dark:text-blue-300 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{alert.time}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert