const Like = require("../models/like.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.likePostOrComment = async (req, res, next) => {
  try {
    const { targetId, type } = req.body;
    const newLike = new Like({ user: req.user._id });

    await newLike.save();

    if (type === "post") {
      const post = await Post.findById(targetId);
      if (!post) return res.status(404).send({ error: "Post not found" });
      post.likes.push(newLike._id);
      await post.save();
    } else if (type === "comment") {
      const comment = await Comment.findById(targetId);
      if (!comment) return res.status(404).send({ error: "Comment not found" });
      comment.likes.push(newLike._id);
      await comment.save();
    } else {
      return res.status(400).send({ error: "Invalid type" });
    }

    res.status(200).json({ success: "Like added" });
  } catch (error) {
    next(error);
  }
};

exports.getLikesByPostId = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("likes");
    if (!post) return res.status(404).send({ error: "Post not found" });
    res.status(200).json(post.likes);
  } catch (error) {
    next(error);
  }
};

exports.getLikesByCommentId = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate("likes");
    if (!comment) return res.status(404).send({ error: "Comment not found" });
    res.status(200).json(comment.likes);
  } catch (error) {
    next(error);
  }
};
