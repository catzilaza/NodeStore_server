var express = require("express");
var router = express.Router();

const { userlogin } = require('../controllers/login');

router.post("/", userlogin);

module.exports = router;

// const connectDb = require("../DataBase/connectDB");
// const database = "storesonline";
// const User = require("../model/user");

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const jwt = require("jsonwebtoken");
// var { expressjwt: jwt } = require("express-jwt");

// router.post("/", async function (req, res, next) {
//   connectDb(database);
//   const query = { firstname: req.body.firstname };
//   console.log("Query : ", query);

//   let existingUser;
//   try {
//     existingUser = await User.findOne(query);

//     bcrypt.compare(
//       req.body.password,
//       existingUser.password,
//       function (err, result) {
//         if (err) {
//           console.log("bcrypt.compare error : ", err);
//           return;
//         }
        
//         const token = jwt.sign({
//           firstname: existingUser.firstname,
//           email: existingUser.email,
//           password: existingUser.password,
//           username: existingUser.username,
//           secret: "shhhhhhared-secret",
//           algorithms: ["HS256"],
//           onExpired: Date.now() + 1000 * 60 * 60, //1 hour
//         }, "shhhhhhared-secret", {expiresIn: '1h'});
//         res.json({
//           status: "Creating token and it expire on : ",
//           message_Expire_on: Date.now() + 1000 * 60 * 60,
//           username: existingUser.username,
//           token: token,
//         });
//       }
//     );
//   } catch {
//     const error = new Error("User.findOne(query) Error! Something went wrong.");
//     return next(error);
//   }
// });

//module.exports = router;
