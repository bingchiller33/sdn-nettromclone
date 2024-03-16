import mongoose, { Schema } from "mongoose";

const RateStorySchema = new Schema(
  {
    rateNo: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      required: true,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "users",
    },
    rateStoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "rateStories",
    },
  },
  {
    timestamps: true,
  }
);

const RateStory = mongoose.model("RateStory", RateStorySchema);

export default RateStory;
