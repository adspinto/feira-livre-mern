const express = require('express');

const {
  getReviewById,
  updateReview,
  createReview,
  deleteReview,
} = require('../controllers/reviews');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createReview);
router.put('/update/:reviewId', protect, updateReview);
router.delete('/delete/:reviewId', protect, deleteReview);
router.get('/:reviewId', protect, getReviewById);

module.exports = router;
