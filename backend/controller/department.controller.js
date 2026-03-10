const { where } = require("sequelize");
const { connectToDatabase } = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();

//add department
const addDepartment = async (req, res) => {
  try {
    const { Department } = await connectToDatabase();
    const { departmentName } = req.body;

    // validation
    if (!departmentName) {
      return res.status(400).json({ message: "department name required" });
    }

    //check exist or not
    const existingDepartment = await Department.findOne({
      where: { department_name: departmentName },
    });

    if (existingDepartment) {
      return res.status(409).json({ message: "Department already exist" });
    }

    // create Department
    const newDepartment = await Department.create({
      department_name: departmentName,
    });

    return res
      .status(201)
      .json({ message: "Add Department Successfully", data: newDepartment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
    addDepartment, 
}
