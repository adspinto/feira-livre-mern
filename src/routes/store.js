const express = require('express');

const {
  getStoreById,
  updateStore,
  createStore,
  deleteStore,
} = require('../controllers/store');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createStore);
router.put('/update/:storeId', protect, updateStore);
router.delete('/delete/:storeId', protect, deleteStore);
router.get('/:storeId', protect, getStoreById);

module.exports = router;
