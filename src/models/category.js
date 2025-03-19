const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    _isDeleted: { type: Boolean, default: false },
}, { timestamps: true });  

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;