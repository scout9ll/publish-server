const express = require("express");
const router = express.Router();
const { getObjectID } = require("../db/db");
const ProjectConfig = require("../models/ProjectConfig");
const PublishSnapshot = require("../models/PublishSnapshot");

const mpConfig = new ProjectConfig("shareEbike_mp");
const mpSnapshot = new PublishSnapshot("publish_snapshot_mp");

const mpTheme = new ProjectConfig("theme_shareEbike_mp");

router.post("/project-config", async (req, res) => {
  let data = req.body;
  try {
    await mpConfig.postConfig(data);
    res.status(201).send("添加成功");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/project-config", (req, res) => {
  mpConfig.getConfig(req.query).then((result) => res.status(200).json(result));
});

router.delete("/project-config/:name", async (req, res) => {
  const name = req.params.name;
  try {
    await mpConfig.delConfigByName(name);
    res.status(204).send("");
  } catch (err) {
    res.send(err);
  }
});

router.patch("/project-config", async (req, res) => {
  const data = req.body;
  const _id = getObjectID(data._id);
  delete data._id;

  try {
    await mpConfig.patchConfig({ _id }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    res.send(err);
  }
});

router.patch("/publish-snapshot", async (req, res) => {
  const data = req.body;
  const _id = getObjectID(data._id);
  delete data._id;

  try {
    await mpSnapshot.patchConfig({ _id }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    res.send(err);
  }
});

router.post("/publish-snapshot", async (req, res) => {
  // req.body = JSON.parse(req.body)
  const data = {
    time: Number(new Date()),
    ...req.body,
  };
  try {
    await mpSnapshot.postSnapshot(data);
    res.io.sockets.emit("newLog", data);
    res.status(201).send("构建完毕");
  } catch (err) {
    res.send(err);
  }
});

router.get("/publish-snapshot", async (req, res) => {
  try {
    const result = await mpSnapshot.getAllSnapshots(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.send(err);
  }
  // res.send(require('../mock/historyMock'))
});

// --- theme route ---
// temporarily same as config route

router.post("/project-theme", async (req, res) => {
  let data = req.body;
  try {
    await mpTheme.postConfig(data);
    res.status(201).send("添加成功");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/project-theme", (req, res) => {
  mpTheme.getConfig(req.query).then((result) => res.status(200).json(result));
});

router.delete("/project-theme/:name", async (req, res) => {
  const name = req.params.name;
  try {
    await mpTheme.delConfigByName(name);
    res.status(204).send("");
  } catch (err) {
    res.send(err);
  }
});

router.patch("/project-theme", async (req, res) => {
  const data = req.body;
  // const _id = getObjectID(data._id);
  delete data._id;

  try {
    await mpTheme.patchConfig({ name: data.name }, data);
    res.status(201).send("修改成功");
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
