const express = require("express");
const { getAll, deleteItem, getWithId, createPost, updateItem, likePost, unLikePost } = require('../controller/post.controller')
const { verify_jwt, verify_editor } = require('../middleware/authorization/authenticate');
const upload = require('../middleware/uploadFIles');


const router = express.Router();

router.get('/', getAll);
router.post('/new', verify_jwt, verify_editor, upload.single('img'), createPost);
router.delete('/:id', verify_jwt, verify_editor, deleteItem);
router.get('/:id', getWithId);
router.put('/:id', verify_jwt, verify_editor, updateItem);
router.put('/:id/like', verify_jwt, likePost);
router.delete('/:id/unlike', verify_jwt, unLikePost);


module.exports = router;