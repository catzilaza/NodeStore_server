//const {connectDb, closeDb} = require("../DataBase/connectDB");
const connectDb = require("../DataBase/connectDB");
const database = "storesonline";
const User = require("../model/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userGetOne = async function (req, res, next) {
  try {
    connectDb(database);
    const id = req.params["id"];
    const user = await User.findOne({ userID: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

module.exports.userGetOne = userGetOne;

const userGetAll = async function (req, res, next) {
  try {
    connectDb(database);
    const user = await User.find({});
    res.status(200).json({
      status: "OK userGetAll ",
      message: "userGetAll OK ",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};
module.exports.userGetAll = userGetAll;

const userCreate = async function (req, res, next) {
  try {
    connectDb(database);
    //Check User
    const username = req.body.username;
    const user = await User.findOne({ username: username });

    if (user) {
      res
        .status(400)
        .json({ status: "Error", message: "USER ALREADY HAVE CREATED" });
      return;
    }
    //Encrypt
    /* 
    const {username, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    user = new User({username,password});
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send('Register Success');

    */

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) {
        res.json({ status: "Bcrypt ERROR", message: err });
        return;
      }

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
  } catch (error) {
    res.json({ status: "userCreate error", message: error });
  }
};
module.exports.userCreate = userCreate;

const userUpateOne = async function (req, res, next) {
  console.log("userUpateOne : req.body : ", req.body);
  try {
    connectDb(database);
    const userID = req.body.userID;
    const firstname = req.body.firstname;
    const user = await User.updateOne(
      { userID: userID },
      { firstname: firstname }
    );

    if (!user) {
      res.status(500).json({ status: "error", message: "userUpateOne error" });
    }
    //closeDb();
    res.status(200).json({ status: "OK", message: "userUpateOne success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

module.exports.userUpateOne = userUpateOne;

const userDeleteOne = async function (req, res, next) {
  try {
    connectDb(database);
    const id = req.params["id"];
    console.log("userDeleteOne id : ", req.params["id"]);
    const user = await User.deleteOne({ userID: req.params.id });
    res.status(200).json({ status: "OK", message: "userDeleteOne success" });
  } catch (error) {
    console.log("error No product tpo delete: ", error);
    res.status(500).json({ status: "error", message: error });
  }
};

module.exports.userDeleteOne = userDeleteOne;

const userDeleteAll = async function (req, res, next) {
  try {
    connectDb(database);

    const user = await User.deleteMany({});

    res.status(200).json({ status: "OK", message: "userDeleteAll success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

module.exports.userDeleteAll = userDeleteAll;

const userLogin = async function (req, res, next) {
  console.log("Query userLogin email: ", req.body.email);
  console.log("Query userLogin password: ", req.body.password);
  let existingUser;
  try {
    connectDb(database);    
    const query = { email: req.body.email };
    console.log("Query : ", query);
    existingUser = await User.findOneAndUpdate(query, {new:true});
    if (existingUser === null) {
      console.log("Not Found Email:", existingUser);
      res.json({ status: "error", message: "Not Found Email" });
      return;
    }
    console.log("existingUser : ", existingUser);

    bcrypt.compare(
      req.body.password,
      existingUser.password,
      function (err, result) {
        if (err) {
          console.log("bcrypt.compare error : ", err);
          //res.status(400).json({status: 'error', message: `bcrypt.compare error : ${err}`});
          res.json({ status: "error", message: "bcrypt.compare error" });
          return;
        }
        if (!result) {
          console.log("Result compare password : ", result);
          //res.status(400).json({status: 'error', message: `Result compare password : ${result}`});
          res.json({ status: "error", message: "Result compare password error" });
          return;
        }

        const token = jwt.sign(
          {
            firstname: existingUser.firstname,
            email: existingUser.email,
            password: existingUser.password,
            username: existingUser.username,
            isAdmin: existingUser.isAdmin,
            secret: "shhhhhhared-secret",
            algorithms: ["HS256"],
            onExpired: Date.now() + 1000 * 60 * 60, //1 hour
          },
          "shhhhhhared-secret",
          { expiresIn: "1h" }        
        );        
        
        res.json({
          status: "ok", //"Creating token and it expire on : "
          message: `Expire on : ${Date.now() + 1000 * 60 * 60}`,
          username: existingUser.username,
          token: token,
        });
      }
    );
  } catch(error) {
    console.log("Error UserLogin");
    res.status(500).json({status: "Error", message: error});
  }

  //res.status(200).json({ststus: "OK", message: "UserLogin Success"});
};

module.exports.userLogin = userLogin;

const userAuthen = async function (req, res, next) {
  try {
    console.log("userAuthen req.body : ", req.body);
    res.status(200).json({ status: "ok", message: "UserAuthen Success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "UserAuthen Error" });
  }
}
module.exports.userAuthen = userAuthen;