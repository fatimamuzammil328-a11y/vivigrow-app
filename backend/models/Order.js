const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional if guest checkout is allowed
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        productId: String,
        name: String,
        qty: Number,
        price: String,
        emoji: String
    }],
    totalAmount: Number,
    paymentMethod: String,
    status: {
        type: String,
        default: 'PENDING'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
