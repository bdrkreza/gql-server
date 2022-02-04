const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    authorId: {
      type: Schema.ObjectId,
      required: true,
      ref: "user"
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("posts", postSchema);
