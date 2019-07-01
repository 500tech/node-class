const { Router } = require("express");
const { check } = require("express-validator");
const { CREATED, NOT_FOUND } = require("http-status-codes");
const validate = require("../../middleware/validate");
const { createUser, getUserToken } = require("./service");

const auth = Router();

auth.post(
  "/signup",
  validate([
    check("email").isEmail(),
    check("password")
      .isString()
      .isLength({ min: 8 })
  ]),
  (req, res) => {
    createUser(req.body);
    return res.status(CREATED).end();
  }
);

auth.post(
  "/login",
  validate([
    check("email").isEmail(),
    check("password")
      .isString()
      .isLength({ min: 8 })
  ]),
  (req, res) => {
    const token = getUserToken(req.body);
    if (!token) {
      throw NOT_FOUND;
    }
    return res.json({ token });
  }
);

module.exports = auth;
