const express = require('express');

const {
  getSettings,
  updateSettings,
  createSettings,

} = require('../controllers/settings');

const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createSettings);
router.put('/', protect, updateSettings);
router.get('/', protect, getSettings);


module.exports = router;
