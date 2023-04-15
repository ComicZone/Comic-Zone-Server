const { Router } = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/authMiddlewares/authentication.middleware");
const { validateUserInputsToUpdate } = require('../middlewares/validation.middleware')

const router = Router();

router.route("/").get(getUsers);
router
  .route("/:id")
  .put(authenticate, validateUserInputsToUpdate, updateUser)
  .delete(authenticate, deleteUser)
  .get(getUser);

module.exports = router;
