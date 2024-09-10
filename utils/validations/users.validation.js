// validations/UserValidation.js
const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  profilePicture: Joi.string().optional(),
});

module.exports = {
  createUserSchema,
};
