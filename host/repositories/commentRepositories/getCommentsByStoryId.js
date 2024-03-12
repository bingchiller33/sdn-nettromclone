import Comments from '../../models/Comments.js'

export default async function getCommentsByStoryId(storyId) {
  try {
    return await Comments.find({ storyId })
  } catch (error) {
    console.log(error)
  }
}