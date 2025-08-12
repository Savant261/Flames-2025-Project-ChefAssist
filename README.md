# ChefAssist - AI Recipe Generator

ChefAssist is a smart, web-based recipe generator that turns your available ingredients into delicious, easy-to-follow recipes. Built with a responsive React frontend and Node.js backend, it's designed to be the perfect kitchen companion for anyone looking to reduce food waste and discover new meal ideas. 🌟

The application features a polished design with smooth animations, a dark mode, and a clear, step-by-step user flow to guide you from ingredients to a complete recipe. 🥄

## Features ✨

ChefAssist is packed with features to assist you in creating dishes that are both healthy and tasty:

*   **Dynamic Recipe Creation🥗**: Instantly generates recipes based on the ingredients you have.
*   **AI-Powered Chat Interface🤖**: Interactive chat with AI for recipe suggestions and cooking tips.
*   **Dietary Personalization🌱**: Tailors recipes to your lifestyle, accommodating preferences like vegan, gluten-free, keto, and more.
*   **User Authentication🔐**: Secure login/signup with JWT tokens and cookie-based sessions.
*   **Recipe Management�**: Save, edit, and organize your favorite recipes.
*   **Social Features�**: Follow other users, like recipes, and share culinary creations.
*   **Inventory Management📦**: Track ingredients in your pantry for better meal planning.
*   **Explore Global Cuisines🌍**: Discover new flavors and cooking techniques from around the world.

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

Using ChefAssist is a simple process:

1.  **Sign Up/Login🔐**: Create an account or log in to access personalized features.
2.  **Navigate to AI Chat🤖**: Go to the `/ai` route to start chatting with the AI assistant.
3.  **Enter Ingredients or Request📝**: Type the ingredients you have or ask for recipe suggestions.
4.  **Specify Preferences⚙️**: Add any dietary restrictions, allergies, or cuisines you'd like to include or avoid.
5.  **Generate Recipe🚀**: The AI processes your input and creates a unique, personalized recipe for you in moments.
6.  **Save, Cook, or Share🍽️**: Save recipes to your profile, follow the cooking instructions, or share with the community.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is distributed under the Apache License 2.0. See the `LICENSE` file for more information.
