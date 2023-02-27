const connectDb = require("../DataBase/connectDB");
const database = "storesonline";
const User = require("../model/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;


const getAllRegisterUser = async (req, res, next) => {
  try {
    connectDb(database);
    const user = await User.find({});    
    res.status(200).render("register", { title: "Register Page", user: user });
  } catch (error) {
    console.log("GET USER ERROR : ", error);
    res.json({ status: "GET USER ERROR : ", message: error });
  }
};
module.exports.getAllRegisterUser = getAllRegisterUser;

const registerUser =  function (req, res, next) {  
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) { res.json({status : "Bcrypt ERROR", message: err}); return;}
      connectDb(database);
      const user = new User({
        userID: req.body.userID,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephone: req.body.telephone,
        address: req.body.address,
        email: req.body.email,
        password: hash,
      });
      user.save(function (err) {
        if (err) {
          res.json({status : "saved user error", message: err});
          throw err;
        } else {
          res.json({status : "saved user success"});          
        }
      });
    });
  }

module.exports.registerUser = registerUser;
