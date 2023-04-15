const Joi = require("joi");

const createSchema = Joi.object({
    title: Joi.string().min(1).required(),
    categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).trim().required(),
    author: Joi.string().min(1).required(),
    imageUrl: Joi.string().min(1).required(),
    rating: Joi.number().min(1).required(),
    description: Joi.string().min(1).required(),
    releaseDate: Joi.string().min(1).required(),
    price: Joi.string().min(1).trim().required(),
    fileUrl: Joi.string().min(1).trim().required(),
    isDeleted: Joi.forbidden()
});

const editSchema = Joi.object({
    title: Joi.string().min(1).optional(),
    categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).trim().optional(),
    author: Joi.string().min(1).optional(),
    imageUrl: Joi.string().min(1).optional(),
    rating: Joi.number().min(1).optional(),
    description: Joi.string().min(1).optional(),
    releaseDate: Joi.string().min(1).optional(),
    price: Joi.string().min(1).optional(),
    fileUrl: Joi.string().min(1).optional(),
    isDeleted: Joi.forbidden()
});

module.exports = {
    createSchema,
    editSchema
}