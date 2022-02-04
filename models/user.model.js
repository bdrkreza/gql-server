const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "merchant", "user"]
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const hashPassword = await bcrypt.hash(user.password, 10);
  this.password = hashPassword;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = model("user", userSchema);
