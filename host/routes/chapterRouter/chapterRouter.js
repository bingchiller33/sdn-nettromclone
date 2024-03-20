import express from "express";
import chapterController from "../../controllers/chapterController/index.js";
import authenticate from "../../middleware/authenticate.js";

const chapterRouter = express.Router();

chapterRouter.get(
  "/:sid/story",
  authenticate,
  chapterController.getChapterByStoryId
);
chapterRouter.put(
  "/:cid/update",
  authenticate,
  chapterController.updateChapter
);
chapterRouter.post("/", authenticate, chapterController.createChapter);

export default chapterRouter;
