const { GraphQLString } = require("graphql");
const { User, Post } = require("../models");
const { auth } = require("../utils");
const { postType } = require("./types");

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
  description: "login user and return token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, { email, password }) {
    try {
      const user = await User.findOne({ email: email }).select("+password");
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

const createPost = {
  type: postType,
  description: "Create a new Post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve: async (_, { title, body }, { user }) => {
    try {
      const newPost = new Post({
        title,
        body,
        authorId: user.id
      });
      const post = await newPost.save();
      return post;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { register, login, createPost };
