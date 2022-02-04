const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { register } = require("./mutation");
const { hello } = require("./queries");
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    hello: hello
  }
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "the root mutation type",
  fields: {
    register
  }
});

const schama = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = schama;
