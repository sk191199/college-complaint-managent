const { connectToDatabase } = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();

//raise complaint || crete a complaint
const raiseComplaint = async (req, res) => {
  try {
    const { Complaint } = connectToDatabase();
    const { title, description, departmentId } = req.body;
    //  get user id from logged user using middleware verify token
    const userId = req.user.id;
    let imageName = null;
    if (req.file) {
      imageName = req.file.fileName;
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

module.exports = { raiseComplaint };
