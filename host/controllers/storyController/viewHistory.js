import { storyDAO } from "../../repositories/index.js";
const findHistoryStory = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;
    const { chapter } = await storyDAO.findHistoryStory(chapterId);

    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default findHistoryStory;
