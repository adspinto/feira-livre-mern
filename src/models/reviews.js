const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    review: { type: String, default: '' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    user: {  type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null },
    type: { type: String,  default: null  },
    rate: { type: Number, default: [] }, 
    _isDeleted: { type: Boolean, default: false },
}, { timestamps: true });  

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;