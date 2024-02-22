import storyRepositories from "../../repositories/storyRepositories/index.js";

const getStoriesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await storyRepositories.getStoriesByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getStoriesByUserId;
