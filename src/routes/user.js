const express = require('express');

const {
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  getUsers
} = require('../controllers/user.js');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', createUser);
router.put('/update/:userId', protect, updateUser);
router.delete('/delete/:userId', deleteUser);
router.get('/:userId', protect, getUserById);
router.get('/', protect, getUsers);

module.exports = router;
