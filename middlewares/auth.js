const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const util = require("util");

const jwtVerify = util.promisify(jwt.verify);

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const payload = await jwtVerify(token, process.env.JWT_SECRET);
  const user = await User.findById(payload.userId);
  if (!user) return res.status(401).send("UnAutherized");
  req.user = user;
  next();
};
