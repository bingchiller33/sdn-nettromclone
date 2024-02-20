import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Users' 
  },
  storyId: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Stories' 
  },
  comment: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
},{
  timestamps: true
});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;
