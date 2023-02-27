var express = require("express");
var router = express.Router();

const {
  userGetAll,
  userGetOne,
  userCreate,
  userUpateOne,
  userDeleteOne,
  userDeleteAll,
} = require("../controllers/userController");

/* GET user one. */
router.get("/:id", userGetOne);

/* GET users all. */
router.get("/", userGetAll);

/* Create user one. */
router.post("/", userCreate);

/* Update user one. */
router.put('/', userUpateOne);

/* Delete user one. */
router.delete('/:id', userDeleteOne);

/* Delete user all. */
router.delete("/", userDeleteAll);

module.exports = router;
