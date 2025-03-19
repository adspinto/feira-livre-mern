const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    store: {  type: mongoose.Schema.Types.ObjectId, ref: 'Store',  default: null },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, default: null },
    availableCoupons: { type: [String], default: [] },
    categories:{ type: [mongoose.Schema.Types.ObjectId], ref: 'Category', default: [] },
    createdBy: {  type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null },
    type: { type: String,  default: null  },
    assets: { type: mongoose.Schema.Types.Mixed },
    _isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;