import React from 'react';

const DeleteConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Chat", 
  message = "Are you sure you want to delete this chat? This action cannot be undone.",
  chatTitle = "this chat"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-[#FFDCA9] dark:border-orange-400">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#FF7F3F] dark:text-orange-400">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {message}
          </p>
          {chatTitle && chatTitle !== "this chat" && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">Chat to delete:</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{chatTitle}</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
