import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import UserRouter from "./routes/user.route.js";
import RecipeRouter from "./routes/recipe.route.js";
import AiChatRouter from "./routes/aiChat.route.js";
import ActivityFeedRouter from "./routes/activityFeed.route.js";
import FollowRouter from "./routes/follow.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT;

dotenv.config({
  path: "../.env",
}); 

connectDB();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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
  })
);
app.use("/api/auth", UserRouter);
app.use("/api/recipes", RecipeRouter);
app.use("/api/aiChats", AiChatRouter);
app.use("/api/activity", ActivityFeedRouter);
app.use("/api/follow", FollowRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
