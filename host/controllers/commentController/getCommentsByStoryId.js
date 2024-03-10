import { commentDAO } from '../../repositories/index.js'

export default async function getCommentsByStoryId(req, res, next){
  try {
    const storyId = req.params.id
    const comments = await commentDAO.getCommentsByStoryId(storyId)
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}