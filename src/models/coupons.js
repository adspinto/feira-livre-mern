import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    discount: { type: Number, required: true },
    discountType: { type: String, required: true },
    expirationDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

export { Coupon };