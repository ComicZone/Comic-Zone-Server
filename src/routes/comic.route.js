const {addComic, getAComic, getComics, editComic, deleteComic} = require("../controllers/comic.controller");
const express = require('express');
const router = express.Router();
const authenticate = require("../middlewares/authMiddlewares/authentication.middleware");
const {authorizeAdmin} = require("../middlewares/authMiddlewares/authorization.middleware");
const { validate } = require('../middlewares/validation.middleware');
const { createSchema, editSchema } = require('../schemas/comic.schema');

//create a comic
router.post("/", validate(createSchema), addComic);

//get a comic
router.get("/:id", getAComic);

//get all comic
router.get("/", getComics);

//edit a comic
router.put("/:id", validate(editComic), authenticate, authorizeAdmin, editComic);

//delete a comic
router.delete("/:id", validate(createSchema), authenticate, authorizeAdmin, deleteComic);

module.exports = router;