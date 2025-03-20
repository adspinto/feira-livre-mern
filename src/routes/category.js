const express = require('express');

const {
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
  getCategories,
} = require('../controllers/category');

const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createCategory);
router.put('/:categoryId', protect, updateCategory);
router.delete('/:categoryId', protect, deleteCategory);
router.get('/:categoryId', protect, getCategoryById);
router.get('/', protect, getCategories);

module.exports = router;
