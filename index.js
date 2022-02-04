const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./db");
const schema = require("./graphql/schema");
const authenticate = require("./middleware/auth");
const app = express();
require("dotenv").config();

connectDB();

app.use(authenticate);
app.get("/", (req, res) => {
  res.send("welcome to my graphql api");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(3000);
console.log("server is running");
