var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
//const database = "storesonline";

function connectDb(database) {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, {
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