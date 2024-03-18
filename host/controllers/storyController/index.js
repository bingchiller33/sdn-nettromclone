import getStoryById from "./getStoryById.js";
import getStoriesByUser from "./getStoriesByUser.js";
import createStory from "./createStory.js";
import getStories from "./getStories.js";
import updateStory from "./updateStory.js";
import followStory from "./followStory.js";
import unfollowStory from "./unfollowStory.js";
import getFollowingStories from "./getFollowingStories.js";
import activeStory from "./activeStory.js";
import finished from "./finishStory.js";
import topViewStories from "./topViewStories.js";
import findHistoryStory from "./viewHistory.js";
import getChapterContent from "./getChapterContent.js";
import getAllChapter from "./getAllChapter.js";
import updateViewCount from "./updateViewCount.js";
import getActivatedStories from './getActivatedStories.js';
import getInactivedStories from './getInactivatedStories.js';


export default {
  getStoriesByUser,
  getStoryById,
  createStory,
  getStories,
  updateStory,
  followStory,
  unfollowStory,
  getFollowingStories,
  activeStory,
  finished,
  topViewStories,
  findHistoryStory,
  getChapterContent,
  getAllChapter,
  updateViewCount,
  getActivatedStories,
  getInactivedStories
};
