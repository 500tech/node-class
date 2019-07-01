const uuid = require("uuid");
const db = require("../../db");

const COLLECTION = "posts";

function findPostById($id) {
  return db
    .get(COLLECTION)
    .find({ $id })
    .value();
}

function getAllPosts() {
  return db.get(COLLECTION).value();
}

function createPost(post) {
  const $id = uuid();
  db.get(COLLECTION)
    .push({ $id, ...post })
    .write();
  return findPostById($id);
}

module.exports = { COLLECTION, findPostById, getAllPosts, createPost };
