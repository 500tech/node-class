const { UNAUTHORIZED } = require("http-status-codes");
const { validateUserToken } = require("@services/auth");

module.exports = function authenticate(req, _res, next) {
  const { authorization: token } = req.headers;
  if (!token) {
    throw UNAUTHORIZED;
  }
  try {
    const user = validateUserToken(token);
    req.user = user;
    next();
  } catch (err) {
    throw [UNAUTHORIZED, err.message];
  }
};
