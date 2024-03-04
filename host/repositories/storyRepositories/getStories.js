import storyModel from '../../models/Story.js'

export default async function getStories(){
  try {
    return await storyModel.find({})
  } catch (error) {
    throw new Error(error.message);
  }
}