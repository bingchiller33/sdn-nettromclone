// using module 'express' to initialize a web server
import express, { json } from "express";
import * as dotenv from "dotenv";
// import {productRouter} from "./routes/index.js";
import connectDB from "./database.js";
import cors from "cors";
import { feedbackRouter, userRouter } from "./routes/index.js";
dotenv.config();

// tạo 1 constant 'app' đại diện cho server express trong ứng dụng
const app = express();

const jwtSecret = process.env.JWT_SECRET;

// thêm middleware
app.use(json());
app.use(cors());
// kích hoạt hoạt động định tuyến (routing) cho các request của client
app.get("/", (req, res) => {
  res.send(`<h1 style="color:red">Welcome to homepage!</h1>`);
});

app.use("/feedback", feedbackRouter);
app.use("/users", userRouter);

// app.use("/products", productRouter);
const port = process.env.PORT || 9999;

// lắng nghe các request gửi tới web server tại port 9999
app.listen(port, async () => {
  connectDB();
  console.log(`Web server listening on http://localhost:${port}`);
});
