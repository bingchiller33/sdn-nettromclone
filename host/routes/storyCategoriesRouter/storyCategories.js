import express from "express";
import storyCategoriesController from "../../controllers/storyCategoriesController/index.js";

const storyCategoriesRouter = express.Router();

storyCategoriesRouter.get(
  "/all_story_catergories/:sid",
  storyCategoriesController.getStoryCategories
);

export default storyCategoriesRouter;
