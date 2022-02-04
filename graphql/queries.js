const { GraphQLList, GraphQLID } = require("graphql");
const { User, Post } = require("../models");
const { userType, postType } = require("./types");

const getAlluser = {
  type: new GraphQLList(userType),
  description: "get all users",
  resolve: async () => await User.find({})
};

const getUser = {
  type: new GraphQLList(userType),
  description: "get user by Id",
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (_, { id }) => await User.findById({ _id: id })
};

const getAllPost = {
  type: new GraphQLList(postType),
  description: "get all  Post",
  resolve: async () => await Post.find({})
};

const getPostById = {
  type: new GraphQLList(postType),
  description: "get post by Id",
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (_, { id }) => await Post.find({ _id: id })
};

module.exports = { getAlluser, getUser, getAllPost, getPostById };
