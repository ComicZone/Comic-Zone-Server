const {addComic, getComic, getComics, getByCategories, editComic, deleteComic} = require("../controllers/comic.controller");
const express = require('express');
const router = express.Router();

//create a comic
router.post("/", addComic);

//get a comic
router.get("/", getComic);

//get all comic
router.get("/", getComics);

//get comic by id
router.get("/", getByCategories);

//edit a comic
router.put("/", editComic);

//delete a comic
router.delete("/", deleteComic);

module.exports = router;