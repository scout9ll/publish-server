const express = require("express");
const router = express.Router();

const platformRouter = require("./platform");
const ossProxyRouter= require("./ossProxy");

router.use('/platform',platformRouter)
router.use('/',ossProxyRouter)


module.exports = router