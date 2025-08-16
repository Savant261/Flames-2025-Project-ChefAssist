import mongoose, { mongo, Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    userId :{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipeId: {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    }
}, { timestamps: true });

likeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
