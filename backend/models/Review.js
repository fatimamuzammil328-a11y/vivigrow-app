const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userName: String,
    userRole: { type: String, default: 'Farmer' },
    rating: { type: Number, default: 5 },
    comment: String,
    location: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);
