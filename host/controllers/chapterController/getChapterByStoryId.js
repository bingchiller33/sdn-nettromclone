import chapterDAO from "../../repositories/chapterRepositories/index.js";

export default async function getAllComments(req, res, next) {
  try {
    const { sid } = req.params;
    const { limit } = req.query;
    res.send(await chapterDAO.getChapterByStoryId(sid, limit));
  } catch (error) {
    // next(error);
  }
}
