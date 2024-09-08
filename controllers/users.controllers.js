const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);
const { createUserSchema } = require("../utils/validations/users.validation");
const CustomError = require("../utils/errors/CustomError");

exports.signup = async (req, res, next) => {
  try {
    await createUserSchema.validateAsync(req.body);

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: "Email is already in use" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.send({ success: "User created", user });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ error: "invalid email or password" });
    // valid email
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      // correct email and password
      const token = await jwtSign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      user = { ...user._doc, token };
      const { password, ...userData } = user;

      res.send({ success: "user logged in", user: userData });
    } else {
      res.status(400).send({ error: "invalid email or password" });
    }
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};
