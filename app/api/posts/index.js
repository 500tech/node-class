const { Router } = require("express");
const { findPostById, getAllPosts, createPost } = require("./service");

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
