const express = require("express");
const router = express.Router();

const platformRouter = require("./platform");

router.use('/platform',platformRouter)

module.exports = router