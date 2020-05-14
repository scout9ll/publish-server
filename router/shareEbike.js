// app上传oss记录

const express = require("express");
// const fs = require('fs')
// const path = require('path')
const router = express.Router();
const myDb = require("../db/db");

router.patch("/publish", (req, res) => {
  const data = req.body;
  const _id = myDb.getObjectID(data._id);
  delete data._id;
  myDb.state.EbikePlatform.collection("app_upload_snapshot")
    .updateOne({ _id }, { $set: data })
    .then(() => {
      res.status(201).send("修改成功");
    })
    .catch((err) => res.send(err));
});

router.post("/publish", (req, res) => {
  // req.body = JSON.parse(req.body)
  const data = {
    time: Number(new Date()),
    ...req.body,
  };
  myDb.state.EbikePlatform.collection("app_upload_snapshot")
    .insertOne(data)
    .then(() => {
      res.io.sockets.emit("newLog", data);
      res.status(201).send("构建完毕");
    })
    .catch((err) => res.send(err));
});

router.get("/publish", (req, res) => {
  myDb.state.EbikePlatform.collection("app_upload_snapshot")
    .find({})
    .toArray()
    .then((result) => res.status(200).json(result));
  // res.send(require('../mock/historyMock'))
});
