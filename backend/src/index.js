import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import UserRouter from "./routes/user.route.js";
import RecipeRouter from "./routes/recipe.route.js";
import AiChatRouter from "./routes/aiChat.route.js";
import ActivityFeedRouter from "./routes/activityFeed.route.js";
import FollowRouter from "./routes/follow.route.js";
import AuthRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";

const app = express();
const port = process.env.PORT;

dotenv.config({
  path: "../.env",
}); 

connectDB();

// Needed when behind a proxy (Render) so secure cookies work
app.set("trust proxy", 1);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Configure sessions for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Configure CORS for local dev and production (Vercel/Render)
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
    optionsSuccessStatus: 204,
  })
);
app.use("/api/auth", UserRouter);
app.use("/api/auth", AuthRouter); // Google OAuth routes
app.use("/api/recipes", RecipeRouter);
app.use("/api/aiChats", AiChatRouter);
app.use("/api/activity", ActivityFeedRouter);
app.use("/api/follow", FollowRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
