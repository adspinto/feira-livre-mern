const express = require('express');

const {
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} = require('../controllers/category');

const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createCategory);
router.put('/update/:categoryId', protect, updateCategory);
router.delete('/delete/:categoryId', protect, deleteCategory);
router.get('/:categoryId', protect, getCategoryById);

module.exports = router;
