// using module 'express' to initialize a web server
import express, { json } from "express";
import * as dotenv from "dotenv";
// import {productRouter} from "./routes/index.js";
import connectDB from "./database.js";
import cors from "cors";
import { feedbackRouter, storyRouter } from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";
import connection from "./connection.js";

dotenv.config();

// tạo 1 constant 'app' đại diện cho server express trong ứng dụng
const app = express();
// thêm middleware
app.use(json());
app.use(cors());
// kích hoạt hoạt động định tuyến (routing) cho các request của client
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", connection);
app.use("/feedback", feedbackRouter);
app.use("/story", storyRouter);

// app.use("/products", productRouter);
const port = process.env.PORT || 9999;

app.get("/", (req, res) => {
  res.send(`<h1 style="color:red">Welcome to homepage!</h1>`);
});
// lắng nghe các request gửi tới web server tại port 9999
server.listen(port, async () => {
  connectDB();
  console.log(`Web server listening on http://localhost:${port}`);
});
