const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/posts.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
