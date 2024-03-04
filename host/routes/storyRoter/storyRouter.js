import express from "express";
import storyController from "../../controllers/storyController/index.js";

const storyRouter = express.Router();

storyRouter.get("/get_story/:storyId", storyController.getStoryById);
storyRouter.put("/update_story/:id", storyController.updateStory);
storyRouter.get("/get_list_stories", storyController.getStoriesByUser);
storyRouter.post("/create_story", storyController.createStory);
storyRouter.get('/get_stories', storyController.getStories)

export default storyRouter;
