// Utility functions for authentication handling

export const isTokenExpired = (error) => {
  // Check if the error indicates token expiration
  return (
    error?.response?.status === 401 ||
    error?.response?.data?.message?.includes('token') ||
    error?.response?.data?.message?.includes('expired') ||
    error?.response?.data?.message?.includes('unauthorized')
  );
};

export const shouldRedirectToLogin = (currentPath) => {
  // Define paths that don't require authentication
  const publicPaths = ['/'];
  
  return !publicPaths.includes(currentPath);
};

export const getRedirectPath = (isAuthenticated, currentPath) => {
  // If user is authenticated and on home page, redirect to explore
  if (isAuthenticated && currentPath === '/') {
    return '/explore';
  }
  
  // If user is not authenticated and on a protected route, redirect to home
  if (!isAuthenticated && shouldRedirectToLogin(currentPath)) {
    return '/';
  }
  
  // No redirect needed
  return null;
};

export default {
  isTokenExpired,
  shouldRedirectToLogin,
  getRedirectPath
};
