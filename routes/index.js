const express = require("express");
const router = express.Router();
const restRouter = require("./rest");
const graphqlRouter = require("./graphql");
router.use("/", restRouter);
router.use("/", graphqlRouter);
module.exports = router;
