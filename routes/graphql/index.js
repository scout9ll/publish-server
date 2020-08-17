const express = require("express").Router();
const router = express;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
router.use(
  "/graphql",
  graphqlHTTP({
    context: { test: 1 },
    graphiql: true,
    schema,
  })
);

module.exports = router;
