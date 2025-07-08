import React, { useState, useEffect } from 'react';
import {
  ChefHat, Leaf, WheatOff, Nut, MilkOff, Droplets, Info, XCircle, Copy, Loader2, FishOff, EggOff, Shell, Ban, Carrot, Scale, HeartPulse, LogOut, Lightbulb, Check
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
  signInWithCustomToken,
  updateProfile // Import updateProfile to add username
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

// --- Firebase Initialization (Outside Component for Singleton Instances) ---
// Ensure global variables are accessed safely to prevent 'not defined' errors during compilation
const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';
const firebaseConfig = typeof window.__firebase_config !== 'undefined' ? JSON.parse(window.__firebase_config) : {
  apiKey: "AIzaSyBLTrNNWXfTwuVXna99inJYOGVJzB_Pyqk", // Replace with your actual key for local testing
  authDomain: "ingredient-replacer-app.firebaseapp.com",
  projectId: "ingredient-replacer-app",
  storageBucket: "ingredient-replacer-app.appspot.com",
  messagingSenderId: "779188884903",
  appId: "1:779188884903:web:cb0efdb475c69a6e7fd282",
  measurementId: "G-R6J5CZGY1R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// -------------------------------------------------------------------------

const App = () => {
  // State variables for application data
  const [recipeInput, setRecipeInput] = useState('');
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [processedRecipe, setProcessedRecipe] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Firebase related states
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [isSignupMode, setIsSignupMode] = useState(false); // To toggle between login/signup forms
  const [history, setHistory] = useState([]);
  const [isAuthAttempted, setIsAuthAttempted] = useState(false); // To track if initial auth attempt is done

  // New state for Recipe Idea Generator
  const [recipeIdeaKeywords, setRecipeIdeaKeywords] = useState('');
  const [mealType, setMealType] = useState('');
  const [generatedRecipeIdea, setGeneratedRecipeIdea] = useState('');
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);
  const [ideaMessage, setIdeaMessage] = useState({ text: '', type: '' });


  // Define available dietary restrictions with their labels and icons
  const restrictions = [
    { id: 'vegan', label: 'Vegan', icon: Leaf },
    { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
    { id: 'nut-allergy', label: 'Nut-Allergy', icon: Nut },
    { id: 'lactose-free', label: 'Lactose-Free', icon: MilkOff },
    { id: 'diabetic-safe', label: 'Diabetic-Safe', icon: Droplets },
    { id: 'pescatarian', label: 'Pescatarian', icon: FishOff },
    { id: 'egg-free', label: 'Egg-Free', icon: EggOff },
    { id: 'soy-free', label: 'Soy-Free', icon: Ban },
    { id: 'shellfish-free', label: 'Shellish-Free', icon: Shell },
    { id: 'low-carb', label: 'Low-Carb', icon: Carrot },
    { id: 'low-sodium', label: 'Low-Sodium', icon: Scale },
    { id: 'heart-healthy', label: 'Heart-Healthy', icon: HeartPulse },
  ];

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer'];

  // Effect for Firebase Authentication State Management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged fired. currentUser:", currentUser);
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
        fetchProcessedRecipes(currentUser.uid);
        setIsAuthAttempted(true); // Auth state is now known
      } else {
        setUser(null);
        setUserId(null);
        setHistory([]);
        // Only attempt initial anonymous/custom token sign-in if no user is found
        // and we haven't already attempted an initial sign-in.
        if (!isAuthAttempted) {
          console.log("Attempting initial sign-in...");
          if (typeof window.__initial_auth_token !== 'undefined' && window.__initial_auth_token) {
            signInWithCustomToken(auth, window.__initial_auth_token)
              .then(() => {
                console.log("Signed in with custom token.");
                // onAuthStateChanged will re-fire with the custom token user
              })
              .catch((error) => {
                console.error("Custom token sign-in failed:", error);
                signInAnonymously(auth)
                  .then((userCredential) => {
                    console.log("Signed in anonymously (fallback). User ID:", userCredential.user.uid);
                    // onAuthStateChanged will re-fire with the anonymous user
                  })
                  .catch((anonError) => {
                    console.error("Anonymous sign-in failed:", anonError);
                    setMessage({ text: "Authentication failed. Please refresh.", type: "error" });
                  });
              })
              .finally(() => {
                setIsAuthAttempted(true); // Mark attempt as done regardless of success/failure
              });
          } else {
            signInAnonymously(auth)
              .then((userCredential) => {
                console.log("Signed in anonymously. User ID:", userCredential.user.uid);
                // onAuthStateChanged will re-fire with the anonymous user
              })
              .catch((anonError) => {
                console.error("Anonymous sign-in failed:", anonError);
                setMessage({ text: "Authentication failed. Please refresh.", type: "error" });
              })
              .finally(() => {
                setIsAuthAttempted(true); // Mark attempt as done
              });
          }
        }
      }
    });

    return () => unsubscribe();
  }, [auth, isAuthAttempted]); // Add isAuthAttempted to dependency array

  // Helper function for email validation
  const isValidEmail = (email) => {
    // Basic regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handler for changes in the recipe input textarea
  const handleRecipeInputChange = (event) => {
    setRecipeInput(event.target.value);
    setMessage({ text: '', type: '' });
  };

  // Handler for checkbox changes for dietary restrictions
  const handleRestrictionChange = (event) => {
    const { id, checked } = event.target;
    setSelectedRestrictions((prev) =>
      checked ? [...prev, id] : prev.filter((restriction) => restriction !== id)
    );
    setMessage({ text: '', type: '' });
    setIdeaMessage({ text: '', type: '' }); // Clear idea message too
  };

  // Function to clear the recipe input
  const clearRecipeInput = () => {
    setRecipeInput('');
    setProcessedRecipe('');
    setExplanation('');
    setMessage({ text: 'Recipe input cleared!', type: 'success' });
  };

  // Function to copy the processed recipe to clipboard
  const copyProcessedRecipe = () => {
    if (processedRecipe) {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = processedRecipe.replace(/<br\/>/g, '\n').replace(/\*\*(.*?)\*\*/g, '$1');
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      try {
        document.execCommand('copy');
        setMessage({ text: 'Recipe copied to clipboard!', type: 'success' });
      } catch (err) {
        setMessage({ text: 'Failed to copy recipe.', type: 'error' });
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(tempTextArea);
    }
  };

  // Firebase Authentication Handlers
  const handleLogin = () => {
    setMessage({ text: '', type: '' }); // Clear previous messages
    if (!isValidEmail(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login successful:", userCredential.user);
        setMessage({ text: 'Logged in successfully!', type: 'success' });
        // onAuthStateChanged will handle setting user state and fetching data
      })
      .catch(err => {
        console.error("Login failed:", err);
        setMessage({ text: `Login failed: ${err.message}`, type: 'error' });
      });
  };

  const handleSignup = async () => {
    setMessage({ text: '', type: '' }); // Clear previous messages
    if (!username.trim()) {
      setMessage({ text: 'Please enter a username.', type: 'error' });
      return;
    }
    if (!isValidEmail(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match.', type: 'error' });
      return; // Stop execution if passwords don't match
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful, user:", userCredential.user);
      // Update user profile with username
      await updateProfile(userCredential.user, { displayName: username });
      console.log("User profile updated with username:", username);
      setMessage({ text: 'Account created successfully! Welcome!', type: 'success' });
      // onAuthStateChanged will handle setting user state and fetching data
    } catch (err) {
      console.error("Signup failed:", err);
      setMessage({ text: `Sign up failed: ${err.message}`, type: 'error' });
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully.");
        setMessage({ text: 'Signed out successfully!', type: 'success' });
        setHistory([]);
        setEmail('');
        setPassword('');
        setUsername('');
        setConfirmPassword('');
        setRecipeInput('');
        setProcessedRecipe('');
        setExplanation('');
        setRecipeIdeaKeywords('');
        setMealType('');
        setGeneratedRecipeIdea('');
      })
      .catch(err => {
        console.error("Logout failed:", err);
        setMessage({ text: `Logout failed: ${err.message}`, type: 'error' });
      });
  };

  // Function to fetch processed recipes from Firestore
  const fetchProcessedRecipes = async (currentUserId) => {
    if (!currentUserId) {
      console.warn("No user ID available to fetch recipes.");
      setHistory([]);
      return;
    }
    try {
      console.log("Fetching recipes for user:", currentUserId);
      const recipesCollectionRef = collection(db, `artifacts/${appId}/users/${currentUserId}/processed_recipes`);
      const q = query(recipesCollectionRef);
      const querySnapshot = await getDocs(q);
      const recipes = [];
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });

      recipes.sort((a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0));

      setHistory(recipes);
      console.log("Fetched recipes:", recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setMessage({ text: "Failed to load past recipes.", type: "error" });
    }
  };

  // Function to process the recipe using the Gemini AI API
  const processRecipe = async () => {
    if (!recipeInput.trim()) {
      setMessage({ text: 'Please paste a recipe to process.', type: 'error' });
      return;
    }
    if (selectedRestrictions.length === 0) {
      setMessage({ text: 'Please select at least one dietary restriction.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'Processing your recipe...', type: 'info' });
    setProcessedRecipe('');
    setExplanation('');

    let chatHistory = [];
    const prompt = `Rewrite the following recipe for a ${selectedRestrictions.map(r => r.replace('-', ' ')).join(', ')} diet.
            Provide specific ingredient substitutions and adjust instructions as necessary.
            After the rewritten recipe, include a separate section clearly labeled "EXPLANATION:"
            In the explanation section, detail *why* each substitution was made, referencing the selected dietary restrictions.

            Original Recipe:
            ${recipeInput}`;

    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will provide this at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCoJr-gFD3tbG_ptBuCShCqcFsJ_03UxUU`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {

            const aiResponseText = result.candidates[0].content.parts[0].text;

            const parts = aiResponseText.split('EXPLANATION:');
            const recipeSection = parts[0] ? parts[0].trim() : '';
            const explanationSection = parts[1] ? parts[1].trim() : "No specific explanation provided by AI.";

            setProcessedRecipe(recipeSection);
            setExplanation(explanationSection);
            setMessage({ text: 'Recipe processed successfully!', type: 'success' });

            if (userId) {
              try {
                const docRef = await addDoc(collection(db, `artifacts/${appId}/users/${userId}/processed_recipes`), {
                  originalRecipe: recipeInput,
                  restrictions: selectedRestrictions,
                  rewrittenRecipe: recipeSection,
                  explanation: explanationSection,
                  timestamp: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                fetchProcessedRecipes(userId);
              } catch (e) {
                console.error("Error adding document to Firestore: ", e);
                setMessage({ text: "Failed to save recipe history.", type: "error" });
              }
            } else {
              console.warn("User ID not available, skipping Firestore save.");
            }

        } else {
            setMessage({ text: 'Failed to get a valid response from the AI. Please try again.', type: 'error' });
        }
    } catch (error) {
        console.error('Error calling AI:', error);
        setMessage({ text: 'An error occurred during processing. Please try again.', type: 'error' });
    } finally {
        setIsLoading(false);
    }
  };

  // NEW FEATURE: Generate Recipe Idea using Gemini API
  const generateRecipeIdea = async () => {
    if (!recipeIdeaKeywords.trim() && !mealType) {
      setIdeaMessage({ text: 'Please enter keywords or select a meal type to generate an idea.', type: 'error' });
      return;
    }

    setIsGeneratingIdea(true);
    setIdeaMessage({ text: 'Generating recipe idea...', type: 'info' });
    setGeneratedRecipeIdea('');

    let ideaPrompt = `Generate a ${mealType ? mealType.toLowerCase() + ' ' : ''}recipe idea`;
    if (recipeIdeaKeywords) {
      ideaPrompt += ` using keywords like "${recipeIdeaKeywords}"`;
    }
    if (selectedRestrictions.length > 0) {
      ideaPrompt += ` that is ${selectedRestrictions.map(r => r.replace('-', ' ')).join(', ')}`;
    }
    ideaPrompt += `. Provide ingredients and simple instructions.`;

    let chatHistory = [{ role: "user", parts: [{ text: ideaPrompt }] }];

    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will provide this at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCoJr-gFD3tbG_ptBuCShCqcFsJ_03UxUU`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setGeneratedRecipeIdea(aiResponseText);
        setIdeaMessage({ text: 'Recipe idea generated!', type: 'success' });
      } else {
        setIdeaMessage({ text: 'Failed to generate recipe idea. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error generating recipe idea:', error);
      setIdeaMessage({ text: 'An error occurred while generating idea. Please try again.', type: 'error' });
    } finally {
      setIsGeneratingIdea(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 font-inter relative overflow-hidden">
      {/* Background image container */}
      <div className="absolute inset-0 z-0"
           style={{
             backgroundImage: `url("image.jpg")` , // New high-quality food image
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed',
             backgroundColor: '#f0f8ff', // Fallback color
             opacity:1 // Adjust opacity to make content more readable
           }}>
             {/* Background blobs are now inside this image container to blend better */}
             <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob-1"></div>
             <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob-2"></div>
             <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-3"></div>
             <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-45 animate-blob-4"></div>
      </div>


      {/* Header */}
      <header className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg mb-8 text-center relative z-10 flex flex-col sm:flex-row items-center justify-between animate-slide-in-top border border-gray-100">
        <div className="flex items-center justify-center sm:justify-start flex-grow">
          <ChefHat className="w-8 h-8 mr-3 text-green-600 animate-bounce-slow" />
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">AI Ingredient Replacer</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center justify-center">
          {user ? (
            <div className="text-gray-600 text-sm flex items-center">
              Logged in as: <span className="font-semibold ml-1">{user.displayName || user.email || "Guest"}</span>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-sm font-semibold transition-colors duration-200 flex items-center shadow-md animate-pulse-on-hover"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3 w-full">
              {/* Login/Signup Toggle */}
              <div className="flex justify-center gap-4 mb-4 w-full">
                <button
                  onClick={() => { setIsSignupMode(false); setMessage({text:'', type:''}); }}
                  className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
                    !isSignupMode ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => { setIsSignupMode(true); setMessage({text:'', type:''}); }}
                  className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
                    isSignupMode ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {isSignupMode ? (
                // Signup Form
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="p-2 rounded-md bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-xs border border-gray-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded-md bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-xs border border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded-md bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-xs border border-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="p-2 rounded-md bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-xs border border-gray-300"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    onClick={handleSignup}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm font-semibold transition-colors duration-200 shadow-md animate-pulse-on-hover w-full max-w-xs"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                // Login Form
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded-md bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs border border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded-md bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs border border-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={handleLogin}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm font-semibold transition-colors duration-200 shadow-md animate-pulse-on-hover w-full max-w-xs"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Message Display Area (for login/signup and other messages) */}
      {message.text && (
        <div className={`mt-4 p-3 rounded-lg text-center font-semibold flex items-center justify-center animate-fade-in w-full max-w-3xl
          ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
            message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
            'bg-blue-100 text-blue-700 border border-blue-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Content Area */}
      {user && (
        <main className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl flex flex-col gap-8 border border-gray-200 relative z-10 animate-fade-in-scale">
          {/* Top Row: Paste Recipe & Select Restrictions */}
          <div className="flex flex-col md:flex-row gap-8">
            <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 animate-slide-in-section md:w-1/2" style={{animationDelay: '0.3s'}}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 flex items-center border-b-2 border-gray-300">
                Paste Your Recipe
                <button
                  onClick={clearRecipeInput}
                  className="ml-auto text-sm text-red-500 hover:text-red-700 flex items-center transition-colors duration-200 transform hover:scale-105 animate-pulse-on-hover"
                  title="Clear Recipe Input"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Clear
                </button>
              </h2>
              <textarea
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white text-gray-800 resize-y shadow-inner transition-all duration-300 placeholder-gray-500"
                placeholder="Paste your recipe here..."
                value={recipeInput}
                onChange={handleRecipeInputChange}
              ></textarea>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 animate-slide-in-section md:w-1/2" style={{animationDelay: '0.6s'}}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
                Select Restrictions
              </h2>
              <div className="grid grid-cols-3 gap-4"> {/* Changed to 3 columns directly */}
                {restrictions.map((restriction) => {
                  const Icon = restriction.icon;
                  const isSelected = selectedRestrictions.includes(restriction.id);
                  return (
                    <label
                      key={restriction.id}
                      className={`
                        flex items-center justify-center p-3 rounded-lg cursor-pointer
                        transition-all duration-200 ease-in-out border text-center
                        min-h-[80px] min-w-[80px]
                        ${isSelected
                          ? 'bg-green-500 border-green-600 text-white shadow-md transform scale-102'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-green-100 hover:shadow-sm'
                        } animate-fade-in-item
                      `}
                      style={{animationDelay: `${0.6 + (restrictions.indexOf(restriction) * 0.05)}s`}}
                    >
                      <input
                        type="checkbox"
                        id={restriction.id}
                        checked={isSelected}
                        onChange={handleRestrictionChange}
                        className="sr-only" // Visually hide the checkbox but keep it functional
                      />
                      <div className="flex flex-col items-center justify-center"> {/* Flex container for icon and text */}
                          <Icon className={`w-6 h-6 mb-1 ${isSelected ? 'text-white' : 'text-gray-700'}`} /> {/* Icon */}
                          <span className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-700'}`}>{restriction.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <button
                onClick={processRecipe}
                disabled={isLoading}
                className={`mt-8 w-full py-3 px-6 rounded-lg text-white font-bold text-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg
                  ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white animate-pulse-on-hover'
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  'Process Recipe'
                )}
              </button>

              {message.text && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold flex items-center justify-center animate-fade-in
                  ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
                    message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
                    'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}
                >
                  {message.text}
                </div>
              )}
            </section>
          </div>

          {/* Middle Row: Rewritten Recipe & Recipe Idea Generator */}
          <div className="flex flex-col md:flex-row gap-8">
            <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 animate-slide-in-section md:w-1/2" style={{animationDelay: '0.9s'}}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 flex items-center border-b-2 border-gray-300">
                Rewritten Recipe
                {processedRecipe && (
                  <button
                    onClick={copyProcessedRecipe}
                    className="ml-auto text-sm text-blue-500 hover:text-blue-700 flex items-center transition-colors duration-200 transform hover:scale-105 animate-pulse-on-hover"
                    title="Copy Recipe to Clipboard"
                  >
                    <Copy className="w-4 h-4 mr-1" /> Copy
                  </button>
                )}
              </h2>
              {processedRecipe ? (
                <div className="text-gray-900 bg-white p-4 rounded-md border border-gray-200 shadow-sm animate-fade-in text-sm leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: processedRecipe.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-500" />
                    Why These Replacements?
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              ) : (
                <p className="text-gray-500 italic text-center py-10">
                  Processed recipe will appear here.
                </p>
              )}
            </section>

            <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 animate-slide-in-section md:w-1/2" style={{animationDelay: '1.2s'}}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 flex items-center border-b-2 border-gray-300">
                Generate Recipe Idea ✨
                <Lightbulb className="w-5 h-5 ml-2 text-yellow-600" />
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="keywords" className="block text-gray-700 text-sm font-medium mb-1">Keywords (e.g., chicken, spicy, quick):</label>
                  <input
                    type="text"
                    id="keywords"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 bg-white text-gray-800 placeholder-gray-500"
                    value={recipeIdeaKeywords}
                    onChange={(e) => { setRecipeIdeaKeywords(e.target.value); setIdeaMessage({ text: '', type: '' }); }}
                    placeholder="e.g., pasta, vegetarian, easy"
                  />
                </div>
                <div>
                  <label htmlFor="mealType" className="block text-gray-700 text-sm font-medium mb-1">Meal Type:</label>
                  <select
                    id="mealType"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 bg-white text-gray-800"
                    value={mealType}
                    onChange={(e) => { setMealType(e.target.value); setIdeaMessage({ text: '', type: '' }); }}
                  >
                    <option value="">Any</option>
                    {mealTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <p className="text-gray-600 text-sm italic">
                  Note: Dietary restrictions selected above will also apply to the generated idea.
                </p>
                <button
                  onClick={generateRecipeIdea}
                  disabled={isGeneratingIdea}
                  className={`w-full py-3 px-6 rounded-lg text-white font-bold text-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg
                    ${isGeneratingIdea
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-white animate-pulse-on-hover'
                    }`}
                >
                  {isGeneratingIdea ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...
                    </>
                  ) : (
                    'Generate Idea ✨'
                  )}
                </button>
              </div>
              {ideaMessage.text && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold flex items-center justify-center animate-fade-in
                  ${ideaMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
                    ideaMessage.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
                    'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}
                >
                  {ideaMessage.text}
                </div>
              )}
              {generatedRecipeIdea && (
                <div className="mt-6 text-gray-900 bg-white p-4 rounded-md border border-gray-200 shadow-sm animate-fade-in text-sm leading-relaxed">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" /> Your Recipe Idea:
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: generatedRecipeIdea.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              )}
            </section>
          </div>

          {/* History Section (remains full width) */}
          <section className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 animate-slide-in-section" style={{animationDelay: '1.5s'}}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Your Recipe History
            </h2>
            {history.length === 0 ? (
              <p className="text-gray-500 italic text-center py-5">No previous recipes found. Process a recipe to save it here!</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto p-2 pr-4 custom-scrollbar">
                {history.map((h, index) => (
                  <div key={h.id || index} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white animate-fade-in-item" style={{animationDelay: `${1.5 + (index * 0.05)}s`}}>
                    <p className="text-xs text-gray-600 mb-2">Processed on: {h.timestamp ? new Date(h.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</p>
                    <h3 className="font-semibold text-gray-800 mb-1">Original Recipe:</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-100 p-2 rounded-md border border-gray-200">{h.originalRecipe}</pre>
                    <h3 className="font-semibold text-gray-800 mt-3 mb-1">Rewritten Recipe:</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-100 p-2 rounded-md border border-gray-200">{h.rewrittenRecipe.replace(/\*\*(.*?)\*\*/g, '$1')}</pre>
                    <h3 className="font-semibold text-gray-800 mt-3 mb-1">Explanation:</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-100 p-2 rounded-md border border-gray-200">{h.explanation.replace(/\*\*(.*?)\*\*/g, '$1')}</pre>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="w-full max-w-3xl bg-white text-gray-600 p-6 rounded-xl shadow-inner mt-8 text-center relative z-10 animate-slide-in-bottom border border-gray-100">
        <p className="text-sm opacity-80">&copy; 2025 AI-Powered Ingredient Replacer. All rights reserved.</p>
        <p className="text-xs mt-1 opacity-70">Empowering healthy eating without compromise.</p>
      </footer>

      {/* Custom CSS for animations and custom scrollbar */}
      <style>
        {`
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
        .animate-fade-in-scale { animation: fadeInScale 0.7s ease-out forwards; animation-delay: 0.2s; }

        /* Section Entrance */
        @keyframes slideInSection {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-section { animation: slideInSection 0.6s ease-out forwards; opacity: 0; }

        /* Item Fade In (for checkboxes and history items) */
        @keyframes fadeInItem {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-item { animation: fadeInItem 0.4s ease-out forwards; opacity: 0; }

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
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9e9e9e; /* Darker thumb on hover */
        }
        `}
      </style>
    </div>
  );
};

export default App;
