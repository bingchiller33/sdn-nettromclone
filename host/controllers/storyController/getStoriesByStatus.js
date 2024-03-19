import createHttpError from "http-errors";
import { storyDAO } from "../../repositories/index.js";
import Filter from "bad-words";

const filter = new Filter();

const getProfaneWords = (text) => {
  const words = text.split(" ");
  return words.filter((word) => filter.isProfane(word));
};

const getStoriesByStatus = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const stories = await storyDAO.getStoriesByStatus(status, search);

    const storiesWithProfanityCheck = stories.map((story) => ({
      ...story.toObject(),
      containsProfanity: filter.isProfane(story.name),
      profaneWords: getProfaneWords(story.name),
    }));

    res.status(200).json(storiesWithProfanityCheck);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export default getStoriesByStatus;
