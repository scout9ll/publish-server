const express = require("express");
const router = express.Router();
const { getObjectID } = require("../../db/db");
const ProjectConfig = require("../../models/ProjectConfig");
const PublishSnapshot = require("../../models/PublishSnapshot");
const { postPublishLog:transPostPublishLog }  = require("../../trans/api")
const platformConfig = new ProjectConfig("project_config");
const mpSnapshot = new PublishSnapshot("publish_snapshot");

router.post("/projectList", async (req, res, next) => {
  let data = req.body;
  try {
    await platformConfig.postConfig(data);
    res.status(201).send("添加成功");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/projectList", (req, res, next) => {
  platformConfig
    .getConfig(req.query)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

router.delete("/projectList/:name", async (req, res, next) => {
  const name = req.params.name;
  try {
    await platformConfig.delConfigByName(name);
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
    await platformConfig.patchConfig({ _id }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    next(err);
  }
});

router.patch("/publish", async (req, res, next) => {
  const data = req.body;
  const _id = getObjectID(data._id);
  delete data._id;

  try {
    await mpSnapshot.patchConfig({ _id }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    next(err);
  }
});

router.post("/publish", async (req, res, next) => {
  const data = {
    time: Number(new Date()),
    ...req.body,
  };
  try {
    data.projectType = "platform";
    await mpSnapshot.postSnapshot(data);
    await transPostPublishLog(data)
    res.io.sockets.emit("newLog", data);
    res.status(201).send("构建完毕");
  } catch (err) {
    next(err);
  }
});

router.get("/publish", async (req, res, next) => {
  let result;
  try {
    if (req.query.set) {
      result = await mpSnapshot.getSnapshotDataSet();
    } else {
      result = await mpSnapshot.getAllSnapshots(req.query);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
  // res.send(require('../mock/historyMock'))
});

module.exports = router;
