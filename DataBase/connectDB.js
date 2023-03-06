var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
//const database = "storesonline";
//`mongodb://127.0.0.1:27017/${database}`
//process.env.URL_LOCALHOST
//process.env.URL_CLOUD_ATLAST

function connectDb(database) {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.URL_CLOUD_ATLAST+database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false
    });
    console.log("Database is connected successfully... ");
  } catch (error) {
    console.log("ERROR connected Database : ", error);
  }
}
module.exports = connectDb;


// module.exports.connectDb = connectDb;

// function closeDb() {
//   try {
//     mongoose.disconnect();
//     console.log("DataBase disconnect...")
//   } catch (error) {
    
//   }
// }

// module.exports.closeDb = closeDb;

// const connectDb = async()=> {
//   try {
//     await mongoose.connect(process.env.DATABASE);
//     console.log("DataBase connect...")
//   }
//   catch(err) {
//     console.log(err);
//     process.exit(1);
//   }
// }
// module.exports = connectDb;

