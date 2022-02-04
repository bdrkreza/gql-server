const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "User"
    },
    postId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Post"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Comment", commentSchema);
