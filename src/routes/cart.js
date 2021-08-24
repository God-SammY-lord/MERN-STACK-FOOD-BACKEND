const express = require("express");
const {
  addItemToCart,
  // addToCart,
  getCartItems,
  removeCartItems,
} = require("../manager/cart_control_manger");
const {
  requireSignIn,
  userMiddleware,
  adminMiddleware,
} = require("../middleware/");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignIn,
  userMiddleware,
  addItemToCart
);
router.post(
  "/admin/cart/addtocart",
  requireSignIn,
  adminMiddleware,
  addItemToCart
);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post("/user/getCartItems", requireSignIn, userMiddleware, getCartItems);
router.post(
  "/admin/getCartItems",
  requireSignIn,
  adminMiddleware,
  getCartItems
);
//new update
router.post(
  "/user/cart/removeItem",
  requireSignIn,
  userMiddleware,
  removeCartItems
);
router.post(
  "/admin/cart/removeItem",
  requireSignIn,
  adminMiddleware,
  removeCartItems
);

module.exports = router;
