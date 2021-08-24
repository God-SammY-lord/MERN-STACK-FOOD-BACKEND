const express = require("express");
const { signup, signin } = require("../manager/user_control_manager");

// Validator
const {
  validateRequest,
  isRequestValidated,
  validateRequestSignIn,
} = require("../validators/user_admin_valid");

//Check out Express Validator documentation
//const { check } = require("express-validator");

const router = express.Router();

//SignIn Functionality
router.post("/signin", validateRequestSignIn, isRequestValidated, signin);

//SignUp Functionality
//Will check for required fields and then forward to SigmUp
router.post(
  "/signup",
  /* [
    check("fistName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("lastName"),
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at-least 6 characters long"),
  ], */
  validateRequest,
  isRequestValidated,
  signup
);

/* //Require Sign In, For Profile
router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({ user: "profile" });
}); */

module.exports = router;
