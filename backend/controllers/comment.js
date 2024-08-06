const Comment = require('../models/comments');

exports.addComment = async (req, res) => {
    const { recipeId, comment } = req.body;

    try {
        const newComment = new Comment({
            recipeId,
            username: req.user.username,
            comment
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getComments = async (req, res) => {
    const { recipeId } = req.params;

    try {
        const comments = await Comment.find({ recipeId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.username !== req.user.username) {
            return res.status(403).json({ message: 'User not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
