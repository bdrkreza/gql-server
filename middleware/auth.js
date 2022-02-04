const Jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    const user = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = user.user;
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = authenticate;
