const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");

exports.createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const newPost = new Post({ content, user: req.user._id });

    await newPost.save();
    res.status(201).json({ newPost });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .populate({
        path: "comments",
        populate: [
          { path: "user", select: "name" },
          { path: "likes", populate: { path: "user", select: "name" } },
        ],
      })
      .populate({
        path: "likes",
        populate: { path: "user", select: "name" },
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "comments",
        populate: {
          path: "likes",
        },
      })
      .populate("likes");
    if (!post) return res.status(404).send({ error: "Post not found" });
    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!post) return res.status(404).send({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send({ error: "Post not found" });

    await Comment.deleteMany({ post: req.params.id });
    await Like.deleteMany({ post: req.params.id });

    res.status(200).json({ success: "Post deleted" });
  } catch (error) {
    next(error);
  }
};
