const Product = require("../models/product_model");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  //res.status(200).json({ files: req.file, body: req.body });
  const { name, price, description } = req.body;

  let productPictures = [];
  productPictures = [{ img: req.file.filename }];
  /*if (req.file.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.location };
    }); 
  } */

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPictures,
  });

  product.save((error, product) => {
    console.log(error);
    if (error) {
      return res.status(400).json({ error });
    }
    if (product) {
      return res.status(201).json({ product });
    }
  });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

/* exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity description")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
}; */
