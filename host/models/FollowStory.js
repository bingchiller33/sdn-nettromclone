import mongoose, { Schema } from "mongoose";
import RateStory from "./RateStory.js";
import User from "./Users.js";

const FollowStorySchema = new Schema({
    storyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: RateStory
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const FollowStory = mongoose.model("FollowStories", FollowStorySchema);

export default FollowStory;