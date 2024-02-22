import feedbackDAO from "../../repositories/feedbackRepositories/index.js";

const filterFeedback = async (req, res, next) => {
  try {
    const { userId, storyId } = req.params;
    const result = await feedbackDAO.filterFeedback(userId, storyId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default filterFeedback;
