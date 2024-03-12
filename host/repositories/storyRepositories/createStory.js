import Story from "../../models/Story.js";
import StoryCategories from "../../models/StoryCategory.js";
import User from "../../models/Users.js";

const createStory = async (data) => {
  try {
    const { categories, author } = data;
    const newStory = new Story(data);
    const savedStory = await newStory.save();
    const storyCategories = categories.map((c) => ({
      storyId: savedStory._id,
      categoryId: c.value,
    }));
    console.log(data);
    await StoryCategories.insertMany(storyCategories);
    await User.findByIdAndUpdate(author, { $set: { role: 2 } });
    return savedStory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createStory;
