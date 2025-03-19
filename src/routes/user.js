const express = require('express');

const {
  getUserById,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/user.js');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', createUser);
router.put('/update/:userId', protect, updateUser);
router.delete('/delete/:userId', deleteUser);
router.get('/:userId', protect, getUserById);

module.exports = router;
