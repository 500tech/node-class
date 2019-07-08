const uuid = require("uuid");
const sleep = require("sleep-promise");
const db = require("@services/db");
const cache = require("@services/cache");

const COLLECTION = "posts";

async function findPostById($id) {
  const post = await cache.get(`posts/${$id}`);
  if (post) {
    return JSON.parse(post);
  }
  await sleep(2000);
  const postFromDb = db
    .get(COLLECTION)
    .find({ $id })
    .value();
  if (postFromDb) {
    await cache.set(`posts/${$id}`, JSON.stringify(postFromDb));
  }
  return postFromDb;
}

async function getAllPosts() {
  return db.get(COLLECTION).value();
}

async function createPost(post) {
  const $id = uuid();
  db.get(COLLECTION)
    .push({ $id, ...post })
    .write();
  return findPostById($id);
}

module.exports = { COLLECTION, findPostById, getAllPosts, createPost };
