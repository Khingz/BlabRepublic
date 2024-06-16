const mongoose = require('mongoose');
const CustomError = require('../middleware/error/customError')
const User = require('../models/user.model');
const { cloudinaryRemoveImage } = require('../utils/cloudinary');

class BaseController {
    constructor(model) {
        this.model = model;
    }

    getAll = async (req, res, next) => {
        try {
          let query = {};
          let page = parseInt(req.query.page) || 1; //current page
          let limit = parseInt(req.query.limit) || 20; // number of item per page
          let skip = (page - 1) * limit; // number of items to skip for current page
          if (req.query) {
            query = { ...req.query };
            if (query.search) {
              query.$text = { $search: query.search };
              delete query.search;
            }
            delete query.page;
            delete query.limit;
          }
          const totalDocuments = await this.model.countDocuments(query); // Count total number of document based on query
          const data = await this.model.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
          const totalPages = Math.ceil(totalDocuments / limit); // total page for each query
          const hasNextPage = page < totalPages; // determine if there is a next page
          res.json({
            page,
            limit,
            total: data.length, // Total items in the current page
            totalPages,
            hasNextPage,
            data
          });
        } catch (error) {
          next(error);
        }
    }

    getWithId = async (req, res, next) => {
        try {
          const { id } = req.params;
          const data = await this.model.findById(id);
          res.status(200).json(data);
        } catch (error) {
          next(error);
        }
    };

    createItem = async (req, res, next) => {
        try {
          if (!req.body) {
            throw new CustomError('No body passed', 400);
          }
          req.body.author = req.id;
          const data = await this.model.create(req.body);
          res.status(200).json(data);
        } catch (error) {
          next(error);
        }
    };

    updateItem = async (req, res, next) => {
        try {
          const { id } = req.params;
          if (!id) {
            throw new CustomError('No id passed in', 400);
          }
          const userId = req.id;
          if (!userId) {
            throw new CustomError('You are not verified', 403);
          }
          const user = await User.findById(userId);
          if (!user) {
            throw new CustomError('No user found', 403);
          }
          const itemToUpdate = await this.model.findById(id);
          if (!itemToUpdate) {
            throw new CustomError(`${this.model.modelName} not found`, 403);
          }
          if (user.id != itemToUpdate.author) {
            throw new CustomError(`You are not authorized to update this ${this.model}`, 403);
          }
          if (this.model.modelName == 'User') {
            delete req.body.role;
            delete req.body.email;
            delete req.body.username;
            delete req.body.password;
          }
          const data = await this.model.findByIdAndUpdate(id, req.body, { new: true });
          res.status(200).json({message: `${this.model.modelName} updated successfully`, data});
        } catch (error) {
          next(error);
        }
    };

    deleteItem = async (req, res, next) => {
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
          const itemToDelete = await this.model.findById(id);
          if (!itemToDelete) {
            throw new CustomError(`${this.model.modelName} not found`, 403);
          }
          if (user.role != 'admin' && user.id != itemToDelete._id) {
            throw new CustomError(`You are not authorized to delete this ${this.model}`, 403);
          }
          const {img} = itemToDelete;
          if (img) {
            const imgCloudinaryId = img?.split('/')[7]?.split('.')[0];
            if (imgCloudinaryId) {
              await cloudinaryRemoveImage(imgCloudinaryId);
              console.log('Img deleted from cloudinary');
            }
          }
          const data = await this.model.findByIdAndDelete(id);
          res.status(200).json({ message: `${this.model.modelName} deleted successfully` });
        } catch (error) {
          next(error);
        }
    };
}

module.exports = BaseController;