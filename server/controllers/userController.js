const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const UserModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is Required!",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is Required!",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required!",
      });
    }

    if (password.length < 6 || password.length > 16) {
      return res.status(400).json({
        success: false,
        message: "Password should be between 6 to 16 characters long",
      });
    }

    //check existing User

    const existingUSer = await UserModel.findOne({ email });
    if (existingUSer) {
      return res.status(500).json({
        success: false,
        message: "User is already registered with this email",
      });
    }

    //hash password
    const hashedPasword = await hashPassword(password);

    //save user to DB
    const user = await UserModel({
      name,
      email,
      password: hashedPasword,
    }).save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server Down please try again later!",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide Email or Password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    //match password

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or Password",
      });
    }
    //generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // set password as undefined
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server Down please try again later!",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
