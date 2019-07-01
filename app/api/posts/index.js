const uuid = require("uuid");
const { Router } = require("express");
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

const posts = Router();

posts.post("/", (req, res) => {
  const post = createPost(req.body);
  return res.json(post);
});

posts.get("/", (_res, res) => res.json(getAllPosts()));

posts.get("/:postId", (req, res) => {
  const { postId } = req.params;
  const post = findPostById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  return res.json(post);
});

module.exports = posts;
