var express = require("express");
var router = express.Router();

//const {Auth} = require("../middleware/Auth");
//const {AuthenUser} = require("../controllers/authen");

const {
  userGetAll,
  userGetOne,
  userCreate,
  userUpateOne,
  userDeleteOne,
  userDeleteAll,
  userLogin,
  userAuthen
} = require("../controllers/userController");

/* GET user one. */
router.get("/:id", userGetOne);

/* GET users all. */
router.get("/", userGetAll);

/* Create user one. */
router.post("/register", userCreate);

/* Update user one. */
router.put('/', userUpateOne);

/* Delete user one. */
router.delete('/:id', userDeleteOne);

/* Delete user all. */
router.delete("/", userDeleteAll);

/* Login user. */
router.post("/login", userLogin);

/* Authentication user. */
//router.post("/authen",Auth, userAuthen);
router.post("/authen", userAuthen);


module.exports = router;
