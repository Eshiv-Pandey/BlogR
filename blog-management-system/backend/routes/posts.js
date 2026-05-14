const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const Post = require('../models/Post');
const exportToCSV = require('../utils/csvExport');

const getPagination = (req) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const buildFilters = ({ category, status }) => {
  const filter = {};

  if (category && category !== 'All Categories') {
    filter.category = category;
  }

  if (status && status !== 'All Status') {
    filter.status = status;
  }

  return filter;
};

const buildSearchFilter = ({ q, category, status }) => {
  const filter = buildFilters({ category, status });
  const term = escapeRegex(q.trim());

  filter.$or = [
    { title: { $regex: term, $options: 'i' } },
    { authorName: { $regex: term, $options: 'i' } },
    { category: { $regex: term, $options: 'i' } },
  ];

  return filter;
};

// Validation middleware
const postValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title must not exceed 200 characters'),
    body('authorName')
      .notEmpty()
      .withMessage('Author name is required')
      .trim(),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isIn(['Technology', 'Design', 'Business', 'Lifestyle', 'Other'])
      .withMessage('Invalid category'),
    body('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['Draft', 'Published'])
      .withMessage('Status must be either Draft or Published'),
    body('shortDescription')
      .notEmpty()
      .withMessage('Short description is required')
      .isLength({ max: 300 })
      .withMessage('Short description must not exceed 300 characters'),
    body('content')
      .notEmpty()
      .withMessage('Post content is required'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};

// @route   GET /api/posts
// @desc    Get all posts with pagination and filtering
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const filter = buildFilters(req.query);

    // Get total count for pagination
    const total = await Post.countDocuments(filter);

    // Get posts with pagination
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/posts/search
// @desc    Search posts by title, author, or category
// @access  Public
router.get('/search', async (req, res, next) => {
  try {
    const { q, category, status } = req.query;
    const { page, limit, skip } = getPagination(req);

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const searchQuery = buildSearchFilter({ q, category, status });

    const total = await Post.countDocuments(searchQuery);
    const posts = await Post.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/posts/export
// @desc    Export posts to CSV
// @access  Public
router.get('/export', async (req, res, next) => {
  try {
    const { category, status, q } = req.query;
    let filter = buildFilters({ category, status });

    // Add search if provided
    if (q && q.trim() !== '') {
      filter = buildSearchFilter({ q, category, status });
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No posts found to export',
      });
    }

    const csv = exportToCSV(posts);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=blog-posts.csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Public
router.post('/', postValidationRules(), validate, async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/posts/:id
// @desc    Update post by ID
// @access  Public
router.put('/:id', postValidationRules(), validate, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post by ID
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
