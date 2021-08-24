const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Defining the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, //Will remove whitespaces
      min: 3,
      max: 20,
      //Min and max length of String field
    },
    lastName: {
      type: String,
      required: true,
      trim: true, //Will remove whitespaces
      min: 3,
      max: 20,
      //Min and max length of String field
    },
    username: {
      type: String,
      required: true,
      trim: true, //Will remove whitespaces
      unique: true, //Every user will be unique
      index: true,
      sparse: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true, //Will remove whitespaces
      unique: true, //Every email will be unique
      index: true,
      sparse: true,
      lowercase: true,
    },
    secret_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], //Datatype which has values predefined Constants
      default: "user",
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//Hashing the Password

userSchema.virtual("password").set(function (password) {
  this.secret_password = bcrypt.hashSync(password, 10);
});
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.secret_password);
  },
};

module.exports = mongoose.model("User", userSchema);
