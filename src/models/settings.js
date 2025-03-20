const mongoose = require('mongoose');

const settings = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    tos: { type: String, default: '' },
    privacyPolicy: { type: String, default: '' },
    onboarding: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
    allowNotifications: { type: Boolean, default: false },
    allowShareData: { type: Boolean, default: false },
    localization: { type: mongoose.Schema.Types.Mixed, default: [] },
}, { timestamps: true });  

const Settings = mongoose.model('Settings', settings);

module.exports = Settings;