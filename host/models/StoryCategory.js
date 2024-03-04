import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storyCategorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Categories",
    },
    storyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const StoryCategories = mongoose.model("StoryCategories", storyCategorySchema);

export default StoryCategories;
