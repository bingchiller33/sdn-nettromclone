import Chapter from "../../models/Chapter.js";

export default async function createChapter({
  storyId,
  chapterNo,
  isActive,
  name,
}) {
  try {
    const chapter = await Chapter.find({ storyId: storyId })
      .sort({ createdAt: -1 })
      .limit(1);
    const { chapterNo: newChapterNo } = chapter[0] || {};
    return await Chapter.create({
      storyId,
      chapterNo: (newChapterNo || chapterNo) + 1,
      name,
      isActive,
    });
  } catch (error) {
    throw new Error(error);
  }
}
