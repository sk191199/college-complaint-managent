const bcrypt = require("bcrypt");
const { connectToDatabase } = require("../config/db");
const { where } = require("sequelize");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//create user
const createUser = async (req, res) => {
  const { User } = await connectToDatabase();
  try {
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
  const { User } = await connectToDatabase();
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid Emial" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
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
  const { User } = await connectToDatabase();
  try{
    console.log(req.user)
    const userId = req.user.id;

    const userData = await User.findByPk(userId, {attributes : ["id", "email", "name", "role"]})

    return res.status(200).json({
      message: "Profile fectched successfully",
      userData : userData ,
    })

  }catch (error){
    console.log("Error Message", error )
    return res.status(500).json({ message: "Internal Server Error"})
  }

}










//exporting above functions using common js module. with object format
module.exports = {
  createUser,
  loginUser,
  getProfile,
};
