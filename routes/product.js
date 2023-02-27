var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("storage destination req", req.body);
    console.log("storage destination file", file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log("storage destination filename file", file.originalname); 
    return cb(null, file.originalname + "_" + Date.now());
  },
});

var upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

const  { getAllProduct, insertProduct, deleteProduct, updateProduct} = require('../controllers/product');

router.get('/', getAllProduct);

router.post('/', upload.single("image"), insertProduct);

router.delete('/:id', deleteProduct);

router.put('/', updateProduct);

module.exports = router;