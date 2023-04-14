const BaseService = require("./base.service");

// Creating a new user service
const User = require("../models/user.model");
const user = new BaseService(User);

module.exports = user;
