import getStoryById from "./getStoryById.js";
import getStoriesByUser from "./getStoriesByUser.js";
import createStory from "./createStory.js";
import getStories from "./getStories.js";
import updateStory from "./updateStory.js";
import followStory from "./followStory.js";
import unfollowStory from "./unfollowStory.js";
import getFollowingStories from "./getFollowingStories.js";



export default {
  getStoriesByUser,
  getStoryById,
  createStory,
  getStories,
  updateStory,
  followStory,
  unfollowStory,
  getFollowingStories
};
