var express = require("express");
var router = express.Router();

const {getAllRegisterUser, registerUser} = require('../controllers/register')

router.get("/", getAllRegisterUser);

router.post("/",registerUser);

module.exports = router;
