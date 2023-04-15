const BaseService = require("./base.service");

// Creating a new user service
const User = require("../models/user.model");
const user = new BaseService(User);

// Creating a new transaction service
const Transaction = require("../models/transaction.model");
const transaction = new BaseService(Transaction);


module.exports = {user, transaction};
