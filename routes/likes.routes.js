const express = require("express");
const {
  likePostOrComment,
  getLikesByPostId,
  getLikesByCommentId,
} = require("../controllers/likes.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/like", likePostOrComment);

router.get("/post/:postId", getLikesByPostId);

router.get("/comment/:commentId", getLikesByCommentId);

module.exports = router;
