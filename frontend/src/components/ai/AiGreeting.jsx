import React from 'react';
import { Loader2 } from 'lucide-react';

const AiGreeting = ({ userName, output, isLoadingChat, activeChats }) => {
  // Show greeting only when no output, not loading chat, and no active chats
  if (output || isLoadingChat || (activeChats && activeChats.length > 0)) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1
        className="text-5xl font-extrabold mb-2 animate-slide-in-top animate-fade-in-scale flex items-center justify-center w-full text-center dark:text-orange-400"
        style={{
          color: "#C75C1F",
          textShadow: "0 2px 8px #FFDCA9",
          letterSpacing: "2px",
          background: "none",
          marginTop: "56px",
        }}
      >
        <span
          className="inline-block animate-bounce-slow"
          style={{
            fontSize: "3.5rem",
            marginRight: "12px",
            textShadow: "0 2px 6px rgba(0,0,0,0.18)",
            verticalAlign: "middle",
            transition: "transform 0.3s",
            color: "#C75C1F",
          }}
        >
          👨‍🍳
        </span>
        Hello, {userName}
      </h1>
    </div>
  );
};

export const LoadingChatMessage = ({ isLoadingChat }) => {
  if (!isLoadingChat) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="bg-white/90 dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-[#FFDCA9] dark:border-orange-400 backdrop-blur-lg animate-fade-in-scale">
        <div className="flex items-center justify-center gap-3 text-[#FF7F3F] dark:text-orange-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl font-semibold">
            Loading your previous conversation...
          </span>
        </div>
      </div>
    </div>  
  );
};

export default AiGreeting;
