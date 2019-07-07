const { check } = require("express-validator");
const { Router } = require("express");
const { NOT_FOUND } = require("http-status-codes");
const { findPostById, getAllPosts, createPost } = require("./service");
const validate = require("../../middleware/validate");
const authenticate = require("../../middleware/auth");

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
  async (req, res) => {
    const post = await createPost(req.body);
    return res.json(post);
  }
);

posts.get("/", async (_res, res) => res.json(await getAllPosts()));

posts.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await findPostById(postId);
  if (!post) {
    throw NOT_FOUND;
  }
  return res.json(post);
});

module.exports = posts;
