const { Model, where } = require("sequelize");
const { connectToDatabase, sequelize } = require("../config/db");
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
// const getAllComplaints = async (req, res) => {
//   try {
//     const { Complaint, User, Department } = await connectToDatabase();
//     const complaints = await Complaint.findAll({
//       include: [
//         {
//           model: User,
//           as: "user",
//           attributes: ["id", "name", "email"],
//         },
//         {
//           model: Department,
//           as: "department",
//           attributes: ["id", "department_name"],
//         },
//       ],
//       order: [["created_at", "DESC"]],
//     });
//     return res
//       .status(200)
//       .json({ message: "fetched complaints successfully", data: complaints });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// get All Complaints
const getAllComplaints = async (req, res) => {
  try {
    const { Complaint, User, Department } = await connectToDatabase();

    //quary param
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || "";

    //offset calucalation
    const offset = (page - 1) * limit;

    // where condition for status filtering
    let whereCondition = {};

    if (status) {
      whereCondition.status = status;
    }

    const complaints = await Complaint.findAndCountAll({
      where: whereCondition,

      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "phone"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["id", "department_name"],
        },
      ],

      order: [["created_at", "DESC"]],

      limit: limit,
      offset: offset,

      distinct: true,
    });

    return res.status(200).json({
      message: "complaints fecthed successfully",
      data: complaints.rows,
      total: complaints.count,
      page: page,
      totaPages: Math.ceil(complaints.count / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get complaints by user
const getAllComplaintsByUser = async (req, res) => {
  try {
    const { Complaint, Department } = await connectToDatabase();
    const userId = req.user.id;

    //query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || "";

    //offset cal
    const offset = (page - 1) * limit;

    let whereCondition = { user_id: userId };
    if (status) {
      whereCondition.status = status;
    }

    const complaints = await Complaint.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["id", "department_name"],
        },
      ],

      order: [["created_at", "DESC"]],
      limit: limit,
      offset: offset,

      distinct: true,
    });
    return res.status(200).json({
      message: "fetched complaints successfully",
      data: complaints,
      total: complaints.count,
      page: page,
      totalPages: Math.ceil(complaints.count / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get status count
const getComplaintCount = async (req, res) => {
  try {
    const { Complaint } = await connectToDatabase();

    // total counts
    const totalCount = await Complaint.count();

    // total pendingcount
    const totalPendingCount = await Complaint.count({
      where: { status: "pending" },
    });
    // total rejectd count
    const totalRejectCount = await Complaint.count({
      where: { status: "rejected" },
    });
    // total resolve count
    const totalResolveCount = await Complaint.count({
      where: { status: "resolved" },
    });
    // total in-progress count
    const totalInProgressCount = await Complaint.count({
      where: { status: "in-progress" },
    });

    return res.status(200).json({
      totalCount,
      totalInProgressCount,
      totalPendingCount,
      totalResolveCount,
      totalRejectCount,
    });
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

    const validStatus = ["pending", "in-progress", "resolved", "rejected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const complaint = await Complaint.findByPk(id);

    if (!complaint) {
      return res.status(400).json({ message: "complaint not found" });
    }

    //update status
    await complaint.update({ status: status });
    return res
      .status(200)
      .json({ message: "Complaint status updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

// count complaints by user
const getComplaintCountByUser = async (req, res) => {
  try {
    const { Complaint } = await connectToDatabase();
    const userId = req.user.id;
    //total complaints
    const totalComplaints = await Complaint.count({
      where: { user_id: userId },
    });
    //pending complaints
    const pendingComplaints = await Complaint.count({
      where: { user_id: userId, status: "pending" },
    });
    //In-Progress
    const inprogressComplaints = await Complaint.count({
      where: { user_id: userId, status: "in-progress" },
    });
    // resolve complaints
    const resolvedComplaints = await Complaint.count({
      where: { user_id: userId, status: "resolved" },
    });
    // rejected complaints
    const rejectedComplaints = await Complaint.count({
      where: { user_id: userId, status: "rejected" },
    });

    return res.status(200).json({
      message: "complaints count",
      totalComplaints,
      pendingComplaints,
      inprogressComplaints,
      resolvedComplaints,
      rejectedComplaints,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// complaints count by department wise (INCLUDING 0 complaints)
const getDepartmentWiseComplaintsCount = async (req, res) => {
  try {
    const { Complaint, Department, sequelize } = await connectToDatabase();

    const data = await Department.findAll({
      attributes: [
        ["department_name", "department"],
        [
          sequelize.fn("COUNT", sequelize.col("complaints.complaint_id")),
          "count",
        ],
      ],
      include: [
        {
          model: Complaint,
          as: "complaints",
          attributes: [],
          required: false, // LEFT JOIN → includes 0
        },
      ],
      group: ["departments.id"],
      order: [["department_name", "ASC"]],
      raw: true,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  raiseComplaint,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintCount,
  getAllComplaintsByUser,
  getComplaintCountByUser,
  getDepartmentWiseComplaintsCount,
};
