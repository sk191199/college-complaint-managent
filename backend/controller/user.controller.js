
const bcrypt = require("bcrypt");
const { connectToDatabase } = require("../config/db");
const SALT_ROUNDS = 10;
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
module.exports = {
  createUser,
};
