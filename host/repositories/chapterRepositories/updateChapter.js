import Chapter from "../../models/Chapter.js";

export default async function updateChapter(cId, chapter) {
  try {
    return await Chapter.findByIdAndUpdate(cId, chapter);
  } catch (error) {
    throw new Error(error);
  }
}
