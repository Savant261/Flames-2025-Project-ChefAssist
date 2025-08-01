import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import userService from '../../api/userService';
import api from '../../api/axiosInstance';

// Initial state
const initialState = {
  userData: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Action types
const USER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case USER_ACTIONS.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      };
    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case USER_ACTIONS.LOGOUT:
      return {
        ...initialState,
        loading: false
      };
    case USER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Ensure we have a stable reference to prevent re-renders
  const stableState = useMemo(() => state, [state]);

  // Add a provider ID to help debug context issues
  const [providerId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  useEffect(() => {
    console.log('UserProvider initialized with ID:', providerId);
  }, [providerId]);

  // Action creators
  const setLoading = useCallback((loading) => {
    dispatch({ type: USER_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setUserData = useCallback((userData) => {
    dispatch({ type: USER_ACTIONS.SET_USER_DATA, payload: userData });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error });
  }, []);

  const logout = useCallback(() => {
    // Call logout API endpoint to clear server-side session/cookie
    api.post('/auth/logout').catch(error => {
      console.error('Logout API call failed:', error);
    });
    
    // Clear local storage token (if any)
    localStorage.removeItem('token');
    
    dispatch({ type: USER_ACTIONS.LOGOUT });
    
    // Redirect to home page after logout
    window.location.href = '/';
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  }, []);

  // Check authentication on mount
  const checkAuth = useCallback(async (redirectOnFail = false) => {
    try {
      setLoading(true);
      
      // For this app, we use cookies instead of localStorage tokens
      // So we'll always try to check with the server
      const response = await api.get('/auth/check');
      setUserData(response.data);
      
      // If user is authenticated and on home page, redirect to explore
      if (response.data && window.location.pathname === '/') {
        window.location.href = '/explore';
      }
      
      return response.data;
    } catch (error) {
      console.error('Auth check failed:', error);
      
      // If auth check fails, user is not authenticated
      setUserData(null);
      setError(null); // Don't show error for failed auth check
      
      // If redirectOnFail is true and not on home page, redirect to home
      if (redirectOnFail && window.location.pathname !== '/') {
        window.location.href = '/';
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUserData, setError]);  // Login function
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post('/auth/signin', credentials);
      
      // Store token is handled by the server setting cookie
      
      // Set user data
      setUserData(response.data);
      
      // Redirect to explore page after successful login
      window.location.href = '/explore';
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post('/auth/signup', userData);
      
      // Store token is handled by the server setting cookie
      
      // Set user data
      setUserData(response.data);
      
      // Redirect to explore page after successful registration
      window.location.href = '/explore';
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Update user profile
  const updateProfile = useCallback(async (updateData) => {
    try {
      setLoading(true);
      clearError();
      
      const updatedUser = await userService.updateProfile(updateData);
      setUserData(updatedUser);
      
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Update avatar only
  const updateAvatar = useCallback(async (avatarFile) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/update-profile-photo", {
        avatar: avatarFile
      });
      
      // Update with the complete user data from response
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Update basic profile info (name, bio, social links)
  const updateBasicProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/update-profile", profileData);
      
      // Update the user data with the complete response from server
      // The backend now returns the complete updated user object
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Update user preferences
  const updatePreferences = useCallback(async (preferencesData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/update-Preference", preferencesData);
      
      // Update the user data with the complete response from server
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Update email
  const updateEmail = useCallback(async (email) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/update-Email", { email });
      
      // Update the user data with the complete response from server
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Update phone number
  const updatePhoneNumber = useCallback(async (phoneNo) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/update-PhoneNumber", { phoneNo });
      
      // Update the user data with the complete response from server
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Change password
  const changePassword = useCallback(async (oldPassword, newPassword) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/change-Password", { 
        oldPassword, 
        newPassword 
      });
      
      // Update the user data with the complete response from server
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Toggle public profile
  const togglePublicProfile = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await api.post("/auth/public-Profile-toogle");
      
      // Update the user data with the complete response from server
      const updatedUserData = { ...response.data };
      delete updatedUserData.message; // Remove the message field
      
      setUserData(updatedUserData);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setUserData, setError]);

  // Check auth on mount and setup periodic validation
  useEffect(() => {
    let mounted = true;
    
    const performInitialCheck = async () => {
      if (mounted) {
        await checkAuth(false); // Don't redirect on initial check
      }
    };
    
    performInitialCheck();
    
    return () => {
      mounted = false;
    };
  }, [checkAuth]);

  const value = useMemo(() => ({
    // State
    ...stableState,
    providerId,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    updateAvatar,
    updateBasicProfile,
    updatePreferences,
    updateEmail,
    updatePhoneNumber,
    changePassword,
    togglePublicProfile,
    checkAuth,
    setLoading,
    setError,
    clearError
  }), [
    stableState,
    providerId,
    login,
    register,
    logout,
    updateProfile,
    updateAvatar,
    updateBasicProfile,
    updatePreferences,
    updateEmail,
    updatePhoneNumber,
    changePassword,
    togglePublicProfile,
    checkAuth,
    setLoading,
    setError,
    clearError
  ]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  try {
    const context = useContext(UserContext);
    if (!context) {
      console.error('useUser called outside of UserProvider');
      console.log('Available context:', context);
      // Return a default state instead of throwing error to prevent app crash
      return {
        userData: null,
        isAuthenticated: false,
        loading: false,
        error: 'No provider found',
        providerId: 'none',
        login: async () => { console.warn('UserProvider not available'); },
        register: async () => { console.warn('UserProvider not available'); },
        logout: () => { console.warn('UserProvider not available'); },
        updateProfile: async () => { console.warn('UserProvider not available'); },
        updateAvatar: async () => { console.warn('UserProvider not available'); },
        updateBasicProfile: async () => { console.warn('UserProvider not available'); },
        updatePreferences: async () => { console.warn('UserProvider not available'); },
        updateEmail: async () => { console.warn('UserProvider not available'); },
        updatePhoneNumber: async () => { console.warn('UserProvider not available'); },
        changePassword: async () => { console.warn('UserProvider not available'); },
        togglePublicProfile: async () => { console.warn('UserProvider not available'); },
        checkAuth: () => { console.warn('UserProvider not available'); },
        setLoading: () => { console.warn('UserProvider not available'); },
        setError: () => { console.warn('UserProvider not available'); },
        clearError: () => { console.warn('UserProvider not available'); }
      };
    }
    return context;
  } catch (error) {
    console.error('Error in useUser hook:', error);
    // Return default state if there's any error
    return {
      userData: null,
      isAuthenticated: false,
      loading: false,
      error: 'Context error',
      providerId: 'error',
      login: async () => {},
      register: async () => {},
      logout: () => {},
      updateProfile: async () => {},
      updateAvatar: async () => {},
      updateBasicProfile: async () => {},
      updatePreferences: async () => {},
      updateEmail: async () => {},
      updatePhoneNumber: async () => {},
      changePassword: async () => {},
      togglePublicProfile: async () => {},
      checkAuth: () => {},
      setLoading: () => {},
      setError: () => {},
      clearError: () => {}
    };
  }
};

export default UserContext;
