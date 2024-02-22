import Feedback from "../../models/Feedback.js";

const filterFeedback = async (storyId, userId) => {
  try {
    const result = await Feedback.find({ storyId, userId })
      .limit(10)
      .skip(0)
      .sort({ createdAt: -1 });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default filterFeedback;
