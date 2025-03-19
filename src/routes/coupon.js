const express = require('express');

const {
  getCouponById,
  updateCoupon,
  createCoupon,
  deleteCoupon,
} = require('../controllers/coupon');
const protect = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', protect, createCoupon);
router.put('/update/:couponId', protect, updateCoupon);
router.delete('/delete/:couponId', protect, deleteCoupon);
router.get('/:couponId', protect, getCouponById);

module.exports = router;
