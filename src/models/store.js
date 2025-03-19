const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: 'Review', default: [] },
    availableCoupons: { type: [String], default: [] },
    categories:{ type: [mongoose.Schema.Types.ObjectId], ref: 'Category', default: [] },
    products: { type: [mongoose.Schema.Types.ObjectId], ref: 'Products', default: [] },
    owner: {  type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null },
    type: { type: String,  default: null  },
    assets: { type: mongoose.Schema.Types.Mixed },
    storeNumber: { type: Number, default: [] }, 

}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

module.exports =  Store;