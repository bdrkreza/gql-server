const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const { User } = require("../models");

const userType = new GraphQLObjectType({
  name: "userType",
  description: "the get user type",
  fields: {
    id: { type: GraphQLID },
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
    id: { type: GraphQLID },
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

module.exports = {
  userType,
  postType
};
