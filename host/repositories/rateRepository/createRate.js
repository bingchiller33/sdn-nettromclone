import errors from 'http-errors';
import RateStory from "../../models/RateStory.js";

export default async function createRate(rate) {
  try {
    const { userId, rateStoryId, rateNo } = rate;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Attempt to find and update the document; if not found, create a new one
    const updatedRate = await RateStory.findOneAndUpdate(
      { userId, rateStoryId }, // Find a document with matching userId and rateStoryId
      { $set: { rateNo } }, // Update the rateNo
      options // Options to upsert (create if not exists) and return the new document
    );

    return updatedRate;
  } catch (error) {
    console.error('Error in createRate:', error);
    throw new errors.InternalServerError('Cannot process rate');
  }
}
