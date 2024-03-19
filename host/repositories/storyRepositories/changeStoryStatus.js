import Story from "../../models/Story.js";

const changeStoryStatus = async (id, isActive) => {
  try {
    const story = await Story.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    if (!story) {
      throw new Error("Story not found");
    }

    return story;
  } catch (error) {
    throw error;
  }
};

export default changeStoryStatus;
