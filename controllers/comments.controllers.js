const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const Like = require("../models/like.model");

exports.createComment = async (req, res, next) => {
  try {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send({ error: "Post not found" });

    const newComment = new Comment({
      content,
      post: postId,
      author: req.user._id,
    });
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("likes");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!comment) return res.status(404).send({ error: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).send({ error: "Comment not found" });

    await Like.deleteMany({ comment: req.params.id });

    const post = await Post.findById(comment.post);
    if (post) {
      post.comments.pull(comment._id);
      await post.save();
    }

    res.status(200).json({ success: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};
