import express from "express";
import feedbackController from "../../controllers/feedbackController/index.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/:storyId/:userId", feedbackController.filterFeedback);
feedbackRouter.post("/add_new", feedbackController.addNewFeedback);

export default feedbackRouter;
