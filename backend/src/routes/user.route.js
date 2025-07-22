import express from "express";
import {
  logout,
  signup,
  singin,
  chechAuth,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", singin);
router.post("/logout", logout);
router.get("/check", protectRoute, chechAuth);
export default router;
