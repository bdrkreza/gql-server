const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./db");
const schema = require("./graphql/schema");
const app = express();
require("dotenv").config();

connectDB();
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
