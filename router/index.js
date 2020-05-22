const express = require("express");
const router = express.Router();

const platformRouter = require("./platform");
const shareEbikeRouter= require("./shareEbike");
const ossProxyRouter= require("./ossProxy");


router.use('/platform',platformRouter)
router.use('/shareEbike',shareEbikeRouter)
router.use('/',ossProxyRouter)
    

module.exports = router