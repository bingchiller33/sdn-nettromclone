import express from "express";
import userController from "../../controllers/userController/index.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/get_user", userController.getUser);

userRouter.get("/:id", userController.getUserById);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

export default userRouter;
