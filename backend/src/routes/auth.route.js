import express from "express";
import passport from "../config/passport.js";
import { googleAuth, googleCallback, getCurrentUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/auth/failure` }),
  googleCallback
);

// Get current user
router.get('/user', getCurrentUser);

export default router;
