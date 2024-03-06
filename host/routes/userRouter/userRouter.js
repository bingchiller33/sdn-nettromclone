import express from "express";
import userController from "../../controllers/userController/index.js";
import verifyToken from "../../middleware/verifyToken.js";
import upload from "../../middleware/multer.js";
import authenticate from "../../middleware/authenticate.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, userController.getUserByToken);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.put("/update", userController.updateUser);

userRouter.post(
  "/upload",
  authenticate,
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(404).send("please select img");
    }
    console.log("No error");
    next();
  },
  userController.uploadImage
);
export default userRouter;
