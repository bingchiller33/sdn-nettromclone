import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storyCategorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Comments",
    },
    storyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Stories",
    },
    name: {
      type: String,
      required: true,
      unique: true,
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

module.exports = StoryCategories;
