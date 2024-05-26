const express = require("express");
const { createComment, getComments, likeComment, unLikeComment, getWithId } = require("../controller/comment.controller");
const { verify_jwt, verify_editor } = require('../middleware/authorization/authenticate');


const router = express.Router();

router.post('/:postID/new', verify_jwt, createComment);
router.get('/:postID/comments', getComments);
router.put('/:commentID/like', verify_jwt, likeComment);
router.delete('/:commentID/unlike', verify_jwt, unLikeComment);
router.get('/:id', getWithId);


module.exports = router;