import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
}, { timestamps: true });  

const Category = mongoose.model('Category', categorySchema);

export { Category };