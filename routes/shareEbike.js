const express = require("express");
const router = express.Router();
const { getObjectID } = require("../db/db");
const ProjectConfig = require("../models/ProjectConfig");
const PublishSnapshot = require("../models/PublishSnapshot");

const appConfig = new ProjectConfig("shareEbike_app");
const appSnapshot = new PublishSnapshot("publish_snapshot_app");

router.post("/projectList", async (req, res, next) => {
  let data = req.body;
  try {
    await appConfig.postConfig(data);
    res.status(201).send("添加成功");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/projectList", (req, res, next) => {
  appConfig
    .getConfig(req.query)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

router.delete("/projectList/:name", async (req, res, next) => {
  const name = req.params.name;
  try {
    await appConfig.delConfigByName(name);
    res.status(204).send("");
  } catch (err) {
    next(err);
  }
});

router.patch("/projectList", async (req, res, next) => {
  const data = req.body;
  const _id = getObjectID(data._id);
  delete data._id;

  try {
    await appConfig.patchConfig({ _id }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    next(err);
  }
});

router.patch("/publish-snapshot", async (req, res, next) => {
  const data = req.body;
  const _id = getObjectID(data._id);
  delete data._id;

  try {
    await appSnapshot.patchConfig({ _id }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    next(err);
  }
});

router.post("/publish-snapshot", async (req, res, next) => {
  const data = {
    time: Number(new Date()),
    ...req.body,
  };
  try {
    await appSnapshot.postSnapshot(data);
    res.io.sockets.emit("newLog", data);
    res.status(201).send("构建完毕");
  } catch (err) {
    next(err);
  }
});

router.get("/publish-snapshot", async (req, res, next) => {
  try {
    const result = await appSnapshot.getAllSnapshots();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
  // res.send(require('../mock/historyMock'))
});

module.exports = router;
