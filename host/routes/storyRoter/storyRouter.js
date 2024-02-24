import express from "express";
import storyController from "../../controllers/storyController/index.js";

const storyRouter = express.Router();

storyRouter.get("/get_story/:storyId", storyController.getStoryById);
storyRouter.get(
  "/get_list_stories/:userId",
  storyController.getStoriesByUserId
);

export default storyRouter;
