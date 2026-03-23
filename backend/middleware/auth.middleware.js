const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // firstly we extrcat token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provide" });
    }
    //format token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid Token Format" });
    }
    // Token verify chestham
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded data ni request lo store chestham
    req.user = decoded;

    next(); // route ki proceed avvadani
  } catch (error) {
    console.log("Error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const verifyAdmin = (req,res,next)=>{

  if(req.user.role !== "admin"){
    return res.status(403).json({message:"Access denied"})
  }

  next()
}

const verifyStudent = (req, res, next) => {
  if(req.user.role !== "student"){
    return res.status(403).json({message: "Access denied"})
  }
  next()
}
module.exports = { verifyToken, verifyAdmin , verifyStudent};
