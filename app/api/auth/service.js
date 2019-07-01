const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const db = require("../../db");

const COLLECTION = "users";

function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

function getUser({ email, password }) {
  return db
    .get(COLLECTION)
    .find(
      user =>
        user.email === email &&
        bcrypt.compareSync(password, user.hashedPassword)
    )
    .value();
}

function createUser({ email, password }) {
  const $id = uuid();
  const hashedPassword = hashPassword(password);
  db.get(COLLECTION)
    .push({ $id, email, hashedPassword })
    .write();
}

module.exports = { createUser, getUser };
