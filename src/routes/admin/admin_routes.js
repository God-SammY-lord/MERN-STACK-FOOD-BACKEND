const express = require("express");
const {
  signup,
  signin,
  signout,
} = require("../../manager/admin/admin_control_manager");
const { requireSignIn } = require("../../middleware");

// Validator
const {
  validateRequest,
  isRequestValidated,
  validateRequestSignIn,
} = require("../../validators/user_admin_valid");

const router = express.Router();

//SignIn Functionality
router.post("/admin/signin", validateRequestSignIn, isRequestValidated, signin);

//SignUp Functionality
router.post("/admin/signup", validateRequest, isRequestValidated, signup);

router.post("/admin/signout", requireSignIn, signout);

/* //Require Sign In, For Profile
router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({ user: "profile" });
});
*/
module.exports = router;
