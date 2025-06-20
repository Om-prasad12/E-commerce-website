const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

async function userSignup(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Name, email, password and phone are required.",
      });
    }

    // Create a new user with email token
    const user = new userModel({
      ...req.body,
      emailToken: crypto.randomBytes(32).toString("hex"),
    });
    const url = `localhost:8000/auth/${user._id}/verify-email/${user.emailToken}`;
    await sendEmail(
      user.email,
      "Verify your email",
      `Click on this link to verify your email: ${url}`
    );
    // Save the user to the database
    const data = await user.save();
    let token = jwt.sign({ id: data._id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("id", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    return res.status(201).json({
      message: "An Email has been sent to your email address for verification",
    });
  } catch (error) {
    console.error("Error processing user data:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message, // Include the actual error message
    });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }
    const passwordIsCorrect = bcrypt.compareSync(password, user.password);
    if (!passwordIsCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("id", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    console.log("User logged in successfully:", user.email);
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function verifyEmail(req, res) {
  try {
    const { userId, emailToken } = req.params;

    // Find the user by ID and email token
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "Invalid User or expired email verification link",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    if (user.emailToken !== emailToken) {
      return res.status(400).json({
        message: "Invalid or expired email verification link",
      });
    }
    await userModel.findOneAndUpdate(
      { _id: userId },
      { isEmailVerified: true, emailToken: undefined }
    );

    // console.log("Email verified successfully for user:", user.email);
    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
module.exports = { userSignup, userLogin, verifyEmail };
