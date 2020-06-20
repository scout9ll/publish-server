const Model = require("./model");

class ProjectConfig extends Model {
  constructor(collection) {
    super(collection);
  }

  async getAllSnapshots() {
    return this.collection.find().toArray();
  }

  async postSnapshot(data) {
    return this.collection.insertOne(data);
  }

  async patchSnapshot(match, data) {
    return this.collection.updateOne(match, { $set: data });
  }

  async getSnapshotDataSet() {
    return this.collection
      .aggregate([
        { $match: { env: "prod" } },
        { $project: { _id: 0 } },
        { $group: { _id: "$projectName", logs: { $push: "$$ROOT" } } },
        {
          $project: {
            _id: 0,
            logs: { $slice: ["$logs", -3] },
            projectName: "$_id",
          },
        },
      ])
      .toArray();
  }
}
module.exports = ProjectConfig;
