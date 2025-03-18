import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    firstName: { type: String, required: true },
    _firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    _lastName: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, default: '' },
    assets: { type: mongoose.Schema.Types.Mixed },
    authProviders: { type: [String], default: [] },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: 'Review', default: [] },
    redeemedCoupons: { type: [String], default: [] },
    stores: { type: [mongoose.Schema.Types.ObjectId], ref: 'Store', default: [] },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export { User };