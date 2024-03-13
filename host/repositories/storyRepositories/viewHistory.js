import Chapter from "../../models/Chapter.js";
import Story from "../../models/Story.js";

const findHistoryStory = async (chapterId) => {
  try {
    const chapter = await Chapter.findById(chapterId).populate("storyId");
    if (!chapter) {
      throw new Error("Chapter not found");
    }
    const story = await Story.findById(chapter.storyId);
    if (!story) {
      throw new Error("Story not found");
    }
    return { chapter, story };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default findHistoryStory;
