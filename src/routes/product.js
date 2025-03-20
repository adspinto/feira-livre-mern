const express = require('express');

const {
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  getProducts
} = require('../controllers/product');

const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createProduct);
router.put('/:productId', protect, updateProduct);
router.delete('/delete/:productId', protect, deleteProduct);
router.get('/:productId', protect, getProductById);
router.get('/', protect, getProducts);

module.exports = router;
