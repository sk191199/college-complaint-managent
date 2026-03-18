const { Model } = require("sequelize");
const { connectToDatabase } = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();

//raise complaint || crete a complaint
const raiseComplaint = async (req, res) => {
  try {
    const { Complaint } = await connectToDatabase();
    const { title, description, departmentId } = req.body;
    //  get user id from logged user using middleware verify token
    const userId = req.user.id;
    let imageName = null;
    if (req.file) {
      imageName = req.file.filename;
    }

    const complaint = await Complaint.create({
      title: title,
      description: description,
      department_id: departmentId,
      user_id: userId,
      image: imageName,
    });

    return res
      .status(201)
      .json({ message: "Complaint raised successfully", data: complaint });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const { Complaint, User, Department } = await connectToDatabase();
    const complaints = await Complaint.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["id", "department_name"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return res
      .status(200)
      .json({ message: "fetched complaints successfully", data: complaints });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update status complaint
const updateComplaintStatus = async (req, res) => {
  try {
    const { Complaint } = await connectToDatabase();

    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["pending", "in-progess", "resolved", "rejected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const complaint = await Complaint.findByPk(id);

    //update status
    await complaint.update({ status: status });
    return res
      .status(200)
      .json({ message: "Complaint status updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { raiseComplaint, getAllComplaints, updateComplaintStatus };
