const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const { User, Post } = require("../models");

const userType = new GraphQLObjectType({
  name: "userType",
  description: "the get user type",
  fields: {
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    role: { type: GraphQLString }
  }
});

const postType = new GraphQLObjectType({
  name: "postType",
  description: "the create post type",
  fields: {
    _id: { type: GraphQLID },
    authorId: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    author: {
      type: userType,
      resolve: async (parent) => {
        return await User.findById(parent.authorId);
      }
    }
  }
});

const commentType = new GraphQLObjectType({
  name: "commentType",
  description: "the create comment type",
  fields: {
    _id: { type: GraphQLID },
    comment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    user: {
      type: userType,
      resolve: async (parent) => {
        return await User.findById(parent.userId);
      }
    },
    post: {
      type: postType,
      resolve: async (parent) => {
        return await Post.findById(parent.postId);
      }
    }
  }
});
module.exports = {
  userType,
  postType,
  commentType
};
