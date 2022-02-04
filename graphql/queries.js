const { GraphQLString } = require("graphql");

const hello = {
  type: GraphQLString,
  description: "a string",
  resolve: () => "hello world"
};

module.exports = { hello };
