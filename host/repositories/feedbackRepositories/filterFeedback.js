import Feedback from "../../models/Feedback.js";

const filterFeedback = async (storyId, limit, skip) => {
  try {
    const result = await Feedback.find({ storyId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default filterFeedback;
