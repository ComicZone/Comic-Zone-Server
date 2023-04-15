const Joi = require("joi");

const createSchema = Joi.object({
    name: Joi.string().min(1).required(),
    isDeleted: Joi.forbidden()
});

const editSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    isDeleted: Joi.forbidden()
});

module.exports = {
    createSchema,
    editSchema
}