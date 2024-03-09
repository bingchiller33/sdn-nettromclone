import { commentDAO } from '../../repositories/index.js'

export default async function updateCommentById(req, res, next){
  try {
    const id = req.params.id
    const newComment = req.body
    const updateComment = await commentDAO.updateCommentById(id, newComment)
    res.status(200).json(updateComment)
  } catch (error) {
    console.log(error)
  }
}