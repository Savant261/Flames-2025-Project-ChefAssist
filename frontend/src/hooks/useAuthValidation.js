import { useEffect, useCallback } from 'react';
import { useUser } from '../store';

// Hook to periodically validate authentication token
export const useAuthValidation = () => {
  const { checkAuth, isAuthenticated, userData } = useUser();

  const validateAuth = useCallback(async () => {
    // Only validate if user is currently authenticated
    if (isAuthenticated && userData) {
      try {
        await checkAuth(true); // Pass true to redirect on failure
      } catch (error) {
        console.error('Auth validation failed:', error);
      }
    }
  }, [checkAuth, isAuthenticated, userData]);

  useEffect(() => {
    // Set up periodic auth validation (every 15 minutes)
    const interval = setInterval(() => {
      validateAuth();
    }, 15 * 60 * 1000); // 15 minutes

    // Also validate on page focus (when user returns to tab)
    const handleFocus = () => {
      validateAuth();
    };

    // Add event listener for page focus
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [validateAuth]);

  return { validateAuth };
};

export default useAuthValidation;
