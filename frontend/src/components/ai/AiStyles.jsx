import React from 'react';

const AiStyles = () => {
  return (
    <style>
      {`
        /* Slide-in animation for history side panel */
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        /* Background Blob Animations */
        @keyframes blob-animation-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(50px, -30px) scale(1.1); }
          60% { transform: translate(-20px, 40px) scale(0.9); }
        }
        @keyframes blob-animation-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-40px, 60px) scale(1.05); }
          70% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes blob-animation-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, 50px) scale(0.9); }
          75% { transform: translate(-50px, -30px) scale(1.1); }
        }
        @keyframes blob-animation-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(-60px, -10px) scale(1.08); }
          65% { transform: translate(10px, 50px) scale(0.92); }
        }

        .animate-blob-1 { animation: blob-animation-1 12s infinite ease-in-out alternate; }
        .animate-blob-2 { animation: blob-animation-2 15s infinite ease-in-out alternate; animation-delay: 2s; }
        .animate-blob-3 { animation: blob-animation-3 10s infinite ease-in-out alternate; animation-delay: 4s; }
        .animate-blob-4 { animation: blob-animation-4 13s infinite ease-in-out alternate; animation-delay: 1s; }

        /* Header Entrance */
        @keyframes slideInFromTop {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-top { animation: slideInFromTop 0.8s ease-out forwards; }

        /* Main Content Entrance */
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fadeInScale 1.1s cubic-bezier(0.4,0,0.2,1) forwards; animation-delay: 0.1s; }
        .animate-dropdown-fade-in-scale {
          animation: dropdownFadeInScale 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        /* Section Entrance */
        @keyframes slideInSection {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-section { animation: slideInSection 0.6s ease-out forwards; opacity: 0; }

        /* Item Fade In (for checkboxes and history items) */
        @keyframes fadeInItem {
          0% { opacity: 0; transform: translateY(18px); }
          60% { opacity: 0.7; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-item { animation: fadeInItem 0.7s cubic-bezier(0.4,0,0.2,1) forwards; opacity: 0; }

        /* Footer Entrance */
        @keyframes slideInFromBottom {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-bottom { animation: slideInFromBottom 0.8s ease-out forwards; animation-delay: 1.5s; }

        /* Bounce for Chef Hat */
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounceSlow 2s infinite ease-in-out; }

        /* Pulse on Hover for Buttons */
        .animate-pulse-on-hover:hover {
          animation: pulseEffect 0.5s forwards;
        }
        @keyframes pulseEffect {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        /* Custom Checkbox Styling for the checkmark */
        input[type="checkbox"].form-checkbox:checked {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Custom Scrollbar for History */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e0e0e0; /* Light track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bdbdbd; /* Lighter thumb */
          border-radius: 10px;
          transition: background 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9e9e9e; /* Darker thumb on hover */
        }

        /* Animated background blob */
        body::before {
          content: '';
          position: fixed;
          top: 10%;
          left: 60%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle at 50% 50%, #ffd6e0 0%, #b3e0ff 100%);
          opacity: 0.3;
          z-index: 0;
          border-radius: 50%;
          filter: blur(60px);
          animation: blob-float 18s infinite alternate ease-in-out;
        }
        @keyframes blob-float {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(40px); }
          100% { transform: scale(1) translateY(0); }
        }

        /* Animations for card expand/collapse */
        .animate-expand-card { animation: expandCard 0.4s ease-in; }
        .animate-collapse-card { animation: collapseCard 0.4s ease-out; }
        @keyframes expandCard {
          0% { transform: scale(0.98) translateY(20px); opacity: 0.7; }
          60% { transform: scale(1.01) translateY(0); opacity: 0.95; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes collapseCard {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.98); opacity: 0.7; }
        }

        /* Favorite/Share button click animation */
        .animate-favorite-btn:active, .animate-share-btn:active {
          animation: btnPop 0.3s;
        }
        @keyframes btnPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        `}
    </style>
  );
};

export default AiStyles;
