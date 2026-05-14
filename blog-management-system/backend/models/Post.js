const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    authorName: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Technology', 'Design', 'Business', 'Lifestyle', 'Other'],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    thumbnailUrl: {
      type: String,
      trim: true,
      default: '',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search functionality
postSchema.index({ title: 'text', authorName: 'text', category: 'text' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
