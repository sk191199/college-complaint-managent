const bcrypt = require("bcrypt");
const { connectToDatabase } = require("../config/db");

const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { where } = require("sequelize");
dotenv.config();

//create user
const createUser = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const { email, password, ...rest } = req.body;
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exist" });
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // user save with hashed password
    const newUser = await User.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    // remove hashed password from response
    const userData = newUser.toJSON();
    delete userData.password;
    return res.status(200).json({
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    console.log("Error Creating User", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//login user function
const loginUser = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email", field: "email" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid Password", field: "password" });
    }

    //create Token
    const payLoad = { id: user.id, role: user.role };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payLoad, secretKey, { expiresIn: "1d" });

    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error Creating User", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get profile api
const getProfile = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    console.log(req.user);
    const userId = req.user.id;

    const userData = await User.findByPk(userId, {
      attributes: ["id", "email", "name", "role", "gender", "phone"],
    });

    return res.status(200).json({
      message: "Profile fectched successfully",
      userData: userData,
    });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// verify email
const verifyEmail = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email required", field: "email" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email Not Found", field: "email" });
    }
    res.status(200).json({ message: "Email Verified" });
  } catch (error) {
    console.log("Error Verifying Email", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and newPassword are required" });
    }
    // find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email Not Found", field: "email" });
    }

    //compare new password with old password
    const isSamepassword = await bcrypt.compare(newPassword, user.password);
    // if newpassword is same as old password
    if (isSamepassword) {
      return res.status(400).json({
        message: "New password cannot be same as old password",
        field: "newPassword",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await user.update({ password: hashedPassword });
    return res.status(200).json({ message: "Passowrd changed successfully" });
  } catch (error) {
    console.log("Error Change Password", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const users = await User.findAll({
      where: { role: "student" },
      attributes: ["id", "name", "email", "phone", "gender"],
    });
    return res.status(200).json({
      message: "fetced users successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//delete user
const deleteUser = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res
      .status(200)
      .json({ message: "user deleted successfluuy", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// total users
const totalUsers = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const totalusers = await User.count({ where: { role: "student" } });
    return res
      .status(200)
      .json({ message: "total users count", success: true, data: totalusers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//exporting above functions using common js module. with object format
module.exports = {
  createUser,
  loginUser,
  getProfile,
  verifyEmail,
  changePassword,
  getAllUsers,
  deleteUser,
  totalUsers,
};
