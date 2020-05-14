const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConfig = require("./db.config");
const uri = mongoConfig.mongoURI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "EbikePlatform";
const state = {
  [dbName]: {},
};
const connect = (cb) => {
  client.connect((err) => {
    if (err) {
      cb(err);
    } else {
      state[dbName] = client.db(dbName);
      cb();
    }
  });
};
connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});

const getObjectID = (id) => {
  return new mongodb.ObjectID(id);
};
module.exports = { connect, state, getObjectID };
