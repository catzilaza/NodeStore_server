const connectDb = require("../DataBase/connectDB");
const database = "storesonline";
const User = require("../model/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userlogin = async function (req, res, next) {
  connectDb(database);
  const query = { email: req.body.email };
  console.log("Query : ", query);

  let existingUser;
  try {
    existingUser = await User.findOne(query);
    if (existingUser === null) {
      console.log("Not Found USER's Email:", existingUser);
      res.json({status: "error", message: "Not Found USER Email"});
      return;
    }
    console.log("existingUser : ", existingUser);

    bcrypt.compare(
      req.body.password,
      existingUser.password,
      function (err, result) {
        if (err) {
          console.log("bcrypt.compare error : ", err);
          return;
        }
        if (!result) {
          console.log("Result compare password : ", result);
          res.json({status: "ERROR PASSWORD", message: `ERROR PASSWORD IS : ${result}`});
          return;
        }

        const token = jwt.sign(
          {
            firstname: existingUser.firstname,
            email: existingUser.email,
            password: existingUser.password,
            username: existingUser.username,
            secret: "shhhhhhared-secret",
            algorithms: ["HS256"],
            onExpired: Date.now() + 1000 * 60 * 60, //1 hour
          },
          "shhhhhhared-secret",
          { expiresIn: "1h" }
        );
        res.json({
          status: "ok",//"Creating token and it expire on : "
          message_Expire_on: Date.now() + 1000 * 60 * 60,
          username: existingUser.username,
          token: token,
        });
      }
    );
  } catch {
    const error = new Error("User.findOne(query) Error! Something went wrong.");
    return next(error);
  }
};
module.exports.userlogin = userlogin;
