import FollowStory from '../../models/FollowStory.js';

const getFollowList = async (userId) => {
  return await FollowStory.find({ userId: userId }).populate('storyId');
};

export default getFollowList;