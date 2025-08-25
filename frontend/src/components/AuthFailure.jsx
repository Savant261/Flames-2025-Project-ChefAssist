import { useEffect } from 'react';

const AuthFailure = () => {
  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Failed</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't sign you in with Google. This might be due to:
        </p>
        <ul className="text-left text-sm text-gray-500 mb-6 space-y-1">
          <li>• Cancelled authentication</li>
          <li>• Network issues</li>
          <li>• Server problems</li>
        </ul>
        <p className="text-sm text-gray-500">
          Redirecting to home page in a few seconds...
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 px-6 py-2 bg-[#D35400] text-white rounded-lg hover:bg-[#B8430A] transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default AuthFailure;
