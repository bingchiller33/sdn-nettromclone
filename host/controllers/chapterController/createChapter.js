import chapterDAO from "../../repositories/chapterRepositories/index.js";

const createChapter = async (req, res) => {
  try {
    res.status(200).json(await chapterDAO.createChapter(req.body));
  } catch (error) {
    res.status(500).json(error);
  }
};
export default createChapter;
