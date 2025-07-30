import React, { useState } from 'react';
import { getHistoryByDay } from './utils';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const HistoryPanel = ({
  showHistory,
  setShowHistory,
  history,
  handleSelectHistory,
  selectedHistoryIdx,
  copiedIdx,
  handleCopyHistory,
  handleDeleteChat
}) => {
  const [deleteDialog, setDeleteDialog] = useState({ 
    isOpen: false, 
    chatId: null, 
    chatTitle: '' 
  });

  const openDeleteDialog = (chatId, chatTitle) => {
    setDeleteDialog({ 
      isOpen: true, 
      chatId, 
      chatTitle: chatTitle || 'Untitled Chat' 
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ 
      isOpen: false, 
      chatId: null, 
      chatTitle: '' 
    });
  };

  const confirmDelete = () => {
    if (deleteDialog.chatId) {
      handleDeleteChat(deleteDialog.chatId);
    }
  };

  if (!showHistory) return null;

  return (
    <div
      className="fixed top-0 right-0 h-full w-[420px] bg-white dark:bg-gray-900 shadow-2xl border-l border-[#FFDCA9] dark:border-orange-400 z-[100] animate-slide-in-right flex flex-col"
      style={{
        boxShadow: "0 0 32px #FFDCA9AA",
        transition:
          "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#FFDCA9] dark:border-orange-400 bg-gradient-to-r from-[#FFDCA9] to-[#FFF6E9] dark:from-gray-800 dark:to-gray-900">
        <span className="text-2xl font-bold text-[#FF7F3F] dark:text-orange-400">
          History
        </span>
        <button
          className="text-[#FF7F3F] dark:text-orange-400 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition"
          title="Close"
          onClick={() => setShowHistory(false)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#FF7F3F"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
        {history.length === 0 ? (
          <div className="text-[#A5A6B2] dark:text-orange-200 text-lg font-semibold mt-12 text-center">
            No history yet.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {getHistoryByDay(history).map(([day, items]) => (
              <div key={day}>
                <div className="text-lg font-bold text-[#A5A6B2] dark:text-orange-400 mb-2">
                  {day === new Date().toLocaleDateString() ? "Today" : day}
                </div>
                <div className="flex flex-col gap-4">
                  {items.map((item, i) => (
                    <div
                      key={item.idx || item.chatId}
                      className={`bg-[#FFF6E9] dark:bg-gray-800 border border-[#FFDCA9] dark:border-orange-400 rounded-2xl shadow p-4 animate-fade-in-item cursor-pointer hover:scale-105 transition-transform ${
                        selectedHistoryIdx === item.idx
                          ? "ring-4 ring-[#FF7F3F] dark:ring-orange-400 scale-105"
                          : ""
                      }`}
                      style={{ animationDelay: `${i * 0.03}s` }}
                      onClick={() => handleSelectHistory(item.idx)}
                      title={item.chatId ? "Navigate to this chat" : "Show this chat"}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#FF7F3F] dark:text-orange-400 font-bold">
                          {item.title || (item.mode === "idea" ? "Recipe Idea" : "Recipe")}
                        </span>
                        <span className="text-xs text-[#A5A6B2] dark:text-orange-200">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-[#181A1B] dark:text-orange-200 font-semibold mb-1">
                        {item.input.length > 60 ? `${item.input.substring(0, 60)}...` : item.input}
                      </div>
                      <div className="text-sm text-[#A5A6B2] dark:text-orange-200 mb-2">
                        Restrictions: {item.restrictions}
                      </div>
                      {item.chatId && (
                        <div className="text-xs text-[#FF7F3F] dark:text-orange-400 mb-2 font-semibold">
                          💬 Chat Session
                        </div>
                      )}
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-3 text-[#181A1B] dark:text-orange-200 whitespace-pre-line text-base mb-2 border border-[#FFDCA9] dark:border-orange-400">
                        {item.output.length > 150 ? `${item.output.substring(0, 150)}...` : item.output}
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={`text-[#FF7F3F] dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full px-3 py-1 font-semibold shadow hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition ${
                            copiedIdx === item.idx ? "animate-pulse" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyHistory(item.output, item.idx);
                          }}
                          title="Copy to clipboard"
                        >
                          {copiedIdx === item.idx ? "Copied!" : "📋 Copy"}
                        </button>
                        {item.chatId && (
                          <>
                            <button
                              className="text-white bg-[#FF7F3F] dark:bg-orange-400 rounded-full px-3 py-1 font-semibold shadow hover:bg-orange-600 transition"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectHistory(item.idx);
                              }}
                              title="Open chat"
                            >
                              🔗 Open
                            </button>
                            <button
                              className="text-white bg-red-500 dark:bg-red-600 rounded-full px-3 py-1 font-semibold shadow hover:bg-red-600 dark:hover:bg-red-700 transition"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteDialog(item.chatId, item.title || item.input);
                              }}
                              title="Delete chat"
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        chatTitle={deleteDialog.chatTitle}
        message="Are you sure you want to delete this chat? All messages and recipe data will be permanently lost."
      />
    </div>
  );
};

export default HistoryPanel;
