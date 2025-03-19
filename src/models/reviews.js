const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    review: { type: String, default: '' },
    categories:{ type: [mongoose.Schema.Types.ObjectId], ref: 'Category', default: [] },
    products: { type: [mongoose.Schema.Types.ObjectId], ref: 'Products', default: [] },
    user: {  type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null },
    store: {  type: mongoose.Schema.Types.ObjectId, ref: 'Store',  default: null },
    type: { type: String,  default: null  },
    rate: { type: Number, default: [] }, 
    _isDeleted: { type: Boolean, default: false },
}, { timestamps: true });  

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;