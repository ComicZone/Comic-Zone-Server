const Joi = require("joi");

// Checking the user schema fields against pre-set conditions
const createUserSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().required(),
  adminKey: Joi.string()
});

const updateUserSchema = Joi.object({
  fullname: Joi.string().min(3),
  email: Joi.string().email(),
  phoneNumber: Joi.number().min(11).max(11),
  password: Joi.string().min(8).max(30),
  newPassword: Joi.string().min(8).max(30),
});

module.exports = { createUserSchema, updateUserSchema };