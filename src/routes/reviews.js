const express = require('express');

const {
  getReviewById,
  updateReview,
  createReview,
  deleteReview,
  getReviews
} = require('../controllers/reviews');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createReview);
router.put('/:reviewId', protect, updateReview);
router.delete('/delete/:reviewId', protect, deleteReview);
router.get('/:reviewId', protect, getReviewById);
router.get('/', protect, getReviews);

module.exports = router;
