const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  fileFilter: function (req, file, cb) {
    const extensions = ["image/jpg", "image/jpeg", "image/png"];
    if (extensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, and .png formats are allowed"), false);
    }
  },
});

module.exports = upload;
