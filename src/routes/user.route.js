const { Router } = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/authentication");
const { validateUserInputsToUpdate } = require('../middlewares/validation')

const router = Router();

router.route("/").get(authenticate, getUsers);
router
  .route("/:id")
  .put(authenticate, validateUserInputsToUpdate, updateUser)
  .delete(authenticate, deleteUser)
  .get(authenticate, getUser);

module.exports = router;
