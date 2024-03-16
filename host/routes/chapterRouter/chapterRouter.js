import express from "express";
import chapterController from "../../controllers/chapterController/index.js";

const chapterRouter = express.Router();

chapterRouter.get("/:sid/story", chapterController.getChapterByStoryId);

export default chapterRouter;
