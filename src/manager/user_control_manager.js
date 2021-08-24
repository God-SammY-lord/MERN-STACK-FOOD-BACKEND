const User = require("../models/user_model");

//This library gives a token using some algorithm, it will create a token based on some private key, which the server only knows. Once token is generated, we can send it to the user and the user can send it back for verification
const jsToken = require("jsonwebtoken");

//const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  //Create separate file for validators

  /* const errors = validationResult(req);
  return res.status(400).json({
    errors: errors.array(),
  }); */

  User.findOne({ email: req.body.email }).exec((error, user) => {
    //If user already exists
    if (user) {
      return res.status(400).json({
        message: "User Already registered",
      });
    }
  });
  const { firstName, lastName, email, password } = req.body;

  const user_pro = new User({
    firstName,
    lastName,
    email,
    password,
    username: Math.random().toString(),
  });

  //If the user is saved then
  user_pro.save((error, data) => {
    //If there is an error
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Not Successful!! Please Try Again",
      });
    }

    if (data) {
      return res.status(201).json({
        message: "User Created Successfully",
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    //If user already exists
    if (error) {
      return res.status(400).json({
        error,
      });
    }

    if (user) {
      //then authenticate the password with the hash password
      if (user.authenticate(req.body.password)) {
        const token = jsToken.sign(
          { _id: user._id, role: user.role },
          process.env.JSTOKEN_SECRET,
          { expiresIn: "5h" }
        );
        //The token will expire in 1hr.

        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something Went Wrong!! Please Try Again",
      });
    }
  });
};

//Included in separate middle-ware File
/* exports.requireSignIn = (req, res, next) => {
  //Verify the Token, Check JWT Documentation
  const token = req.headers.authorization.split(" ")[1];

  const user = jsToken.verify(token, process.env.JSTOKEN_SECRET_USER);
  console.log(token);

  //A new property added to the user, so we can access it in the next call
  req.user = user;
  //next will execute the next function to which we relate
  next();
  //jsToken.decode()
}; */
