import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import UserRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT;

dotenv.config({
  path: "../.env",
});

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", UserRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
