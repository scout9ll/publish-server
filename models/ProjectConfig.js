const Model = require("./model");
const { getObjectID } = require("../db/db");

class ProjectConfig extends Model {
  constructor(collection) {
    super(collection);
  }

  async postConfig(data) {
    if (Array.isArray(data)) {
      const allConfigs = await this.collection.find({}).toArray();
      const existedConfigIDs = allConfigs
        .filter((config) => {
          return data.some((resConfig) => resConfig.name == config.name);
        })
        .map((existedConfig) => {
          return getObjectID(existedConfig._id);
        });
      await this.collection.deleteMany({
        _id: { $in: existedConfigIDs },
      });
    } else {
      data = [data];
    }
    await this.collection.insertMany(data);
  }

  async getConfig(query) {
    const configs = await this.collection.find({ ...query }).toArray();
    return configs;
  }

  async delConfigByName(name) {
    return this.collection.deleteOne({ name });
  }

  async patchConfig(match, data) {
    return this.collection.updateOne(match, { $set: data });
  }


}
module.exports = ProjectConfig;
