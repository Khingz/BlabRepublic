const BaseController = require('./base.controller');
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const CustomError = require('../middleware/error/customError');

class CommentsController extends BaseController {
    constructor() {
      super(Comment);
    }

    createComment = async (req, res, next) => {
        try {
            const { content } = req.body;
            if (!content) {
                throw new CustomError('Content must be present', 401);
            }
            const { postID } = req.params;
            if (!postID) {
                throw new CustomError('No id passed in', 400);
            }
            const newComment = new Comment({
              content,
              post: postID,
              author: req.id,
            });
            await newComment.save();
            const post = await Post.findById(postID);
            if (!post) {
                throw new CustomError(`Post not found`, 403);
            }
            post.comments.push(newComment._id)
            await post.save();
            res.status(200).json(newComment);
        } catch (error) {
          next(error);
        }
    };

    getComments = async (req, res, next) => {
        try {
            const {postID} = req.params;
            if (!postID) {
                throw new CustomError('No id passed in', 400);
            }
            const comments = await Comment.find({post: postID}).sort({ createdAt: -1 }).populate('author').populate('likedBy');
            if (!comments) {
                throw new CustomError(`Post not found`, 403);
            }
            res.status(200).json(comments);
          } catch (err) {
            console.error(err);
            next(err);
          }
    }

    likeComment = async (req, res, next) => {
      try {
        const { commentID } = req.params;
        if (!commentID) {
          throw new CustomError('No id passed in', 400);
        }
        const userId = await req.id;
        if (!userId) {
          throw new CustomError('You are not verified', 403);
        }
        const user = await User.findById(userId);
        if (!user) {
          throw new CustomError('No user found', 403);
        }
        const comment = await Comment.findById(commentID);
        if (!comment) {
          throw new CustomError(`Comment not found`, 403);
        }
        if (comment.likedBy.length > 1 && comment.likedBy.includes(userId)) {
          return res.status(400).json({ message: 'User already liked this comment' });
        }
        comment.likedBy.push(userId);
        comment.likes++;
        await comment.save();
        res.status(200).json({ message: 'Comment liked successfully' });
      }
      catch (err) {
        console.log(err);
        next(err)
      }
    }

    unLikeComment = async (req, res, next) => {
      try {
        const { commentID } = req.params;
        if (!commentID) {
          throw new CustomError('No id passed in', 400);
        }
        const userId = await req.id;
        if (!userId) {
          throw new CustomError('You are not verified', 403);
        }
        const user = await User.findById(userId);
        if (!user) {
          throw new CustomError('No user found', 403);
        }
        const comment = await Comment.findById(commentID);
        if (!comment) {
          throw new CustomError(`comment not found`, 403);
        }
        let commentIndex = comment.likedBy.indexOf(userId);
        if (commentIndex !== -1) {
          comment.likedBy.splice(commentIndex, 1);
          comment.likes--;
          await comment.save();
          return res.status(200).json({ message: 'comment unliked successfully' });
        }
        return res.status(400).json({ message: "You already unlike this comment" });
      }
      catch (err) {
        console.log(err);
        next(err)
      }
    }
}

module.exports = new CommentsController();