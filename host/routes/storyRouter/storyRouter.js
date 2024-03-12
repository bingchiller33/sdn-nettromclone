import express from "express";
import storyController from "../../controllers/storyController/index.js";
import authenticate from "../../middleware/authenticate.js";

const storyRouter = express.Router();

storyRouter.get("/get_story/:storyId", storyController.getStoryById);
storyRouter.put("/update_story/:id", storyController.updateStory);
storyRouter.get("/get_list_stories", storyController.getStoriesByUser);
storyRouter.post("/create_story", storyController.createStory);
storyRouter.get("/get_stories", storyController.getStories);


/**
 * @swagger
 * /story/follow/{storyId}:
 *   post:
 *     tags:
 *       - Story
 *     summary: Follow a story
 *     description: This can only be done by the logged in user.
 *     security:
 *       - BearerAuth: []
 *     operationId: followStory
 *     parameters:
 *       - name: storyId
 *         in: path
 *         description: ID of story that needs to be followed
 *         required: true
 *         schema:
 *           type: string
*     responses:
 *       '200':
 *         description: Followed the story successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Followed the story successfully.
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to follow the story
 */
storyRouter.post("/follow/:storyId", authenticate, storyController.followStory);

/**
 * @swagger
 * /story/unfollow/{storyId}:
 *   post:
 *     tags:
 *       - Story
 *     summary: Unfollow a story
 *     description: This can only be done by the logged in user.
 *     security:
 *       - BearerAuth: []
 *     operationId: unfollowStory
 *     parameters:
 *       - name: storyId
 *         in: path
 *         description: ID of story that needs to be unfollowed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Unfollowed the story successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unfollowed the story successfully.
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to unfollow the story
 */
storyRouter.post(
  "/unfollow/:storyId",
  authenticate,
  storyController.unfollowStory
);

/**
 * @swagger
 * /story/follows:
 *   get:
 *     tags:
 *       - Story
 *     summary: Get the list of stories the user is following
 *     description: This can only be done by the logged in user.
 *     operationId: getFollowingStories
 *     security:
 *       - BearerAuth: []   # use the security scheme named 'BearerAuth'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to get the follow list
 */
storyRouter.get(
  "/follows",
  authenticate,
  storyController.getFollowingStories
);

export default storyRouter;
