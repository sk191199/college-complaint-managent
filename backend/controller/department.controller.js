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

//get all departments
const getAllDepartments = async (req, res) => {
  try {
    const { Department } = await connectToDatabase();

    const departments = await Department.findAll();
    return res
      .status(200)
      .json({ message: "Departments fetched successfully", data: departments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete department
const deleteDepartment = async (req, res) => {
  try {
    const { Department } = await connectToDatabase();
    const { id } = req.params;

    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Department Not Found" });
    }
    await department.destroy();
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update Department
const updateDepartment = async (req, res) => {
  try {
    const { Department } = await connectToDatabase();
    const { id } = req.params;
    const { departmentName } = req.body;

    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Department Not Found" });
    }

    await Department.update(
      {
        department_name: departmentName,
      },
      {
        where: { id: id },
      },
    );
    return res.status(200).json({ message: "Department Update Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addDepartment,
  getAllDepartments,
  deleteDepartment,
  updateDepartment,
};
