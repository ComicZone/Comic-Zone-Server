const BaseService = require("./base.service");

// Creating a new user and category service
const User = require("../models/user.model");
const Category = require("../models/category.model");

const user = new BaseService(User);
const category = new BaseService(Category);

module.exports = {user, category};