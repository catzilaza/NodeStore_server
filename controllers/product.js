//const connectDb = require("../DataBase/connectDB");
//const database = "storesonline";

var fs = require("fs");
var path = require("path");

const Product = require("../model/product");

const getAllProduct = async function (req, res, next) {
  try {
    //connectDb(database);
    const product = await Product.find({});
    //res.status(200).render("product", { title: "Product Page", items: product });
    res.json({ status: "ok", message: "product listing", data: product });
  } catch (error) {
    console.log("GET Product ERROR : ", error);
    res.json({ status: "error", message: error });
  }
  //res.send('respond with a resource');
};
module.exports.getAllProduct = getAllProduct;

const insertProduct = async (req, res, next) => {
  //connectDb(database);
  console.log(`insertProduct :
    productID: ${req.body.productID},
    name: ${req.body.name},
    price: ${req.body.price},
    img: ${req.file.filename}`);
  console.log("insertProduct file xxx", req.file);
  try {
    const newProduct = new Product({
      productID: req.body.productID,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      desc: req.body.desc,
      title: req.body.title,
      img: {
        data: fs.readFileSync(
          path.join(process.cwd(), `/uploads/${req.file.filename}`) //`F:/Users/Ya/UserWindow10/ReactProject/storeOnline/storesonline/uploads/${req.file.filename}`
        ), //req.file.filename
        contentType: "image/png",
      },

    });
    const savedProduct = newProduct.save((err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log("save");

        //item.save();
        //res.redirect("upimg");
      }
    });
    //console.log("savedProduct xxx : ", savedProduct);
    //res.status(200).json(savedProduct);
    res.status(200).send("savedProduct success!");
  } catch (error) {
    console.log("catch (error)");
    next(error);
  }
};
module.exports.insertProduct = insertProduct;

const deleteProduct = async function (req, res, next) {
  //connectDb(database);

  console.log(
    "req.params.id : deleteProduct = async (req, res, next) => : ",
    req.params.id
  ); //, req.params.id

  try {
    await Product.findOneAndDelete({ productID: req.params.id });
    res.status(200).json("Product has been deleted..!");
  } catch (error) {
    console.log("error No product tpo delete: ", error);
    next(error);
  }
  //res.json({status: 'ok', message: 'delete product work!'});
};
module.exports.deleteProduct = deleteProduct;

const updateProduct = async function (req, res, next) {

  //connectDb(database);
  //  JSON.stringify(req.body)
  console.log("updateProduct JSON.stringify(req.body) : ", JSON.stringify(req.body));
  console.log(`updateProduct :
    productID: ${req.body.productID},
    name: ${req.body.name},
    price: ${req.body.price}`);  

  try {
    const product = await Product.findOneAndUpdate(
      { productID: req.body.productID },
      {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        desc: req.body.desc,
        title: req.body.title
      }
    );
    // if (product === null) {
    //   console.log("Error No product to delete: ", error);
    //   res.json({ status: "error", message: error });
    // }
    console.log("product !== null");
  } catch (error) {
    console.log("Error updateProduct: ", error);
    res.json({ status: "error", message: error });
  }

  res.json({ status: "ok", message: 'Test update' });
};
module.exports.updateProduct = updateProduct;
