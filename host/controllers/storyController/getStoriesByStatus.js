import createHttpError from "http-errors";
import { storyDAO } from "../../repositories/index.js";
import Filter from "bad-words";
import leoProfanity from 'leo-profanity';

const filter = new Filter();
leoProfanity.loadDictionary('vi');

const getProfaneWords = (text) => {
  const words = text.split(" ");
  return words.filter((word) => filter.isProfane(word) || leoProfanity.check(word));
};

const getStoriesByStatus = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const stories = await storyDAO.getStoriesByStatus(status, search);

    const storiesWithProfanityCheck = stories.map((story) => ({
      ...story.toObject(),
      containsProfanity: filter.isProfane(story.name) || leoProfanity.check(story.name),
      profaneWords: getProfaneWords(story.name),
    }));

    res.status(200).json(storiesWithProfanityCheck);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export default getStoriesByStatus;