const {ObjectId} = require("mongodb")

function isObjectId(id) {
  return ObjectId.isValid(id);
}

module.exports = isObjectId;