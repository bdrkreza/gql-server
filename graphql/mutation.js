const { GraphQLString } = require("graphql");
const { User } = require("../models");
const { bcrypt, auth } = require("../utils");

const register = {
  type: GraphQLString,
  description: "register a new user and return a token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, { username, email, password }) {
    const user = new User({ username, email, password });
    user.password = await bcrypt.encryptPassword(user.password);
    await user.save();

    const token = auth.createJWToken({
      _id: user._id,
      email: user.email,
      username: user.username
    });
    console.log(token);
    return token;
  }
};

module.exports = { register };
