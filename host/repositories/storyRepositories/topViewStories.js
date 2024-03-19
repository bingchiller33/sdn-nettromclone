import Story from "../../models/Story.js";

const topViewStories = async () => {
  try {
    return await Story.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "chapters",
          localField: "_id",
          foreignField: "storyId",
          as: "chapters",
        },
      },
      {
        $addFields: {
          chapters: { $size: "$chapters" },
        },
      },
    ])
      .sort({ viewCount: -1 })
      .limit(10);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default topViewStories;
