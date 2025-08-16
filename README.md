# ChefAssist - AI Rec## Technology Stack 🛠️

### Frontend
*   **React 19** with modern hooks and context
*   **Vite** for fast development and building
*   **Tailwind CSS** for responsive design
*   **React Router** for client-side routing
*   **Axios** for API communication
*   **Lucide React** for icons

### Backend
*   **Node.js** with Express.js framework
*   **MongoDB** with Mongoose ODM
*   **JWT** for authentication
*   **Cloudinary** for image storage
*   **Google Gemini API** for AI recipe generation
*   **Cookie-based sessions** for secure auth

## 🏗️ System Architecture

### Overall System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND      │    │   EXTERNAL      │
│   (React +      │◄──►│  (Node.js +     │◄──►│   SERVICES      │
│   Tailwind)     │    │   Express)      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  User Interface │    │   MongoDB       │    │ Google Gemini   │
│  Components     │    │   Database      │    │ Cloudinary      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Database Models
```
USER MODEL:
- _id, email, username, password (hashed)
- avatar, fullName, bio, cookingLevel
- dietaryPreferences: [vegan, gluten-free, keto, etc.]
- allergies: [nuts, dairy, shellfish, etc.]
- inventoryIngredient: [{ name, qty, expiryDate }]
- savedRecipes, socialLinks, theme
- followingCount, followersCount

RECIPE MODEL:
- _id, title, author → User
- description, imageUrl, cookTime, servings
- originalIngredients: [{ name, quantity, unit }]
- adaptedIngredients: [{ name, quantity, unit, substitution }]
- instructions: [{ step }], adaptationNotes
- tags: [dietary-tags], nutrition, difficulty
- visibility (public/draft/unlisted)
- adaptations: [{ forDiet, changes }]

AI CHAT MODEL:
- _id, user → User, title
- messages: [{ role: user/ai, content, recipeData }]
- dietaryContext: user's restrictions and preferences
- adaptationHistory: previous recipe modifications

ACTIVITY FEED MODEL:
- _id, author → User, content, images
- type (recipe_post/cooking_story/adaptation_share)
- originalRecipe → Recipe, adaptedRecipe → Recipe
- dietaryTags: [vegan, keto, etc.]
- likes: [{ user, createdAt }]
- comments: [{ user, content, createdAt }]

FOLLOW MODEL:
- _id, follower → User, following → User
- sharedDietaryInterests: [common dietary preferences]
- followReason: dietary_match/recipe_interest/community
```

### Authentication Flow
```
1. USER LOGIN/SIGNUP:
Client → Routes → Controller → Database → JWT Generation → Cookie Set

2. PROTECTED ROUTES:
Client → Middleware → JWT Verify → User Lookup → Controller → Response

3. AI CHAT FLOW WITH STREAMING & RECIPE ADAPTATION:
┌─────────────┐
│ User Input  │ (ingredients + dietary restrictions)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Validation  │ (sanitize, validate dietary preferences)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Dietary     │ (load user's dietary profile)
│ Context     │ (allergies, preferences, restrictions)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Save User   │ (save user message with dietary context)
│ Message     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AI Prompt   │ (construct prompt with dietary needs)
│ Engineering │ (include adaptation requirements)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Gemini API  │ (generate recipe + adaptations)
│ Call        │ (stream: true for real-time)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Stream      │ (real-time response chunks)
│ Response    │ (with dietary adaptations)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Parse &     │ (extract recipe + adaptation notes)
│ Adapt       │ (identify substitutions made)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Save        │ (save adapted recipe with notes)
│ Adaptation  │ (track what was changed and why)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Social      │ (option to share adaptation)
│ Share       │ (post to community feed)
└─────────────┘
```

### API Endpoints Structure
```
AUTHENTICATION:
POST   /api/users/signup       → Register with dietary preferences
POST   /api/users/signin       → Login user  
POST   /api/users/logout       → Logout user

RECIPES & ADAPTATIONS:
GET    /api/recipes            → Get recipes filtered by dietary needs
POST   /api/recipes            → Create new recipe
GET    /api/recipes/:id        → Get recipe with adaptation options
PUT    /api/recipes/:id/adapt  → Adapt recipe for dietary restrictions
DELETE /api/recipes/:id        → Delete recipe

AI CHAT & ADAPTATION:
POST   /api/ai/chat            → Chat with dietary-aware AI
POST   /api/ai/adapt-recipe    → Adapt existing recipe for diet
GET    /api/ai/adaptation-history → Get user's adaptation history
GET    /api/ai/dietary-suggestions → Get AI suggestions for diet

SOCIAL FEATURES:
GET    /api/feed               → Get personalized food feed
POST   /api/feed               → Post cooking creation/recipe
GET    /api/feed/dietary/:diet → Get feed filtered by diet type
POST   /api/users/:id/follow   → Follow user with similar diet
GET    /api/users/dietary-matches → Find users with similar restrictions

USER MANAGEMENT:
GET    /api/users/profile      → Get user profile with dietary info
PUT    /api/users/dietary-preferences → Update dietary restrictions
GET    /api/users/inventory    → Get ingredient inventory
POST   /api/users/inventory    → Add inventory item with dietary tags
GET    /api/users/recipe-adaptations → Get user's recipe adaptations
``` **Live Demo:** [https://chef-assist-frontend.vercel.app/](https://chef-assist-frontend.vercel.app/)

# ChefAssist - AI Recipe Generator & Food Lovers Community

🔗 **Live Demo:** [https://chef-assist-frontend.vercel.app/](https://chef-assist-frontend.vercel.app/)

ChefAssist is an intelligent recipe generation and adaptation platform that combines AI-powered cooking assistance with a vibrant social community for food lovers. Transform your available ingredients into personalized recipes while connecting with fellow cooking enthusiasts who share similar dietary restrictions and culinary preferences. 🌟

Think of it as "Instagram for Food Lovers" - but with smart AI that understands your dietary needs, ingredient availability, and cooking preferences. Whether you're vegan, gluten-free, keto, or have specific allergies, ChefAssist adapts recipes to fit your lifestyle while connecting you with a community that shares your culinary journey. 🥄

## Features ✨

### 🤖 AI-Powered Recipe Intelligence
*   **Smart Recipe Generation**: AI creates recipes based on your available ingredients
*   **Recipe Adaptation**: Automatically adapts any recipe to fit dietary restrictions (vegan, gluten-free, keto, allergen-free)
*   **Preference Learning**: AI learns your taste preferences and cooking style over time
*   **Ingredient Substitution**: Smart suggestions for ingredient replacements based on dietary needs
*   **Interactive Chat**: Real-time conversation with AI for cooking tips and recipe modifications

### 📱 Social Food Community (Instagram-style)
*   **Food Feed**: Share your cooking creations with beautiful photos and stories
*   **Follow Food Lovers**: Connect with people who share your dietary preferences and restrictions
*   **Recipe Sharing**: Post and discover recipes from community members with similar needs
*   **Cooking Stories**: Share your cooking journey, tips, and dietary transformation stories
*   **Like & Comment**: Engage with the community through likes, comments, and recipe reviews
*   **Dietary Groups**: Join communities based on specific diets (Vegan, Keto, Gluten-Free, etc.)

### 🎯 Personalized Experience
*   **Dietary Profile**: Set up detailed dietary restrictions, allergies, and preferences
*   **Smart Inventory**: Track your pantry ingredients with expiry date management
*   **Meal Planning**: AI suggests weekly meal plans based on your dietary goals
*   **Nutrition Tracking**: Monitor your nutritional intake aligned with your dietary restrictions
*   **Cooking Level Adaptation**: Recipes adapted to your cooking experience level

### 🌍 Global Cuisine with Dietary Adaptations
*   **Cultural Recipes**: Explore global cuisines adapted to your dietary needs
*   **Traditional to Modern**: AI adapts traditional recipes to modern dietary requirements
*   **Regional Preferences**: Discover how different cultures approach your dietary restrictions

## Technology Stack �

### Frontend
*   **React 19** with modern hooks and context
*   **Vite** for fast development and building
*   **Tailwind CSS** for responsive design
*   **React Router** for client-side routing
*   **Axios** for API communication
*   **Lucide React** for icons

### Backend
*   **Node.js** with Express.js framework
*   **MongoDB** with Mongoose ODM
*   **JWT** for authentication
*   **Cloudinary** for image storage
*   **Google Gemini API** for AI recipe generation
*   **Cookie-based sessions** for secure auth

## Project Structure �

```
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── api/           # API service layer
│   │   ├── store/         # Context/state management
│   │   └── hooks/         # Custom React hooks
│   ├── public/            # Static assets
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   └── package.json       # Backend dependencies
└── README.md             # This file
```

## Getting Started

To get a local copy up and running, follow these detailed setup steps.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account for image storage
- **Google Gemini API** key for AI features

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/savant261/flames-2025-project-chefassist.git
cd flames-2025-project-chefassist
```

#### 2. Backend Setup

**Navigate to backend directory:**
```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chefassist
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chefassist
DB_NAME=chefassist

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# AI Integration
GEMINI_API_KEY=your-google-gemini-api-key
```

**Start the backend server:**
```bash
npm start
# or for development with auto-restart:
npm run dev
```

The backend will run on `http://localhost:5001`

#### 3. Frontend Setup

**Navigate to frontend directory:**
```bash
cd ../frontend
```

**Install dependencies:**
```bash
npm install
```

**Create environment files:**

**For Local Development** - Create `.env.local`:
```env
# Development Environment Variables
VITE_API_BASE_URL=/api
VITE_APP_NAME=ChefAssist
VITE_NODE_ENV=development
```

**For Production** - Create `.env.production`:
```env
# Production Environment Variables
VITE_API_BASE_URL=https://your-backend-url.herokuapp.com/api
VITE_APP_NAME=ChefAssist
VITE_NODE_ENV=production
```

**Start the frontend development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Environment Variables Guide

#### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | ✅ | `5001` |
| `NODE_ENV` | Environment mode | ✅ | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | ✅ | `mongodb://localhost:27017/chefassist` |
| `DB_NAME` | Database name | ✅ | `chefassist` |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ | `your-super-secret-key` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ | `abcdefghijklmnopqrstuvwxyz` |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ | `your-gemini-api-key` |

#### Frontend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API URL | ✅ | `/api` (dev) or `https://api.domain.com/api` (prod) |
| `VITE_APP_NAME` | Application name | ❌ | `ChefAssist` |
| `VITE_NODE_ENV` | Environment mode | ❌ | `development` or `production` |

### Development vs Production Setup

#### Local Development
- **Backend**: Runs on `http://localhost:5001`
- **Frontend**: Runs on `http://localhost:3000` with Vite proxy
- **API Calls**: Proxied through Vite (`/api` → `http://localhost:5001/api`)
- **CORS**: Handled automatically by Vite proxy

#### Production Deploymwent
- **Backend**: Deploy to Heroku, Railway, or Render
- **Frontend**: Deploy to Vercel, Netlify, or similar
- **API Calls**: Direct calls to production backend URL
- **CORS**: Configure backend to allow frontend domain

### Getting API Keys

#### MongoDB Atlas (Free Tier)
1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string from the "Connect" button

#### Cloudinary (Free Tier)
1. Visit [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Get your cloud name, API key, and API secret from the dashboard

#### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the generated key

### Troubleshooting

#### Common Issues

**CORS Errors in Development:**
- Ensure backend is running on port 5001
- Check that Vite proxy is configured correctly
- Verify `VITE_API_BASE_URL=/api` in `.env.local`

**Authentication Issues:**
- Check JWT_SECRET is set in backend
- Ensure cookies are enabled in browser
- Verify NODE_ENV is set correctly

**Database Connection Issues:**
- Check MongoDB is running (local) or connection string is correct (Atlas)
- Verify network access if using MongoDB Atlas

**Build Errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for missing environment variables
- Ensure all required dependencies are installed

## Deployment

### Frontend Deployment (Vercel)

1. **Prepare for deployment:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variables in Vercel dashboard

3. **Vercel Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.herokuapp.com/api
   VITE_APP_NAME=ChefAssist
   VITE_NODE_ENV=production
   ```

### Backend Deployment (Heroku/Railway/Render)

1. **Prepare for deployment:**
   ```bash
   cd backend
   npm run build  # if you have a build script
   ```

2. **Set environment variables** on your deployment platform with all the backend variables listed above.

3. **Configure CORS** in your backend to allow your frontend domain:
   ```javascript
   // In your backend CORS configuration
   const allowedOrigins = [
     'http://localhost:3000',
     'https://your-frontend-domain.vercel.app'
   ];
   ```

## How It Works 🛠️

ChefAssist combines AI recipe intelligence with social community features:

### 🤖 AI Recipe Generation & Adaptation:
1.  **Input Your Ingredients�**: Tell the AI what ingredients you have available
2.  **Set Dietary Preferences⚙️**: Specify restrictions (vegan, gluten-free, keto, allergies, etc.)
3.  **AI Recipe Creation🚀**: Advanced AI generates personalized recipes that fit your needs
4.  **Recipe Adaptation🔄**: AI automatically adapts existing recipes to match your dietary restrictions
5.  **Save & Organize💾**: Save adapted recipes to your personal collection

### 📱 Social Food Community:
1.  **Create Food Posts�**: Share photos of your cooking creations with the community
2.  **Connect with Food Lovers👥**: Follow users with similar dietary preferences and restrictions
3.  **Discover Adapted Recipes🔍**: Browse recipes shared by people with your dietary needs
4.  **Engage & Learn💬**: Like, comment, and learn from fellow food enthusiasts
5.  **Join Dietary Communities🎯**: Connect with specific groups (Vegan, Keto, Gluten-Free, etc.)

### 🎯 Personalization Engine:
- **Learning Algorithm**: AI learns your preferences and improves suggestions over time
- **Dietary Matching**: Connect with users who share your specific dietary requirements
- **Smart Recommendations**: Get recipe and user suggestions based on your cooking behavior
- **Adaptation History**: Track how recipes have been modified for your dietary needs

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is distributed under the Apache License 2.0. See the `LICENSE` file for more information.
