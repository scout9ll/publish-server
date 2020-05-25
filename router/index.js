const express = require("express");
const router = express.Router();

const platformRouter = require("./platform");
const shareEbikeRouter= require("./shareEbike");
const detectToolRouter= require("./detectTool");
const ossProxyRouter= require("./ossProxy");


router.use('/platform',platformRouter)
router.use('/shareEbike',shareEbikeRouter)
router.use('/detectTool',detectToolRouter)
router.use('/',ossProxyRouter)
    

module.exports = router