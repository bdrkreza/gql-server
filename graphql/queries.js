const { GraphQLList } = require("graphql");
const { User } = require("../models");
const { userType } = require("./types");

const users = {
  type: new GraphQLList(userType),
  description: "a string",
  resolve: async () => await User.find({})
};

module.exports = { users };
