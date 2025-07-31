import mongoose,{Schema} from "mongoose";

const followSchema = new mongoose.Schema({
  // The user who is initiating the follow
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The user who is being followed
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });


export const Follow = mongoose.model("Follow", followSchema);

