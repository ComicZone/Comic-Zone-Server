const express = require('express');
const router = express.Router();
const comicRoute = require('./comic.route');

router.use('/comics', comicRoute);

module.exports = router