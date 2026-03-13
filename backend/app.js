const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// import routes
const userRoutes = require("./routes/user.routes");
const DepartmentRoutes = require("./routes/department.routes");
const ComplaintRoutes = require("./routes/complaint.routes")

const app = express();
app.use(cors());
app.use(bodyParser.json());

// serve uploaded images
app.use("/uploads", express.static("uploads")); 

// use routes
app.use("/api/user", userRoutes);
app.use("/api/user", DepartmentRoutes);
app.use("/api/user", ComplaintRoutes);

const Port = process.env.PORT || 5005;

app.get("/", (req, res) => {
  res.send("CCMS is Running");
})

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
