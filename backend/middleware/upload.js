const multer = require("multer");

//storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // where the image will upload
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //create unique filename
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({storage : storage});

module.exports = upload