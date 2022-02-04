const jwt = require("jsonwebtoken");

const createJWToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
};

module.exports = createJWToken;
