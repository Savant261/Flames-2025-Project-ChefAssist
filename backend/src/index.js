import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import UserRouter from "./routes/user.route.js"

const app = express()
const port = process.env.PORT;

dotenv.config({
    path:"../.env"
});

connectDB();

app.use("/api/v1/auth",UserRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
