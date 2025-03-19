const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    discount: { type: Number, required: true },
    discountType: { type: String, required: true },
    expirationDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    _isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;