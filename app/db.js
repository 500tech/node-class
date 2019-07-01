const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const env = require("../env");

if (env.nodeEnv) {
  const adapter = new FileSync(
    path.resolve(__dirname, "..", `db.${env.nodeEnv}.json`)
  );
  const db = low(adapter).defaults({
    posts: [],
    users: [],
  });

  module.exports = db;
}
