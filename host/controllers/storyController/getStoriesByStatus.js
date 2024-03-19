import createHttpError from "http-errors";
import { storyDAO } from "../../repositories/index.js";

const getStoriesByStatus = async (req, res, next) => {
  try {
    const { status, search } = req.query; 
    const stories = await storyDAO.getStoriesByStatus(status, search);
    res.status(200).json(stories);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export default getStoriesByStatus;