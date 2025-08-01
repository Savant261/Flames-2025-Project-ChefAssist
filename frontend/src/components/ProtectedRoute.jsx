import React, { useEffect, useState } from 'react';
import { useUser } from '../store';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { userData, loading, isAuthenticated, checkAuth } = useUser();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

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

  // Show loading spinner during initial auth check
  if (loading || !initialCheckDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-chef-orange)] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
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
