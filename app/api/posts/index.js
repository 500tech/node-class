const { check } = require("express-validator");
const { Router } = require("express");
const { NOT_FOUND } = require("http-status-codes");
const { findPostById, getAllPosts, createPost } = require("./service");
const validate = require("../../middleware/validate");
const authenticate = require('../../middleware/auth');

const posts = Router();

posts.post(
  "/",
  authenticate,
  validate([
    check("title")
      .isString()
      .isLength({ min: 1 }),
    check("body").isString()
  ]),
  (req, res) => {
    const post = createPost(req.body);
    return res.json(post);
  }
);

posts.get("/", (_res, res) => res.json(getAllPosts()));

posts.get("/:postId", (req, res) => {
  const { postId } = req.params;
  const post = findPostById(postId);
  if (!post) {
    throw NOT_FOUND;
  }
  return res.json(post);
});

module.exports = posts;
