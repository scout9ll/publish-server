const { state } = require("../db/db");

class Model {
  constructor(collection) {
    this.connect(collection);
  }

  connect(collectionName) {
    Object.defineProperty(this, "collection", {
      get: function () {
        return state.EbikePlatform.collection(collectionName);
      },
    });
  }
}

module.exports = Model;
