const express = require('express');

const {
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} = require('../controllers/product');

const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createProduct);
router.put('/update/:productId', protect, updateProduct);
router.delete('/delete/:productId', protect, deleteProduct);
router.get('/:productId', protect, getProductById);

module.exports = router;
