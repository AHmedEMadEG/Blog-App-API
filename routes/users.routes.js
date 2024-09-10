const express = require("express");

const { signup, login } = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post("/signup", upload.single('profilePicture'), signup);
router.post("/login", login);

module.exports = router;
