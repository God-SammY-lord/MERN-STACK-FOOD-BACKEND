const express = require("express");
//const {  } = require('../controller/category');
const { requireSignIn, adminMiddleware, uploadS3 } = require("../middleware");
const {
  createProduct,
  getProductDetailsById,
  deleteProductById,
} = require("../manager/product_control_manager");
const multer = require("multer");

const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "Uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignIn,
  adminMiddleware,
  upload.single("productPictures"),
  createProduct
);
router.get("/product/:productId", getProductDetailsById);
router.delete(
  "/product/deleteProductById",
  requireSignIn,
  adminMiddleware,
  deleteProductById
);
/* router.post(
  "/product/getProducts",
  requireSignIn,
  adminMiddleware,
  getProducts
); */

module.exports = router;
