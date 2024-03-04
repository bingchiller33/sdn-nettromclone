import express from "express";
import userController from "../../controllers/userController/index.js";
import verifyToken from "../../middleware/verifyToken.js";
import upload from "../../middleware/multer.js";
import authenticate from "../../middleware/authenticate.js";

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "cloudinary";
// cloudinary.config({
//   cloud_name: "dnzy2vddm",
//   api_key: "997928771313231",
//   api_secret: "2nFtfuBjQI85n6MGy2I1q0F5m2Q",
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "some_folder_name",
//     format: async (req, file) => "png",
//     public_id: (req, file) => "computed-filename-using-request",
//   },
// });

// const parser = multer({ storage: storage });

// const parserMiddleware = (req, res, next) => {
//   console.log("Parser middleware called");
//   parser.single("image")(req, res, (err) => {
//     if (err) {
//       console.error("Error in parser middleware:", err);
//       return res.status(500).send(err);
//     }
//     console.log("Parser middleware completed successfully");
//     next();
//   });
// };
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
