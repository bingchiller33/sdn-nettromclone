import express from 'express'
import { commentController } from '../../controllers/index.js'

const commentRouter = express.Router()

commentRouter.route('/story/:id').get(commentController.getCommentsByStoryId)
commentRouter.route('user/:id').get(commentController.getCommentsByUserId)
commentRouter.route('/:id').delete(commentController.deleteCommentById)
commentRouter.route('/').get(commentController.getAllComments).post(commentController.createComment).put(commentController.updateCommentById)

export default commentRouter