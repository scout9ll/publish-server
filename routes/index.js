const express = require("express");
const router = express.Router();

const platformRouter = require("./platform");
const shareEbikeAppRouter = require("./shareEbike");
const detectToolRouter = require("./detectTool");
const shareEbikeMpRouter = require("./shareMp");

const ossProxyRouter = require("./ossProxy");

router.use("/platform", platformRouter);
router.use("/shareEbike", shareEbikeAppRouter);
router.use("/shareMp", shareEbikeMpRouter);
router.use("/detectTool", detectToolRouter);
router.use("/", ossProxyRouter);

// eslint-disable-next-line no-unused-vars
router.use(async (err, req, res, next) => {

  // **NOTE  handle error centrally 
  res.status(400).json({
    errCode: err.code,
    errmsg: err.errmsg,
  });
});

module.exports = router;
