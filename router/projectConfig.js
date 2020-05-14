const express = require("express");
// const fs = require('fs')
// const path = require('path')
const router = express.Router();
const myDb = require("../db/db");

router.post("/projectList", async (req, res) => {
  let data = req.body;
  try {
    if (Array.isArray(data)) {
      const allConfigs = await myDb.state.EbikePlatform.collection(
        "project_config"
      )
        .find({})
        .toArray();
      const existedConfigIDs = allConfigs
        .filter((config) => {
          return data.some((resConfig) => resConfig.name == config.name);
        })
        .map((existedConfig) => {
          return myDb.getObjectID(existedConfig._id);
        });
      await myDb.state.EbikePlatform.collection("project_config").deleteMany({
        _id: { $in: existedConfigIDs },
      });
    }

    myDb.state.EbikePlatform.collection("project_config")
      .insertMany(data)
      .then(() => {
        res.status(201).send("添加成功");
      });
  } catch (err) {
    console.log(err);

    res.send(err);
  }
});

router.get("/projectList", (req, res) => {
  myDb.state.EbikePlatform.collection("project_config")
    .find({})
    .toArray()
    .then((result) => res.status(200).json(result));
});

router.delete("/projectList/:name", (req, res) => {
  const name = req.params.name;
  myDb.state.EbikePlatform.collection("project_config")
    .deleteOne({ name: name })
    .then(() => {
      res.status(200).send("删除成功");
    })
    .catch((err) => res.send(err));
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
    .catch((err) => res.send(err));
});
