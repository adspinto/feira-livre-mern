const express = require('express');

const {
  getStoreById,
  updateStore,
  createStore,
  deleteStore,
  getStores
} = require('../controllers/store');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createStore);
router.put('/:storeId', protect, updateStore);
router.delete('/delete/:storeId', protect, deleteStore);
router.get('/:storeId', protect, getStoreById);
router.get('/', protect, getStores);

module.exports = router;
