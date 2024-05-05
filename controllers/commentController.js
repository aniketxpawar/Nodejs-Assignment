const { Comment } = require('../models');

const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.create({ content, UserId: userId, PostId: postId });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.findAll({ where: { PostId: postId } });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this comment' });
    }

    await comment.update({ content });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    await comment.destroy();
    res.status(200).json({message:"Comment Deleted Successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  addComment,
  getAllComments,
  updateComment,
  deleteComment
};
