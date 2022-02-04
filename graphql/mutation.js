const { GraphQLString } = require("graphql");
const { User } = require("../models");
const { auth } = require("../utils");

const register = {
  type: GraphQLString,
  description: "register a new user and return a token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, { username, email, password, role }) {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error("user email already exists");
    }
    const saveUser = new User({
      username,
      email,
      password,
      role
    });
    const user = await saveUser.save();
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    const token = auth.createJWTToken(payload);
    return token;
  }
};

const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, { email, password }) {
    try {
      const user = await User.findOne({ email: email }).select("+password");
      console.log(user);
      if (!user) return null;
      const isValidPassword = await user.isValidPassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        throw new Error("Incorrect email or password!");
      }
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      const token = auth.createJWTToken(payload);
      return token;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { register, login };
