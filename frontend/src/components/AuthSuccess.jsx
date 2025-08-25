import { useEffect } from 'react';
import { useUser } from '../store';

const AuthSuccess = () => {
  const { checkAuth } = useUser();

  useEffect(() => {
    // After Google OAuth redirect, check auth status and redirect
    const handleAuthSuccess = async () => {
      try {
        await checkAuth(false, true); // Force check auth
        // Redirect will be handled by the UserContext
      } catch (error) {
        console.error('Auth verification failed:', error);
        window.location.href = '/';
      }
    };

    handleAuthSuccess();
  }, [checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D35400] mx-auto"></div>
        <p className="mt-4 text-lg text-[#6B4F3A]">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
