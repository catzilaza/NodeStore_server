const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: false,
   },
  name: {
    type: String,
    required: false,
   },
  price: {
    type: String,
    required: false,
   },
  quantity: {
    type: String,
    required: false,
   },
  desc: {
    type: String,
    required: false,
   },
  title: {
    type: String,
    required: false,
   },
  img: {
    data: Buffer,
    contentType: String,    
   },
  rating: {
    type: Number,
    min:0,
    max:5    
   }  
});
module.exports = mongoose.model("Product", ProductSchema)