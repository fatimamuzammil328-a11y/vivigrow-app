const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dealer', dealerSchema);
