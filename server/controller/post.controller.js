const BaseController = require('./base.controller');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const CustomError = require('../middleware/error/customError');
const { cloudinaryUploadImage } = require('../utils/cloudinary');
const { deleteFile } = require('../utils/deleteFile');
const { deleteKeysByPrefix } = require('../utils/redisHelper');
const path = require('path');

// Path to default image
const defaultImagePath = path.join(__dirname, '../utils/images/default-post.jpg');

console.log(defaultImagePath);

class PostController extends BaseController {
    constructor() {
      super(Post);
    }

    createItem = async (req, res, next) => {
      res.status(200).json({messag: 'This method is disabled for Post class'})
    };

    createPost = async (req, res, next) => {
      try {
        if (!req.body) {
          throw new CustomError('No body passed', 400);
        }
        const postData = {...req.body}
        postData.author = req.id;
        if (req.file) {
          const imgData = await cloudinaryUploadImage(req.file.path)
          postData.img = imgData.secure_url;
          await deleteFile(req.file.path)
        } else {
          const imgData = await cloudinaryUploadImage(defaultImagePath)
          postData.img = imgData.secure_url;
        }
        const post = await this.model.create(postData);
        await deleteKeysByPrefix('Post')
        res.status(201).json({message: 'Post created successfully', post});
      } catch(err) {
        next(err);
      }
    }

    likePost = async (req, res, next) => {
      try {
        const { id } = req.params;
        if (!id) {
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
        const post = await Post.findById(id);
        if (!post) {
          throw new CustomError(`Post not found`, 403);
        }
        if (post.likedBy.length > 1 && post.likedBy.includes(userId)) {
          return res.status(400).json({ message: 'User already liked this post' });
        }
        post.likedBy.push(userId);
        post.likes++;
        await post.save();
        res.status(200).json({ message: 'Post liked successfully' });
      }
      catch (err) {
        console.log(err);
        next(err)
      }
    }

    unLikePost = async (req, res, next) => {
      try {
        const { id } = req.params;
        if (!id) {
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
        const post = await Post.findById(id);
        if (!post) {
          throw new CustomError(`Post not found`, 403);
        }
        let postIndex = post.likedBy.indexOf(userId);
        if (postIndex !== -1) {
          post.likedBy.splice(postIndex, 1);
          post.likes--;
          await post.save();
          return res.status(200).json({ message: 'Post unliked successfully' });
        }
        return res.status(400).json({ message: "You already unlike this post" });
      }
      catch (err) {
        console.log(err);
        next(err)
      }
    }
}

module.exports = new PostController();