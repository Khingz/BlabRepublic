const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false
    }
  ],
  img: {
    type: String,
    required: false,
    default: '/uploads/default-post.jpg'
  }
}, {
    timestamps: true
});

// Create a text index on the title and content fields
postSchema.index({ title: 'text', content: 'text' });


module.exports = mongoose.model('Post', postSchema);