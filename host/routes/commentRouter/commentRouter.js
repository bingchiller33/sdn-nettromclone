import express from 'express'
import { commentController } from '../../controllers/index.js'

const commentRouter = express.Router()

/**
 * @swagger
 * /comment/story/{id}:
 *   get:
 *     summary: Retrieves comments for a specific story
 *     description: This endpoint retrieves all comments associated with a given story ID.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the story to retrieve comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No comments found for the story.
 */
commentRouter.route('/story/:id').get(commentController.getCommentsByStoryId)

/**
 * @swagger
 * /comment/user/{id}:
 *   get:
 *     summary: Retrieves comments made by a specific user
 *     description: This endpoint retrieves all comments made by a given user ID.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the user to retrieve comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No comments found made by the user.
 */
commentRouter.route('/user/:id').get(commentController.getCommentsByUserId)

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Deletes a specific comment
 *     description: This endpoint deletes a comment based on its unique ID.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       404:
 *         description: Comment not found.
 * 
 *   put:
 *     summary: Updates a specific comment
 *     description: This endpoint updates the details of a comment based on its unique ID.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 *       404:
 *         description: Comment not found.
 */
commentRouter.route('/:id').delete(commentController.deleteCommentById).put(commentController.updateCommentById)

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Retrieves all comments
 *     description: This endpoint retrieves all comments in the database.
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: An array of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 * 
 *   post:
 *     summary: Creates a new comment
 *     description: This endpoint creates a new comment with the given details.
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: New comment created successfully.
 */
commentRouter.route('/').get(commentController.getAllComments).post(commentController.createComment)

export default commentRouter