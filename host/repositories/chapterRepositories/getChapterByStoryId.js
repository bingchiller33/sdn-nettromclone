import Chapter from "../../models/Chapter.js";

export default async function getChapterByStoryId(sid) {
  try {
    return await Chapter.find({ storyId: sid })
      .sort({ createdAt: -1 })
      .limit(limit);
  } catch (error) {
    next(error);
  }
}
