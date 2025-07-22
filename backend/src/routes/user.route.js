import express from "express";
import { logout, signup, singin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/signin",singin)
router.post("/logout",logout)

export default router