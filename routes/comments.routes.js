const express = require("express");
const {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} = require("../controllers/comments.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.post("/create", createComment);
router.get("/:postId", getCommentsByPostId);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
