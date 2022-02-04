const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const userType = new GraphQLObjectType({
  name: "userType",
  description: "this is user type",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString }
  }
});

module.exports = {
  userType
};
