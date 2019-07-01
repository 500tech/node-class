const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const { jwtSecret, jwtExpires = "60d" } = require("../../../env");

const COLLECTION = "users";

function createToken(user) {
  return jwt.sign(user, jwtSecret, { expiresIn: jwtExpires });
}

function validateUserToken(token) {
  return jwt.verify(token, jwtSecret);
}

function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

function getUserToken({ email, password }) {
  const user = db
    .get(COLLECTION)
    .find(
      user =>
        user.email === email &&
        bcrypt.compareSync(password, user.hashedPassword)
    )
    .value();
  if (user) {
    return createToken(user);
  }
}

function createUser({ email, password }) {
  const $id = uuid();
  const hashedPassword = hashPassword(password);
  db.get(COLLECTION)
    .push({ $id, email, hashedPassword })
    .write();
}

module.exports = { createUser, getUserToken, validateUserToken };
