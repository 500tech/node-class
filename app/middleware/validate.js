const { validationResult } = require("express-validator");
const { UNPROCESSABLE_ENTITY } = require("http-status-codes");

module.exports = function validate(
  validators,
  errorCode = UNPROCESSABLE_ENTITY
) {
  return [
    ...validators,
    (req, _res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw [errorCode, errors.array()];
      }
      next();
    }
  ];
};
