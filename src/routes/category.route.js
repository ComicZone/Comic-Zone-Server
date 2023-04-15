const {addCategory, getCategories, getCategoryById} = require("../controllers/category.controller");
const {getByCategoryId} = require("../controllers/comic.controller");
const express = require('express');
const router = express.Router();
const authenticate = require("../middlewares/authMiddlewares/authentication.middleware");
const {authorizeAdmin} = require("../middlewares/authMiddlewares/authorization.middleware");
const { validate } = require('../middlewares/validation.middleware');
const { createSchema } = require('../schemas/category.schema');

//create a category
router.post("/", validate(createSchema), addCategory);

//get a category
router.get("/:id", getCategoryById);

//get comics by categoryId
router.get("/:id/comics", getByCategoryId);

//get all categories
router.get("/", getCategories);

module.exports = router;