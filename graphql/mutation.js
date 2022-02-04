const { GraphQLString } = require("graphql");
const { User } = require("../models");
const createJWToken = require("../utils/authToken");

const register = {
  type: GraphQLString,
  description: "register a new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, args, ctx) {
    const { username, email, password } = args;
    const newUser = await User.create({ username, email, password });
    await newUser.save();
    const token = createJWToken(newUser);
    console.log(token);
    return "new user create";
  }
};

module.exports = { register };
