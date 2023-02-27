//const {connectDb, closeDb} = require("../DataBase/connectDB");
const connectDb = require("../DataBase/connectDB");
const database = "storesonline";
const User = require("../model/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const userGetOne = async function (req, res, next) {
  try {
    connectDb(database);
    const id = req.params["id"];
    const user = await User.findOne({ userID: id });    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status: "error", message: "userGetOne error" });
      
  }
};

module.exports.userGetOne = userGetOne;

const userGetAll = async function (req, res, next) {
  try {
    connectDb(database);
    const user = await User.find({});
    res.status(200).json({ status: "OK userGetAll ", message: "userGetAll OK " ,user: user});
  } catch (error) {
    res.status(500).json({ status: "error", message: "userGetAll error" });
  }
};
module.exports.userGetAll = userGetAll;

const userCreate = async function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      res.json({ status: "Bcrypt ERROR", message: err });
      return;
    }
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
        res.json({ status: "saved user error", message: err });
        throw err;
      } else {
        res.json({ status: "saved user success", message: "ok" });
      }
    });
  });
};
module.exports.userCreate = userCreate;

const userUpateOne = async function (req, res, next) {
  console.log("userUpateOne : req.body : ", req.body); 
  try {
    connectDb(database);
    const userID = req.body.userID;
    const firstname = req.body.firstname;  
    const user = await User.updateOne({ userID: userID },{firstname: firstname });

    if (!user) {
      res.status(500).json({ status: "error", message: "userUpateOne error" });
    }
    //closeDb();
    res.status(200).json({ status: "OK", message: "userUpateOne success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "userUpateOne error" });
  }
};

module.exports.userUpateOne = userUpateOne;

const userDeleteOne = async function (req, res, next) {
   
  try {
    connectDb(database);
    const id = req.params["id"];
    console.log("userDeleteOne id : ", req.params["id"])
    const user = await User.deleteOne({ userID: req.params.id });
    res.status(200).json({ status: "OK", message: "userDeleteOne success" });
  } catch (error) {
    console.log("error No product tpo delete: ", error);
    res.status(500).json({ status: "error", message: "userDeleteOne error" });
  }
  
};

module.exports.userDeleteOne = userDeleteOne;

const userDeleteAll = async function (req, res, next) {
  try {
    connectDb(database);

    const user = await User.deleteMany({});

    res.status(200).json({ status: "OK", message: "userDeleteAll success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "userDeleteAll error" });
  }
};

module.exports.userDeleteAll = userDeleteAll;
