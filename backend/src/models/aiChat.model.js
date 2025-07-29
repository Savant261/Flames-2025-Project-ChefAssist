import mongoose from "mongoose";

const messageSchema = new Schema({
  role: {
    type: String,
    enum: ['user', 'ai'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  recipeData: {
    type: Schema.Types.Mixed,
    required: false
  }
}, {
  timestamps: true
});


const aiChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    default: 'New Recipe Chat'
  },
  // The conversation is an array of message sub-documents
  messages: [messageSchema]
}, {
  timestamps: true
});

export const AiChat = new mongoose.model("AiChat",aiChatSchema);