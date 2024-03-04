import express from "express";
import userController from "../../controllers/userController/index.js";
import verifyToken from "../../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, userController.getUserByToken);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

export default userRouter;
