const express = require('express');
const commentController = require('../controllers/commentController');
const {commentValidation} = require('../validations/commentValidation')

const router = express.Router();

router.post('/posts/:postId', commentValidation, commentController.addComment);

router.get('/posts/:postId', commentController.getAllComments);

router.put('/:commentId', commentValidation, commentController.updateComment);

router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
