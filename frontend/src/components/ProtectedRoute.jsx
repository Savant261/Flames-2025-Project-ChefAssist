import React, { useEffect, useState } from 'react';
import { useUser } from '../store';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { userData, loading, isAuthenticated, checkAuth } = useUser();
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Checking authentication...');
  const [showExtendedMessage, setShowExtendedMessage] = useState(false);

  useEffect(() => {
    // Perform initial auth check when component mounts
    const performAuthCheck = async () => {
      if (!initialCheckDone) {
        await checkAuth(true); // Pass true to redirect on auth failure
        setInitialCheckDone(true);
      }
    };

    performAuthCheck();
  }, [checkAuth, initialCheckDone]);

  // Progressive loading messages based on time elapsed
  useEffect(() => {
    if (loading || !initialCheckDone) {
      // Start with basic message
      setLoadingMessage('Checking authentication...');
      setShowExtendedMessage(false);

      // After 3 seconds, show backend waking up message
      const timer1 = setTimeout(() => {
        setLoadingMessage('Waking up the server...');
        setShowExtendedMessage(true);
      }, 3000);

      // After 8 seconds, show patience message
      const timer2 = setTimeout(() => {
        setLoadingMessage('Server is starting up, please wait...');
      }, 8000);

      // After 15 seconds, show final message
      const timer3 = setTimeout(() => {
        setLoadingMessage('Almost ready, just a few more seconds...');
      }, 15000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [loading, initialCheckDone]);

  // Show loading spinner during initial auth check
  if (loading || !initialCheckDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-chef-orange)] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            {loadingMessage}
          </p>
          {showExtendedMessage && (
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-500">
              <p>Our server goes to sleep to save resources.</p>
              <p>It takes about 30 seconds to wake up - thanks for your patience! ☕</p>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-[var(--color-chef-orange)] rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-[var(--color-chef-orange)] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="h-2 w-2 bg-[var(--color-chef-orange)] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For protected routes, check if user is authenticated
  if (requireAuth && !isAuthenticated) {
    // If not authenticated, the checkAuth function will have already redirected to '/'
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // For public routes (like home page), render the content
  // For protected routes, only render if authenticated
  return children;
};

export default ProtectedRoute;
