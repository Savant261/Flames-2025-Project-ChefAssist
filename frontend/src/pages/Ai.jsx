import React, { useState, useEffect } from 'react';
import {
    ChefHat, Leaf, WheatOff, Nut, MilkOff, Droplets, Info, XCircle, Copy, Loader2, FishOff, EggOff, Shell, Ban, Carrot, Scale, HeartPulse, LogOut, Lightbulb, Check
} from 'lucide-react';

const ai = () => {
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

    // Add state for expanded history cards and loading overlay
    const [expandedHistory, setExpandedHistory] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);

    // Add state for favorites and scroll-to-top
    const [favorites, setFavorites] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Toggle expand/collapse for history card
    const toggleHistoryCard = (idx) => {
        setExpandedHistory((prev) => ({ ...prev, [idx]: !prev[idx] }));
    };

    // Clear history handler
    const clearHistory = () => {
        setHistory([]);
        setMessage({ text: 'Recipe history cleared!', type: 'success' });
    };

    // Show overlay when loading/generating
    useEffect(() => {
        setShowOverlay(isLoading || isGeneratingIdea);
    }, [isLoading, isGeneratingIdea]);

    // Show scroll-to-top button on scroll
    useEffect(() => {
        const onScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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

    // Add to favorites
    const addToFavorites = (recipe) => {
        setFavorites((prev) => [...prev, recipe]);
        setMessage({ text: 'Recipe added to favorites!', type: 'success' });
    };

    // Share recipe
    const shareRecipe = (recipe) => {
        navigator.clipboard.writeText(recipe);
        setMessage({ text: 'Recipe copied for sharing!', type: 'success' });
    };

    // Scroll to top handler
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 md:flex-row justify-between items-center px-8 py-12 gap-16 flex-1">
                <main className="w-full max-w-4xl mx-auto justify-between items-center bg-white/80 p-8 rounded-2xl shadow-2xl flex flex-col gap-10 border-4 border-pink-200 relative z-10 animate-fade-in-scale">
                    {/* Top Row: Paste Recipe & Select Restrictions */}
                    <div className="flex flex-col md:flex-row gap-8">
                        <section className="bg-white/90 p-8 rounded-2xl shadow-2xl border-4 border-pink-300 animate-slide-in-section md:w-1/2 transition-all duration-300 focus-within:ring-4 focus-within:ring-pink-400 hover:shadow-3xl hover:border-pink-400" style={{ animationDelay: '0.3s' }}>
                            <h2 className="text-2xl font-extrabold text-pink-700 mb-6 pb-2 flex items-center border-b-4 border-pink-300 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-t-2xl px-4">
                                Paste Your Recipe
                                <button
                                    onClick={clearRecipeInput}
                                    className="ml-auto text-sm text-red-500 hover:text-red-700 flex items-center transition-colors duration-200 transform hover:scale-105 animate-pulse-on-hover bg-white/80 px-3 py-2 rounded shadow"
                                    title="Clear Recipe Input"
                                >
                                    <XCircle className="w-4 h-4 mr-1" /> Clear
                                </button>
                            </h2>
                            <textarea
                                className="w-full h-56 p-5 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 bg-white text-gray-800 resize-y shadow-inner transition-all duration-300 placeholder-pink-400 text-lg"
                                placeholder="Paste your recipe here..."
                                value={recipeInput}
                                onChange={handleRecipeInputChange}
                            ></textarea>
                        </section>

                        <section className="bg-white/90 p-8 rounded-2xl shadow-2xl border-4 border-blue-300 animate-slide-in-section md:w-1/2 transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-400 hover:shadow-3xl hover:border-blue-400" style={{ animationDelay: '0.6s' }}>
                            <h2 className="text-2xl font-extrabold text-blue-700 mb-6 pb-2 border-b-4 border-blue-300 bg-gradient-to-r from-blue-100 to-pink-100 rounded-t-2xl px-4">
                                Select Restrictions
                            </h2>
                            <div className="grid grid-cols-3 gap-5">
                                {restrictions.map((restriction) => {
                                    const Icon = restriction.icon;
                                    const isSelected = selectedRestrictions.includes(restriction.id);
                                    return (
                                        <label
                                            key={restriction.id}
                                            className={`flex items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out border-2 text-center min-h-[80px] min-w-[80px] shadow-lg bg-gradient-to-br from-white via-pink-50 to-yellow-50 hover:from-pink-100 hover:to-yellow-100 ${isSelected ? 'bg-gradient-to-br from-green-400 via-green-200 to-green-100 border-green-600 shadow-xl transform scale-105' : 'border-blue-200 text-blue-700'} animate-fade-in-item`}
                                            style={{ animationDelay: `${0.6 + (restrictions.indexOf(restriction) * 0.05)}s` }}
                                        >
                                            <input
                                                type="checkbox"
                                                id={restriction.id}
                                                checked={isSelected}
                                                onChange={handleRestrictionChange}
                                                className="sr-only"
                                            />
                                            <div className="flex flex-col items-center justify-center">
                                                <Icon className={`w-7 h-7 mb-1 ${isSelected ? 'text-green-900 drop-shadow' : 'text-blue-700'}`} />
                                                <span className={`font-semibold text-base ${isSelected ? 'text-green-900' : 'text-blue-700'}`}>{restriction.label}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>

                            <button
                                // onClick={processRecipe}
                                disabled={isLoading}
                                className={`mt-8 w-full py-3 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-xl bg-blue-600 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 animate-pulse-on-hover'}`}
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
                                <div className={`mt-4 p-3 rounded-xl text-center font-semibold flex items-center justify-center animate-fade-in ${message.type === 'success' ? 'bg-green-100 text-green-700 border-2 border-green-300' : message.type === 'error' ? 'bg-red-100 text-red-700 border-2 border-red-300' : 'bg-blue-100 text-blue-700 border-2 border-blue-300'}`}
                                >
                                    {message.text}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Middle Row: Rewritten Recipe & Recipe Idea Generator */}
                    <div className="flex flex-col md:flex-row gap-8">
                        <section className="bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-6 rounded-xl shadow-lg border-2 border-yellow-300 animate-slide-in-section md:w-1/2" style={{ animationDelay: '0.9s' }}>
                            <h2 className="text-2xl font-extrabold text-yellow-700 mb-4 pb-2 flex items-center border-b-4 border-yellow-300 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-t-xl px-2">
                                Rewritten Recipe
                                {processedRecipe && (
                                    <button
                                        onClick={copyProcessedRecipe}
                                        className="ml-auto text-sm text-blue-500 hover:text-blue-700 flex items-center transition-colors duration-200 transform hover:scale-105 animate-pulse-on-hover bg-white/80 px-2 py-1 rounded shadow"
                                        title="Copy Recipe to Clipboard"
                                    >
                                        <Copy className="w-4 h-4 mr-1" /> Copy
                                    </button>
                                )}
                            </h2>
                            {processedRecipe ? (
                                <div className="text-gray-900 bg-white/90 p-4 rounded-xl border-2 border-yellow-200 shadow-md animate-fade-in text-base leading-relaxed">
                                    <div dangerouslySetInnerHTML={{ __html: processedRecipe.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    <h3 className="text-lg font-bold text-yellow-900 mt-6 mb-3 flex items-center">
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

                        <section className="bg-white/90 p-8 rounded-2xl shadow-2xl border-4 border-pink-300 animate-slide-in-section md:w-1/2 transition-all duration-300 focus-within:ring-4 focus-within:ring-pink-400 hover:shadow-3xl hover:border-pink-400" style={{ animationDelay: '1.2s' }}>
                            <h2 className="text-2xl font-extrabold text-pink-700 mb-6 pb-2 flex items-center border-b-4 border-pink-300 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-t-2xl px-4">
                                Generate Recipe Idea ✨
                                <Lightbulb className="w-5 h-5 ml-2 text-yellow-600" />
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="keywords" className="block text-pink-700 text-base font-semibold mb-1">Keywords (e.g., chicken, spicy, quick):</label>
                                    <input
                                        type="text"
                                        id="keywords"
                                        className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500 bg-white text-gray-800 placeholder-pink-400 text-lg"
                                        value={recipeIdeaKeywords}
                                        onChange={(e) => { setRecipeIdeaKeywords(e.target.value); setIdeaMessage({ text: '', type: '' }); }}
                                        placeholder="e.g., pasta, vegetarian, easy"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mealType" className="block text-pink-700 text-base font-semibold mb-1">Meal Type:</label>
                                    <select
                                        id="mealType"
                                        className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500 bg-white text-gray-800 text-lg"
                                        value={mealType}
                                        onChange={(e) => { setMealType(e.target.value); setIdeaMessage({ text: '', type: '' }); }}
                                    >
                                        <option value="">Any</option>
                                        {mealTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-pink-600 text-base italic">
                                    Note: Dietary restrictions selected above will also apply to the generated idea.
                                </p>
                                <button
                                    //   onClick={generateRecipeIdea}
                                    disabled={isGeneratingIdea}
                                    className={`w-full py-3 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-xl bg-pink-600 ${isGeneratingIdea ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-400 animate-pulse-on-hover'}`}
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
                                <div className={`mt-4 p-3 rounded-xl text-center font-semibold flex items-center justify-center animate-fade-in ${ideaMessage.type === 'success' ? 'bg-green-100 text-green-700 border-2 border-green-300' : ideaMessage.type === 'error' ? 'bg-red-100 text-red-700 border-2 border-red-300' : 'bg-blue-100 text-blue-700 border-2 border-blue-300'}`}
                                >
                                    {ideaMessage.text}
                                </div>
                            )}
                            {generatedRecipeIdea && (
                                <div className="mt-6 text-gray-900 bg-white/90 p-4 rounded-xl border-2 border-pink-200 shadow-md animate-fade-in text-base leading-relaxed">
                                    <h3 className="text-lg font-bold text-pink-900 mb-3 flex items-center">
                                        <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" /> Your Recipe Idea:
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: generatedRecipeIdea.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </div>
                            )}
                        </section>
                    </div>

                    {/* History Section (remains full width) */}
                    <section className="bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-6 rounded-2xl shadow-xl border-4 border-blue-200 animate-slide-in-section" style={{ animationDelay: '1.5s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-extrabold text-blue-700 pb-2 border-b-4 border-blue-300 bg-gradient-to-r from-blue-100 to-pink-100 rounded-t-xl px-2">
                                Your Recipe History
                            </h2>
                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="ml-4 px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    title="Clear Recipe History"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                        {history.length === 0 ? (
                            <p className="text-gray-500 italic text-center py-5">No previous recipes found. Process a recipe to save it here!</p>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto p-2 pr-4 custom-scrollbar">
                                {history.map((h, index) => {
                                    const expanded = expandedHistory[index];
                                    return (
                                        <div
                                            key={h.id || index}
                                            className={`border-2 border-pink-200 rounded-xl p-4 shadow-lg bg-white/90 animate-fade-in-item transition-all duration-300 hover:shadow-2xl cursor-pointer ${expanded ? 'ring-2 ring-pink-400 animate-expand-card' : 'animate-collapse-card'}`}
                                            style={{ animationDelay: `${1.5 + (index * 0.05)}s` }}
                                            onClick={() => toggleHistoryCard(index)}
                                            title={expanded ? 'Click to collapse' : 'Click to expand'}
                                            tabIndex={0}
                                            onKeyPress={(e) => { if (e.key === 'Enter') toggleHistoryCard(index); }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-blue-600 mb-2">Processed on: {h.timestamp ? new Date(h.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</p>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); addToFavorites(h); }}
                                                        className="px-2 py-1 rounded bg-pink-200 text-pink-700 font-bold hover:bg-pink-300 transition-all duration-200 animate-favorite-btn"
                                                        title="Add to Favorites"
                                                    >❤</button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); shareRecipe(h.originalRecipe); }}
                                                        className="px-2 py-1 rounded bg-blue-200 text-blue-700 font-bold hover:bg-blue-300 transition-all duration-200 animate-share-btn"
                                                        title="Share Recipe"
                                                    >🔗</button>
                                                </div>
                                            </div>
                                            <h3 className="font-semibold text-pink-700 mb-1">Original Recipe:</h3>
                                            <pre className="whitespace-pre-wrap text-base text-blue-700 bg-blue-50 p-2 rounded-md border border-blue-200">{h.originalRecipe}</pre>
                                            {expanded && (
                                                <>
                                                    <h3 className="font-semibold text-yellow-700 mt-3 mb-1">Rewritten Recipe:</h3>
                                                    <pre className="whitespace-pre-wrap text-base text-yellow-800 bg-yellow-50 p-2 rounded-md border border-yellow-200">{h.rewrittenRecipe.replace(/\*\*(.*?)\*\*/g, '$1')}</pre>
                                                    <h3 className="font-semibold text-green-700 mt-3 mb-1">Explanation:</h3>
                                                    <pre className="whitespace-pre-wrap text-base text-green-800 bg-green-50 p-2 rounded-md border border-green-200">{h.explanation.replace(/\*\*(.*?)\*\*/g, '$1')}</pre>
                                                </>
                                            )}
                                            <div className="mt-2 text-xs text-gray-500 text-right">{expanded ? 'Click to collapse' : 'Click to expand'}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                    {/* Scroll to Top Floating Button */}
                    {showScrollTop && (
                        <button
                            onClick={handleScrollTop}
                            className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all animate-bounce"
                            title="Scroll to Top"
                        >↑</button>
                    )}
                </main>
            </div>
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
          from { transform: scale(0.98); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
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
        </>
    )
}

export default ai