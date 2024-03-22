const { User } = require("../models/user");
const { validEmail, validPwd } = require("../utils/validator");
const bcrypt = require("bcrypt");

const userSignUp = async (req, res) => {
  try {
    const body = req.body;
    const { name, email, dob, password } = body;
    if (!(name && email && dob && password)) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    if (!validEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Enter a valid email" });
    }
    const userExit = await User.findOne({ email: email.toLowerCase() });
    if (userExit) {
      return res
        .status(400)
        .json({
          status: false,
          message: "User already exists, Please login now!!",
        });
    }
    if (!validPwd(password)) {
      return res
        .status(400)
        .json({
          status: false,
          message:
            "Password should be 8 characters long and must contain one of 0-9, A-Z, a-z, and special characters",
        });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    const findCount = await User.find({}).sort({ userId: -1 }).limit(1);
    let id;
    if (findCount.length === 0) {
      id = 1;
    } else {
      id = parseInt(findCount[0].userId) + 1;
    }
    let obj = {
      userId: id,
      name,
      email: email.toLowerCase(),
      dob,
      password: hashedPassword, // Save hashed password
    };
    const saveUser = await User.create(obj);
    return res
      .status(201)
      .json({ status: true, message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

const userDetails = async (req, res) => {
  try {
    const users = await User.find({}).select({ _id: 0, __v: 0, password: 0 });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Not have any user" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Get user details", users });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.findOne({ userId }).select({
      _id: 0,
      __v: 0,
      password: 0,
    });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Not have any user" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Get user userId", users });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, dob } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Update user details
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.dob = dob ? dob : user.dob;

    // Save the updated user details
    await user.save();

    return res
      .status(200)
      .json({ status: true, message: "Updated Successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOneAndDelete({ userId });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "User account deleted successfully !!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  userSignUp,
  userDetails,
  updateUser,
  deleteUser,
  getUserById,
};
