import React, { memo, useEffect, useRef } from 'react';
import MessageCard from './MessageCard';

const ChatMessages = memo(({ activeChats, output, input, isStreaming, streamingOutput }) => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChats, output, isStreaming, streamingOutput]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-full flex flex-col"
      style={{
        height: "100%",
        maxHeight: "calc(100vh - 300px)", // Adjust based on header and input heights
        overflowY: "auto",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <div className="flex-1 flex flex-col gap-4 w-full max-w-6xl mx-auto px-4 custom-scrollbar">
        {/* Render all active chats */}
        {activeChats.map((chat, idx) => (
          <MessageCard 
            key={`${chat.timestamp}-${idx}`} 
            chat={chat} 
            isStreaming={chat.isStreaming || false}
          />
        ))}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
