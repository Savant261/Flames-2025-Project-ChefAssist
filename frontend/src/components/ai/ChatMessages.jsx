import React, { memo } from 'react';
import MessageCard from './MessageCard';

const ChatMessages = memo(({ activeChats, output, input }) => {
  return (
    <div
      className="w-full max-w-xl mx-auto flex flex-col gap-8 justify-end"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "12px",
        paddingBottom: "12px",
        minHeight: "320px",
        maxHeight: "420px",
        overflowY: "auto",
      }}
    >
      <div
        className="flex-1 flex flex-col gap-8 custom-scrollbar"
        style={{ maxHeight: "380px" }}
      >
        {/* Render all active chats in scrollable middle section */}
        {activeChats.map((chat, idx) => (
          <MessageCard key={chat.timestamp} chat={chat} />
        ))}
        
        {/* If no active chats, show current output as default */}
        {activeChats.length === 0 && output && (
          <MessageCard chat={output} isCurrentOutput={true} input={input} />
        )}
      </div>
    </div>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
