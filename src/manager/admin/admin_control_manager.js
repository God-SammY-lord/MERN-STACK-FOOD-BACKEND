const Admin = require("../../models/admin_model");

//This library gives a token using some algorithm, it will create a token based on some private key, which the server only knows. Once token is generated, we can send it to the user and the user can send it back for verification
const jsToken = require("jsonwebtoken");

exports.signup = (req, res) => {
  Admin.findOne({ email: req.body.email }).exec((error, admin) => {
    //If admin already exists
    if (admin) {
      return res.status(400).json({
        message: "Admin Already registered",
      });
    }
  });
  const { firstName, lastName, email, password } = req.body;

  const admin_pro = new Admin({
    firstName,
    lastName,
    email,
    password,
    adminname: Math.random().toString(),
    position: "admin",
  });

  //If the admin is saved then
  admin_pro.save((error, data) => {
    //If there is an error
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Not Successful!! Please Try Again",
      });
    }

    if (data) {
      return res.status(201).json({
        message: "Admin Created Successfully!! EXPLORE NOW",
      });
    }
  });
};

exports.signin = (req, res) => {
  Admin.findOne({ email: req.body.email }).exec((error, admin) => {
    //If admin already exists
    if (error) {
      return res.status(400).json({
        error,
      });
    }

    if (admin) {
      //then authenticate the password with the hash password
      if (admin.authenticate(req.body.password) && admin.role === "admin") {
        const token = jsToken.sign(
          { _id: admin._id, role: admin.role },
          process.env.JSTOKEN_SECRET,
          { expiresIn: "5h" }
        );
        //The token will expire in 5hr.

        const { _id, firstName, lastName, email, role, fullName } = admin;
        res.cookie("token", token, { expiresIn: "5h" });
        res.status(200).json({
          token,
          admin: {
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

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signed Out successfully...!",
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
