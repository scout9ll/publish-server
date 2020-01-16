const express = require("express");
// const fs = require('fs')
// const path = require('path')
const router = express.Router();
const myDb = require("./db");
// myDb.connect(err => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('database connected')
//   }
// })

router.get("/projectConfig", (req, res) => {
  myDb.state.EbikePlatform.collection("config")
    .find({})
    .toArray()
    .then(result => res.send(JSON.stringify(result)));
});

router.post("/projectConfig", (req, res) => {
  let data = req.body;
  if (!Array.isArray(data)) {
    data = [data];
  }
  myDb.state.EbikePlatform.collection("config")
    .insertMany(data)
    .then(() => {
      res.status(201).send("添加成功");
    })
    .catch(err => res.send(err));
});

router.patch("/projectConfig", (req, res) => {
  const data = req.body;
  const id = myDb.getObjectID(data._id);
  delete data._id;
  myDb.state.EbikePlatform.collection("config")
    .updateOne({ _id: id }, { $set: data })
    .then(() => {
      res.status(201).send("修改成功");
    })
    .catch(err => res.send(err));
});

router.post("/projectList", (req, res) => {
  const data = req.body;
  myDb.state.EbikePlatform.collection("project_config")
    .insertMany(data)
    .then(() => {
      res.status(201).send("添加成功");
    })
    .catch(err => res.send(err));
});

router.get("/projectList", (req, res) => {
  myDb.state.EbikePlatform.collection("project_config")
    .find({})
    .toArray()
    .then(result => res.send(JSON.stringify(result)));
});
router.delete("/projectList/:name", (req, res) => {
  const name = req.params.name;
  myDb.state.EbikePlatform.collection("project_config")
    .deleteOne({ name: name })
    .then(() => {
      res.status(200).send("删除成功");
    })
    .catch(err => res.send(err));
});

router.patch("/projectList", (req, res) => {
  const data = req.body;
  const id = myDb.getObjectID(data._id);
  delete data._id;
  myDb.state.EbikePlatform.collection("project_config")
    .updateOne({ _id: id }, { $set: data })
    .then(() => {
      res.status(201).send("修改成功");
    })
    .catch(err => res.send(err));
});

router.patch("/publish", (req, res) => {
  const data = req.body;
  const _id = myDb.getObjectID(data._id);
  delete data._id;
  myDb.state.EbikePlatform.collection("publish_snapshot")
    .updateOne({ _id }, { $set: data })
    .then(() => {
      res.status(200).send("修改成功");
    })
    .catch(err => res.send(err));
});

router.post("/publish", (req, res) => {
  // req.body = JSON.parse(req.body)
  const data = {
    time: Number(new Date()),
    ...req.body
  };
  myDb.state.EbikePlatform.collection("publish_snapshot")
    .insertOne(data)
    .then(() => {
      res.io.sockets.emit("newLog", data);
      res.status(201).send("构建完毕");
    })
    .catch(err => res.send(err));
});

router.get("/publish", (req, res) => {
  myDb.state.EbikePlatform.collection("publish_snapshot")
    .find({})
    .toArray()
    .then(result => res.send(JSON.stringify(result)));
  // res.send(require('../mock/historyMock'))
});

module.exports = router;
