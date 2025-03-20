const Coupon = require('../models/coupons');

const getCouponById = async (req, res) => {
  const { couponId } = req.params;
  const coupon = await Coupon.findById(couponId);
  if (!coupon || coupon._isDeleted) {
    return res.status(400).json({ message: 'Coupon does not exist' });
  }

  res.status(200).json(coupon);
};

const createCoupon = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user._id;

    const coupon = await Coupon.findOne({ product, user: userId });

    if (coupon) {
      if (!coupon._isDeleted) {
        return res
          .status(400)
          .json({ message: 'You already couponed this product' });
      }
    }

    const newCoupon = new Coupon({
      ...body
    });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const body = req.body;
    const coupon = await Coupon.findOneAndUpdate(
      {
        _id: couponId,
      },
      body,
      { new: true },
    );

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const coupon = await Coupon.findOneAndUpdate(
      {
        _id: couponId,
      },
      { _isDeleted: true },
      { new: true },
    );

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCoupons = async (req, res) => {
  try {
    const {limit = 20, sort = "DESC"} = req.query
    const sorting = sort === "DESC" ? -1 : 1
    const coupons = await Coupon.find().sort({ createdAt: sorting}).limit(limit);
    res.status(200).json(coupons)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
module.exports = {
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupons
};
