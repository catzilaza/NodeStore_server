var express = require('express');
var router = express.Router();

const { AuthenUser } = require('../controllers/authen');

const jwt = require("jsonwebtoken");
/* Authen Page. */
router.get('/', AuthenUser);

module.exports = router;