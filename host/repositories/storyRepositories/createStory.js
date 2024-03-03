import Story from "../../models/Story.js";

const createStory = async (data) => {
  try {
    const newStory = new Story(data);
    const savedStory = await newStory.save();
    return savedStory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createStory;
