const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const {
  register,
  login,
  createPost,
  updatePost,
  deletePost
} = require("./mutation");
const { getAlluser, getUser, getAllPost, getPostById } = require("./queries");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    getAlluser,
    getUser,
    getAllPost,
    getPostById
  }
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "the root mutation type",
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost
  }
});

const schama = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = schama;
