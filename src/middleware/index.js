//const jsToken = require("jsonwebtoken");
const jsToken = require("jsonwebtoken");
exports.requireSignIn = (req, res, next) => {
  //Verify the Token, Check JWT Documentation
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    const user = jsToken.verify(token, process.env.JSTOKEN_SECRET);
    console.log(token);

    //A new property added to the user, so we can access it in the next call
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  //next will execute the next function to which we relate
  next();
  //jsToken.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};
