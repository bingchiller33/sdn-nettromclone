import Story from "../../models/Story.js";

const getStoriesByUserId = async (userId) => {
  try {
    const result = await Story.find({ author: userId });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getStoriesByUserId;
